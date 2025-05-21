
const ctx = document.getElementById('project_genre');

new Chart(ctx, {
  type: 'doughnut', // ✅ 오타 수정
  data: {
    labels: ['뮤지컬', '발레', '서커스', '연극', '오페라', '콘서트'],
    datasets: [{
      label: '장르별 펀딩 금액 (단위: 백만 원)',
      data: [120, 80, 40, 70, 50, 100],  // 임의 데이터
      backgroundColor: [
        '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#e74c3c'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: '장르별 프로젝트 수',
        color: '#000000',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    }
  }
});
const ctx3 = document.getElementById('project_rank');

new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['100% 이상', '70~99%', '50~69%', '0~49%'],
    datasets: [{
      label: '프로젝트 수',
      data: [12, 5, 8, 3],
      backgroundColor: [
        '#4CAF50',  // 초록
        '#FFB300',  // 진한 노랑
        '#FF7043',  // 주황
        '#EF5350'   // 빨강
      ],
      borderRadius: 8,
      barPercentage: 0.6,
      categoryPercentage: 0.6
    }]
  },
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: '달성률에 따른 프로젝트 수',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Pretendard, sans-serif'
        },
        color: '#333'
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 10
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#333',
        font: {
          weight: 'bold',
          size: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 13
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          font: {
            size: 13
          }
        },
        title: {
          display: true,
          text: '프로젝트 수',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  },
});