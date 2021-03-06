import * as types from "./actionTypes";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USER,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});
const userAdded = () => ({
  type: types.ADD_USER,
});
const userUpdated = () => ({
  type: types.UPDATE_USER,
});

const setLoading = () => ({
  type: types.SET_LOADING_TRUE,
});

const setProvinsi = (provinsi) => ({
  type: types.SET_PROVINSI,
  payload: provinsi,
});
const setKabupaten = (kabupaten) => ({
  type: types.SET_KABUPATEN,
  payload: kabupaten,
});
const setKecamatan = (kecamatan) => ({
  type: types.SET_KECAMATAN,
  payload: kecamatan,
});
const setKelurahan = (kelurahan) => ({
  type: types.SET_KELURAHAN,
  payload: kelurahan,
});

const userSetted = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setUser = (user) => {
  return function (dispatch) {
    dispatch(userSetted(user));
  };
};
export const loadProvinsi = () => {
  return function (dispatch) {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => {
        dispatch(setProvinsi(res.data.provinsi));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
};
export const loadKabupaten = (id) => {
  return function (dispatch) {
    console.log("ok kabupaten");
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      )
      .then((res) => {
        dispatch(setKabupaten(res.data.kota_kabupaten));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
};
export const loadKecamatan = (id) => {
  return function (dispatch) {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
      )
      .then((res) => {
        dispatch(setKecamatan(res.data.kecamatan));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
};
export const loadKelurahan = (id) => {
  return function (dispatch) {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
      )
      .then((res) => {
        dispatch(setKelurahan(res.data.kelurahan));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
};

export const loadUsers = () => {
  return function (dispatch) {
    dispatch(setLoading());
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        console.log("res", res.data);
        dispatch(getUsers(res.data));
      })
      .catch((error) => console.log(error));
  };
};
export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API + "/" + id}`)
      .then((res) => {
        console.log("res", res.data);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};
export const addUser = (data) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, data)
      .then((res) => {
        console.log("res", res.data);
        console.log(data);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};
export const updateUser = (data) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API + "/" + data.id}`, data)
      .then((res) => {
        console.log("update response", res.data);
        console.log("update data", data);
        dispatch(userUpdated());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};
