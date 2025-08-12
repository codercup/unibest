/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import type { CustomRequestOptions } from '@/http/types';

import * as API from './types';

/** Update an existing pet PUT /pet */
export async function petUsingPut({
  body,
  options,
}: {
  body: API.Pet;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/pet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Add a new pet to the store POST /pet */
export async function petUsingPost({
  body,
  options,
}: {
  body: API.Pet;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Find pet by ID Returns a single pet GET /pet/${param0} */
export async function petPetIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petPetIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;

  return request<API.Pet>(`/pet/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Updates a pet in the store with form data POST /pet/${param0} */
export async function petPetIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petPetIdUsingPostParams;
  body: API.PetPetIdUsingPostBody;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;

  return request<unknown>(`/pet/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Deletes a pet DELETE /pet/${param0} */
export async function petPetIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petPetIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;

  return request<unknown>(`/pet/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** uploads an image POST /pet/${param0}/uploadImage */
export async function petPetIdUploadImageUsingPost({
  params,
  body,
  file,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petPetIdUploadImageUsingPostParams;
  body: API.PetPetIdUploadImageUsingPostBody;
  file?: File;
  options?: CustomRequestOptions;
}) {
  const { petId: param0, ...queryParams } = params;
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as { [key: string]: any })[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ApiResponse>(`/pet/${param0}/uploadImage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: { ...queryParams },
    data: formData,
    ...(options || {}),
  });
}

/** Finds Pets by status Multiple status values can be provided with comma separated strings GET /pet/findByStatus */
export async function petFindByStatusUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petFindByStatusUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.Pet[]>('/pet/findByStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Finds Pets by tags Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. GET /pet/findByTags */
export async function petFindByTagsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.petFindByTagsUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.Pet[]>('/pet/findByTags', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
