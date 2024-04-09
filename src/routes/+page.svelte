<script lang="ts">
    import DataChart from "$lib/components/DataChart.svelte";
    import DateRangeSelection from "$lib/components/DateRangeSelection.svelte";

    let range: string;

    const getData = async () => {
        const response = await fetch('/api/data-fetcher', {
            method: 'POST',
            body: JSON.stringify({ range }),
            headers: {
                'content-type': 'application/json',
            }
        });
        return await response.json();
    }

    let promise = getData();
    $: if (range) {
        promise = getData();
    }
</script>
<DateRangeSelection bind:range={range} />
{#await promise}
    <p>Generating Chart...</p>
{:then res}
    <main>
        <DataChart data={res} />
    </main>
{/await}