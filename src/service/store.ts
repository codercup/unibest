/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** Returns pet inventories by status Returns a map of status codes to quantities GET /store/inventory */
export async function storeInventoryUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, number>>('/store/inventory', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Place an order for a pet POST /store/order */
export async function storeOrderUsingPost({
  body,
  options,
}: {
  body: API.Order;
  options?: CustomRequestOptions;
}) {
  return request<API.Order>('/store/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Find purchase order by ID For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions GET /store/order/${param0} */
export async function storeOrderOrderIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.storeOrderOrderIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { orderId: param0, ...queryParams } = params;

  return request<API.Order>(`/store/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete purchase order by ID For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors DELETE /store/order/${param0} */
export async function storeOrderOrderIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.storeOrderOrderIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { orderId: param0, ...queryParams } = params;

  return request<unknown>(`/store/order/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
