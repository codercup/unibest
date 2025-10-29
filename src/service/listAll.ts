/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** 用户列表 GET /user/listAll */
export function listAllUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.ListAllUsingGetResponse>('/user/listAll', {
    method: 'GET',
    ...(options || {}),
  });
}
