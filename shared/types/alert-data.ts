export type AlertData = {
  title: string;
  description: string;
  url: string;
  startsAt: Date | null;
  endsAt: Date | null;
  affectedLinePtvIds: number[];
  affectedStationPtvIds: number[];
};

export type Alert = {
  id: string;
  data: AlertData;
  updatedData: AlertData | null;
  appearedAt: Date;
  processedAt: Date | null;
  updatedAt: Date | null;
  ignoreFutureUpdates: boolean;
  deleteAt: Date | null;
}[];

export type AlertPreview = {
  id: string;
  title: string;
}[];
