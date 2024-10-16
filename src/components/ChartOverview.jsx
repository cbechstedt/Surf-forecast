'use client'

import React, { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { useMarineData } from '@/context/MarineDataContext'
import { formatDate } from '@/utils/formatDate'


export function ChartOverview() {
  const { marineWeekData } = useMarineData();
  const { time, waveHeight, wavePeriod } = marineWeekData || {};

  const hasValidData = time?.length === 7 && waveHeight?.length === 7 && wavePeriod?.length === 7;

  const weekDays = time?.map((day) => formatDate(day)) || [];

  const chartData = hasValidData ? [
    { day: weekDays[0], waveHeight: waveHeight[0], wavePeriod: wavePeriod[0] },
    { day: weekDays[1], waveHeight: waveHeight[1], wavePeriod: wavePeriod[1] },
    { day: weekDays[2], waveHeight: waveHeight[2], wavePeriod: wavePeriod[2] },
    { day: weekDays[3], waveHeight: waveHeight[3], wavePeriod: wavePeriod[3] },
    { day: weekDays[4], waveHeight: waveHeight[4], wavePeriod: wavePeriod[4] },
    { day: weekDays[5], waveHeight: waveHeight[5], wavePeriod: wavePeriod[5] },
    { day: weekDays[6], waveHeight: waveHeight[6], wavePeriod: wavePeriod[6] },
  ] : [];

  const chartConfig = {
    waveHeight: {
      label: "Wave Height",
      color: "#2563eb",
    },
    wavePeriod: {
      label: "Wave Period",
      color: "#60a5fa",
    },
  }

  // Estado para monitorar o tamanho da tela
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1020px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // Condicional para aplicar o tickFormatter com base no tamanho da tela
            tickFormatter={(value) => isSmallScreen ? value.slice(0, 3) : value}
          />
          <ChartTooltip content={<ChartTooltipContent className='text-white bg-black' />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="waveHeight" fill="var(--color-waveHeight)" radius={4} />
          <Bar dataKey="wavePeriod" fill="var(--color-wavePeriod)" radius={4} />
        </BarChart>
      </ChartContainer>

    </div>
  )
}
