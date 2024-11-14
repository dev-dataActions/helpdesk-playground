import BigNumber from "../charts/BigNumber";

export enum ChartTypes {
  BIGNUMBER = "BIGNUMBER",
}

export const ChartMap = {
  [ChartTypes.BIGNUMBER]: BigNumber,
};
