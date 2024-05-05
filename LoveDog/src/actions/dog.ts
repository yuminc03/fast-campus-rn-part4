import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {TypeDog} from '../data/TypeDog';
import {TypeRootReducer} from '../store';
import {createAxiosInstance} from '../utils/AxiosUtils';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST' as const;
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS' as const;
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE' as const;

export const getDogRequest = () => {
  return {
    type: GET_DOG_REQUEST,
  };
};

export const getDogSuccess = (dog: TypeDog) => {
  return {
    type: GET_DOG_SUCCESS,
    data: dog,
  };
};

export const getDogFailure = () => {
  return {
    type: GET_DOG_FAILURE,
  };
};

export const getDog = (): TypeDogThunkAction => async dispatch => {
  dispatch(getDogRequest());

  try {
    const apiResult = await createAxiosInstance().get<{
      message: string;
      status: string;
    }>('breeds/image/random');
    const result = apiResult.data;
    dispatch(getDogSuccess({photoUrl: result.message}));
  } catch (ex) {
    dispatch(getDogFailure());
  }
};

export type TypeDogThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  DogActions
>;

export type TypeDogDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  DogActions
>;

export type DogActions =
  | ReturnType<typeof getDogRequest>
  | ReturnType<typeof getDogSuccess>
  | ReturnType<typeof getDogFailure>;
