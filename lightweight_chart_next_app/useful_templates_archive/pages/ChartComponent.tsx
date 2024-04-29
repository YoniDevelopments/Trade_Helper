"use client";

import Head from 'next/head';
import ChartComponent from '../components/ChartComponent';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Trading Chart</title>
        <meta name="description" content="Trading chart using Lightweight Charts" />
      </Head>

      <main>
        <h1>Trading Chart</h1>
        <ChartComponent />
      </main>
    </div>
  );
}