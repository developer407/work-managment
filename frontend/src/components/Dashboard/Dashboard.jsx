import React from 'react'
import ArchiveTable from '../Archive/ArchiveTable'
import PieChart from './PieChart'
import { Grid } from '@mui/material'
import BarChart from './BarChart'

const Dashboard = () => {
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
        <Grid className='mb-10' container spacing={2}>
       

          <Grid item  xs={12} lg={12}>
             <PieChart/>
          </Grid>

        </Grid>
       
      <ArchiveTable/>
      </div>
    </div>
  )
}

export default Dashboard