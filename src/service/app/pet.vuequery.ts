/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './pet';
import * as API from './types';

/** Update an existing pet PUT /pet */
export function useUpdatePetMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updatePet,
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
export function useAddPetMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.addPet,
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
export function getPetByIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPetByIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getPetById(queryKey[1] as typeof options);
    },
    queryKey: ['getPetById', options],
  });
}

/** Updates a pet in the store with form data POST /pet/${param0} */
export function useUpdatePetWithFormMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updatePetWithForm,
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
export function useDeletePetMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deletePet,
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
export function useUploadFileMutation(options?: {
  onSuccess?: (value?: API.ApiResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.uploadFile,
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
export function findPetsByStatusQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.findPetsByStatusParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.findPetsByStatus(queryKey[1] as typeof options);
    },
    queryKey: ['findPetsByStatus', options],
  });
}

/** Finds Pets by tags Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. GET /pet/findByTags */
export function findPetsByTagsQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.findPetsByTagsParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.findPetsByTags(queryKey[1] as typeof options);
    },
    queryKey: ['findPetsByTags', options],
  });
}
