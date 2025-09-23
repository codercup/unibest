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

export type PetFindByStatusUsingGetParams = {
  /** Status values that need to be considered for filter */
  status: ('available' | 'pending' | 'sold')[];
};

export type PetFindByStatusUsingGetResponses = {
  /**
   * successful operation
   */
  200: Pet[];
  /**
   * Invalid status value
   */
  400: unknown;
};

export type PetFindByTagsUsingGetParams = {
  /** Tags to filter by */
  tags: string[];
};

export type PetFindByTagsUsingGetResponses = {
  /**
   * successful operation
   */
  200: Pet[];
  /**
   * Invalid tag value
   */
  400: unknown;
};

export type PetPetIdUploadImageUsingPostBody = {
  /** Additional data to pass to server */
  additionalMetadata?: string;
  /** file to upload */
  file?: string;
};

export type PetPetIdUploadImageUsingPostParams = {
  /** ID of pet to update */
  petId: number;
};

export type PetPetIdUploadImageUsingPostResponses = {
  /**
   * successful operation
   */
  200: ApiResponse;
};

export type PetPetIdUsingDeleteParams = {
  /** Pet id to delete */
  petId: number;
};

export type PetPetIdUsingDeleteResponses = {
  /**
   * Invalid ID supplied
   */
  400: unknown;
  /**
   * Pet not found
   */
  404: unknown;
};

export type PetPetIdUsingGetParams = {
  /** ID of pet to return */
  petId: number;
};

export type PetPetIdUsingGetResponses = {
  /**
   * successful operation
   */
  200: Pet;
  /**
   * Invalid ID supplied
   */
  400: unknown;
  /**
   * Pet not found
   */
  404: unknown;
};

export type PetPetIdUsingPostBody = {
  /** Updated name of the pet */
  name?: string;
  /** Updated status of the pet */
  status?: string;
};

export type PetPetIdUsingPostParams = {
  /** ID of pet that needs to be updated */
  petId: number;
};

export type PetPetIdUsingPostResponses = {
  /**
   * Invalid input
   */
  405: unknown;
};

export type PetUsingPostResponses = {
  /**
   * Invalid input
   */
  405: unknown;
};

export type PetUsingPutResponses = {
  /**
   * Invalid ID supplied
   */
  400: unknown;
  /**
   * Pet not found
   */
  404: unknown;
  /**
   * Validation exception
   */
  405: unknown;
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

export type StoreInventoryUsingGetResponses = {
  /**
   * successful operation
   */
  200: Record<string, number>;
};

export type StoreOrderOrderIdUsingDeleteParams = {
  /** ID of the order that needs to be deleted */
  orderId: number;
};

export type StoreOrderOrderIdUsingDeleteResponses = {
  /**
   * Invalid ID supplied
   */
  400: unknown;
  /**
   * Order not found
   */
  404: unknown;
};

export type StoreOrderOrderIdUsingGetParams = {
  /** ID of pet that needs to be fetched */
  orderId: number;
};

export type StoreOrderOrderIdUsingGetResponses = {
  /**
   * successful operation
   */
  200: Order;
  /**
   * Invalid ID supplied
   */
  400: unknown;
  /**
   * Order not found
   */
  404: unknown;
};

export type StoreOrderUsingPostResponses = {
  /**
   * successful operation
   */
  200: Order;
  /**
   * Invalid Order
   */
  400: unknown;
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

export type UserCreateWithArrayUsingPostResponses = {
  /**
   * successful operation
   */
  default: unknown;
};

export type UserCreateWithListUsingPostBody = User[];

export type UserCreateWithListUsingPostResponses = {
  /**
   * successful operation
   */
  default: unknown;
};

export type UserLoginUsingGetParams = {
  /** The user name for login */
  username: string;
  /** The password for login in clear text */
  password: string;
};

export type UserLoginUsingGetResponses = {
  /**
   * successful operation
   */
  200: string;
  /**
   * Invalid username/password supplied
   */
  400: unknown;
};

export type UserLogoutUsingGetResponses = {
  /**
   * successful operation
   */
  default: unknown;
};

export type UserUsernameUsingDeleteParams = {
  /** The name that needs to be deleted */
  username: string;
};

export type UserUsernameUsingDeleteResponses = {
  /**
   * Invalid username supplied
   */
  400: unknown;
  /**
   * User not found
   */
  404: unknown;
};

export type UserUsernameUsingGetParams = {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string;
};

export type UserUsernameUsingGetResponses = {
  /**
   * successful operation
   */
  200: User;
  /**
   * Invalid username supplied
   */
  400: unknown;
  /**
   * User not found
   */
  404: unknown;
};

export type UserUsernameUsingPutParams = {
  /** name that need to be updated */
  username: string;
};

export type UserUsernameUsingPutResponses = {
  /**
   * Invalid user supplied
   */
  400: unknown;
  /**
   * User not found
   */
  404: unknown;
};

export type UserUsingPostResponses = {
  /**
   * successful operation
   */
  default: unknown;
};
