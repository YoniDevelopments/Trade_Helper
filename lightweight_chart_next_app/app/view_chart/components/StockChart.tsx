"use client";

import { useEffect, useRef, FC } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { CandlestickData, Time } from 'lightweight-charts';

interface StockDataEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface TimeSeries {
  [key: string]: StockDataEntry; // Key will be the timestamp
}

interface StockData {
  'Meta Data': {
    // ... define Meta Data properties if needed
  };
  [key: string]: any; // Add this line
}

interface StockChartProps {
  stockData: StockData; // Not StockData[]
}

  
const StockChart: React.FC<StockChartProps> = ({ stockData }) => {
    //console.log(stockData[1]);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (!chartContainerRef.current || !stockData) return; 
  
      const chart = LightweightCharts.createChart(chartContainerRef.current, {
        width: 1600,
        height: 800,
        layout: {
            background: { color: "#253248",  },
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: '#334158',
          },
          horzLines: {
            color: '#334158',
          },
        },
        timeScale: {
          timeVisible: true,
        },
      });
  
      const candlestickSeries = chart.addCandlestickSeries({
                upColor: "#4bffb5",
                downColor: "#ff4976",
                borderDownColor: "#ff4976",
                borderUpColor: "#4bffb5",
                wickDownColor: "#838ca1",
                wickUpColor: "#838ca1"
              });
  
      const transformData = (stockData: StockData): CandlestickData[] => {
        if (!stockData) return [];
        const timeSeriesKey = Object.keys(stockData).find(key => key.startsWith('Time Series'));
        if (!timeSeriesKey) return [];
  
        const timeSeries = stockData[timeSeriesKey] as Record<string, StockDataEntry>; 
        let transformedData = Object.entries(timeSeries).map(([timeString, values]) => ({
          time: (new Date(timeString)).getTime() / 1000 as Time,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
        }));
  
        // Sort the data in ascending order by time
        transformedData.sort((a, b) => (a.time > b.time ? 1 : -1)); 
        //console.log("First print", stockData)
        return transformedData;
        
      };
      
  
      const formattedData = transformData(stockData);
      if (candlestickSeries) {
        candlestickSeries.setData(formattedData);
        //console.log(stockData)
      }

      return () => {
        if (chart) {
          chart.remove();
        }
      };
      
    }, [stockData]); 
  
    return <div ref={chartContainerRef} id="chartContainer" style={{ display: 'flex', flexDirection: 'column', height: '90vh' }} />;
  };
  
  export default StockChart;