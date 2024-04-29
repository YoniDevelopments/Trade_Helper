import { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { CandlestickData, Time } from 'lightweight-charts'; // Import necessary types

const ChartComponent = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = LightweightCharts.createChart(chartContainerRef.current, {
      width: 1600,
      height: 1600,
      timeScale: {
        timeVisible: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();

    const intradayData = [
      {
        time: '2022-01-01 09:30',
        open: 100,
        high: 110,
        low: 90,
        close: 105,
      },
      {
        time: '2022-01-01 09:31',
        open: 105,
        high: 115,
        low: 100,
        close: 110,
      },
      // ...
    ];

    const formattedData = intradayData.map(data => ({
      time: (new Date(data.time)).getTime() / 1000 as Time, // Convert and explicitly cast as 'Time'
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }));
    
    candlestickSeries.setData(formattedData);
  }, []);

  return <div ref={chartContainerRef} id="chartContainer" />;
};

export default ChartComponent;