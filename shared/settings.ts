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

export class Settings {
  constructor(
    readonly enabledCategories: readonly FilterableDisruptionCategory[],
    readonly theme: Theme,
    readonly showAdminTab: boolean,
  ) {}

  static readonly default = new Settings(
    ["station-closures", "cancellations", "delays"],
    "system",
    false,
  );

  // Consider that anything we add here is stored in a cookie, and we only have
  // 4KB (4096 characters!) to work with. We also might have to share that limit
  // with the admin auth token, so let's hope there's not much more to add!
  static readonly json = z
    .object({
      enabledCategories: z.string().array().readonly(),
      theme: z.enum(themes),
      showAdminTab: z.boolean(),
    })
    .transform(
      (obj) =>
        new Settings(
          // If the valid list of enabled categories changes, gracefully ignore
          // any that are no longer valid.
          filterNonEnumValues(
            obj.enabledCategories,
            filterableDisruptionCategories,
          ),
          obj.theme,
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
      enabledCategories: this.enabledCategories,
      theme: this.theme,
      showAdminTab: this.showAdminTab,
    };
  }

  with({
    enabledCategories,
    theme,
    showAdminTab,
  }: {
    enabledCategories?: readonly FilterableDisruptionCategory[];
    theme?: Theme;
    showAdminTab?: boolean;
  }): Settings {
    return new Settings(
      enabledCategories ?? this.enabledCategories,
      theme ?? this.theme,
      showAdminTab ?? this.showAdminTab,
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
