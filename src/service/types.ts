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

export type petFindByStatusUsingGetParams = {
  /** Status values that need to be considered for filter */
  status: ('available' | 'pending' | 'sold')[];
};

export type petFindByTagsUsingGetParams = {
  /** Tags to filter by */
  tags: string[];
};

export type PetPetIdUploadImageUsingPostBody = {
  /** Additional data to pass to server */
  additionalMetadata?: string;
  /** file to upload */
  file?: string;
};

export type petPetIdUploadImageUsingPostParams = {
  /** ID of pet to update */
  petId: number;
};

export type petPetIdUsingDeleteParams = {
  /** Pet id to delete */
  petId: number;
};

export type petPetIdUsingGetParams = {
  /** ID of pet to return */
  petId: number;
};

export type PetPetIdUsingPostBody = {
  /** Updated name of the pet */
  name?: string;
  /** Updated status of the pet */
  status?: string;
};

export type petPetIdUsingPostParams = {
  /** ID of pet that needs to be updated */
  petId: number;
};

export enum StatusEnum {
  'available' = 'available',
  'pending' = 'pending',
  'sold' = 'sold',
}

export type IStatusEnum = keyof typeof StatusEnum;

export enum StatusEnum2 {
  'placed' = 'placed',
  'approved' = 'approved',
  'delivered' = 'delivered',
}

export type IStatusEnum2 = keyof typeof StatusEnum2;

export type storeOrderOrderIdUsingDeleteParams = {
  /** ID of the order that needs to be deleted */
  orderId: number;
};

export type storeOrderOrderIdUsingGetParams = {
  /** ID of pet that needs to be fetched */
  orderId: number;
};

export type Tag = {
  id?: number;
  name?: string;
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

export type UserCreateWithArrayUsingPostBody = User[];

export type UserCreateWithListUsingPostBody = User[];

export type userLoginUsingGetParams = {
  /** The user name for login */
  username: string;
  /** The password for login in clear text */
  password: string;
};

export type userUsernameUsingDeleteParams = {
  /** The name that needs to be deleted */
  username: string;
};

export type userUsernameUsingGetParams = {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string;
};

export type userUsernameUsingPutParams = {
  /** name that need to be updated */
  username: string;
};
