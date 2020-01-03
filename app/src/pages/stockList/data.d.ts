export interface StockListParams {
  dateKey: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface StockData {
  key: number;
  stockId: string;
  stockPrice: number;
  stockPrePrice: number;
  stockOpenPrice: number;
  stockTopPrice: number;
  stockBottomPrice: number;
  stockSwing: number;
  stockIncrease: number;
  stockIncreaseRate: number;
  stockTurnoverVolume: number;
  stockTurnover: number;
  stockTurnoverRate: number;
  stockPE: number;
  stockPB: number;
  freeFloatMarketCapitalisation: number;
  marketCapitalisation: number;
  marketDate: string;
}

export interface TrackStockData {
  key: number;
  stockId: string;
  stockName: string;
  isUp10Times: boolean;
  isUp20Times: boolean;
  stocks?: StockData[];
}

export interface TrackStockListData {
  key: number;
  stockId: string;
  stockName: string;
  isUp10Times: boolean;
  isUp20Times: boolean;
  stockPrice?: number;
  stockPrePrice?: number;
  stockOpenPrice?: number;
  stockTopPrice?: number;
  stockBottomPrice?: number;
  stockSwing?: number;
  stockIncrease?: number;
  stockIncreaseRate?: number;
  stockTurnoverVolume?: number;
  stockTurnover?: number;
  stockTurnoverRate?: number;
  stockPE?: number;
  stockPB?: number;
  freeFloatMarketCapitalisation?: number;
  marketCapitalisation?: number;
  marketDate?: string;
}
