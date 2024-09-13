async function loadCSV() {
    const response = await fetch('data.csv');
    const text = await response.text();
    return text.split('\n').map(row => row.split(','));
}

async function createChart() {
    const data = await loadCSV();
    const labels = [];
    const checkingData = [];
    const savingsData = [];
    const combinedData = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length < 4) continue;

        labels.push(row[0]);
        checkingData.push(parseFloat(row[1]) || 0);
        savingsData.push(parseFloat(row[2]) || 0);
        combinedData.push(parseFloat(row[3]) || 0);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Checking',
                    data: checkingData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4,
                },
                {
                    label: 'Savings',
                    data: savingsData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4,
                },
                {
                    label: 'Combined Amount',
                    data: combinedData,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4,
                }
            ]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            if (label) {
                                return `${label}: $${context.raw.toFixed(2)}`;
                            }
                            return '';
                        }
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount',
                        font: {
                            size: 16
                        }
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return `$${value}`;
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuad'
            }
        }
    });
}

createChart();
