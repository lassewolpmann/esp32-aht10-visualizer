import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
    const { range } = await request.json();
    const response = await prisma.tempHumidityData.findMany();

    const result = response.filter((entry) => {
        const entryTimestamp = entry.createdAt.getTime();
        const currentTimestamp = new Date().getTime();

        return currentTimestamp - range <= entryTimestamp
    })

    let dates = [];
    let temps = [];
    let humidity = [];

    for (let entry of result) {
        if (entry.temp !== -50 && entry.humidity !== 0) {
            dates.push(entry.createdAt.toISOString())
            temps.push(entry.temp)
            humidity.push(entry.humidity)
        }
    }

    return json({
        dates: dates,
        temps: temps,
        humidity: humidity
    })
};