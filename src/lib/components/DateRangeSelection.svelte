<script lang="ts">
    export let range: string;
</script>
<style>

</style>
<div class="date-range-selection">
    <label for="date-range">Show data for: </label>
    <select name="date-range" id="date-range" bind:value={range}>
        <!-- values are the selected time range in milliseconds -->
        <option value="3600000">Last Hour</option>
        <option value="86400000">Last 24 hours</option>
        <option value="604800000">Last 7 days</option>
    </select>
</div>