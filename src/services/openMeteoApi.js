  export const marineWeatherDaily = async (lat, lon) => {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=America%2FSao_Paulo`;

    const response = await fetch(url);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição MarineWeatherDaily`);
    }

    const data = await response.json();

    // Verifica se o campo 'daily' existe na resposta
    if (!data.daily) {
      throw new Error('Dados diários não disponíveis');
    }

    const { wave_height_max, wave_direction_dominant, wave_period_max, time } = data.daily;

    // Validação adicional para garantir que os dados existam
    if (!wave_height_max || !wave_direction_dominant || !wave_period_max || !time) {
      throw new Error('Dados incompletos retornados pela API');
    }

    return {
      waveHeightMax: wave_height_max,
      waveDirectionDominant: wave_direction_dominant,
      wavePeriodMax: wave_period_max,
      time
    };

  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    return null;
  }
};

  export const marineWeatherCurrrent = async (lat, lon) => {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period&timezone=America%2FSao_Paulo`;
    
    const response = await fetch(url);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição MarineWeatherCurrrent`);
    }

    const data = await response.json();

    // Verifica se o campo 'current' existe na resposta
    if (!data.current) {
      throw new Error('Dados da corrente não disponíveis');
    }

    const { time, wave_height, wave_direction, wave_period } = data.current;

    // Validação adicional para garantir que os dados existam
    if (!wave_height || !wave_direction || !time || !wave_period) {
      throw new Error('Dados incompletos retornados pela API');
    }

    return {
      waveHeight: wave_height,
      waveDirection: wave_direction,
      wavePeriod: wave_period,
      time
    };

  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    return null;
  }
};

  export const geoLocation = async (name) => {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=pt&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição geoLocation`);
    }

    const data = await response.json();

    if (!data.results) {
      throw new Error('Dados de geolocalização não disponíveis');
    }

    const responseMAp = data.results.map((beach) => {
      return {
        name: beach.name,
        country: beach.country,
        lat: beach.latitude,
        lon: beach.longitude
      };
    })

    return responseMAp;
  } catch (error) {
    console.error('Erro ao buscar os dados de geolocalização:', error);
    return null;
  }
}
