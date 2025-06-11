import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const FundingCharts = () => {
    const monthlyRef = useRef(null);
    const genreRef = useRef(null);
    const successRef = useRef(null);

    const monthlyChartInstance = useRef(null);
    const genreChartInstance = useRef(null);
    const successChartInstance = useRef(null);

    useEffect(() => {
        axios.get('/api/admin/chart-data')
            .then((res) => {
                console.log("응답 데이터", res.data);
                const { monthly, genre, successRate } = res.data;

                //  월별 차트 생성 전에 기존 차트 제거
                if (monthlyRef.current) {
                    monthlyChartInstance.current?.destroy();
                    monthlyChartInstance.current = new Chart(monthlyRef.current, {
                        type: 'line',
                        data: {
                            labels: monthly.labels,
                            datasets: [{
                                label: '월별 펀딩 금액 (단위: 백만 원)',
                                data: monthly.values,
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: { responsive: false }
                    });
                }

                //  장르별 차트
                if (genreRef.current) {
                    genreChartInstance.current?.destroy();
                    genreChartInstance.current = new Chart(genreRef.current, {
                        type: 'doughnut',
                        data: {
                            labels: genre.labels,
                            datasets: [{
                                label: '장르별 펀딩 금액',
                                data: genre.values,
                                backgroundColor: ['#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#e74c3c'],
                                borderWidth: 2
                            }]
                        },
                        options: { responsive: false }
                    });
                }
                //  성공률 차트
                if (successRef.current) {
                    successChartInstance.current?.destroy();
                    successChartInstance.current = new Chart(successRef.current, {
                        type: 'bar',
                        data: {
                            labels: successRate.labels,
                            datasets: [{
                                label: '프로젝트 수',
                                data: successRate.values,
                                backgroundColor: ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c']
                            }]
                        },
                        options: { responsive: false }
                    });
                }
            });

        //  언마운트 시 차트 제거
        return () => {
            monthlyChartInstance.current?.destroy();
            genreChartInstance.current?.destroy();
            successChartInstance.current?.destroy();
        };
    }, []);

    return (
        <>
            <div className="funding-content-chart">
                <h3>월별 펀딩 금액 추이</h3>
                <canvas ref={monthlyRef} width="800" height="500" />
            </div>

            <div className="funding-content-chart">
                <h3>장르별 펀딩 비율</h3>
                <canvas ref={genreRef} width="400" height="400" />
            </div>

            <div className="funding-content-chart">
                <h3>펀딩 성공률 분포</h3>
                <canvas ref={successRef} width="500" height="400" />
            </div>
        </>
    );
};

export default FundingCharts;
