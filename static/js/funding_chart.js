const ctx = document.getElementById('funding_monthly');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [{
      label: '월별 펀딩 금액 (단위: 백만 원)',
      data: [12, 19, 3, 5, 2, 3, 15, 10, 8, 20, 11, 9],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: '월별 펀딩 금액 추이',
        color: '#000000',
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '금액 (백만 원)'
        }
      },
      x: {
        title: {
          display: true,
          text: '월'
        }
      }
    }
  }
});

const ctx2 = document.getElementById('funding_genre');

new Chart(ctx2, {
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
        text: '장르별 펀딩 비중',
        color: '#000000',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    }
  }
});

const ctx3 = document.getElementById('funding_success');

new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['100% 이상', '70~99%', '50~69%', '0~49%'],
    datasets: [{
      label: '프로젝트 수',
      data: [12, 5, 8, 3],
      backgroundColor: ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: '펀딩 목표 달성률 분포',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '프로젝트 수'
        }
      }
    }
  }
});