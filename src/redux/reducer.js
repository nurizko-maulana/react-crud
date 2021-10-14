import * as types from "./actionTypes";
const initialState = {
  users: [],
  user: {},
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
    case types.DELETE_USER:
      return {
        ...state,
        loading: false,
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
