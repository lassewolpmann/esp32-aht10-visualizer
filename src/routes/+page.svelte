<script lang="ts">
    import type { PageData } from "../../.svelte-kit/types/src/routes/$types";
    import { Chart } from "chart.js/auto";
    import { onMount } from "svelte";

    export let data: PageData;
    let tempChart: HTMLCanvasElement;

    let dates: Date[] = []
    let temps: number[] = []
    let humidity: number[] = []

    for (let entry of data.entries) {
        dates.push(entry.createdAt.toISOString())
        temps.push(entry.temp)
        humidity.push(entry.humidity)
    }

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Temperature",
                data: temps,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y_temp'
            },
            {
                label: "Humidity",
                data: humidity,
                fill: false,
                borderColor: 'rgb(255, 50, 50)',
                tension: 0.1,
                yAxisID: 'y_humidity'
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        stacked: false,
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
                    callback: function(value, index, ticks) {
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
                    callback: function(value, index, ticks) {
                        return value + ' %rH';
                    }
                }
            }
        }
    }

    const chartConfig = {
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
<div>
    <canvas bind:this={tempChart} id="temp-chart"></canvas>
</div>