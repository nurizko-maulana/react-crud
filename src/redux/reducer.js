import * as types from "./actionTypes";
const initialState = {
  users: [],
  user: {},
  edit: false,
  loading: false,
  provinsi: [],
  kabupaten: [],
  kecamatan: [],
  kelurahan: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        user: {},
        edit: false,

        loading: false,
      };
    case types.DELETE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        edit: true,
      };
    case types.SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case types.SET_PROVINSI:
      return {
        ...state,
        provinsi: action.payload,
      };
    case types.SET_KABUPATEN:
      return {
        ...state,
        kabupaten: action.payload,
      };
    case types.SET_KECAMATAN:
      return {
        ...state,
        kecamatan: action.payload,
      };
    case types.SET_KELURAHAN:
      return {
        ...state,
        kelurahan: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;
