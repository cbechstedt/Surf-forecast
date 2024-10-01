export const degreesToCardinal = (degrees) => {
  const cardinals = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW"
  ];

  return cardinals[Math.round(degrees / 22.5) % 16];
};
