/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as apis from './store';
import * as API from './types';

/** Returns pet inventories by status Returns a map of status codes to quantities GET /store/inventory */
export function storeInventoryUsingGetQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.storeInventoryUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['storeInventoryUsingGet', options],
  });
}

/** Place an order for a pet POST /store/order */
export function useStoreOrderUsingPostMutation(options?: {
  onSuccess?: (value?: API.Order) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.storeOrderUsingPost,
    onSuccess(data: API.Order) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Find purchase order by ID For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions GET /store/order/${param0} */
export function storeOrderOrderIdUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.storeOrderOrderIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.storeOrderOrderIdUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['storeOrderOrderIdUsingGet', options],
  });
}

/** Delete purchase order by ID For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors DELETE /store/order/${param0} */
export function useStoreOrderOrderIdUsingDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.storeOrderOrderIdUsingDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
