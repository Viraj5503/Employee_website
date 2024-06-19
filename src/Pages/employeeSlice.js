import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { Badge, Button } from "@mui/material";
import {AddButton} from "../Components/Popups";
import {DeleteButton} from '../Components/Popups';

const initialState = {
  columns: [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell:(params) => (
        <div>
          {params.value}
          {!params.row.isActive ? <Badge color="error" variant="dot" sx={{marginLeft:1,}}/> : null}
        </div>
      )
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      type: "button",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <Button>
            <AddButton
              employeeId={params.row.id}
              option={false}
              initailEmployeeDetails={params.row}
            />
            <DeleteButton employeeId={params.row.id} />
          </Button>
        </>
      ),
      // valueGetter: (value, row) => `${row.Name || ''} ${row.lastName || ''}`,
    },
  ],
  rows: [],
  openSnackbar: false,
  snackbarMessage: "",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.rows.push(action.payload);
      //console.log(action.payload)
      state.rows.forEach((employee, index) => {
        employee.serialNo = index + 1;
      });
      localStorage.setItem("data", JSON.stringify(state.rows));
      state.openSnackbar = true;
      state.snackbarMessage = "Employee added successfully";
    },

    deleteDetails: (state, action) => {
      const id = action.payload;
      //console.log(id)
      state.rows = state.rows.filter((employee) => employee.id !== id);
      const index = state.rows.findIndex((employee) => employee.id === id);
      //localStorage.removeItem('data')
      const data = JSON.parse(localStorage.getItem("data"));
      //console.log(data)
      data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(data));

      state.rows.forEach((employee, index) => {
        employee.serialNo = index + 1;
      });
      state.openSnackbar = true;
      state.snackbarMessage = "Employee Deleted successfully";
    },

    updateDetails: (state, action) => {
      const { id, updatedData } = action.payload;
      //console.log(action.payload)
      const index = state.rows.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...updatedData };
      }
      state.rows.forEach((employee, index) => {
        // console.log(index)
        employee.serialNo = index + 1;
      });
      localStorage.setItem("data", JSON.stringify(state.rows));
      state.openSnackbar = true;
      state.snackbarMessage = "Employee Updated successfully";
    },

    employeeList: (state, action) => {
      state.rows = action.payload;
    },

    contactDetails: (state,action) => {
      state.openSnackbar= true;
      state.snackbarMessage = "Your response is submitted"
    },

    closeSnackbar: (state) => {
      state.openSnackbar = !state.openSnackbar;
      state.snackbarMessage = "";
      //console.log(state.openSnackbar)
    },
  },
});

export const {
  addDetails,
  deleteDetails,
  updateDetails,
  employeeList,
  closeSnackbar, contactDetails
} = employeeSlice.actions;
export default employeeSlice.reducer;
