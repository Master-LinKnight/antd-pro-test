import request from '@/utils/request';
import { TableListParams, ETFTableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function getETFRank(params: ETFTableListParams) {
  return request('/fund/rank', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  }).then((res: any) => {
    const data: any = {};
    if (res.code === 200 && res.data) {
      const list: any = res.data;
      list.forEach((element: any) => {
        element.key = element.code;
      });
      data.list = list;
      data.pagination = { total: 10, pageSize: 10, current: 1 };
    }
    return data;
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
