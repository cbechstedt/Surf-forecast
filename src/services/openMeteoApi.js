export const marineForecastDaily = async (lat, lon) => {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&daily=wave_height_max,wave_period_max,wave_direction_dominant&timezone=auto`;

    const response = await fetch(url);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição marineForecastDaily`);
    }

    const data = await response.json();

    // Verifica se o campo 'daily' existe na resposta
    if (!data.daily) {
      throw new Error('Dados diários não disponíveis');
    }

    const { daily: {time, wave_height_max, wave_period_max, wave_direction_dominant} } = data;

    // Validação adicional para garantir que os dados existam
    if (!time || !wave_height_max || !wave_period_max || !wave_direction_dominant) {
      throw new Error('Dados incompletos retornados pela API');
    }
    
    return {
      waveHeight: wave_height_max,
      wavePeriod: wave_period_max,
      waveDirection: wave_direction_dominant,
      time
    };

  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    return null;
  }
};

export const marineForecastCurrent = async (lat, lon) => {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period&timezone=auto`;

    const response = await fetch(url);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição marineForecastCurrent`);
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

export const weatherForecastCurrent = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=wind_speed_10m,wind_direction_10m&timezone=auto`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição windForecast`);
    }

    const data = await response.json();

    if (!data.current) {
      throw new Error('Dados de vento não disponíveis');
    }

    const { wind_speed_10m, wind_direction_10m } = data.current;
    return {
      windSpeed: wind_speed_10m,
      windDirection: wind_direction_10m
    };
    
  } catch (error) {
    console.error('Erro ao buscar os dados de windForecast:', error);
    return null;
  }
}

export const weatherForecastDaily = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=wind_speed_10m_max,wind_direction_10m_dominant,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição windForecast`);
    }

    const data = await response.json();
    console.log(data);
    
    if (!data.daily) {
      throw new Error('Dados de vento diário não disponíveis');
    }

    const { daily: {time, wind_speed_10m_max, wind_direction_10m_dominant} } = data;

    if (!time || !wind_speed_10m_max || !wind_direction_10m_dominant) {
      throw new Error('Dados incompletos retornados pela API');
    }

    return {
      windSpeedDaily: wind_speed_10m_max,
      windDirectionDaily: wind_direction_10m_dominant,
      timeDaily: time
    };

  } catch (error) {
    console.error('Erro ao buscar os dados de windForecast:', error);
    return null;
  }
}