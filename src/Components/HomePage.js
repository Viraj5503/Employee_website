import React from 'react'
import {Box} from "@mui/material";
import AllCards from './AllCards';
import CommonLayout from './CommonLayout';

export default function HomePage() {
  return (
    <div>
      <CommonLayout />
      <Box sx={{paddingLeft:28, paddingTop:12}}> <AllCards /> </Box>
    </div>
  )
}