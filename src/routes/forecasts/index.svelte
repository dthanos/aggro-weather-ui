<script lang="ts">
    import DataTable from '$components/global/DataTable.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import {type Forecast, type forecastView} from "$util/types.ts";
    import {datetimeDatabaseToHuman} from "$util/helpers.js";
    import {settings} from "$stores/global";

    let data: Forecast[];
    let view: forecastView = 'Daily';
    let loaded: boolean = false;
    let headers = [
        { field: "datetime", column: 'Date' },
        { field: "temperature", column: "Temperature (°C)" },
        { field: "precipitation", column: "Precipitation (mm)" },
        { field: "location", column: "Location" },
        { field: "remote_api", column: "API" },
    ];

    function filterForecasts(newData: Forecast[]): void {
        let result: any[] = [];
        newData.filter(i => i.step === view).forEach(i => {
            i.datetime.forEach((j: any, index: any) => {
                result.push({
                    datetime: datetimeDatabaseToHuman(j),
                    temperature: i.temperature[index],
                    precipitation: i.precipitation[index],
                    location: i.location.name,
                    remote_api: i.remote_api.name
                });
            })
        })
        data = result;
    }
    function toggleView(){
        view = view === 'Daily' ? 'Hourly' : 'Daily';
        headers[headers.findIndex(i => i.field === 'datetime')].column = view === 'Daily' ? 'Date' : 'Datetime'
        fetchForecasts();
    }
    const onRefresh = () => {
        loaded = false;
        axios.put(`${$settings.baseUrl}/forecast/run`, {})
            .finally(() => loaded = true);
    }
    const fetchForecasts = () => {
        loaded = false;
        axios.get(`${$settings.baseUrl}/forecast`)
            .then(r => filterForecasts(r.data.data))
            .finally(() => loaded = true);
    }
    onMount(async () => {
        await onRefresh();
        fetchForecasts();
    })
</script>


<h3>Forecast List</h3>
<h4>View the weather forecasts based on locations and APIs registered</h4>
<br/>
<DataTable
    {headers}
    {data}
    {loaded}
    type="forecasts"
    variant="{view}"
    on:refresh={() => onRefresh()}
    on:toggle={() => toggleView()}
/>