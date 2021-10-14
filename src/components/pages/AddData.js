import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  loadProvinsi,
  loadKabupaten,
  loadKecamatan,
  loadKelurahan,
  addUser,
  updateUser,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AddData() {
  let dispatch = useDispatch();
  let history = useHistory();
  const { provinsi, kabupaten, kecamatan, kelurahan, edit, user } = useSelector(
    (state) => state.data
  );

  const handleSubmit = () => {
    dispatch(
      addUser({
        nama: name,
        provinsi: selectedProvince,
        kabupaten: selectedKabupaten,
        kecamatan: selectedKecamatan,
        kelurahan: selectedKelurahan,
      })
    );
    history.push("/");
  };
  const handleUpdate = () => {
    console.log("handle update button", name);
    dispatch(
      updateUser({
        id: user.id,
        nama: name,
        provinsi: selectedProvince,
        kabupaten: selectedKabupaten,
        kecamatan: selectedKecamatan,
        kelurahan: selectedKelurahan,
      })
    );
    history.push("/");
  };

  useEffect(() => {
    dispatch(loadProvinsi());
    if (edit) {
      dispatch(loadKabupaten(user.kabupaten.id_provinsi));
      dispatch(loadKecamatan(user.kecamatan.id_kota));
      dispatch(loadKelurahan(user.kabupaten.id_Kecamatan));
      setName(user.nama);
      setProvince(user.provinsi);
      setKabupaten(user.kabupaten);
      setKecamatan(user.kecamatan);
      setKelurahan(user.kelurahan);
    }
  }, [dispatch, edit, user]);

  const [name, setName] = React.useState("");
  const [selectedProvince, setProvince] = React.useState({});
  const [selectedKabupaten, setKabupaten] = React.useState({});
  const [selectedKecamatan, setKecamatan] = React.useState({});
  const [selectedKelurahan, setKelurahan] = React.useState({});

  return (
    <div>
      <h1 className={"title"}>{edit ? "Update Data" : "Tambah Data Baru"}</h1>
      <Box
        sx={{
          padding: "2em",
          bgcolor: "white",
          borderRadius: "1em",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "black", marginBottom: "0.5em" }}
          component="h2"
        >
          Data Diri
        </Typography>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="outlined-basic"
          sx={{ width: 300, marginBottom: "1em" }}
          label="Nama"
          variant="outlined"
        />
        <Typography
          variant="h5"
          sx={{ color: "black", marginBottom: "0.5em" }}
          component="h2"
        >
          Alamat
        </Typography>
        <Autocomplete
          getOptionLabel={(p) => p.nama || ""}
          disablePortal
          id="combo-box-demo"
          options={provinsi}
          value={selectedProvince}
          isOptionEqualToValue={(opt) => selectedProvince.id === opt.id}
          onChange={(event, value) => {
            if (value === null) {
              setProvince("");
              dispatch(loadKabupaten(null));
              dispatch(loadKecamatan(null));
              dispatch(loadKelurahan(null));
            } else {
              setProvince(value);
              dispatch(loadKabupaten(value.id));
            }
            setKabupaten("");
            setKecamatan("");
            setKelurahan("");
          }}
          sx={{ width: 300, marginBottom: "1em" }}
          renderInput={(params) => <TextField {...params} label="Provinsi" />}
        />
        <Autocomplete
          getOptionLabel={(p) => p.nama || ""}
          disablePortal
          value={selectedKabupaten}
          isOptionEqualToValue={(opt) => selectedKabupaten.id === opt.id}
          onChange={(event, value) => {
            if (value === null) {
              setKabupaten("");
              dispatch(loadKecamatan(null));
              dispatch(loadKelurahan(null));
            } else {
              setKabupaten(value);
              dispatch(loadKecamatan(value.id));
            }
            setKecamatan("");
            setKelurahan("");
          }}
          id="combo-box-demo"
          options={kabupaten}
          sx={{ width: 300, marginBottom: "1em" }}
          renderInput={(params) => <TextField {...params} label="Kabupaten" />}
        />
        <Autocomplete
          getOptionLabel={(p) => p.nama || ""}
          disablePortal
          id="combo-box-demo"
          options={kecamatan}
          value={selectedKecamatan}
          isOptionEqualToValue={(opt) => selectedKecamatan.id === opt.id}
          onChange={(event, value) => {
            if (value === null) {
              setKecamatan("");
              dispatch(loadKelurahan(null));
            } else {
              setKecamatan(value);
              dispatch(loadKelurahan(value.id));
            }
            setKelurahan("");
          }}
          sx={{ width: 300, marginBottom: "1em" }}
          renderInput={(params) => <TextField {...params} label="Kecamatan" />}
        />
        <Autocomplete
          getOptionLabel={(p) => p.nama || ""}
          disablePortal
          id="combo-box-demo"
          options={kelurahan}
          value={selectedKelurahan}
          isOptionEqualToValue={(opt) => selectedKelurahan.id === opt.id}
          onChange={(event, value) => {
            if (value === null) {
              setKelurahan("");
            } else {
              setKelurahan(value);
            }
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Kelurahan" />}
        />
        <Button
          variant="contained"
          onClick={edit ? handleUpdate : handleSubmit}
          sx={{ marginTop: "1em" }}
        >
          {edit ? "UPDATE" : "SUMBIT"}
        </Button>
      </Box>
    </div>
  );
}

export default AddData;
