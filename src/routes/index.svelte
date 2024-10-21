<script lang="ts">
    import logo from '$assets/logo.svg'
</script>

<div>
    <div style="padding-bottom: 30px">
        <img src={logo} class="logo main-logo" alt="Logo" />
        <h1>Welcome to the Aggro Weather Platform</h1><br/>
        <h4>Here you can make weather forecasts using the weather APIs of your choice</h4>
    </div>

    <p>
        <u>Step 1</u>: Add your preferred <strong>locations</strong><br/><br/>
    </p>
    <a href="/locations"><button class="app-btn">Locations</button></a><br/><br/>
    <p>
        <u>Step 2</u>: Add the <strong>weather APIs</strong> of your choice<br/>
        Default:
        <a class="default-links" href="https://open-meteo.com/" target="_blank">METEO</a>
        &
        <a class="default-links" href="https://www.weatherapi.com/" target="_blank">WEATHER API</a>
        <br/><br/>
    </p>
    <a href="/remote_apis"><button class="app-btn">Remote APIs</button></a><br/><br/>
    <p>
        <u>Step 3</u>: View the weather <strong>forecasts</strong><br/><br/>
    </p>
    <a href="/forecasts"><button class="app-btn">Forecasts</button></a>
<!--    <div class="card"></div>-->

</div>
<style>
    .logo {
        height: 9em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .default-links {
        color: #646cffaa;
    }
    .default-links:hover {
        color: #f4812e;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .logo.main-logo:hover {
        filter: drop-shadow(0 0 2em #f4812e);
    }
    .read-the-docs {
        color: #888;
    }
</style>