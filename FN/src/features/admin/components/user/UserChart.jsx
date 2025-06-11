import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const UserChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        axios.get('/api/admin/user-stats')
            .then((res) => {
                const { labels, data } = res.data;

                // 기존 차트가 있으면 제거
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(chartRef.current, {
                    type: 'doughnut',
                    data: {
                        labels,
                        datasets: [{
                            data,
                            backgroundColor: [
                                '#4caf50', // 활동 중
                                '#ff9800', // 승인 대기
                                '#f44336', // 정지
                                '#9e9e9e', // 탈퇴
                                '#2196f3'  // 휴면
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            title: {
                                display: true,
                                text: '회원 상태 통계',
                                font: {
                                    size: 18,
                                    weight: 'bold'
                                },
                                color: '#333'
                            }
                        }
                    }
                });
            })
            .catch((err) => {
                console.error('회원 통계 데이터를 불러오지 못했습니다.', err);
            });

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, []);

    return (
        <div className="content-chart">
            <canvas ref={chartRef} width="400" height="400" />
        </div>
    );
};

export default UserChart;
