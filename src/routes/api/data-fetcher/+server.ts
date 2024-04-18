import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from "$lib/prisma";

export interface APIChartData {
    dates: string[],
    temps: number[],
    humidity: number[]
}

interface TempHumidityData {
    tempValues: number[],
    humidityValues: number[]
}

export const POST: RequestHandler = async ({ request }) => {
    const { range } = await request.json();
    let step: number;

    if (range === '3600000') { // range of one hour
        step = 60 * 1000; // step of one minute
    } else if (range === '86400000') { // range of 24 hours
        step = 15 * 60 * 1000; // step of 15 minutes
    } else if (range === '604800000') { // range of seven days
        step = 30 * 60 * 1000; // step of one hour
    } else {
        step = +range / 60;
    }

    let chartData: APIChartData = {
        dates: [],
        temps: [],
        humidity: []
    };

    const response = await prisma.tempHumidityData.findMany();


    const filteredEntries = response.filter((entry) => {
        let entryTimestamp = entry.createdAt.getTime();
        const currentTimestamp = new Date().getTime();

        return currentTimestamp - range <= entryTimestamp
    })

    // Create empty Array to collect all temperatures of the given rounded step and then take average
    const valuesForEachTimestamp: { [key: string]: TempHumidityData } = {};

    let currentTimestamp = new Date().getTime();
    currentTimestamp -= currentTimestamp % step;

    let firstTimestamp = currentTimestamp - range;
    firstTimestamp -= firstTimestamp % step;

    for (let i = firstTimestamp; i <= currentTimestamp; i += step) {
        valuesForEachTimestamp[i.toString()] = {
            tempValues: [],
            humidityValues: []
        };
    }

    for (let entry of filteredEntries) {
        let entryTimestamp = entry.createdAt.getTime();
        entryTimestamp -= entryTimestamp % step;
        valuesForEachTimestamp[entryTimestamp.toString()].tempValues.push(entry.temp);
        valuesForEachTimestamp[entryTimestamp.toString()].humidityValues.push(entry.humidity);
    }

    for (let timestamp of Object.keys(valuesForEachTimestamp)) {
        const data = valuesForEachTimestamp[timestamp]

        if (data) {
            const tempSum = data.tempValues.reduce((sum, current) => sum + current, 0);
            let averageTemp = tempSum / data.tempValues.length;

            const humiditySum = data.humidityValues.reduce((sum, current) => sum + current, 0);
            let averageHumidity = humiditySum / data.humidityValues.length;

            chartData.dates.push(new Date(+timestamp).toLocaleString('fi', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }));
            chartData.temps.push(+averageTemp.toPrecision(4));
            chartData.humidity.push(+averageHumidity.toPrecision(4));
        }
    }

    return json(chartData)
};