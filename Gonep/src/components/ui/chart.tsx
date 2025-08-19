import * as React from "react";

// Temporarily disabled due to build issues
export const Chart = () => <div>Chart component temporarily disabled</div>;

export const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full">{children}</div>
);

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background border rounded-lg shadow-lg p-2">{children}</div>
);
