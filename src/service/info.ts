/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** 用户信息 GET /user/info */
export async function infoUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UserItem>('/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}
