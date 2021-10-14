import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../../redux/action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const { users, loading } = useSelector((state) => state.data);
  console.log("user data", users);

  useEffect(() => {
    // dispatch(loadUsers());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(loadUsers());
  };

  const handleDelete = (id) => {
    if (window.confirm("Anda Yakin Delete Data Ini?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1 className={"title"}>DATA PEGAWAI</h1>
      <Button onClick={() => refreshData()} variant="contained" color="primary">
        Refresh&nbsp;
        <RefreshIcon />
      </Button>
      <Button
        onClick={() => history.push("/add")}
        variant="contained"
        color="primary"
      >
        Tambah Data
      </Button>
      {loading === true ? <CircularProgress /> : ""}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Nama</TableCell>
              <TableCell align="left">Pekerjaan</TableCell>
              <TableCell align="left">Alamat</TableCell>
              <TableCell align="left">Kecamatan</TableCell>
              <TableCell align="left">Kabupaten</TableCell>
              <TableCell align="left">Provinsi</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="left">{user.firstName}</TableCell>
                  <TableCell align="left">{user.job}</TableCell>
                  <TableCell align="left">{user.address}</TableCell>
                  <TableCell align="left">{user.kecamatan}</TableCell>
                  <TableCell align="left">{user.kabupaten}</TableCell>
                  <TableCell align="left">{user.provinsi}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleDelete(user.id)} color="error">
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      color="primary"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
