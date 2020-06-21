import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Address = {
  __typename?: 'Address';
  areaCode: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  lga: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AddressCreateInput = {
  areaCode: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressCreateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga: Scalars['String'];
  Order?: Maybe<OrderCreateManyWithoutDeliveryAddressInput>;
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAddressesInput;
};

export type AddressCreateManyWithoutUserInput = {
  connect?: Maybe<Array<AddressWhereUniqueInput>>;
  create?: Maybe<Array<AddressCreateWithoutUserInput>>;
};

export type AddressCreateOneWithoutDefaultAddressInput = {
  connect?: Maybe<AddressWhereUniqueInput>;
  create?: Maybe<AddressCreateWithoutDefaultAddressInput>;
};

export type AddressCreateOneWithoutOrderInput = {
  connect?: Maybe<AddressWhereUniqueInput>;
  create?: Maybe<AddressCreateWithoutOrderInput>;
};

export type AddressCreateWithoutDefaultAddressInput = {
  areaCode: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  lga: Scalars['String'];
  Order?: Maybe<OrderCreateManyWithoutDeliveryAddressInput>;
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAddressesInput;
};

export type AddressCreateWithoutOrderInput = {
  areaCode: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressCreateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAddressesInput;
};

export type AddressCreateWithoutUserInput = {
  areaCode: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressCreateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga: Scalars['String'];
  Order?: Maybe<OrderCreateManyWithoutDeliveryAddressInput>;
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddressFilter = {
  every?: Maybe<AddressWhereInput>;
  none?: Maybe<AddressWhereInput>;
  some?: Maybe<AddressWhereInput>;
};

export type AddressMineCompoundUniqueInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type AddressScalarWhereInput = {
  AND?: Maybe<Array<AddressScalarWhereInput>>;
  areaCode?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  DefaultAddress?: Maybe<DefaultAddressFilter>;
  id?: Maybe<StringFilter>;
  lga?: Maybe<StringFilter>;
  NOT?: Maybe<Array<AddressScalarWhereInput>>;
  OR?: Maybe<Array<AddressScalarWhereInput>>;
  Order?: Maybe<OrderFilter>;
  state?: Maybe<StringFilter>;
  street1?: Maybe<StringFilter>;
  street2?: Maybe<NullableStringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type AddressUpdateInput = {
  areaCode?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressUpdateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga?: Maybe<Scalars['String']>;
  Order?: Maybe<OrderUpdateManyWithoutDeliveryAddressInput>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutAddressesInput>;
};

export type AddressUpdateManyDataInput = {
  areaCode?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  lga?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddressUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<AddressWhereUniqueInput>>;
  create?: Maybe<Array<AddressCreateWithoutUserInput>>;
  delete?: Maybe<Array<AddressWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AddressScalarWhereInput>>;
  disconnect?: Maybe<Array<AddressWhereUniqueInput>>;
  set?: Maybe<Array<AddressWhereUniqueInput>>;
  update?: Maybe<Array<AddressUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<AddressUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<AddressUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AddressUpdateManyWithWhereNestedInput = {
  data: AddressUpdateManyDataInput;
  where: AddressScalarWhereInput;
};

export type AddressUpdateOneRequiredWithoutDefaultAddressInput = {
  connect?: Maybe<AddressWhereUniqueInput>;
  create?: Maybe<AddressCreateWithoutDefaultAddressInput>;
  update?: Maybe<AddressUpdateWithoutDefaultAddressDataInput>;
  upsert?: Maybe<AddressUpsertWithoutDefaultAddressInput>;
};

export type AddressUpdateOneWithoutOrderInput = {
  connect?: Maybe<AddressWhereUniqueInput>;
  create?: Maybe<AddressCreateWithoutOrderInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<AddressUpdateWithoutOrderDataInput>;
  upsert?: Maybe<AddressUpsertWithoutOrderInput>;
};

export type AddressUpdateWithoutDefaultAddressDataInput = {
  areaCode?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  lga?: Maybe<Scalars['String']>;
  Order?: Maybe<OrderUpdateManyWithoutDeliveryAddressInput>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutAddressesInput>;
};

export type AddressUpdateWithoutOrderDataInput = {
  areaCode?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressUpdateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutAddressesInput>;
};

export type AddressUpdateWithoutUserDataInput = {
  areaCode?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  DefaultAddress?: Maybe<DefaultAddressUpdateManyWithoutAddressInput>;
  id?: Maybe<Scalars['String']>;
  lga?: Maybe<Scalars['String']>;
  Order?: Maybe<OrderUpdateManyWithoutDeliveryAddressInput>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddressUpdateWithWhereUniqueWithoutUserInput = {
  data: AddressUpdateWithoutUserDataInput;
  where: AddressWhereUniqueInput;
};

export type AddressUpsertWithoutDefaultAddressInput = {
  create: AddressCreateWithoutDefaultAddressInput;
  update: AddressUpdateWithoutDefaultAddressDataInput;
};

export type AddressUpsertWithoutOrderInput = {
  create: AddressCreateWithoutOrderInput;
  update: AddressUpdateWithoutOrderDataInput;
};

export type AddressUpsertWithWhereUniqueWithoutUserInput = {
  create: AddressCreateWithoutUserInput;
  update: AddressUpdateWithoutUserDataInput;
  where: AddressWhereUniqueInput;
};

export type AddressWhereInput = {
  AND?: Maybe<Array<AddressWhereInput>>;
  areaCode?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  DefaultAddress?: Maybe<DefaultAddressFilter>;
  id?: Maybe<StringFilter>;
  lga?: Maybe<StringFilter>;
  NOT?: Maybe<Array<AddressWhereInput>>;
  OR?: Maybe<Array<AddressWhereInput>>;
  Order?: Maybe<OrderFilter>;
  state?: Maybe<StringFilter>;
  street1?: Maybe<StringFilter>;
  street2?: Maybe<NullableStringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type AddressWhereUniqueInput = {
  addressMine?: Maybe<AddressMineCompoundUniqueInput>;
  id?: Maybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  meals?: Maybe<Array<Meal>>;
};

export type CartStatus = {
  __typename?: 'CartStatus';
  id: Scalars['ID'];
  isInCart: Scalars['Boolean'];
  cartQty: Scalars['Int'];
  total: Scalars['Float'];
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DefaultAddressCreateManyWithoutAddressInput = {
  connect?: Maybe<Array<DefaultAddressWhereUniqueInput>>;
  create?: Maybe<Array<DefaultAddressCreateWithoutAddressInput>>;
};

export type DefaultAddressCreateOneWithoutUserInput = {
  connect?: Maybe<DefaultAddressWhereUniqueInput>;
  create?: Maybe<DefaultAddressCreateWithoutUserInput>;
};

export type DefaultAddressCreateWithoutAddressInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDefaultAddressInput;
};

export type DefaultAddressCreateWithoutUserInput = {
  address: AddressCreateOneWithoutDefaultAddressInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DefaultAddressFilter = {
  every?: Maybe<DefaultAddressWhereInput>;
  none?: Maybe<DefaultAddressWhereInput>;
  some?: Maybe<DefaultAddressWhereInput>;
};

export type DefaultAddressScalarWhereInput = {
  addressId?: Maybe<StringFilter>;
  AND?: Maybe<Array<DefaultAddressScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<DefaultAddressScalarWhereInput>>;
  OR?: Maybe<Array<DefaultAddressScalarWhereInput>>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type DefaultAddressUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DefaultAddressUpdateManyWithoutAddressInput = {
  connect?: Maybe<Array<DefaultAddressWhereUniqueInput>>;
  create?: Maybe<Array<DefaultAddressCreateWithoutAddressInput>>;
  delete?: Maybe<Array<DefaultAddressWhereUniqueInput>>;
  deleteMany?: Maybe<Array<DefaultAddressScalarWhereInput>>;
  disconnect?: Maybe<Array<DefaultAddressWhereUniqueInput>>;
  set?: Maybe<Array<DefaultAddressWhereUniqueInput>>;
  update?: Maybe<Array<DefaultAddressUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: Maybe<Array<DefaultAddressUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<DefaultAddressUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type DefaultAddressUpdateManyWithWhereNestedInput = {
  data: DefaultAddressUpdateManyDataInput;
  where: DefaultAddressScalarWhereInput;
};

export type DefaultAddressUpdateOneWithoutUserInput = {
  connect?: Maybe<DefaultAddressWhereUniqueInput>;
  create?: Maybe<DefaultAddressCreateWithoutUserInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DefaultAddressUpdateWithoutUserDataInput>;
  upsert?: Maybe<DefaultAddressUpsertWithoutUserInput>;
};

export type DefaultAddressUpdateWithoutAddressDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutDefaultAddressInput>;
};

export type DefaultAddressUpdateWithoutUserDataInput = {
  address?: Maybe<AddressUpdateOneRequiredWithoutDefaultAddressInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DefaultAddressUpdateWithWhereUniqueWithoutAddressInput = {
  data: DefaultAddressUpdateWithoutAddressDataInput;
  where: DefaultAddressWhereUniqueInput;
};

export type DefaultAddressUpsertWithoutUserInput = {
  create: DefaultAddressCreateWithoutUserInput;
  update: DefaultAddressUpdateWithoutUserDataInput;
};

export type DefaultAddressUpsertWithWhereUniqueWithoutAddressInput = {
  create: DefaultAddressCreateWithoutAddressInput;
  update: DefaultAddressUpdateWithoutAddressDataInput;
  where: DefaultAddressWhereUniqueInput;
};

export type DefaultAddressWhereInput = {
  address?: Maybe<AddressWhereInput>;
  addressId?: Maybe<StringFilter>;
  AND?: Maybe<Array<DefaultAddressWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<DefaultAddressWhereInput>>;
  OR?: Maybe<Array<DefaultAddressWhereInput>>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type DefaultAddressWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type FloatFilter = {
  equals?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  not?: Maybe<Scalars['Float']>;
  notIn?: Maybe<Array<Scalars['Float']>>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};


export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  accessToken?: Maybe<Scalars['String']>;
};

export type Meal = {
  __typename?: 'Meal';
  cartStatus?: Maybe<CartStatus>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Meal_OrderCompoundUniqueInput = {
  mealId: Scalars['String'];
  orderId: Scalars['String'];
};

export type MealCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  menus?: Maybe<MenuCreateManyWithoutMealsInput>;
  orders?: Maybe<MealOrderCreateManyWithoutMealInput>;
  price: Scalars['Float'];
  tags?: Maybe<MealCreatetagsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutMealsInput;
};

export type MealCreateManyWithoutMenusInput = {
  connect?: Maybe<Array<MealWhereUniqueInput>>;
  create?: Maybe<Array<MealCreateWithoutMenusInput>>;
};

export type MealCreateManyWithoutUserInput = {
  connect?: Maybe<Array<MealWhereUniqueInput>>;
  create?: Maybe<Array<MealCreateWithoutUserInput>>;
};

export type MealCreateOneWithoutOrdersInput = {
  connect?: Maybe<MealWhereUniqueInput>;
  create?: Maybe<MealCreateWithoutOrdersInput>;
};

export type MealCreatetagsInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type MealCreateWithoutMenusInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  orders?: Maybe<MealOrderCreateManyWithoutMealInput>;
  price: Scalars['Float'];
  tags?: Maybe<MealCreatetagsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutMealsInput;
};

export type MealCreateWithoutOrdersInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  menus?: Maybe<MenuCreateManyWithoutMealsInput>;
  price: Scalars['Float'];
  tags?: Maybe<MealCreatetagsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutMealsInput;
};

export type MealCreateWithoutUserInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  menus?: Maybe<MenuCreateManyWithoutMealsInput>;
  orders?: Maybe<MealOrderCreateManyWithoutMealInput>;
  price: Scalars['Float'];
  tags?: Maybe<MealCreatetagsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealFilter = {
  every?: Maybe<MealWhereInput>;
  none?: Maybe<MealWhereInput>;
  some?: Maybe<MealWhereInput>;
};

export type MealMineCompoundUniqueInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type MealOrder = {
  __typename?: 'MealOrder';
  id: Scalars['String'];
  meal: Meal;
  mealId: Scalars['String'];
  order: Order;
  orderId: Scalars['String'];
};

export type MealOrderCreateManyWithoutMealInput = {
  connect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  create?: Maybe<Array<MealOrderCreateWithoutMealInput>>;
};

export type MealOrderCreateManyWithoutOrderInput = {
  connect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  create?: Maybe<Array<MealOrderCreateWithoutOrderInput>>;
};

export type MealOrderCreateWithoutMealInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  order: OrderCreateOneWithoutMealsInput;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealOrderCreateWithoutOrderInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meal: MealCreateOneWithoutOrdersInput;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealOrderFilter = {
  every?: Maybe<MealOrderWhereInput>;
  none?: Maybe<MealOrderWhereInput>;
  some?: Maybe<MealOrderWhereInput>;
};

export type MealOrderScalarWhereInput = {
  AND?: Maybe<Array<MealOrderScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  mealId?: Maybe<StringFilter>;
  NOT?: Maybe<Array<MealOrderScalarWhereInput>>;
  OR?: Maybe<Array<MealOrderScalarWhereInput>>;
  orderId?: Maybe<StringFilter>;
  quantity?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type MealOrderUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealOrderUpdateManyWithoutMealInput = {
  connect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  create?: Maybe<Array<MealOrderCreateWithoutMealInput>>;
  delete?: Maybe<Array<MealOrderWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MealOrderScalarWhereInput>>;
  disconnect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  set?: Maybe<Array<MealOrderWhereUniqueInput>>;
  update?: Maybe<Array<MealOrderUpdateWithWhereUniqueWithoutMealInput>>;
  updateMany?: Maybe<Array<MealOrderUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MealOrderUpsertWithWhereUniqueWithoutMealInput>>;
};

export type MealOrderUpdateManyWithoutOrderInput = {
  connect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  create?: Maybe<Array<MealOrderCreateWithoutOrderInput>>;
  delete?: Maybe<Array<MealOrderWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MealOrderScalarWhereInput>>;
  disconnect?: Maybe<Array<MealOrderWhereUniqueInput>>;
  set?: Maybe<Array<MealOrderWhereUniqueInput>>;
  update?: Maybe<Array<MealOrderUpdateWithWhereUniqueWithoutOrderInput>>;
  updateMany?: Maybe<Array<MealOrderUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MealOrderUpsertWithWhereUniqueWithoutOrderInput>>;
};

export type MealOrderUpdateManyWithWhereNestedInput = {
  data: MealOrderUpdateManyDataInput;
  where: MealOrderScalarWhereInput;
};

export type MealOrderUpdateWithoutMealDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  order?: Maybe<OrderUpdateOneRequiredWithoutMealsInput>;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealOrderUpdateWithoutOrderDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meal?: Maybe<MealUpdateOneRequiredWithoutOrdersInput>;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealOrderUpdateWithWhereUniqueWithoutMealInput = {
  data: MealOrderUpdateWithoutMealDataInput;
  where: MealOrderWhereUniqueInput;
};

export type MealOrderUpdateWithWhereUniqueWithoutOrderInput = {
  data: MealOrderUpdateWithoutOrderDataInput;
  where: MealOrderWhereUniqueInput;
};

export type MealOrderUpsertWithWhereUniqueWithoutMealInput = {
  create: MealOrderCreateWithoutMealInput;
  update: MealOrderUpdateWithoutMealDataInput;
  where: MealOrderWhereUniqueInput;
};

export type MealOrderUpsertWithWhereUniqueWithoutOrderInput = {
  create: MealOrderCreateWithoutOrderInput;
  update: MealOrderUpdateWithoutOrderDataInput;
  where: MealOrderWhereUniqueInput;
};

export type MealOrderWhereInput = {
  AND?: Maybe<Array<MealOrderWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  meal?: Maybe<MealWhereInput>;
  mealId?: Maybe<StringFilter>;
  NOT?: Maybe<Array<MealOrderWhereInput>>;
  OR?: Maybe<Array<MealOrderWhereInput>>;
  order?: Maybe<OrderWhereInput>;
  orderId?: Maybe<StringFilter>;
  quantity?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type MealOrderWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  meal_order?: Maybe<Meal_OrderCompoundUniqueInput>;
};

export type MealScalarWhereInput = {
  AND?: Maybe<Array<MealScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  deletedAt?: Maybe<NullableDateTimeFilter>;
  description?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  imageUrl?: Maybe<StringFilter>;
  menus?: Maybe<MenuFilter>;
  NOT?: Maybe<Array<MealScalarWhereInput>>;
  OR?: Maybe<Array<MealScalarWhereInput>>;
  orders?: Maybe<MealOrderFilter>;
  price?: Maybe<FloatFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type MealUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  menus?: Maybe<MenuUpdateManyWithoutMealsInput>;
  orders?: Maybe<MealOrderUpdateManyWithoutMealInput>;
  price?: Maybe<Scalars['Float']>;
  tags?: Maybe<MealUpdatetagsInput>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutMealsInput>;
};

export type MealUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  tags?: Maybe<MealUpdatetagsInput>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealUpdateManyWithoutMenusInput = {
  connect?: Maybe<Array<MealWhereUniqueInput>>;
  create?: Maybe<Array<MealCreateWithoutMenusInput>>;
  delete?: Maybe<Array<MealWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MealScalarWhereInput>>;
  disconnect?: Maybe<Array<MealWhereUniqueInput>>;
  set?: Maybe<Array<MealWhereUniqueInput>>;
  update?: Maybe<Array<MealUpdateWithWhereUniqueWithoutMenusInput>>;
  updateMany?: Maybe<Array<MealUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MealUpsertWithWhereUniqueWithoutMenusInput>>;
};

export type MealUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<MealWhereUniqueInput>>;
  create?: Maybe<Array<MealCreateWithoutUserInput>>;
  delete?: Maybe<Array<MealWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MealScalarWhereInput>>;
  disconnect?: Maybe<Array<MealWhereUniqueInput>>;
  set?: Maybe<Array<MealWhereUniqueInput>>;
  update?: Maybe<Array<MealUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<MealUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MealUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MealUpdateManyWithWhereNestedInput = {
  data: MealUpdateManyDataInput;
  where: MealScalarWhereInput;
};

export type MealUpdateOneRequiredWithoutOrdersInput = {
  connect?: Maybe<MealWhereUniqueInput>;
  create?: Maybe<MealCreateWithoutOrdersInput>;
  update?: Maybe<MealUpdateWithoutOrdersDataInput>;
  upsert?: Maybe<MealUpsertWithoutOrdersInput>;
};

export type MealUpdatetagsInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type MealUpdateWithoutMenusDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  orders?: Maybe<MealOrderUpdateManyWithoutMealInput>;
  price?: Maybe<Scalars['Float']>;
  tags?: Maybe<MealUpdatetagsInput>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutMealsInput>;
};

export type MealUpdateWithoutOrdersDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  menus?: Maybe<MenuUpdateManyWithoutMealsInput>;
  price?: Maybe<Scalars['Float']>;
  tags?: Maybe<MealUpdatetagsInput>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutMealsInput>;
};

export type MealUpdateWithoutUserDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  menus?: Maybe<MenuUpdateManyWithoutMealsInput>;
  orders?: Maybe<MealOrderUpdateManyWithoutMealInput>;
  price?: Maybe<Scalars['Float']>;
  tags?: Maybe<MealUpdatetagsInput>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealUpdateWithWhereUniqueWithoutMenusInput = {
  data: MealUpdateWithoutMenusDataInput;
  where: MealWhereUniqueInput;
};

export type MealUpdateWithWhereUniqueWithoutUserInput = {
  data: MealUpdateWithoutUserDataInput;
  where: MealWhereUniqueInput;
};

export type MealUpsertWithoutOrdersInput = {
  create: MealCreateWithoutOrdersInput;
  update: MealUpdateWithoutOrdersDataInput;
};

export type MealUpsertWithWhereUniqueWithoutMenusInput = {
  create: MealCreateWithoutMenusInput;
  update: MealUpdateWithoutMenusDataInput;
  where: MealWhereUniqueInput;
};

export type MealUpsertWithWhereUniqueWithoutUserInput = {
  create: MealCreateWithoutUserInput;
  update: MealUpdateWithoutUserDataInput;
  where: MealWhereUniqueInput;
};

export type MealWhereInput = {
  AND?: Maybe<Array<MealWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  deletedAt?: Maybe<NullableDateTimeFilter>;
  description?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  imageUrl?: Maybe<StringFilter>;
  menus?: Maybe<MenuFilter>;
  NOT?: Maybe<Array<MealWhereInput>>;
  OR?: Maybe<Array<MealWhereInput>>;
  orders?: Maybe<MealOrderFilter>;
  price?: Maybe<FloatFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type MealWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  mealMine?: Maybe<MealMineCompoundUniqueInput>;
};

export type Menu = {
  __typename?: 'Menu';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  meals: Array<Meal>;
  menuDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};


export type MenuMealsArgs = {
  after?: Maybe<MealWhereUniqueInput>;
  before?: Maybe<MealWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MenuCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutMenusInput>;
  menuDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutMenusInput;
};

export type MenuCreateManyWithoutMealsInput = {
  connect?: Maybe<Array<MenuWhereUniqueInput>>;
  create?: Maybe<Array<MenuCreateWithoutMealsInput>>;
};

export type MenuCreateManyWithoutUserInput = {
  connect?: Maybe<Array<MenuWhereUniqueInput>>;
  create?: Maybe<Array<MenuCreateWithoutUserInput>>;
};

export type MenuCreateWithoutMealsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  menuDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutMenusInput;
};

export type MenuCreateWithoutUserInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutMenusInput>;
  menuDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MenuFilter = {
  every?: Maybe<MenuWhereInput>;
  none?: Maybe<MenuWhereInput>;
  some?: Maybe<MenuWhereInput>;
};

export type MenuMineCompoundUniqueInput = {
  menuDate: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type MenuScalarWhereInput = {
  AND?: Maybe<Array<MenuScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  meals?: Maybe<MealFilter>;
  menuDate?: Maybe<DateTimeFilter>;
  NOT?: Maybe<Array<MenuScalarWhereInput>>;
  OR?: Maybe<Array<MenuScalarWhereInput>>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type MenuUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutMenusInput>;
  menuDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutMenusInput>;
};

export type MenuUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  menuDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MenuUpdateManyWithoutMealsInput = {
  connect?: Maybe<Array<MenuWhereUniqueInput>>;
  create?: Maybe<Array<MenuCreateWithoutMealsInput>>;
  delete?: Maybe<Array<MenuWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MenuScalarWhereInput>>;
  disconnect?: Maybe<Array<MenuWhereUniqueInput>>;
  set?: Maybe<Array<MenuWhereUniqueInput>>;
  update?: Maybe<Array<MenuUpdateWithWhereUniqueWithoutMealsInput>>;
  updateMany?: Maybe<Array<MenuUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MenuUpsertWithWhereUniqueWithoutMealsInput>>;
};

export type MenuUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<MenuWhereUniqueInput>>;
  create?: Maybe<Array<MenuCreateWithoutUserInput>>;
  delete?: Maybe<Array<MenuWhereUniqueInput>>;
  deleteMany?: Maybe<Array<MenuScalarWhereInput>>;
  disconnect?: Maybe<Array<MenuWhereUniqueInput>>;
  set?: Maybe<Array<MenuWhereUniqueInput>>;
  update?: Maybe<Array<MenuUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<MenuUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<MenuUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MenuUpdateManyWithWhereNestedInput = {
  data: MenuUpdateManyDataInput;
  where: MenuScalarWhereInput;
};

export type MenuUpdateWithoutMealsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  menuDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutMenusInput>;
};

export type MenuUpdateWithoutUserDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutMenusInput>;
  menuDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MenuUpdateWithWhereUniqueWithoutMealsInput = {
  data: MenuUpdateWithoutMealsDataInput;
  where: MenuWhereUniqueInput;
};

export type MenuUpdateWithWhereUniqueWithoutUserInput = {
  data: MenuUpdateWithoutUserDataInput;
  where: MenuWhereUniqueInput;
};

export type MenuUpsertWithWhereUniqueWithoutMealsInput = {
  create: MenuCreateWithoutMealsInput;
  update: MenuUpdateWithoutMealsDataInput;
  where: MenuWhereUniqueInput;
};

export type MenuUpsertWithWhereUniqueWithoutUserInput = {
  create: MenuCreateWithoutUserInput;
  update: MenuUpdateWithoutUserDataInput;
  where: MenuWhereUniqueInput;
};

export type MenuWhereInput = {
  AND?: Maybe<Array<MenuWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  meals?: Maybe<MealFilter>;
  menuDate?: Maybe<DateTimeFilter>;
  NOT?: Maybe<Array<MenuWhereInput>>;
  OR?: Maybe<Array<MenuWhereInput>>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type MenuWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  menuMine?: Maybe<MenuMineCompoundUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneAddress: Address;
  createOneMeal: Meal;
  createOneMenu: Menu;
  createOneOrder: Order;
  createOneOwnMeal: Meal;
  createOneOwnMenu: Menu;
  createOneOwnOrder: Order;
  deleteFromCart?: Maybe<Scalars['ID']>;
  deleteOneMeal?: Maybe<Meal>;
  deleteOneMenu?: Maybe<Menu>;
  deleteOneOrder?: Maybe<Order>;
  deleteOneOwnMeal?: Maybe<Meal>;
  deleteOneOwnMenu?: Maybe<Menu>;
  deleteOneOwnOrder?: Maybe<Order>;
  deleteOneOwnUser?: Maybe<User>;
  deleteOneUser?: Maybe<User>;
  login?: Maybe<AuthPayload>;
  loginWithFaceBook?: Maybe<AuthPayload>;
  loginWithGoogle?: Maybe<AuthPayload>;
  logout?: Maybe<LogoutResponse>;
  revokeUserRefreshToken?: Maybe<User>;
  signup?: Maybe<AuthPayload>;
  updateCartStatus?: Maybe<Scalars['ID']>;
  updateOneAddress?: Maybe<Address>;
  updateOneMeal?: Maybe<Meal>;
  updateOneMenu?: Maybe<Menu>;
  updateOneOrder?: Maybe<Order>;
  updateOneOwnMeal?: Maybe<Meal>;
  updateOneOwnMenu?: Maybe<Menu>;
  updateOneOwnOrder?: Maybe<Order>;
  updateOneOwnUser?: Maybe<User>;
  updateOneUser?: Maybe<User>;
  userId: Scalars['ID'];
};


export type MutationCreateOneAddressArgs = {
  data: AddressCreateInput;
};


export type MutationCreateOneMealArgs = {
  data: MealCreateInput;
};


export type MutationCreateOneMenuArgs = {
  data: MenuCreateInput;
};


export type MutationCreateOneOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOneOwnMealArgs = {
  data: MealCreateInput;
};


export type MutationCreateOneOwnMenuArgs = {
  data: MenuCreateInput;
};


export type MutationCreateOneOwnOrderArgs = {
  data: OrderCreateInput;
};


export type MutationDeleteFromCartArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOneMealArgs = {
  where: MealWhereUniqueInput;
};


export type MutationDeleteOneMenuArgs = {
  where: MenuWhereUniqueInput;
};


export type MutationDeleteOneOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOneOwnMealArgs = {
  where: MealWhereUniqueInput;
};


export type MutationDeleteOneOwnMenuArgs = {
  where: MenuWhereUniqueInput;
};


export type MutationDeleteOneOwnOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOneOwnUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginWithFaceBookArgs = {
  token: Scalars['String'];
};


export type MutationLoginWithGoogleArgs = {
  token: Scalars['String'];
};


export type MutationRevokeUserRefreshTokenArgs = {
  user?: Maybe<UserWhereUniqueInput>;
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  roles?: Maybe<Array<Role>>;
};


export type MutationUpdateCartStatusArgs = {
  id: Scalars['String'];
  quantity: Scalars['Int'];
};


export type MutationUpdateOneAddressArgs = {
  data: AddressUpdateInput;
  where: AddressWhereUniqueInput;
};


export type MutationUpdateOneMealArgs = {
  data: MealUpdateInput;
  where: MealWhereUniqueInput;
};


export type MutationUpdateOneMenuArgs = {
  data: MenuUpdateInput;
  where: MenuWhereUniqueInput;
};


export type MutationUpdateOneOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOneOwnMealArgs = {
  data: MealUpdateInput;
  where: MealWhereUniqueInput;
};


export type MutationUpdateOneOwnMenuArgs = {
  data: MenuUpdateInput;
  where: MenuWhereUniqueInput;
};


export type MutationUpdateOneOwnOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOneOwnUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NullableDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NullableStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  deliveryAddress?: Maybe<Address>;
  id: Scalars['String'];
  meals: Array<MealOrder>;
  status: Status;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};


export type OrderMealsArgs = {
  after?: Maybe<MealOrderWhereUniqueInput>;
  before?: Maybe<MealOrderWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressCreateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderCreateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutOrdersInput;
};

export type OrderCreateManyWithoutDeliveryAddressInput = {
  connect?: Maybe<Array<OrderWhereUniqueInput>>;
  create?: Maybe<Array<OrderCreateWithoutDeliveryAddressInput>>;
};

export type OrderCreateManyWithoutUserInput = {
  connect?: Maybe<Array<OrderWhereUniqueInput>>;
  create?: Maybe<Array<OrderCreateWithoutUserInput>>;
};

export type OrderCreateOneWithoutMealsInput = {
  connect?: Maybe<OrderWhereUniqueInput>;
  create?: Maybe<OrderCreateWithoutMealsInput>;
};

export type OrderCreateWithoutDeliveryAddressInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderCreateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutOrdersInput;
};

export type OrderCreateWithoutMealsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressCreateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutOrdersInput;
};

export type OrderCreateWithoutUserInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressCreateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderCreateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderFilter = {
  every?: Maybe<OrderWhereInput>;
  none?: Maybe<OrderWhereInput>;
  some?: Maybe<OrderWhereInput>;
};

export type OrderMineCompoundUniqueInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type OrderScalarWhereInput = {
  addressId?: Maybe<NullableStringFilter>;
  AND?: Maybe<Array<OrderScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  meals?: Maybe<MealOrderFilter>;
  NOT?: Maybe<Array<OrderScalarWhereInput>>;
  OR?: Maybe<Array<OrderScalarWhereInput>>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type OrderUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressUpdateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderUpdateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutOrdersInput>;
};

export type OrderUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderUpdateManyWithoutDeliveryAddressInput = {
  connect?: Maybe<Array<OrderWhereUniqueInput>>;
  create?: Maybe<Array<OrderCreateWithoutDeliveryAddressInput>>;
  delete?: Maybe<Array<OrderWhereUniqueInput>>;
  deleteMany?: Maybe<Array<OrderScalarWhereInput>>;
  disconnect?: Maybe<Array<OrderWhereUniqueInput>>;
  set?: Maybe<Array<OrderWhereUniqueInput>>;
  update?: Maybe<Array<OrderUpdateWithWhereUniqueWithoutDeliveryAddressInput>>;
  updateMany?: Maybe<Array<OrderUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<OrderUpsertWithWhereUniqueWithoutDeliveryAddressInput>>;
};

export type OrderUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<OrderWhereUniqueInput>>;
  create?: Maybe<Array<OrderCreateWithoutUserInput>>;
  delete?: Maybe<Array<OrderWhereUniqueInput>>;
  deleteMany?: Maybe<Array<OrderScalarWhereInput>>;
  disconnect?: Maybe<Array<OrderWhereUniqueInput>>;
  set?: Maybe<Array<OrderWhereUniqueInput>>;
  update?: Maybe<Array<OrderUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<OrderUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<OrderUpsertWithWhereUniqueWithoutUserInput>>;
};

export type OrderUpdateManyWithWhereNestedInput = {
  data: OrderUpdateManyDataInput;
  where: OrderScalarWhereInput;
};

export type OrderUpdateOneRequiredWithoutMealsInput = {
  connect?: Maybe<OrderWhereUniqueInput>;
  create?: Maybe<OrderCreateWithoutMealsInput>;
  update?: Maybe<OrderUpdateWithoutMealsDataInput>;
  upsert?: Maybe<OrderUpsertWithoutMealsInput>;
};

export type OrderUpdateWithoutDeliveryAddressDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderUpdateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutOrdersInput>;
};

export type OrderUpdateWithoutMealsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressUpdateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserUpdateOneRequiredWithoutOrdersInput>;
};

export type OrderUpdateWithoutUserDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryAddress?: Maybe<AddressUpdateOneWithoutOrderInput>;
  id?: Maybe<Scalars['String']>;
  meals?: Maybe<MealOrderUpdateManyWithoutOrderInput>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderUpdateWithWhereUniqueWithoutDeliveryAddressInput = {
  data: OrderUpdateWithoutDeliveryAddressDataInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateWithWhereUniqueWithoutUserInput = {
  data: OrderUpdateWithoutUserDataInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpsertWithoutMealsInput = {
  create: OrderCreateWithoutMealsInput;
  update: OrderUpdateWithoutMealsDataInput;
};

export type OrderUpsertWithWhereUniqueWithoutDeliveryAddressInput = {
  create: OrderCreateWithoutDeliveryAddressInput;
  update: OrderUpdateWithoutDeliveryAddressDataInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpsertWithWhereUniqueWithoutUserInput = {
  create: OrderCreateWithoutUserInput;
  update: OrderUpdateWithoutUserDataInput;
  where: OrderWhereUniqueInput;
};

export type OrderWhereInput = {
  addressId?: Maybe<NullableStringFilter>;
  AND?: Maybe<Array<OrderWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  deliveryAddress?: Maybe<AddressWhereInput>;
  id?: Maybe<StringFilter>;
  meals?: Maybe<MealOrderFilter>;
  NOT?: Maybe<Array<OrderWhereInput>>;
  OR?: Maybe<Array<OrderWhereInput>>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type OrderWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  orderMine?: Maybe<OrderMineCompoundUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  cart: Cart;
  cartStatus: CartStatus;
  me?: Maybe<User>;
  meal?: Maybe<Meal>;
  meals: Array<Meal>;
  menu?: Maybe<Menu>;
  menus: Array<Menu>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
  users: Array<User>;
};


export type QueryMealArgs = {
  where: MealWhereUniqueInput;
};


export type QueryMealsArgs = {
  after?: Maybe<MealWhereUniqueInput>;
  before?: Maybe<MealWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<MealWhereInput>;
};


export type QueryMenuArgs = {
  where: MenuWhereUniqueInput;
};


export type QueryMenusArgs = {
  after?: Maybe<MenuWhereUniqueInput>;
  before?: Maybe<MenuWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<MenuWhereInput>;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrdersArgs = {
  after?: Maybe<OrderWhereUniqueInput>;
  before?: Maybe<OrderWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<OrderWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrderByInput>;
};

export enum Role {
  Admin = 'ADMIN',
  Caterer = 'CATERER'
}

export enum Status {
  Cancelled = 'CANCELLED',
  Dispatched = 'DISPATCHED',
  Fulfilled = 'FULFILLED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  addresses: Array<Address>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  orders: Array<Order>;
  roles: Array<Role>;
  tokenVersion: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type UserAddressesArgs = {
  first?: Maybe<Scalars['Int']>;
};


export type UserMealsArgs = {
  after?: Maybe<MealWhereUniqueInput>;
  before?: Maybe<MealWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserOrdersArgs = {
  after?: Maybe<OrderWhereUniqueInput>;
  before?: Maybe<OrderWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCreateOneWithoutAddressesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutAddressesInput>;
};

export type UserCreateOneWithoutDefaultAddressInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutDefaultAddressInput>;
};

export type UserCreateOneWithoutMealsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutMealsInput>;
};

export type UserCreateOneWithoutMenusInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutMenusInput>;
};

export type UserCreateOneWithoutOrdersInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutOrdersInput>;
};

export type UserCreaterolesInput = {
  set?: Maybe<Array<Role>>;
};

export type UserCreateWithoutAddressesInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressCreateOneWithoutUserInput>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutUserInput>;
  menus?: Maybe<MenuCreateManyWithoutUserInput>;
  orders?: Maybe<OrderCreateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserCreaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateWithoutDefaultAddressInput = {
  addresses?: Maybe<AddressCreateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutUserInput>;
  menus?: Maybe<MenuCreateManyWithoutUserInput>;
  orders?: Maybe<OrderCreateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserCreaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateWithoutMealsInput = {
  addresses?: Maybe<AddressCreateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressCreateOneWithoutUserInput>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  menus?: Maybe<MenuCreateManyWithoutUserInput>;
  orders?: Maybe<OrderCreateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserCreaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateWithoutMenusInput = {
  addresses?: Maybe<AddressCreateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressCreateOneWithoutUserInput>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutUserInput>;
  orders?: Maybe<OrderCreateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserCreaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateWithoutOrdersInput = {
  addresses?: Maybe<AddressCreateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressCreateOneWithoutUserInput>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealCreateManyWithoutUserInput>;
  menus?: Maybe<MenuCreateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserCreaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
  email?: Maybe<OrderByArg>;
  facebookId?: Maybe<OrderByArg>;
  firstName?: Maybe<OrderByArg>;
  googleId?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  lastName?: Maybe<OrderByArg>;
  password?: Maybe<OrderByArg>;
  picture?: Maybe<OrderByArg>;
  tokenVersion?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type UserUpdateInput = {
  addresses?: Maybe<AddressUpdateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressUpdateOneWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutUserInput>;
  menus?: Maybe<MenuUpdateManyWithoutUserInput>;
  orders?: Maybe<OrderUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateOneRequiredWithoutAddressesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutAddressesInput>;
  update?: Maybe<UserUpdateWithoutAddressesDataInput>;
  upsert?: Maybe<UserUpsertWithoutAddressesInput>;
};

export type UserUpdateOneRequiredWithoutDefaultAddressInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutDefaultAddressInput>;
  update?: Maybe<UserUpdateWithoutDefaultAddressDataInput>;
  upsert?: Maybe<UserUpsertWithoutDefaultAddressInput>;
};

export type UserUpdateOneRequiredWithoutMealsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutMealsInput>;
  update?: Maybe<UserUpdateWithoutMealsDataInput>;
  upsert?: Maybe<UserUpsertWithoutMealsInput>;
};

export type UserUpdateOneRequiredWithoutMenusInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutMenusInput>;
  update?: Maybe<UserUpdateWithoutMenusDataInput>;
  upsert?: Maybe<UserUpsertWithoutMenusInput>;
};

export type UserUpdateOneRequiredWithoutOrdersInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutOrdersInput>;
  update?: Maybe<UserUpdateWithoutOrdersDataInput>;
  upsert?: Maybe<UserUpsertWithoutOrdersInput>;
};

export type UserUpdaterolesInput = {
  set?: Maybe<Array<Role>>;
};

export type UserUpdateWithoutAddressesDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressUpdateOneWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutUserInput>;
  menus?: Maybe<MenuUpdateManyWithoutUserInput>;
  orders?: Maybe<OrderUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateWithoutDefaultAddressDataInput = {
  addresses?: Maybe<AddressUpdateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutUserInput>;
  menus?: Maybe<MenuUpdateManyWithoutUserInput>;
  orders?: Maybe<OrderUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateWithoutMealsDataInput = {
  addresses?: Maybe<AddressUpdateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressUpdateOneWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  menus?: Maybe<MenuUpdateManyWithoutUserInput>;
  orders?: Maybe<OrderUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateWithoutMenusDataInput = {
  addresses?: Maybe<AddressUpdateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressUpdateOneWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutUserInput>;
  orders?: Maybe<OrderUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateWithoutOrdersDataInput = {
  addresses?: Maybe<AddressUpdateManyWithoutUserInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<DefaultAddressUpdateOneWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  meals?: Maybe<MealUpdateManyWithoutUserInput>;
  menus?: Maybe<MenuUpdateManyWithoutUserInput>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles?: Maybe<UserUpdaterolesInput>;
  tokenVersion?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpsertWithoutAddressesInput = {
  create: UserCreateWithoutAddressesInput;
  update: UserUpdateWithoutAddressesDataInput;
};

export type UserUpsertWithoutDefaultAddressInput = {
  create: UserCreateWithoutDefaultAddressInput;
  update: UserUpdateWithoutDefaultAddressDataInput;
};

export type UserUpsertWithoutMealsInput = {
  create: UserCreateWithoutMealsInput;
  update: UserUpdateWithoutMealsDataInput;
};

export type UserUpsertWithoutMenusInput = {
  create: UserCreateWithoutMenusInput;
  update: UserUpdateWithoutMenusDataInput;
};

export type UserUpsertWithoutOrdersInput = {
  create: UserCreateWithoutOrdersInput;
  update: UserUpdateWithoutOrdersDataInput;
};

export type UserWhereInput = {
  addresses?: Maybe<AddressFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  defaultAddress?: Maybe<DefaultAddressWhereInput>;
  email?: Maybe<StringFilter>;
  facebookId?: Maybe<NullableStringFilter>;
  firstName?: Maybe<NullableStringFilter>;
  googleId?: Maybe<NullableStringFilter>;
  id?: Maybe<StringFilter>;
  lastName?: Maybe<NullableStringFilter>;
  meals?: Maybe<MealFilter>;
  menus?: Maybe<MenuFilter>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  orders?: Maybe<OrderFilter>;
  password?: Maybe<NullableStringFilter>;
  picture?: Maybe<NullableStringFilter>;
  tokenVersion?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type AddressMutationMutationVariables = Exact<{
  lga: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  areaCode: Scalars['Int'];
  userId: Scalars['String'];
}>;


export type AddressMutationMutation = (
  { __typename?: 'Mutation' }
  & { createOneAddress: (
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'state' | 'street1' | 'street2' | 'areaCode' | 'lga'>
  ) }
);

export type UpdateMutationMutationVariables = Exact<{
  lga?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  areaCode?: Maybe<Scalars['Int']>;
  addressId: Scalars['String'];
}>;


export type UpdateMutationMutation = (
  { __typename?: 'Mutation' }
  & { updateOneAddress?: Maybe<(
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'state' | 'street1' | 'street2' | 'areaCode' | 'lga'>
  )> }
);

export type GetAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { addresses: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'state' | 'street1' | 'street2' | 'areaCode' | 'lga'>
    )> }
  )> }
);

export type Upsert_CartMutationVariables = Exact<{
  id: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type Upsert_CartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCartStatus'>
);

export type Remove_Cart_MealMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type Remove_Cart_MealMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFromCart'>
);

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = (
  { __typename?: 'Query' }
  & { cart: (
    { __typename?: 'Cart' }
    & Pick<Cart, 'id'>
    & { meals?: Maybe<Array<(
      { __typename?: 'Meal' }
      & Pick<Meal, 'id'>
    )>> }
  ) }
);

export type CartFragment = (
  { __typename?: 'Cart' }
  & Pick<Cart, 'id'>
  & { meals?: Maybe<Array<(
    { __typename?: 'Meal' }
    & Pick<Meal, 'id'>
  )>> }
);

export type Facebook_LoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type Facebook_LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginWithFaceBook?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export type Google_LoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type Google_LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginWithGoogle?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'LogoutResponse' }
    & Pick<LogoutResponse, 'accessToken'>
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'roles'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type Cart_StatusFragment = (
  { __typename?: 'CartStatus' }
  & Pick<CartStatus, 'id' | 'isInCart' | 'cartQty' | 'total'>
);

export type Cart_StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type Cart_StatusQuery = (
  { __typename?: 'Query' }
  & { cartStatus: (
    { __typename?: 'CartStatus' }
    & Cart_StatusFragment
  ) }
);

export type MealFragment = (
  { __typename?: 'Meal' }
  & Pick<Meal, 'id' | 'title' | 'description' | 'price' | 'imageUrl'>
  & { cartStatus?: Maybe<(
    { __typename?: 'CartStatus' }
    & Cart_StatusFragment
  )> }
);

export type TodayMealsQueryVariables = Exact<{
  startOfToday: Scalars['DateTime'];
  endOfToday: Scalars['DateTime'];
  limit: Scalars['Int'];
}>;


export type TodayMealsQuery = (
  { __typename?: 'Query' }
  & { meals: Array<(
    { __typename?: 'Meal' }
    & MealFragment
  )> }
);

export type MoreTodayMealsQueryVariables = Exact<{
  startOfToday: Scalars['DateTime'];
  endOfToday: Scalars['DateTime'];
  limit: Scalars['Int'];
  cursor: Scalars['String'];
}>;


export type MoreTodayMealsQuery = (
  { __typename?: 'Query' }
  & { meals: Array<(
    { __typename?: 'Meal' }
    & MealFragment
  )> }
);

export type TodayMenuQueryVariables = Exact<{
  yesterday: Scalars['DateTime'];
  tomorrow: Scalars['DateTime'];
}>;


export type TodayMenuQuery = (
  { __typename?: 'Query' }
  & { menus: Array<(
    { __typename?: 'Menu' }
    & Pick<Menu, 'id'>
    & { meals: Array<(
      { __typename?: 'Meal' }
      & MealFragment
    )> }
  )> }
);

export type OrderMutationMutationVariables = Exact<{
  userId: Scalars['String'];
  meals?: Maybe<Array<MealOrderCreateWithoutOrderInput>>;
  addressId?: Maybe<Scalars['String']>;
}>;


export type OrderMutationMutation = (
  { __typename?: 'Mutation' }
  & { createOneOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id'>
  ) }
);

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { orders: Array<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'status'>
      & { meals: Array<(
        { __typename?: 'MealOrder' }
        & Pick<MealOrder, 'id'>
      )>, deliveryAddress?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'id' | 'state' | 'street1' | 'street2' | 'areaCode' | 'lga'>
      )> }
    )> }
  )> }
);

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup?: Maybe<(
    { __typename?: 'AuthPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  )> }
);

export const CartFragmentDoc = gql`
    fragment CART on Cart {
  id
  meals {
    id
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment USER on User {
  id
  firstName
  lastName
  email
  roles
}
    `;
export const Cart_StatusFragmentDoc = gql`
    fragment CART_STATUS on CartStatus {
  id
  isInCart
  cartQty
  total
}
    `;
export const MealFragmentDoc = gql`
    fragment MEAL on Meal {
  id
  title
  description
  price
  imageUrl
  cartStatus @client {
    ...CART_STATUS
  }
}
    ${Cart_StatusFragmentDoc}`;
export const AddressMutationDocument = gql`
    mutation addressMutation($lga: String!, $state: String!, $street1: String!, $street2: String, $areaCode: Int!, $userId: String!) {
  createOneAddress(data: {lga: $lga, state: $state, street1: $street1, street2: $street2, areaCode: $areaCode, user: {connect: {id: $userId}}}) {
    id
    state
    street1
    street2
    areaCode
    lga
  }
}
    `;
export type AddressMutationMutationFn = ApolloReactCommon.MutationFunction<AddressMutationMutation, AddressMutationMutationVariables>;

/**
 * __useAddressMutationMutation__
 *
 * To run a mutation, you first call `useAddressMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddressMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addressMutationMutation, { data, loading, error }] = useAddressMutationMutation({
 *   variables: {
 *      lga: // value for 'lga'
 *      state: // value for 'state'
 *      street1: // value for 'street1'
 *      street2: // value for 'street2'
 *      areaCode: // value for 'areaCode'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddressMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddressMutationMutation, AddressMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<AddressMutationMutation, AddressMutationMutationVariables>(AddressMutationDocument, baseOptions);
      }
export type AddressMutationMutationHookResult = ReturnType<typeof useAddressMutationMutation>;
export type AddressMutationMutationResult = ApolloReactCommon.MutationResult<AddressMutationMutation>;
export type AddressMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<AddressMutationMutation, AddressMutationMutationVariables>;
export const UpdateMutationDocument = gql`
    mutation updateMutation($lga: String, $state: String, $street1: String, $street2: String, $areaCode: Int, $addressId: String!) {
  updateOneAddress(data: {lga: $lga, state: $state, street1: $street1, street2: $street2, areaCode: $areaCode}, where: {id: $addressId}) {
    id
    state
    street1
    street2
    areaCode
    lga
  }
}
    `;
export type UpdateMutationMutationFn = ApolloReactCommon.MutationFunction<UpdateMutationMutation, UpdateMutationMutationVariables>;

/**
 * __useUpdateMutationMutation__
 *
 * To run a mutation, you first call `useUpdateMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMutationMutation, { data, loading, error }] = useUpdateMutationMutation({
 *   variables: {
 *      lga: // value for 'lga'
 *      state: // value for 'state'
 *      street1: // value for 'street1'
 *      street2: // value for 'street2'
 *      areaCode: // value for 'areaCode'
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useUpdateMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMutationMutation, UpdateMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMutationMutation, UpdateMutationMutationVariables>(UpdateMutationDocument, baseOptions);
      }
export type UpdateMutationMutationHookResult = ReturnType<typeof useUpdateMutationMutation>;
export type UpdateMutationMutationResult = ApolloReactCommon.MutationResult<UpdateMutationMutation>;
export type UpdateMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMutationMutation, UpdateMutationMutationVariables>;
export const GetAddressesDocument = gql`
    query GetAddresses {
  me {
    id
    addresses {
      id
      state
      street1
      street2
      areaCode
      lga
    }
  }
}
    `;

/**
 * __useGetAddressesQuery__
 *
 * To run a query within a React component, call `useGetAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddressesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, baseOptions);
      }
export function useGetAddressesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, baseOptions);
        }
export type GetAddressesQueryHookResult = ReturnType<typeof useGetAddressesQuery>;
export type GetAddressesLazyQueryHookResult = ReturnType<typeof useGetAddressesLazyQuery>;
export type GetAddressesQueryResult = ApolloReactCommon.QueryResult<GetAddressesQuery, GetAddressesQueryVariables>;
export const Upsert_CartDocument = gql`
    mutation UPSERT_CART($id: String!, $quantity: Int!) {
  updateCartStatus(id: $id, quantity: $quantity) @client(always: true)
}
    `;
export type Upsert_CartMutationFn = ApolloReactCommon.MutationFunction<Upsert_CartMutation, Upsert_CartMutationVariables>;

/**
 * __useUpsert_CartMutation__
 *
 * To run a mutation, you first call `useUpsert_CartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsert_CartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCartMutation, { data, loading, error }] = useUpsert_CartMutation({
 *   variables: {
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpsert_CartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Upsert_CartMutation, Upsert_CartMutationVariables>) {
        return ApolloReactHooks.useMutation<Upsert_CartMutation, Upsert_CartMutationVariables>(Upsert_CartDocument, baseOptions);
      }
export type Upsert_CartMutationHookResult = ReturnType<typeof useUpsert_CartMutation>;
export type Upsert_CartMutationResult = ApolloReactCommon.MutationResult<Upsert_CartMutation>;
export type Upsert_CartMutationOptions = ApolloReactCommon.BaseMutationOptions<Upsert_CartMutation, Upsert_CartMutationVariables>;
export const Remove_Cart_MealDocument = gql`
    mutation REMOVE_CART_MEAL($id: String!) {
  deleteFromCart(id: $id) @client(always: true)
}
    `;
export type Remove_Cart_MealMutationFn = ApolloReactCommon.MutationFunction<Remove_Cart_MealMutation, Remove_Cart_MealMutationVariables>;

/**
 * __useRemove_Cart_MealMutation__
 *
 * To run a mutation, you first call `useRemove_Cart_MealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemove_Cart_MealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartMealMutation, { data, loading, error }] = useRemove_Cart_MealMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemove_Cart_MealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Remove_Cart_MealMutation, Remove_Cart_MealMutationVariables>) {
        return ApolloReactHooks.useMutation<Remove_Cart_MealMutation, Remove_Cart_MealMutationVariables>(Remove_Cart_MealDocument, baseOptions);
      }
export type Remove_Cart_MealMutationHookResult = ReturnType<typeof useRemove_Cart_MealMutation>;
export type Remove_Cart_MealMutationResult = ApolloReactCommon.MutationResult<Remove_Cart_MealMutation>;
export type Remove_Cart_MealMutationOptions = ApolloReactCommon.BaseMutationOptions<Remove_Cart_MealMutation, Remove_Cart_MealMutationVariables>;
export const CartDocument = gql`
    query CART {
  cart @client {
    id
    meals {
      id
    }
  }
}
    `;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CartQuery, CartQueryVariables>) {
        return ApolloReactHooks.useQuery<CartQuery, CartQueryVariables>(CartDocument, baseOptions);
      }
export function useCartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, baseOptions);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartQueryResult = ApolloReactCommon.QueryResult<CartQuery, CartQueryVariables>;
export const Facebook_LoginDocument = gql`
    mutation FACEBOOK_LOGIN($token: String!) {
  loginWithFaceBook(token: $token) {
    accessToken
    user {
      ...USER
    }
  }
}
    ${UserFragmentDoc}`;
export type Facebook_LoginMutationFn = ApolloReactCommon.MutationFunction<Facebook_LoginMutation, Facebook_LoginMutationVariables>;

/**
 * __useFacebook_LoginMutation__
 *
 * To run a mutation, you first call `useFacebook_LoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebook_LoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookLoginMutation, { data, loading, error }] = useFacebook_LoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useFacebook_LoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Facebook_LoginMutation, Facebook_LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<Facebook_LoginMutation, Facebook_LoginMutationVariables>(Facebook_LoginDocument, baseOptions);
      }
export type Facebook_LoginMutationHookResult = ReturnType<typeof useFacebook_LoginMutation>;
export type Facebook_LoginMutationResult = ApolloReactCommon.MutationResult<Facebook_LoginMutation>;
export type Facebook_LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<Facebook_LoginMutation, Facebook_LoginMutationVariables>;
export const Google_LoginDocument = gql`
    mutation GOOGLE_LOGIN($token: String!) {
  loginWithGoogle(token: $token) {
    accessToken
    user {
      ...USER
    }
  }
}
    ${UserFragmentDoc}`;
export type Google_LoginMutationFn = ApolloReactCommon.MutationFunction<Google_LoginMutation, Google_LoginMutationVariables>;

/**
 * __useGoogle_LoginMutation__
 *
 * To run a mutation, you first call `useGoogle_LoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogle_LoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogle_LoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGoogle_LoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Google_LoginMutation, Google_LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<Google_LoginMutation, Google_LoginMutationVariables>(Google_LoginDocument, baseOptions);
      }
export type Google_LoginMutationHookResult = ReturnType<typeof useGoogle_LoginMutation>;
export type Google_LoginMutationResult = ApolloReactCommon.MutationResult<Google_LoginMutation>;
export type Google_LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<Google_LoginMutation, Google_LoginMutationVariables>;
export const LoginDocument = gql`
    mutation LOGIN($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      ...USER
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation LOGOUT {
  logout {
    accessToken
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query ME {
  me {
    ...USER
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const Cart_StatusDocument = gql`
    query CART_STATUS {
  cartStatus @client {
    ...CART_STATUS
  }
}
    ${Cart_StatusFragmentDoc}`;

/**
 * __useCart_StatusQuery__
 *
 * To run a query within a React component, call `useCart_StatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useCart_StatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCart_StatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useCart_StatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cart_StatusQuery, Cart_StatusQueryVariables>) {
        return ApolloReactHooks.useQuery<Cart_StatusQuery, Cart_StatusQueryVariables>(Cart_StatusDocument, baseOptions);
      }
export function useCart_StatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cart_StatusQuery, Cart_StatusQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cart_StatusQuery, Cart_StatusQueryVariables>(Cart_StatusDocument, baseOptions);
        }
export type Cart_StatusQueryHookResult = ReturnType<typeof useCart_StatusQuery>;
export type Cart_StatusLazyQueryHookResult = ReturnType<typeof useCart_StatusLazyQuery>;
export type Cart_StatusQueryResult = ApolloReactCommon.QueryResult<Cart_StatusQuery, Cart_StatusQueryVariables>;
export const TodayMealsDocument = gql`
    query todayMeals($startOfToday: DateTime!, $endOfToday: DateTime!, $limit: Int!) {
  meals(where: {menus: {some: {AND: [{menuDate: {gt: $startOfToday}}, {menuDate: {lt: $endOfToday}}]}}}, first: $limit) {
    ...MEAL
  }
}
    ${MealFragmentDoc}`;

/**
 * __useTodayMealsQuery__
 *
 * To run a query within a React component, call `useTodayMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodayMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodayMealsQuery({
 *   variables: {
 *      startOfToday: // value for 'startOfToday'
 *      endOfToday: // value for 'endOfToday'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTodayMealsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TodayMealsQuery, TodayMealsQueryVariables>) {
        return ApolloReactHooks.useQuery<TodayMealsQuery, TodayMealsQueryVariables>(TodayMealsDocument, baseOptions);
      }
export function useTodayMealsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodayMealsQuery, TodayMealsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TodayMealsQuery, TodayMealsQueryVariables>(TodayMealsDocument, baseOptions);
        }
export type TodayMealsQueryHookResult = ReturnType<typeof useTodayMealsQuery>;
export type TodayMealsLazyQueryHookResult = ReturnType<typeof useTodayMealsLazyQuery>;
export type TodayMealsQueryResult = ApolloReactCommon.QueryResult<TodayMealsQuery, TodayMealsQueryVariables>;
export const MoreTodayMealsDocument = gql`
    query moreTodayMeals($startOfToday: DateTime!, $endOfToday: DateTime!, $limit: Int!, $cursor: String!) {
  meals(where: {menus: {some: {AND: [{menuDate: {gt: $startOfToday}}, {menuDate: {lt: $endOfToday}}]}}}, first: $limit, after: {id: $cursor}) {
    ...MEAL
  }
}
    ${MealFragmentDoc}`;

/**
 * __useMoreTodayMealsQuery__
 *
 * To run a query within a React component, call `useMoreTodayMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoreTodayMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoreTodayMealsQuery({
 *   variables: {
 *      startOfToday: // value for 'startOfToday'
 *      endOfToday: // value for 'endOfToday'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMoreTodayMealsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MoreTodayMealsQuery, MoreTodayMealsQueryVariables>) {
        return ApolloReactHooks.useQuery<MoreTodayMealsQuery, MoreTodayMealsQueryVariables>(MoreTodayMealsDocument, baseOptions);
      }
export function useMoreTodayMealsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MoreTodayMealsQuery, MoreTodayMealsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MoreTodayMealsQuery, MoreTodayMealsQueryVariables>(MoreTodayMealsDocument, baseOptions);
        }
export type MoreTodayMealsQueryHookResult = ReturnType<typeof useMoreTodayMealsQuery>;
export type MoreTodayMealsLazyQueryHookResult = ReturnType<typeof useMoreTodayMealsLazyQuery>;
export type MoreTodayMealsQueryResult = ApolloReactCommon.QueryResult<MoreTodayMealsQuery, MoreTodayMealsQueryVariables>;
export const TodayMenuDocument = gql`
    query todayMenu($yesterday: DateTime!, $tomorrow: DateTime!) {
  menus(where: {AND: [{menuDate: {gt: $yesterday}}, {menuDate: {lt: $tomorrow}}]}) {
    id
    meals {
      ...MEAL
    }
  }
}
    ${MealFragmentDoc}`;

/**
 * __useTodayMenuQuery__
 *
 * To run a query within a React component, call `useTodayMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodayMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodayMenuQuery({
 *   variables: {
 *      yesterday: // value for 'yesterday'
 *      tomorrow: // value for 'tomorrow'
 *   },
 * });
 */
export function useTodayMenuQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TodayMenuQuery, TodayMenuQueryVariables>) {
        return ApolloReactHooks.useQuery<TodayMenuQuery, TodayMenuQueryVariables>(TodayMenuDocument, baseOptions);
      }
export function useTodayMenuLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodayMenuQuery, TodayMenuQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TodayMenuQuery, TodayMenuQueryVariables>(TodayMenuDocument, baseOptions);
        }
export type TodayMenuQueryHookResult = ReturnType<typeof useTodayMenuQuery>;
export type TodayMenuLazyQueryHookResult = ReturnType<typeof useTodayMenuLazyQuery>;
export type TodayMenuQueryResult = ApolloReactCommon.QueryResult<TodayMenuQuery, TodayMenuQueryVariables>;
export const OrderMutationDocument = gql`
    mutation orderMutation($userId: String!, $meals: [MealOrderCreateWithoutOrderInput!], $addressId: String) {
  createOneOrder(data: {user: {connect: {id: $userId}}, meals: {create: $meals}, deliveryAddress: {connect: {id: $addressId}}}) {
    id
  }
}
    `;
export type OrderMutationMutationFn = ApolloReactCommon.MutationFunction<OrderMutationMutation, OrderMutationMutationVariables>;

/**
 * __useOrderMutationMutation__
 *
 * To run a mutation, you first call `useOrderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMutationMutation, { data, loading, error }] = useOrderMutationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      meals: // value for 'meals'
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useOrderMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OrderMutationMutation, OrderMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<OrderMutationMutation, OrderMutationMutationVariables>(OrderMutationDocument, baseOptions);
      }
export type OrderMutationMutationHookResult = ReturnType<typeof useOrderMutationMutation>;
export type OrderMutationMutationResult = ApolloReactCommon.MutationResult<OrderMutationMutation>;
export type OrderMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<OrderMutationMutation, OrderMutationMutationVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  me {
    id
    orders {
      id
      meals {
        id
      }
      status
      deliveryAddress {
        id
        state
        street1
        street2
        areaCode
        lga
      }
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
      }
export function useGetOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = ApolloReactCommon.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const SignupDocument = gql`
    mutation SIGNUP($email: String!, $firstName: String, $lastName: String, $password: String!) {
  signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password, roles: []) {
    user {
      ...USER
    }
  }
}
    ${UserFragmentDoc}`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    