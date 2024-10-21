<script lang="ts">
    import { datetimeDatabaseToHuman, nameNormalize } from "$util/helpers.js";
    import {Pencil, PlusCircle, RefreshCw, Trash} from 'lucide-svelte';
    import { createEventDispatcher } from "svelte";
    import {SkeletonText} from "carbon-components-svelte";

    export let headers: any = [];
    export let data: any = [];
    export let loaded: boolean = false;
    export let type: string | undefined;
    export let variant: string;

    const dispatch = createEventDispatcher();
</script>


<table>
    <thead>
    <tr>
        {#each headers as header}
            <th>{header.column}</th>
        {/each}
        {#if type === 'forecasts'}
            <th style="text-align: left; display: flex; align-items: center">
                <a href="#" on:click={() => dispatch('refresh')}>
                    <RefreshCw style="color: #f4812e; cursor: pointer;" />
                </a>
                <a href="#" class="toggle" on:click={() => dispatch('toggle')}>{variant}</a>
            </th>
        {:else}
            <th style="text-align: left;">
                <a href="#" on:click={() => dispatch('create')}>
                    <PlusCircle style="color: green; cursor: pointer;" />
                </a>
            </th>
        {/if}
    </tr>
    </thead>
    {#if loaded}
        <tbody>
            {#if data.length}
                {#each data as row}
                    <tr>
                        {#each headers as header}
                            {#if header.field.includes('_date') || header.field.includes('_at')}
                                <td>{datetimeDatabaseToHuman(row[header.field])}</td>
                            {:else}
                                <td>{row[header.field] ?? '-'}</td>
                            {/if}
                        {/each}
                        <td>
                        {#if type !== 'forecasts'}
                            <div style="display: flex">
                                <a href="#" on:click={() => dispatch('edit', row)} style="margin-right: 10px">
                                    <Pencil style="color: yellow; cursor: pointer;" />
                                </a>
                                <a href="#" on:click={() => dispatch('delete', row.id)}>
                                    <Trash style="color: red; cursor: pointer;" />
                                </a>
                            </div>
                        {/if}
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    {/if}
</table>
{#if !loaded}
    <br/>
    <SkeletonText  width="100%" />
    <SkeletonText  width="100%" />
    <SkeletonText  width="100%" />
    <SkeletonText  width="100%" />
    <SkeletonText  width="100%" />
{:else if !data.length}
    <h6 style="text-align: center; padding-top: 20px;">No records - Data table empty</h6>
{/if}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }

    th {
        background-color: #1a1a1a;
        font-weight: 700;
    }

    tr:nth-child(even) {
        background-color: #1a1a1a;
    }

    tr:hover {
        background-color: #1a1a1a;
    }

    .toggle {
        padding-left: 10px;
        text-decoration: underline;
    }
    .toggle:hover {
        color: #f4812e;
    }
</style>
