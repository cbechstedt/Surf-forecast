'use client'

import React from 'react'
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

export const SurfDashboard = () => {
  const { marineCurrentData, windCurrentData } = useMarineData();

  return (
    <div className='flex flex-col gap-4'>
      <h1>campeche</h1>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='text-blue bg-slate-600/5 border-blue/30'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Wave Height</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Ruler />
            <p>{marineCurrentData?.waveHeight} m</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/5 border-blue/30'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Swell Direction</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Waves />
            <p>{degreesToCardinal(marineCurrentData?.waveDirection)}</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/5 border-blue/30'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Wind</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Wind />
            <p>{windCurrentData?.windSpeed} km/h {degreesToCardinal(windCurrentData?.windDirection)}</p>
          </CardContent>
        </Card>

        <Card className='text-blue bg-slate-600/5 border-blue/30'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Period</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            <Hourglass />
            <p>{marineCurrentData?.wavePeriod} s</p>
          </CardContent>
        </Card>

      </section>
      <section>
        <Card className='w-full md:w-2/3 md:max-w-[900px] text-blue bg-slate-600/5 border-blue/30'>
          <CardHeader>
            <CardTitle className='text-base sm:text-xl'>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              This is a description of the surf conditions at Campeche
            </CardDescription>
            <ChartOverview />
          </CardContent>
          <CardFooter>
            <button className='text-blue'>More info</button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )

}

export default SurfDashboard;
