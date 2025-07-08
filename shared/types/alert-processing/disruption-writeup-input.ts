export type DisruptionWriteupInput = {
  title: string;
  bodyMarkdown: string;
  summary: {
    headline: string | null;
    subject: string;
    period: string | null;
    iconType: "line" | "cross" | "altered-route" | "traffic";
  };
  lineStatusIndicator: {
    summary: string;
    priority: "low" | "medium" | "high";
  };
};
