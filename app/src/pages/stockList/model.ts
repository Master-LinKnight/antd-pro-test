import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryTrackStocksDataByDate } from './service';
import { TrackStockData } from './data.d';

export interface StateType {
  data: TrackStockData[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    get: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'stockList',
  state: {
    data: [],
  },
  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(queryTrackStocksDataByDate, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
