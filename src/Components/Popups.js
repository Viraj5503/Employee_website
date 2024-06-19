import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch} from "react-redux";
import {
  addDetails,
  deleteDetails,
  updateDetails,
} from "../Pages/employeeSlice";

export const AddButton = ({option,
  employeeId,
  isActive,
  initailEmployeeDetails}) => {
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const [employeeDetails, setEmployeeDetails] = useState({
    serialNo: null,
    id: null,
    name: "",
    salary: null,
    isActive: isActive,
  });

  const handleOpenAdd = () => {
    setOpenAdd(true);
    !option &&
      initailEmployeeDetails &&
      setEmployeeDetails(initailEmployeeDetails);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: type === "checkbox" ? checked : value,
    });
    // console.log(employeeDetails)
  };

  const handleConfirm = () => {
    const newEmployeeDetails = {...employeeDetails, id: uuidv4()}
    option
      ? dispatch(addDetails(newEmployeeDetails))
      : dispatch(
          updateDetails({ id: employeeId, updatedData: newEmployeeDetails })
        )
    setEmployeeDetails({
      serialNo: 0,
      name: "",
      salary: null,
      isActive: isActive,
    });
    handleCloseAdd();
  };

  // const handleClose = () => {
  //   dispatch(closeSnackbar())
  // };

  return (
    <>
      <div style={{ paddingRight: 15 }}>
        <TriggerButton onClick={()=>handleOpenAdd()}>
          {option ? 'Add Employee' : <EditIcon />}
        </TriggerButton>
        {/* <CommonSnackbar
          onClose={handleClose}
        /> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
        >
          <Fade in={openAdd}>
            <ModalContent sx={style}>
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <IconButton
                  onClick={() => {
                    handleCloseAdd();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h2 id="transition-modal-title" className="modal-title">
                {option ? "Add Employee Details" : "Update Employee Details"}
              </h2>
              <br />
              <TextField
                sx={{ paddingBottom: 2 }}
                onChange={handleChange}
                value={employeeDetails.name}
                name="name"
                label="Enter Employee Name"
                fullWidth
              />
              <TextField
                sx={{ paddingBottom: 2 }}
                onChange={handleChange}
                value={employeeDetails.salary}
                name="salary"
                type="number"
                label="Enter Employee Salary"
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeDetails.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="is Active"
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ marginRight: 2 }}
                  onClick={() => {
                    handleCloseAdd();
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {handleConfirm()}}
                  color="success"
                  variant="contained"
                >
                  Confirm
                </Button>
              </div>
            </ModalContent>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
AddButton.propTypes = {
  option: PropTypes.bool.isRequired,
};

export const DeleteButton = ({ employeeId }) => {
  // console.log(employeeId)
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  

  const handleDelete = () => {
    dispatch(deleteDetails(employeeId));
    handleCloseDelete();
  };

  return (
    <>
      <TriggerButton onClick={()=>{handleOpenDelete()}}><DeleteIcon /></TriggerButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={openDelete}>
          <ModalContent sx={style}>
            <div style={{ position: "absolute", top: 8, right: 8 }}>
              <IconButton
                onClick={() => {
                  handleCloseDelete();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 id="transition-modal-title" className="modal-title">
              Are you sure you want to delete this employee?
            </h2>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ marginRight: 2 }}
                onClick={() => {
                  handleCloseDelete();
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={()=>handleDelete()} color="error" variant="contained">
                Delete
              </Button>
            </div>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );

};
DeleteButton.propTypes = {
  employeeId: PropTypes.string.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
