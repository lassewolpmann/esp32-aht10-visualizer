<script lang="ts">
    import { Chart, type ChartConfiguration, type ChartOptions } from "chart.js/auto";
    import { onMount } from "svelte";

    export let data: {
        dates: string[],
        humidity: number[],
        temps: number[]
    };

    console.log(data);

    let tempChart: HTMLCanvasElement;

    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: "Temperature",
                data: data.temps,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y_temp'
            },
            {
                label: "Humidity",
                data: data.humidity,
                fill: false,
                borderColor: 'rgb(255, 50, 50)',
                tension: 0.1,
                yAxisID: 'y_humidity'
            }
        ]
    }

    const chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            y_temp: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperature in °C'
                },
                ticks: {
                    callback: function(value: string | number) {
                        return value + ' °C';
                    }
                }
            },
            y_humidity: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Relative Humidity in %'
                },
                grid: {
                    drawOnChartArea: false
                },
                ticks: {
                    callback: function(value: string | number) {
                        return value + ' %rH';
                    }
                }
            }
        }
    }

    const chartConfig: ChartConfiguration = {
        type: 'line',
        data: chartData,
        options: chartOptions
    }

    onMount(() => {
        const ctx = tempChart.getContext('2d');
        if (ctx) {
            new Chart(ctx, chartConfig);
        }
    })
</script>
<style>

</style>
<div>
    <canvas bind:this={tempChart} id="temp-chart"></canvas>
</div>