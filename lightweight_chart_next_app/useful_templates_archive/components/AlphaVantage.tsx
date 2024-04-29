import { useEffect, useRef } from 'react';
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
  
const AlphaVantage = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

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

    const data: StockData[] = [
        {
            "Meta Data": {
                "1. Information": "Intraday (5min) open, high, low, close prices and volume",
                "2. Symbol": "IBM",
                "3. Last Refreshed": "2024-04-22 19:55:00",
                "4. Interval": "5min",
                "5. Output Size": "Full size",
                "6. Time Zone": "US/Eastern"
            },
            "Time Series (5min)": {
                "2024-04-22 19:55:00": {
                    "1. open": "183.0100",
                    "2. high": "183.0100",
                    "3. low": "183.0100",
                    "4. close": "183.0100",
                    "5. volume": "0"
                },
                "2024-04-22 19:50:00": {
                    "1. open": "182.0000",
                    "2. high": "182.0000",
                    "3. low": "182.0000",
                    "4. close": "182.0000",
                    "5. volume": "3"
                },
                "2024-04-22 19:40:00": {
                    "1. open": "183.8100",
                    "2. high": "183.8100",
                    "3. low": "181.9500",
                    "4. close": "181.9500",
                    "5. volume": "94"
                },
                "2024-04-22 19:35:00": {
                    "1. open": "182.0000",
                    "2. high": "182.0000",
                    "3. low": "182.0000",
                    "4. close": "182.0000",
                    "5. volume": "8"
                },
                "2024-04-22 19:30:00": {
                    "1. open": "182.9700",
                    "2. high": "182.9700",
                    "3. low": "182.3900",
                    "4. close": "182.3900",
                    "5. volume": "18"
                },
                "2024-04-22 19:15:00": {
                    "1. open": "181.9600",
                    "2. high": "184.0000",
                    "3. low": "181.9400",
                    "4. close": "184.0000",
                    "5. volume": "1476"
                },
                "2024-04-22 19:10:00": {
                    "1. open": "182.9500",
                    "2. high": "182.9500",
                    "3. low": "182.9500",
                    "4. close": "182.9500",
                    "5. volume": "1"
                },
                "2024-04-22 19:05:00": {
                    "1. open": "182.1400",
                    "2. high": "182.4800",
                    "3. low": "182.1400",
                    "4. close": "182.4800",
                    "5. volume": "9"
                },
                "2024-04-22 19:00:00": {
                    "1. open": "181.9000",
                    "2. high": "181.9000",
                    "3. low": "181.9000",
                    "4. close": "181.9000",
                    "5. volume": "325972"
                },
                "2024-04-22 18:55:00": {
                    "1. open": "182.0000",
                    "2. high": "182.0000",
                    "3. low": "182.0000",
                    "4. close": "182.0000",
                    "5. volume": "18"
                },
                "2024-04-22 18:30:00": {
                    "1. open": "181.9000",
                    "2. high": "182.2000",
                    "3. low": "181.9000",
                    "4. close": "182.2000",
                    "5. volume": "325973"
                },
                "2024-04-22 18:15:00": {
                    "1. open": "182.0100",
                    "2. high": "182.0100",
                    "3. low": "182.0100",
                    "4. close": "182.0100",
                    "5. volume": "1"
                },
                "2024-04-22 18:10:00": {
                    "1. open": "182.0000",
                    "2. high": "182.0000",
                    "3. low": "182.0000",
                    "4. close": "182.0000",
                    "5. volume": "1"
                },
                "2024-04-22 18:05:00": {
                    "1. open": "181.5000",
                    "2. high": "181.5000",
                    "3. low": "181.5000",
                    "4. close": "181.5000",
                    "5. volume": "9"
                },
                "2024-04-22 17:55:00": {
                    "1. open": "181.5000",
                    "2. high": "181.5000",
                    "3. low": "181.5000",
                    "4. close": "181.5000",
                    "5. volume": "127"
                },
                "2024-04-22 17:50:00": {
                    "1. open": "182.2640",
                    "2. high": "182.2640",
                    "3. low": "182.2640",
                    "4. close": "182.2640",
                    "5. volume": "9"
                },
                "2024-04-22 17:45:00": {
                    "1. open": "182.4600",
                    "2. high": "182.4600",
                    "3. low": "181.9000",
                    "4. close": "181.9000",
                    "5. volume": "56"
                },
                "2024-04-22 17:40:00": {
                    "1. open": "181.8900",
                    "2. high": "181.8900",
                    "3. low": "181.8900",
                    "4. close": "181.8900",
                    "5. volume": "24"
                },
                "2024-04-22 17:35:00": {
                    "1. open": "181.8900",
                    "2. high": "181.8900",
                    "3. low": "181.8900",
                    "4. close": "181.8900",
                    "5. volume": "4"
                },
                "2024-04-22 17:10:00": {
                    "1. open": "181.3200",
                    "2. high": "181.3200",
                    "3. low": "181.3200",
                    "4. close": "181.3200",
                    "5. volume": "3"
                },
                "2024-04-22 17:05:00": {
                    "1. open": "180.2900",
                    "2. high": "180.2900",
                    "3. low": "180.2900",
                    "4. close": "180.2900",
                    "5. volume": "13"
                },
                "2024-04-22 17:00:00": {
                    "1. open": "180.2900",
                    "2. high": "180.2900",
                    "3. low": "180.2900",
                    "4. close": "180.2900",
                    "5. volume": "0"
                },
                "2024-04-22 16:50:00": {
                    "1. open": "181.1300",
                    "2. high": "182.9500",
                    "3. low": "181.1300",
                    "4. close": "182.9500",
                    "5. volume": "30"
                },
                "2024-04-22 16:45:00": {
                    "1. open": "181.9000",
                    "2. high": "181.9000",
                    "3. low": "181.0000",
                    "4. close": "181.0000",
                    "5. volume": "186132"
                },
            }
        }
    ];

    const transformData = (data: StockData): CandlestickData[] => {
        const timeSeriesKey = Object.keys(data).find(key => key.startsWith('Time Series'));
        if (!timeSeriesKey) return [];
      
        const timeSeries = data[timeSeriesKey] as Record<string, StockDataEntry>;
        let transformedData = Object.entries(timeSeries).map(([timeString, values]) => ({
          time: (new Date(timeString)).getTime() / 1000 as Time, // Convert and explicitly cast as 'Time'
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
        }));
      
        // Sort the data in ascending order by time
        transformedData.sort((a, b) => (a.time > b.time ? 1 : -1));
      
        return transformedData;
      };
      
      const formattedData = transformData(data[0]); // Access the first object
      if (candlestickSeries) {
        candlestickSeries.setData(formattedData);
      }
    }, []);
  
    return <div ref={chartContainerRef} id="chartContainer" />;
  };
  
  export default AlphaVantage;