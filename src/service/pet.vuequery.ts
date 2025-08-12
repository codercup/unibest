/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as apis from './pet';
import * as API from './types';

/** Update an existing pet PUT /pet */
export function usePetUsingPutMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.petUsingPut,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Add a new pet to the store POST /pet */
export function usePetUsingPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.petUsingPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Find pet by ID Returns a single pet GET /pet/${param0} */
export function petPetIdUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petPetIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.petPetIdUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['petPetIdUsingGet', options],
  });
}

/** Updates a pet in the store with form data POST /pet/${param0} */
export function usePetPetIdUsingPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.petPetIdUsingPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Deletes a pet DELETE /pet/${param0} */
export function usePetPetIdUsingDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.petPetIdUsingDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** uploads an image POST /pet/${param0}/uploadImage */
export function usePetPetIdUploadImageUsingPostMutation(options?: {
  onSuccess?: (value?: API.ApiResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.petPetIdUploadImageUsingPost,
    onSuccess(data: API.ApiResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** Finds Pets by status Multiple status values can be provided with comma separated strings GET /pet/findByStatus */
export function petFindByStatusUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petFindByStatusUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.petFindByStatusUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['petFindByStatusUsingGet', options],
  });
}

/** Finds Pets by tags Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. GET /pet/findByTags */
export function petFindByTagsUsingGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petFindByTagsUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.petFindByTagsUsingGet(queryKey[1] as typeof options);
    },
    queryKey: ['petFindByTagsUsingGet', options],
  });
}
