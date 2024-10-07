export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Opções de formatação para o dia da semana e o dia do mês
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Quebrar a string para ter o nome do dia e o dia do mês separados
  const [weekday, monthDay] = formattedDate.split(', ');

  // Devolver no formato "Wed | Out 2"
  return `${weekday} | ${monthDay}`;
};