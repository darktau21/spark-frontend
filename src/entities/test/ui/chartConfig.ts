export const getData = (results: number[] = [], prevResults: number[] = []) => ({
  labels: ['ERM', 'TMM', 'SS', 'ERS', 'TMS', 'EMP', 'ERI', 'PL', 'PRO', 'SF', 'IMP', 'NEU', 'CNTL'],
  datasets: [
    {
      label: 'Текущий результат',
      backgroundColor: 'rgba(193, 207, 255, 0.5)',
      borderColor: 'rgba(37, 78, 220, 1)',
      pointBackgroundColor: 'rgba(37, 78, 220, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: results,
    },
    {
      label: 'Предыдущий результат',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: prevResults,
    },
  ],
});

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      min: 0,
      max: 24,
      beginAtZero: true,
      ticks: {
        stepSize: 4,
      },
    },
  },
};
