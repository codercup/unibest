/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** 用户列表 GET /user/listAll */
export async function listAllUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UserItem[]>('/user/listAll', {
    method: 'GET',
    ...(options || {}),
  });
}
