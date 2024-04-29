"use client";

import Head from 'next/head';
import AlphaVantage from '../components/AlphaVantage';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Trading Chart</title>
        <meta name="description" content="Trading chart using Lightweight Charts" />
      </Head>

      <main>
        <h1>Trading Chart</h1>
        <AlphaVantage />
      </main>
    </div>
  );
}