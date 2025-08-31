/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayStatusEnum(field: API.StatusEnum) {
  return { available: 'available', pending: 'pending', sold: 'sold' }[field];
}

export function displayStatusEnum2(field: API.StatusEnum2) {
  return { placed: 'placed', approved: 'approved', delivered: 'delivered' }[
    field
  ];
}
