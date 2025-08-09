import { App } from "@/server/app";
import { AlertData } from "@/server/data/alert/alert-data";

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
    return this.with({
      processedAt: new Date(),
      ignoreFutureUpdates: false,
    });
  }

  ignored() {
    return this.with({
      processedAt: new Date(),
      ignoreFutureUpdates: true,
    });
  }

  with({
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

  static fresh(app: App, id: string, data: AlertData) {
    return new Alert(id, data, null, app.time.now(), null, null, false, null);
  }
}
