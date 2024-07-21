export const data = {
  labels: ['Молодец', 'Огурец', 'Холодец', 'Красавец', 'Пипец', 'Супец', 'Трындец', 'Кузнец'],
  datasets: [
    {
      label: 'Эрудит',
      backgroundColor: 'rgb(174, 174, 174,0.2)',
      borderColor: 'rgb(8, 17, 104)',
      pointBackgroundColor: 'rgb(8, 17, 104)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [18, 15, 46, 23, 6, 19, 11, 12],
    },
    {
      label: 'Фантазер',
      backgroundColor: 'rgb(174, 174, 174,0.2)',
      borderColor: 'rgb(37, 78, 220)',
      pointBackgroundColor: 'rgb(37, 78, 220)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [7, 24, 13, 42, 15, 8, 11, 15],
    },
    {
      label: 'Интроверт',
      backgroundColor: 'rgb(174, 174, 174,0.2)',
      borderColor: 'rgb(62, 33, 100)',
      pointBackgroundColor: 'rgb(62, 33, 100)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [27, 4, 18, 45, 10, 18, 19, 23],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
