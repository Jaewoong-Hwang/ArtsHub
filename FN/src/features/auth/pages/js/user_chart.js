const ctx = document.getElementById('user-stats');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['활동 중', '승인 대기', '정지', '탈퇴', '휴면'],
    datasets: [{
      data: [40, 15, 5, 10, 3],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#9e9e9e', '#2196f3'],
    }]
  }
});