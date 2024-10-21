<script lang="ts">
    import DataTable from '$components/global/DataTable.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import {type RemoteAPI} from "$util/types.ts";
    import CustomModal from "$components/modals/CustomModal.svelte";
    import {TextInput} from "carbon-components-svelte";
    import {settings} from "$stores/global";
    import {toast} from "svelte-french-toast";
    import {latLongRule} from "$util/helpers";

    let headers = [
        { field: "name", column: "Name" },
        { field: "url", column: "URL" },
        { field: "api_key", column: "API key" },
        { field: "created_at", column: "Created at" },
    ];
    let data: RemoteAPI[];
    let modalValue: boolean = false;
    let create: boolean = false;
    let loaded: boolean = false;
    let remote_api: RemoteAPI = {};

    const onSubmit = () => {
        // Validation
        const valid = remote_api.name && remote_api.url
        if(!valid){
            toast.error("Invalid input. Please check all fields.");
            return;
        }
        create
            ? axios.post(`${$settings.baseUrl}/remote_api`, remote_api)
                .then(r => data = [...data, r.data.data])
                .finally(() => {
                    toast.success("Remote API added successfully");
                    modalValue = false
                })
            : axios.put(`${$settings.baseUrl}/remote_api/${remote_api.id}`, remote_api)
                .then(r => data[data.findIndex(i => i.id === remote_api.id)] = r.data.data)
                .finally(() => {
                    toast.success("Remote API updated successfully");
                    modalValue = false
                });
    }
    const onDelete = (id) =>
        axios.delete(`${$settings.baseUrl}/remote_api/${id}`)
                .then(r => data = data.filter(i => i.id !== id))
                .finally(() => {
                    toast.success("Remote API deleted successfully");
                    modalValue = false
                })
    onMount(() => {
        axios.get(`${$settings.baseUrl}/remote_api`)
            .then(r => data = r.data.data)
            .finally(() => loaded = true);
    })
    $: if(!modalValue) remote_api = {}
</script>


<h3>Remote API List</h3>
<h4>Add, edit or remove weather APIs</h4>
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
        remote_api = e.detail
        modalValue = true
    }}
    on:delete={(e) => {
        create = false
        onDelete(e.detail)
    }}
/>
<CustomModal
    title="{(create ? 'Create' : 'Edit') + ' remote API'}"
    bind:open={modalValue}
    size="medium"
>
    <TextInput
        required
        labelText="Name"
        placeholder="Enter name..."
        invalid="{!remote_api.name}"
        invalidText="This field is required"
        bind:value={remote_api.name}
    />
    <br/>
    <TextInput
        required
        labelText="URL"
        placeholder="Enter URL..."
        invalid="{!remote_api.url}"
        invalidText="This field is required"
        bind:value={remote_api.url}
    />
    <br/>
    <TextInput
        labelText="API key"
        placeholder="Enter API key..."
        bind:value={remote_api.api_key}
    />
    <div slot="footer">
        <button class="modal-btn error-color" style="background-color: #ff0000" on:click={() => (modalValue = false)}>Dismiss</button>
        <button class="modal-btn success-color" on:click={() => onSubmit()}>Submit</button>
    </div>
</CustomModal>
