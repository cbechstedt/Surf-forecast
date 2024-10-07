"use client"

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { marineWeatherCurrrent, windForecastCurrent, marineWeatherDaily } from '../services/openMeteoApi';
import { useMarineData } from '../context/MarineDataContext';

const data = {
  Brazil: {
    "Rio Grande do Sul": [
      { name: "Atlantida", lat: -29.654, lon: -50.010 },
      { name: "Torres", lat: -29.335, lon: -49.728 }
    ],
    "Santa Catarina": [
      { name: "Ferrugem", lat: -28.022, lon: -48.620 },
      { name: "Campeche", lat: -27.670, lon: -48.481 }
    ]
  },
  Australia: {
    "NSW": [
      { name: "Manly", lat: -33.800, lon: 151.287 },
      { name: "Avoca", lat: -33.459, lon: 151.436 }
    ],
    "WA": [
      { name: "Margaret River", lat: -33.951, lon: 115.073 },
      { name: "Perth", lat: -31.950, lon: 115.860 }
    ]
  }
};

export const Dropdowns = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedBeach, setSelectedBeach] = useState(null);
  // const [marineCurrentData, setMarineCurrentData] = useState(null);
  const [marineForecastData, setMarineForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setMarineCurrentData, setWindCurrentData, setMarineWeekData } = useMarineData();

  // Carregar regiões baseado no país selecionado
  const regions = selectedCountry ? Object.keys(data[selectedCountry]) : [];

  // Carregar praias baseado na região selecionada
  const beaches = selectedRegion ? data[selectedCountry][selectedRegion].map(({ name, lat, lon }) => {
    return {
      name,
      lat,
      lon
    };
  }) : [];

  useEffect(() => {
    const fetchMarineData = async () => {
      if (!selectedBeach) return;

      setLoading(true);
      try {
        const { lat, lon } = selectedBeach;
        const marineCurrentData = await marineWeatherCurrrent(lat, lon);
        setMarineCurrentData(marineCurrentData);

        const windCurrentData = await windForecastCurrent(lat, lon);
        setWindCurrentData(windCurrentData);

        const marineWeekData = await marineWeatherDaily(lat, lon);
        setMarineWeekData(marineWeekData);

      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
        setMarineCurrentData(null);
        setWindCurrentData(null);

      } finally {
        setLoading(false);
      }
    };

    fetchMarineData();
  }, [selectedBeach, setMarineCurrentData, setMarineWeekData, setWindCurrentData]);

  return (
    <div className="flex flex-col gap-7">
      {/* Dropdown para selecionar País */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedCountry || "Select Country"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Country</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedCountry} onValueChange={(value) => {
            setSelectedCountry(value);
            setSelectedRegion(''); // Resetar a região quando o país mudar
            setSelectedBeach(null);  // Resetar a praia quando o país mudar

          }}>
            <DropdownMenuRadioItem value="Brazil">Brazil</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Australia">Australia</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dropdown para selecionar Região/Estado */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={!selectedCountry}>
            {selectedRegion || "Select Region"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Region</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedRegion} onValueChange={(value) => {
            setSelectedRegion(value);
            setSelectedBeach(null); // Resetar a praia quando a região mudar
          }}>
            {regions.map((region) => (
              <DropdownMenuRadioItem key={region} value={region}>
                {region}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dropdown para selecionar Praia */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={!selectedRegion}>
            {selectedBeach?.name || "Select Beach"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Beach</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedBeach?.name} onValueChange={(value) => {
            setSelectedBeach(beaches.find((beach) => beach.name === value));
          }}>
            {beaches.map((beach) => (
              <DropdownMenuRadioItem key={beach.name} value={beach.name}>
                {beach.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
