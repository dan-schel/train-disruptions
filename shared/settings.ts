import { z } from "zod";

export const cookieSettings = {
  // Using "lax" means only sent if it's the same site, but still send on the
  // when navigating from an external site.
  sameSite: "lax",

  // TODO: This means I can't test on my phone over the local network :(
  // We definitely want to set this to `true` in prod though!
  secure: true,

  maxAgeDays: 9999,
  maxAgeMillis: 9999 * 24 * 60 * 60 * 1000,
} as const;

// TODO: This list is literally just off the top of my head. Let's refine these
// categories later!
export const filterableDisruptionCategories = [
  "station-closures",
  "cancellations",
  "delays",
  "car-park-closures",
  "accessibility",
] as const;

export type FilterableDisruptionCategory =
  (typeof filterableDisruptionCategories)[number];

export type Theme = "system" | "light" | "dark";

export type Startpage = "overview" | "commute";

export class Settings {
  constructor(
    readonly commute: { readonly a: number; readonly b: number } | null,
    readonly enabledCategories: readonly FilterableDisruptionCategory[],
    readonly theme: Theme,
    readonly startPage: Startpage,
  ) {}

  static readonly default = new Settings(null, [], "system", "overview");

  // Consider that anything we add here is stored in a cookie, and we only have
  // 4KB (4096 characters!) to work with. We also might have to share that limit
  // with the admin auth token, so let's hope there's not much more to add!
  static readonly json = z
    .object({
      commute: z
        .object({
          a: z.number(),
          b: z.number(),
        })
        .optional(),
      enabledCategories: z.string().array().readonly(),
      theme: z.enum(["system", "light", "dark"]),
      startPage: z.enum(["overview", "commute"]),
    })
    .transform(
      (obj) =>
        new Settings(
          obj.commute ?? null,

          // If the valid list of enabled categories changes, gracefully ignore
          // any that are no longer valid.
          filterNonEnumValues(
            obj.enabledCategories,
            filterableDisruptionCategories,
          ),
          obj.theme ?? "system",
          obj.startPage ?? "overview",
        ),
    );

  /**
   * Tries to parse settings from string. If it fails for any reason, silently
   * returns the default settings. (It doesn't really matter if we lose the
   * user's settings, there's only a few things to set anyway.)
   */
  static tryParse(input: string): Settings {
    try {
      return Settings.json.parse(JSON.parse(input));
    } catch {
      return Settings.default;
    }
  }

  toJSON(): z.input<typeof Settings.json> {
    return {
      commute: this.commute ?? undefined,
      enabledCategories: this.enabledCategories,
      theme: this.theme,
      startPage: this.startPage,
    };
  }

  with({
    commute,
    enabledCategories,
    theme,
    startPage,
  }: {
    commute?: { readonly a: number; readonly b: number } | null;
    enabledCategories?: readonly FilterableDisruptionCategory[];
    theme?: Theme;
    startPage?: Startpage;
  }): Settings {
    return new Settings(
      commute !== undefined ? commute : this.commute,
      enabledCategories ?? this.enabledCategories,
      theme ?? this.theme,
      startPage ?? this.startPage,
    );
  }

  withEnabledCategories(category: FilterableDisruptionCategory): Settings {
    return this.with({
      enabledCategories: [...this.enabledCategories, category],
    });
  }

  withoutEnabledCategories(category: FilterableDisruptionCategory): Settings {
    return this.with({
      enabledCategories: this.enabledCategories.filter((x) => x !== category),
    });
  }
}

function filterNonEnumValues<T extends string>(
  values: readonly string[],
  enumValues: readonly T[],
): T[] {
  return values.filter((x) =>
    (enumValues as readonly string[]).includes(x),
  ) as T[];
}
