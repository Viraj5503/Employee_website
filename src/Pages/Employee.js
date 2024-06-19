import React, { useEffect } from 'react'
import CommonLayout from '../Components/CommonLayout'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { employeeList } from './employeeSlice'
import {AddButton} from '../Components/Popups'

export default function Employee() {
  const state = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(()=>{
    const tableData = JSON.parse(localStorage.getItem('data'))

    if(tableData){
      dispatch(employeeList(tableData))
    }
  },[dispatch])

  return (
    <div>
      <CommonLayout />
      <Box sx={{paddingLeft:27, paddingTop:10, }}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h3>Employee Details</h3>
      <AddButton option={true} isActive={true}/>
      </Box>
      <DataGrid
        rows={state.rows}
        columns={state.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
      </Box>
    </div>
  )
}
