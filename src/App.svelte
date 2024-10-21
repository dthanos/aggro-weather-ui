<script lang="ts">
  import { Router, router } from "../.routify/instance.default.js";
  import Breadcrumb from "$components/global/Breadcrumb.svelte";
  import { Toaster, toast } from "svelte-french-toast";
  import {onMount} from "svelte";

  onMount(async () => {
    window.aggro = { toast: toast };
  });
</script>

<Breadcrumb />
<main>

  <Router router="{router}" />

</main>
<Toaster />

<style>
  main{
    width: 100%;
    height: 100%;
    padding-top: 50px;
  }
  :global(a) {
    text-decoration: none;
    color: #FFF;
  }
</style>