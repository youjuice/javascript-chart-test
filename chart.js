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
        const maxValue = Math.max(...values);

        // 큰 값 범위 감지 (최대값이 1000 이상인 경우)
        const hasLargeValues = maxValue > 1000;

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
                        // 큰 값이 있을 경우 로그 스케일 사용
                        type: hasLargeValues ? 'logarithmic' : 'linear',
                        beginAtZero: true,

                        ticks: {
                            callback: function(value) {
                                // 1000 이상의 값은 K 단위로 표시
                                if (value >= 1000) {
                                    return (value / 1000) + 'K';
                                }
                                return value;
                            }
                        },

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
                },

                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let value = context.raw;
                                return 'VALUE: ' + value.toLocaleString();
                            }
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