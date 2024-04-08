import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
    const { temp, humidity } = await request.json();

    await prisma.tempHumidityData.create({
        data: {
            temp: temp,
            humidity: humidity
        }
    })

    return json({
        temp: temp,
        humidity: humidity
    });
};