import request from '@/utils/request';
import { TableListParams, ETFTableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function getETFRank(params: ETFTableListParams) {
  return request('/api/ETFRank', {
    params,
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
