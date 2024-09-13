async function loadCSV() {
    const response = await fetch('data.csv');
    const text = await response.text();
    return text.split('\n').map(row => row.split(','));
}

function createChart(data) {
    const scatterData = [];

    for (let i = 1; i < data.length; i++) { // Start from 1 to skip the header row
        const [date, , , combined] = data[i]; // Ignore Checking and Savings, only take Combined Amount

        if (date && combined) {
            scatterData.push({
                x: new Date(date), // Date on the x-axis
                y: parseFloat(combined) // Combined Amount on the y-axis
            });
        }
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Combined Amount',
                data: scatterData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                pointRadius: 5, // Size of the points
                pointHoverRadius: 7 // Size of the points when hovered
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time', // Use the 'time' scale for date parsing
                    time: {
                        unit: 'month',
                        tooltipFormat: 'YYYY-MM-DD',
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Combined Amount (USD)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `$${tooltipItem.raw.y.toFixed(2)}`; // Format as currency
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}

loadCSV().then(data => {
    createChart(data);
});
