import { readable } from 'svelte/store';

const settings = readable({
    baseUrl: 'https://aggro-api.groupoftwo.xyz/api',
});

export { settings };