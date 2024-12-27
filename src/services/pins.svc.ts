import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { IInsight } from "@/da-insight-kit/utils/insight.util";

export interface IPin {
  id: string;
  data: IInsight;
  pin_id: string;
}

export const getPinsByUserId = async (userId: string): Promise<IPin[]> => {
  // Your SaaS app backend should have an API to fetch pins by workspaceId and userId
  return [
    {
      id: "1",
      data: {
        chartType: ChartTypes.BIGNUMBERWITHTREND,
        metrics: [
          {
            metricKey: "registrations",
            metricLabel: "Registrations",
          },
        ],
        title: "Registrations",
      },
      pin_id: "pin_27c18608-674f-4871-a7c6-6ef959995998",
    },
  ];
};

export const deletePin = async (pinId: string) => {
  // Your SaaS app backend should have an API to delete a pin
};
