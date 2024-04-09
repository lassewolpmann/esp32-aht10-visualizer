<script lang="ts">
    import type { PageData } from "../../.svelte-kit/types/src/routes/$types";

    import DataChart from "$lib/components/DataChart.svelte";
    import DateRangeSelection from "$lib/components/DateRangeSelection.svelte";

    export let data: PageData;

    let dates: string[] = []
    let temps: number[] = []
    let humidity: number[] = []

    for (let entry of data.entries) {
        dates.push(entry.createdAt.toISOString())
        temps.push(entry.temp)
        humidity.push(entry.humidity)
    }
</script>
<main>
    <DateRangeSelection />
    <DataChart {dates} tempData={temps} humidityData={humidity} />
</main>