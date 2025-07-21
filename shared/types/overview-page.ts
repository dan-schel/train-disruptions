export type OverviewPageLineStatusColor = "green" | "yellow" | "red";

export type OverviewPageLineData = {
  id: number;
  name: string;
  status: string;
  statusColor: OverviewPageLineStatusColor;
};
