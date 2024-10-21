<script lang="ts">
    import {breadcrumbs} from "$stores/breadcrumb"
    import {activeRoute} from "@roxi/routify";
    import {nameNormalize} from "$util/helpers.js";
    import {HomeIcon} from "lucide-svelte";


    activeRoute.subscribe((route) => {
        if(!route) breadcrumbs.set([{ name: 'Home', href: '/' }]);
        else if(route.url === "") return;
        else {
            let routes = route?.url?.split("/")?.map(i => {
                return {name: i.charAt(0).toUpperCase() + i.slice(1), href: i};
            }).filter(i => !!i.name);
            routes.unshift({name: 'Home', href: '/'});
            breadcrumbs.set(routes);
        }
    })
</script>

<nav>
    <ul class="breadcrumb">
        {#each $breadcrumbs as crumb, index}
            <li>
                {#if crumb.href === '#'}
                    <span>{nameNormalize(crumb.name)}</span>
                {:else if crumb.href === '/'}
                    <a href={crumb.href}>
                        <HomeIcon size="20" style="color: #f4812e; cursor: pointer;" />
                    </a>
                    {#if $breadcrumbs.length > 1}
                        <div id="breadcrumb-separator">&nbsp;/&nbsp;</div>
                    {/if}
                {:else}
                    {#if index !== $breadcrumbs.length - 1}
                        <a href={crumb.href}>
                            {nameNormalize(crumb.name)}
                        </a>
                        <div id="breadcrumb-separator">&nbsp;/&nbsp;</div>
                    {:else}
                        <span>{nameNormalize(crumb.name)}</span>
                    {/if}
                {/if}
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        background-color: #1a1a1a;
        padding: 1rem;
        border-radius: 0.375rem;
    }

    .breadcrumb {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .breadcrumb li {
        display: flex;
        align-items: center;
    }

    .breadcrumb a {
        text-decoration: none;
        color: #007bff;
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .breadcrumb li:last-child {
        font-weight: 700;
        color: #fff;
    }
    .breadcrumb #breadcrumb-separator {
        font-weight: 700;
        color: #fff;
    }
</style>