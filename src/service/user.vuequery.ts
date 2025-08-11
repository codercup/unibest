/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as apis from './user';
import * as API from './types';

/** Create user This can only be done by the logged in user. 返回值: successful operation POST /user */
export function useUserUsingPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userUsingPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Get user by user name GET /user/${param0} */
export function userUsernameUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userUsernameUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.userUsernameUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['userUsernameUsingGet', options],
  });
}

/** Updated user This can only be done by the logged in user. PUT /user/${param0} */
export function useUserUsernameUsingPutMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userUsernameUsingPut,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Delete user This can only be done by the logged in user. DELETE /user/${param0} */
export function useUserUsernameUsingDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userUsernameUsingDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Creates list of users with given input array 返回值: successful operation POST /user/createWithArray */
export function useUserCreateWithArrayUsingPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userCreateWithArrayUsingPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Creates list of users with given input array 返回值: successful operation POST /user/createWithList */
export function useUserCreateWithListUsingPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userCreateWithListUsingPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Logs user into the system GET /user/login */
export function userLoginUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userLoginUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.userLoginUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['userLoginUsingGet', options],
  });
}

/** Logs out current logged in user session 返回值: successful operation GET /user/logout */
export function userLogoutUsingGetQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.userLogoutUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['userLogoutUsingGet', options],
  });
}
