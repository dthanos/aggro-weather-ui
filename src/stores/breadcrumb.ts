import { writable } from 'svelte/store';

const breadcrumbs = writable([
    { name: 'Home', href: '/' },
]);

export { breadcrumbs };