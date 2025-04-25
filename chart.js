/**
 * chart.js - 차트 관련 모듈
 */

window.ChartModule = (function() {
    let dataChart;

    // 차트 초기화 또는 업데이트하는 함수
    function initOrUpdateChart(data) {
        const ctx = document.getElementById('data-chart').getContext('2d');

        // 기존 차트 제거
        if (dataChart) {
            dataChart.destroy();
        }

        // 차트 데이터 준비
        const labels = data.map(item => `ID: ${item.id}`);
        const values = data.map(item => item.value);

        // 차트 생성
        dataChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'VALUE',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'VALUE'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'ID'
                        }
                    }
                }
            }
        });
    }

    return {
        initOrUpdateChart
    };
})();