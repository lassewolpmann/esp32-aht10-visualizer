<script lang="ts">
    import { Chart, type ChartConfiguration, type ChartOptions, type ChartData } from "chart.js/auto";
    import { onMount } from "svelte";
    import type { APIChartData } from "../../routes/api/data-fetcher/+server";

    export let data: APIChartData;

    let tempChart: HTMLCanvasElement;

    const chartData: ChartData = {
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
                        value = +value;
                        return value.toPrecision(3) + ' °C';
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
                        value = +value;
                        return value.toPrecision(3) + ' %rH';
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