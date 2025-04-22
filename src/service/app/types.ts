/* eslint-disable */
// @ts-ignore

export type ApiResponse = {
  code?: number;
  type?: string;
  message?: string;
};

export type Category = {
  id?: number;
  name?: string;
};

export type deleteOrderParams = {
  /** ID of the order that needs to be deleted */
  orderId: number;
};

export type deletePetParams = {
  /** Pet id to delete */
  petId: number;
};

export type deleteUserParams = {
  /** The name that needs to be deleted */
  username: string;
};

export type findPetsByStatusParams = {
  /** Status values that need to be considered for filter */
  status: ('available' | 'pending' | 'sold')[];
};

export type findPetsByTagsParams = {
  /** Tags to filter by */
  tags: string[];
};

export type getOrderByIdParams = {
  /** ID of pet that needs to be fetched */
  orderId: number;
};

export type getPetByIdParams = {
  /** ID of pet to return */
  petId: number;
};

export type getUserByNameParams = {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string;
};

export type loginUserParams = {
  /** The user name for login */
  username: string;
  /** The password for login in clear text */
  password: string;
};

export type Order = {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  /** Order Status */
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
};

export type Pet = {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  /** pet status in the store */
  status?: 'available' | 'pending' | 'sold';
};

export enum StatusEnum {
  available = 'available',
  pending = 'pending',
  sold = 'sold',
}

export type IStatusEnum = keyof typeof StatusEnum;

export enum StatusEnum2 {
  placed = 'placed',
  approved = 'approved',
  delivered = 'delivered',
}

export type IStatusEnum2 = keyof typeof StatusEnum2;

export type Tag = {
  id?: number;
  name?: string;
};

export type updatePetWithFormParams = {
  /** ID of pet that needs to be updated */
  petId: number;
};

export type updateUserParams = {
  /** name that need to be updated */
  username: string;
};

export type uploadFileParams = {
  /** ID of pet to update */
  petId: number;
};

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /** User Status */
  userStatus?: number;
};
