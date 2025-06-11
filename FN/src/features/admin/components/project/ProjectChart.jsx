import { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ProjectCharts = () => {
    const genreRef = useRef(null);
    const rankRef = useRef(null);
    const genreChartInstance = useRef(null);
    const rankChartInstance = useRef(null);

    useEffect(() => {
        axios.get('/api/admin/project-chart-data')
            .then((res) => {
                const { genreStats, achievementStats } = res.data;

                const genreLabels = Object.keys(genreStats);
                const genreValues = Object.values(genreStats);

                const achievementLabels = Object.keys(achievementStats);
                const achievementValues = Object.values(achievementStats);

                // 기존 차트 제거
                genreChartInstance.current?.destroy();
                rankChartInstance.current?.destroy();

                genreChartInstance.current = new Chart(genreRef.current, {
                    type: 'doughnut',
                    data: {
                        labels: genreLabels,
                        datasets: [{
                            label: '장르별 프로젝트 수',
                            data: genreValues,
                            backgroundColor: [
                                '#3498db', '#2ecc71', '#e67e22',
                                '#9b59b6', '#f1c40f', '#e74c3c'
                            ],
                            borderColor: '#ffffff',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            legend: { display: true, position: 'bottom' },
                            title: {
                                display: true,
                                text: '장르별 프로젝트 수',
                                color: '#000000',
                                font: { size: 18, weight: 'bold' }
                            }
                        }
                    }
                });

                rankChartInstance.current = new Chart(rankRef.current, {
                    type: 'bar',
                    data: {
                        labels: achievementLabels,
                        datasets: [{
                            label: '프로젝트 수',
                            data: achievementValues,
                            backgroundColor: ['#4CAF50', '#FFB300', '#FF7043', '#EF5350'],
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
                                font: { size: 20, weight: 'bold', family: 'Pretendard, sans-serif' },
                                color: '#333'
                            },
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#333',
                                titleFont: { size: 14 },
                                bodyFont: { size: 14 },
                                padding: 10
                            }
                        },
                        scales: {
                            x: {
                                ticks: { font: { size: 13 } },
                                grid: { display: false }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 2, font: { size: 13 } },
                                title: {
                                    display: true,
                                    text: '프로젝트 수',
                                    font: { size: 14, weight: 'bold' }
                                }
                            }
                        }
                    }
                });
            });

        return () => {
            genreChartInstance.current?.destroy();
            rankChartInstance.current?.destroy();
        };
    }, []);

    return (
        <div className="content-chart">
            <canvas ref={genreRef} width="400" height="400" />
            <canvas ref={rankRef} width="400" height="400" />
        </div>
    );
};

export default ProjectCharts;
