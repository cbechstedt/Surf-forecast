import React, { useState, useEffect } from 'react'
import { useMarineData } from '@/context/MarineDataContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from '@/utils/formatDate';
import { degreesToCardinal } from '@/utils/degreesToCardinal';

export function TableForecast() {
  const { marineWeekData, windWeekData } = useMarineData();
  const { time, waveHeight, wavePeriod, waveDirection } = marineWeekData || {};
  const { windSpeedDaily, windDirectionDaily } = windWeekData || {};
  
  const hasValidData =
    time?.length === 7 &&
    waveHeight?.length === 7 &&
    wavePeriod?.length === 7 &&
    waveDirection?.length === 7 &&
    windSpeedDaily?.length === 7 &&
    windDirectionDaily?.length === 7;

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

  if (!hasValidData) return null; // Garantir que todos os dados estão disponíveis antes de renderizar

  // Cria uma estrutura de linhas onde cada métrica será uma linha e os valores correspondentes a cada dia
  const metrics = [
    { label: "Wave Height (m)", values: waveHeight },
    { label: "Swell Direction", values: waveDirection.map(degreesToCardinal) },
    { label: "Period (s)", values: wavePeriod },
    { label: "Wind Speed (km/h)", values: windSpeedDaily },
    { label: "Wind Direction", values: windDirectionDaily.map(degreesToCardinal) },
  ];


  return (
    <Table>
      <TableCaption>7 days forecast</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {time.map((day) => (
            <TableHead className='text-muted-foreground' key={day}>
              {isSmallScreen ? formatDate(day).slice(0, 3) : formatDate(day)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.label}>
            <TableCell className='text-muted-foreground font-medium'>{metric.label}</TableCell>
            {metric.values.map((value, index) => (
              <TableCell className='text-blue' key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
