import React from 'react'
import ArchiveTable from '../Archive/ArchiveTable'
import PieChart from './PieChart'
import { Divider, Grid, IconButton } from '@mui/material'
import BarChart from './BarChart'
import AdminTable from '../SuperAdmin/AdminTable'
import { Create } from '@mui/icons-material'
import Admin from '../SuperAdmin/Admin'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const {auth}=useSelector(store=>store)
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
        <Grid className='mb-10' container spacing={2}>
       
        <Grid item  xs={12} lg={6}>
             <BarChart/>
          </Grid>
          <Grid item  xs={12} lg={6}>
             <PieChart/>
          </Grid>

        </Grid>
       
      <ArchiveTable/>
      
     {auth.user.role==="ROLE_SUPER_ADMIN" && <div className='my-10'>
        <Admin/>
      </div>}
      </div>
    </div>
  )
}

export default Dashboard