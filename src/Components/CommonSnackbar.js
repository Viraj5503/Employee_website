import React from "react";
import PropTypes from "prop-types";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../Pages/employeeSlice";

const CommonSnackbar = ({ open, onClose, message }) => {
    const dispatch = useDispatch()
    const openSnackbar = useSelector((state) => state.employee.openSnackbar);
    const snackbarMessage = useSelector((state) => state.employee.snackbarMessage);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(closeSnackbar())
    };
    
  const action = (
    <React.Fragment>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={()=>handleClose}
      message={snackbarMessage}
      action={action}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  );
};

CommonSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default CommonSnackbar;
