export type OverviewPageLineStatusColor = "green" | "yellow" | "red";

export type OverviewPageLineData = {
  id: number;
  name: string;
  status: string;
  statusColor: OverviewPageLineStatusColor;
};

export type OverviewPageDisruptionSummary = {
  id: string;
  headline: string | null;
  subject: string;
  period: string | null;
  icon: "line" | "cross" | "altered-route" | "line-dashed";
};
