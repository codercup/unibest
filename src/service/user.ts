/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** Create user This can only be done by the logged in user. 返回值: successful operation POST /user */
export async function userUsingPost({
  body,
  options,
}: {
  body: API.User;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get user by user name GET /user/${param0} */
export async function userUsernameUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userUsernameUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { username: param0, ...queryParams } = params;

  return request<API.User>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Updated user This can only be done by the logged in user. PUT /user/${param0} */
export async function userUsernameUsingPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userUsernameUsingPutParams;
  body: API.User;
  options?: CustomRequestOptions;
}) {
  const { username: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete user This can only be done by the logged in user. DELETE /user/${param0} */
export async function userUsernameUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userUsernameUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { username: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Creates list of users with given input array 返回值: successful operation POST /user/createWithArray */
export async function userCreateWithArrayUsingPost({
  body,
  options,
}: {
  body: API.UserCreateWithArrayUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/user/createWithArray', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array 返回值: successful operation POST /user/createWithList */
export async function userCreateWithListUsingPost({
  body,
  options,
}: {
  body: API.UserCreateWithListUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/user/createWithList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logs user into the system GET /user/login */
export async function userLoginUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.userLoginUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<string>('/user/login', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Logs out current logged in user session 返回值: successful operation GET /user/logout */
export async function userLogoutUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
