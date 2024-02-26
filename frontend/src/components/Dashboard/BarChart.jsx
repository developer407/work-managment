import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiles } from '../../State/Files/Action';

const BarChart = () => {

  const dispatch=useDispatch()
const {file}=useSelector(store=>store);
const jwt=localStorage.getItem("jwt")
const [series,setSeries]=useState([])
const [label,setLabel]=useState([])

const [chartData,setChartData] = useState(null);
  

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


  useEffect(()=>{
    let data = {
      series: [{
        name: 'files',
        data: series
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: label,
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      }
    };

    if(series.length>0 && label.length>0){
      setChartData(data)
    }
  },[series,label])


  return (
    <div>
     {chartData && <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>}
     
    </div>
  );
};

export default BarChart;
