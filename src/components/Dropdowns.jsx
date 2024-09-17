"use client"

import React, { useState } from 'react';
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

const data = {
  Brazil: {
    "Rio Grande do Sul": ["Atlantida", "Torres"],
    "Santa Catarina": ["Ferrugem", "Campeche"],
  },
  Australia: {
    NSW: ["Manly", "Avoca"],
    WA: ["Margaret River", "Perth"],
  },
};

export const Dropdowns = () => {
  // Estados para armazenar seleções
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedBeach, setSelectedBeach] = useState('');
  
  // Carregar regiões baseado no país selecionado
  const regions = selectedCountry ? Object.keys(data[selectedCountry]) : [];
  
  // Carregar praias baseado na região selecionada
  const beaches = selectedRegion ? data[selectedCountry][selectedRegion] : [];

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
            setSelectedBeach('');  // Resetar a praia quando o país mudar
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
            setSelectedBeach(''); // Resetar a praia quando a região mudar
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
            {selectedBeach || "Select Beach"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Beach</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedBeach} onValueChange={setSelectedBeach}>
            {beaches.map((beach) => (
              <DropdownMenuRadioItem key={beach} value={beach}>
                {beach}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
