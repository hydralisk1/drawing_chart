import Chart from 'react-apexcharts'
import { useEffect, useState, useContext } from 'react'
import Search from './Search'
import { TickerContext } from './TickerContext'

const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [allData, setAllData] = useState({})
    const [price, setPrice] = useState(0)
    const { ticker } = useContext(TickerContext)

    useEffect(() => {
        const apiKey = 'JV5XCOLN3TAW7S49'
        const url = 'https://www.alphavantage.co/query'
        const func = 'TIME_SERIES_WEEKLY'

        fetch(`${url}?function=${func}&symbol=${ticker}&apikey=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                const data = []
                const categories = []

                Object.entries(res['Weekly Time Series']).reverse().forEach(([date, prices]) => {
                    data.push(prices["4. close"] * 1)
                    categories.push(date)
                })

                setAllData({
                    series: [{
                        name: 'APPLE',
                        data
                    }],
                    categories
                })
                setPrice(data[data.length - 1])
                setIsLoaded(true)
            })
    }, [ticker])

    return (
        <div>
        <Search />
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
                // type='line'
                height={350}
            />
            </div>
        }
        </div>
    );
}

export default Dashboard
