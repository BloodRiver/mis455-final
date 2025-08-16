document.addEventListener('DOMContentLoaded', () => {
const ctx = document.getElementById('barchart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
      datasets: [{
        label: 'Student Enrollment',
        data: [30, 60, 65, 75, 82, 93],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx2 = document.getElementById('doughnut');

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
      datasets: [{
        label: 'Student Enrollment',
        data: [30, 60, 65, 75, 82, 93],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx3 = document.getElementById('barchart1');

  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
      datasets: [{
        label: 'Yearly Grades in %',
        data: [99, 85, 78, 58, 60, 30, 73, 65, 32, 20, 0],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx4 = document.getElementById('Linechart');

const mixedChart = new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: ['NSU', 'BUET', 'DU', 'Sagacity University','IUB', 'UODA', 'DIU', 'BRAC'],
    datasets: [
      {
        label: 'University',
        data: [25, 66, 85, 98, 10, 70, 62, 59],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgba(57, 180, 0, 1)',
          'coral',
          'rgba(63, 73, 94, 1)',
          'rgba(252, 196, 91, 1)',
          'rgba(167, 39, 0, 1)'
        ],
        order: 2
      },
      {
        label: 'Milestone',
        data: [28, 70, 88, 100,13, 73, 65, 62],
        type: 'line',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        order: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const ctx5 = document.getElementById('barchart2');

  new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
      datasets: [{
        label: 'Student Enrollment (Males) in %',
        data: [50, 68, 60, 78, 52, 99],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  const ctx6 = document.getElementById('barchart3');

  new Chart(ctx6, {
    type: 'bar',
    data: {
      labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
      datasets: [{
        label: 'Student Enrollment (Females) in %',
        data: [21, 55, 58, 65, 43, 93],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

});