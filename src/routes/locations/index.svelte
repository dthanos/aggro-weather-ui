<script lang="ts">
    import DataTable from '$components/global/DataTable.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import {type Location} from "$util/types.ts";
    import CustomModal from "$components/modals/CustomModal.svelte";
    import {TextInput} from "carbon-components-svelte";
    import {settings} from "$stores/global";
    import {latLongRule} from "$util/helpers";
    import {toast} from "svelte-french-toast";

    let headers = [
        { field: "name", column: "Name"},
        { field: "latitude", column: "Latitude"},
        { field: "longitude", column: "Longitude"},
        { field: "created_at", column: "Created at"},
    ];
    let data: Location[];
    let modalValue: boolean = false;
    let create: boolean = false;
    let loaded: boolean = false;
    let location: Location = {};

    const onSubmit = () => {
        // Validation
        const valid = location.name && latLongRule(location?.latitude?.toString()) && latLongRule(location?.longitude?.toString())
        if(!valid){
            toast.error("Invalid input. Please check all fields.");
            return;
        }
        create
            ? axios.post(`${$settings.baseUrl}/location`, location)
                .then(r => data = [...data, r.data.data])
                .finally(() => {
                    toast.success("Location added successfully");
                    modalValue = false
                })
            : axios.put(`${$settings.baseUrl}/location/${location.id}`, location)
                .then(r => data[data.findIndex(i => i.id === location.id)] = r.data.data)
                .finally(() => {
                    toast.success("Location updated successfully");
                    modalValue = false
                });
    }
    const onDelete = (id) =>
        axios.delete(`${$settings.baseUrl}/location/${id}`)
                .then(r => data = data.filter(i => i.id !== id))
                .finally(() => {
                    toast.success("Location deleted successfully");
                    modalValue = false
                })
    onMount(() => {
        axios.get(`${$settings.baseUrl}/location`)
            .then(r => data = r.data.data)
            .finally(() => loaded = true);
    })
    $: if(!modalValue) location = {}
</script>


<h3>Location List</h3>
<h4>Add, edit or remove locations</h4>
<br/>
<DataTable
    {headers}
    {data}
    {loaded}
    on:create={() => {
        create = true
        modalValue = true
    }}
    on:edit={(e) => {
        create = false
        location = e.detail
        modalValue = true
    }}
    on:delete={(e) => {
        create = false
        onDelete(e.detail)
    }}
/>
<CustomModal
    title="{(create ? 'Create' : 'Edit') + ' location'}"
    bind:open={modalValue}
    size="medium"
>
    <TextInput
        required
        labelText="Name"
        placeholder="Enter name..."
        invalid="{!location.name}"
        invalidText="This field is required"
        bind:value={location.name}
    />
    <br/>
    <TextInput
        required
        labelText="Latitude"
        placeholder="Enter latitude..."
        invalid="{!latLongRule(location?.latitude?.toString())}"
        invalidText="This field is required and must have the following example form: 34.1"
        bind:value={location.latitude}
    />
    <br/>
    <TextInput
        required
        labelText="Longitude"
        placeholder="Enter longitude..."
        invalid="{!latLongRule(location?.longitude?.toString())}"
        invalidText="This field is required and must have the following example form: 34.1"
        bind:value={location.longitude}
    />
    <div slot="footer">
        <button class="modal-btn error-color" style="background-color: #ff0000" on:click={() => (modalValue = false)}>Dismiss</button>
        <button class="modal-btn success-color" on:click={() => onSubmit()}>Submit</button>
    </div>
</CustomModal>
