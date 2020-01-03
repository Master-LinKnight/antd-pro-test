import request from '@/utils/request';
import { StockListParams, TrackStockData } from './data.d';

export async function queryTrackStocksDataByDate(params: StockListParams) {
  return request(`/finance-stock/v1/track/stocksData/date/${params.dateKey}`, {
    // params,
  }).then((res: any) => {
    let result: TrackStockData[] = [];
    if (res.statusCode && res.statusCode === 200 && res.data) {
      result = res.data;
    }
    return result;
  });
}
