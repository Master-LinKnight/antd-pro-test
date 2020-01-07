import request from '@/utils/request';
import { TrackStockData } from './data.d';

export async function queryTrackStocksDataByDate() {
  return request('/finance-stock/v1/track/lastStocksData').then((res: any) => {
    let result: TrackStockData[] = [];
    if (res.statusCode && res.statusCode === 200 && res.data) {
      result = res.data;
    }
    return result;
  });
}
