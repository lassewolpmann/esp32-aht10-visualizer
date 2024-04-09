import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const response = await prisma.tempHumidityData.findMany();
    return { entries: response };
}) satisfies PageServerLoad;