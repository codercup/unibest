/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** 用户信息 GET /user/info */
export function infoUsingGet({ options }: { options?: CustomRequestOptions }) {
  return request<API.InfoUsingGetResponse>('/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}
