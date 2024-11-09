'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Ruler, Waves, Wind, Hourglass } from 'lucide-react'
import { ChartOverview } from './ChartOverview'
import { useMarineData } from '../context/MarineDataContext'
import { degreesToCardinal } from '@/utils/degreesToCardinal'
import { Maps } from './Maps'
import { TableForecast } from './TableForecast'

export const SurfDashboard = () => {
  const { marineCurrentData, windCurrentData, selectedBeach } = useMarineData();

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
    <div className='flex flex-col gap-4'>
      <h1 className='text-blue text-base sm:text-xl'>{selectedBeach?.name || 'Select a beach'}</h1>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Wave Height</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Ruler />
            <p>{marineCurrentData?.waveHeight} m</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Swell Direction</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Waves />
            <p>{degreesToCardinal(marineCurrentData?.waveDirection)}</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Wind</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Wind />
            <p>{degreesToCardinal(windCurrentData?.windDirection)} - {windCurrentData?.windSpeed} km/h</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Period</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Hourglass />
            <p>{marineCurrentData?.wavePeriod} s</p>
          </CardContent>
        </Card>
      </section>

      <section className='flex gap-8'>
        <Card className='w-full md:max-w-[900px] text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {selectedBeach ? `This is a description of the surf conditions at ${selectedBeach?.name}` : ''}
            </CardDescription>
            <ChartOverview />
          </CardContent>
        </Card>
        {!isSmallScreen &&
        <div className='size-96'>
          <Maps />
        </div>}
      </section>

      <section>
        <Card className='w-full md:max-w-[900px] text-blue bg-slate-600/10 border-blue/80 border-2'>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {selectedBeach ? `7 days forecast for ${selectedBeach?.name}` : ''}
            </CardDescription>
            <TableForecast />
          </CardContent>
        </Card>
      </section>
      {isSmallScreen &&
        <div className='size-96'>
          <Maps />
        </div>}
    </div>
  )

}

export default SurfDashboard;
