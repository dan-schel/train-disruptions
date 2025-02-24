import { z } from "zod";

export const cookieSettings = {
  // Using "lax" means only sent if it's the same site, but still send on the
  // when navigating from an external site.
  sameSite: "lax",

  secure: true,
  maxAgeDays: 9999,
  maxAgeMillis: 9999 * 24 * 60 * 60 * 1000,
} as const;

// TODO: This list is literally just off the top of my head. Let's refine these
// categories later!
export const filterableDisruptionCategories = [
  "station-closure",
  "cancellations",
  "delays",
  "car-park-closures",
  "accessibility",
] as const;

export type FilterableDisruptionCategory =
  (typeof filterableDisruptionCategories)[number];

export class Settings {
  constructor(
    readonly commute: { readonly a: number; readonly b: number } | null,
    readonly hiddenCategories: readonly FilterableDisruptionCategory[],
  ) {}

  static readonly default = new Settings(null, []);

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
      hiddenCategories: z.string().array().readonly(),
    })
    .transform(
      (obj) =>
        new Settings(
          obj.commute ?? null,

          // If the valid list of hidden categories changes, gracefully ignore
          // any that are no longer valid.
          filterNonEnumValues(
            obj.hiddenCategories,
            filterableDisruptionCategories,
          ),
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
      hiddenCategories: this.hiddenCategories,
    };
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
