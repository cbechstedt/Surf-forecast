'use client';

import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
export const MarineDataContext = createContext();

// Provider para envolver a aplicação
export const MarineDataProvider = ({ children }) => {
  const [marineCurrentData, setMarineCurrentData] = useState(null);
  const [windCurrentData, setWindCurrentData] = useState(null);
  const [marineWeekData, setMarineWeekData] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);

  const values = {
    marineCurrentData,
    setMarineCurrentData,
    windCurrentData,
    setWindCurrentData,
    marineWeekData,
    setMarineWeekData,
    selectedBeach,
    setSelectedBeach,
  }

  return (
    <MarineDataContext.Provider value={values}>
      {children}
    </MarineDataContext.Provider>
  );
};

export const useMarineData = () => useContext(MarineDataContext);