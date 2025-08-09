import { z } from "zod";

export function getCookieSettings(isProduction: boolean) {
  return {
    // Using "lax" means only sent if it's the same site, but still send on the
    // when navigating from an external site.
    sameSite: "lax",

    secure: isProduction,
    maxAgeDays: 9999,
    maxAgeMillis: 9999 * 24 * 60 * 60 * 1000,
  } as const;
}

// TODO: This list is literally just off the top of my head. Let's refine these
// categories later!
export const filterableDisruptionCategories = [
  "delays",
  "cancellations",
  "station-closures",
  "accessibility",
  "car-park-closures",
] as const;
export type FilterableDisruptionCategory =
  (typeof filterableDisruptionCategories)[number];

export const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

export const startPages = ["overview", "commute"] as const;
export type Startpage = (typeof startPages)[number];

export class Settings {
  constructor(
    readonly commute: { readonly a: number; readonly b: number } | null,
    readonly enabledCategories: readonly FilterableDisruptionCategory[],
    readonly theme: Theme,
    readonly startPage: Startpage,
    readonly showAdminTab: boolean,
  ) {}

  static readonly default = new Settings(
    null,
    ["station-closures", "cancellations", "delays"],
    "system",
    "overview",
    false,
  );

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
      theme: z.enum(themes),
      startPage: z.enum(startPages),
      showAdminTab: z.boolean(),
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
          obj.theme,
          obj.startPage,
          obj.showAdminTab,
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
      showAdminTab: this.showAdminTab,
    };
  }

  with({
    commute = this.commute,
    enabledCategories = this.enabledCategories,
    theme = this.theme,
    startPage = this.startPage,
    showAdminTab = this.showAdminTab,
  }: {
    commute?: { readonly a: number; readonly b: number } | null;
    enabledCategories?: readonly FilterableDisruptionCategory[];
    theme?: Theme;
    startPage?: Startpage;
    showAdminTab?: boolean;
  }): Settings {
    return new Settings(
      commute,
      enabledCategories,
      theme,
      startPage,
      showAdminTab,
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
