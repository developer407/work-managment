import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiles } from '../../State/Files/Action';

const PieChart = () => {
const dispatch=useDispatch()
const {file}=useSelector(store=>store);
const jwt=localStorage.getItem("jwt")
const [series,setSeries]=useState([])
const [label,setLabel]=useState([])

  useEffect(() => {
    dispatch(getAllFiles({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (file.files && file.files.length > 0) {
      const completedFilesCount = file.files.reduce((accumulator, file) => {
        const fullName = file.assignedWorker.fullName;
        accumulator[fullName] = (accumulator[fullName] || 0) + 1;
        return accumulator;
      }, {});

      const seriesData = Object.keys(completedFilesCount).map((fullName) => completedFilesCount[fullName]);

      setSeries(seriesData);
      setLabel( Object.keys(completedFilesCount))

      console.log("------",Object.keys(completedFilesCount))
      
    }
  }, [file.files]);


  const [chartData,setChartData] = useState(null);

  useEffect(()=>{
    // const newChartData={...chartData}
    // newChartData.series=series
    // console.log("new chat data before",newChartData)
    // newChartData.options.labels=[...label]

   if(series.length>0 && label.length>0){
    setChartData({
      series: series,
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        
        labels: label,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    })
   }

// console.log("new chat data ",newChartData)
  },[series,label])



  return (
    <div>
     {chartData && <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
      </div>
      // <div id="html-dist"></div>
    }
    </div>
  );
};

export default PieChart;
