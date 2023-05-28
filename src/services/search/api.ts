// @ts-ignore
/* eslint-disable */
import {request} from 'umi';

/** 问题列表 GET /api/search */
export async function searchItems(
  keyword: string,
  bizType: string,
  currentPage?: number,
  pageSize?: number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/search', {
    method: 'GET',
    params: { keyword, currentPage, pageSize, bizType },
    ...(options || {}),
  });
}
