import { useEffect, useState } from 'react'
// import sampleData from './sample.json'
import weeklyData from './weekly.json'
import Chart from 'react-apexcharts'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [allData, setAllData] = useState({})
  const [price, setPrice] = useState(0)
  // const [aYear, setAYear] = useState([])
  // const [ytd, setYtd] = useState([])
  // const [threeMonths, setThreeMonths] = useState([])
  // const [aMonth, setAMonth] = useState([])
  // const [aWeek, setAWeek] = useState([])

  useEffect(() => {
    const data = []
    const categories = []

    Object.entries(weeklyData['Weekly Time Series']).reverse().forEach(([date, prices]) => {
      data.push(prices["4. close"] * 1)
      categories.push(date)
    })

    setPrice(data[data.length - 1])

    setAllData({
      series: [{
        name: 'APPLE',
        data
      }],
      categories
    })

    setIsLoaded(true)
  }, [])

  return (
    <div>
      {
        isLoaded &&
        <div>
          <div>$ {price.toFixed(2)}</div>
          <Chart
            series={allData.series}
            options={{
              chart: {
                type: 'line',
                zoom: { enabled: false },
                events: {
                  mouseMove: (e, chartContext, config) => {
                    setPrice(allData.series[0].data[config.dataPointIndex] || allData.series[0].data[allData.series[0].data.length - 1])
                    // console.log(config.dataPointIndex)
                    // console.log(chartContext, config)
                  },
                  mouseLeave: () => {
                    setPrice(allData.series[0].data[allData.series[0].data.length - 1])
                  }
                },
              },
              colors: ['#5ac53b'],
              xaxis: {
                categories: allData.categories,
                labels: { show: false }
              },
              yaxis: { labels: { show: false }},
              grid: { show: false },
              stroke: { width: 1.5 },
              legend: {
                show: false,
              },
              tooltip: {
                enabled: true,
                items: {
                  display: 'none'
                },
                x: { show: false },
              },
            }}
            type='line'
            height={350}
          />
        </div>
      }
    </div>
  );
}

export default App;
