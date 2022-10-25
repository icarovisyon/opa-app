
/**
 * 
 * @param {descricao_dados} label 
 * @param {dados} datasets 
 * @param {descricao} decription 
 * @param {html_element} element
 */
function barGraph(label, datasets, decription, element) {
    const ctx = document.getElementById(element).getContext('2d')

    let chartStatus = Chart.getChart(element)
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    Chart.defaults.font.family = 'roboto'
    Chart.defaults.font.size = 18
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: decription,
                data: datasets,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(245, 149, 64, 0.2)',
                    'rgba(232, 159, 65, 0.2)',
                    'rgba(232, 145, 67, 0.2)'
                ],
                borderColor: [
                    '#fff'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            labels: {
                fontColor: 'blue'
            }


        }
    })
}

