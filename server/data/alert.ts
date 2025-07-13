import { z } from "zod";

/**
 * Represents a disruption alert from the PTV API. May or may not correlate to
 * an actual disruption shown on the site (e.g. we may choose to ignore some,
 * split some alerts into multiple separate disruptions, or combine multiple
 * alerts into a single disruption). Allows us to track which alerts we've seen
 * before, which ones we've processed, etc.
 */
export class Alert {
  constructor(
    readonly id: string,
    readonly data: AlertData,
    readonly updatedData: AlertData | null,
    readonly appearedAt: Date,
    readonly processedAt: Date | null,
    readonly updatedAt: Date | null,
    readonly ignoreFutureUpdates: boolean,
    readonly deleteAt: Date | null,
  ) {
    if ((this.updatedAt == null) !== (this.updatedData == null)) {
      throw new Error(
        "Cannot have one of updatedAt or updatedData be null/set without the other.",
      );
    }
    if (this.processedAt == null) {
      if (this.updatedData != null) {
        throw new Error(
          "Cannot have updatedData set without processedAt being set.",
        );
      }
      if (this.ignoreFutureUpdates) {
        throw new Error(
          "Cannot have ignoreFutureUpdates set without processedAt being set.",
        );
      }
    }
  }

  get latestData() {
    return this.updatedData ?? this.data;
  }

  getState() {
    if (this.processedAt === null) {
      return "new";
    } else if (this.ignoreFutureUpdates) {
      return "ignored";
    } else if (this.updatedData !== null) {
      return "updated";
    } else {
      return "processed";
    }
  }

  processed() {
    return this._with({
      processedAt: new Date(),
      ignoreFutureUpdates: false,
    });
  }

  ignored() {
    return this._with({
      processedAt: new Date(),
      ignoreFutureUpdates: true,
    });
  }

  private _with({
    id,
    data,
    updatedData,
    appearedAt,
    processedAt,
    updatedAt,
    ignoreFutureUpdates,
    deleteAt,
  }: {
    id?: string;
    data?: AlertData;
    updatedData?: AlertData | null;
    appearedAt?: Date;
    processedAt?: Date | null;
    updatedAt?: Date | null;
    ignoreFutureUpdates?: boolean;
    deleteAt?: Date | null;
  }) {
    return new Alert(
      id ?? this.id,
      data ?? this.data,
      updatedData !== undefined ? updatedData : this.updatedData,
      appearedAt ?? this.appearedAt,
      processedAt !== undefined ? processedAt : this.processedAt,
      updatedAt !== undefined ? updatedAt : this.updatedAt,
      ignoreFutureUpdates ?? this.ignoreFutureUpdates,
      deleteAt !== undefined ? deleteAt : this.deleteAt,
    );
  }
}

/**
 * Represents the data published in a PTV API disruption alert at a moment in
 * time. If an alert is updated by PTV after it was already published, the alert
 * will have two instances of this class: one for the original data, and one for
 * the updated data (enables us to show the diff to the admin).
 */
export class AlertData {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly url: string,
    readonly startsAt: Date | null,
    readonly endsAt: Date | null,
    readonly affectedLinePtvIds: number[],
    readonly affectedStationPtvIds: number[],
  ) {}

  static readonly bson = z
    .object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
      startsAt: z.date().nullable(),
      endsAt: z.date().nullable(),
      affectedLinePtvIds: z.number().array(),
      affectedStationPtvIds: z.number().array(),
    })
    .transform(
      (x) =>
        new AlertData(
          x.title,
          x.description,
          x.url,
          x.startsAt,
          x.endsAt,
          x.affectedLinePtvIds,
          x.affectedStationPtvIds,
        ),
    );

  toBson(): z.input<typeof AlertData.bson> {
    return {
      title: this.title,
      description: this.description,
      url: this.url,
      startsAt: this.startsAt,
      endsAt: this.endsAt,
      affectedLinePtvIds: this.affectedLinePtvIds,
      affectedStationPtvIds: this.affectedStationPtvIds,
    };
  }
}
