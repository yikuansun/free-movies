<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Icon from '@iconify/svelte';
	import { resolve } from '$app/paths';
	import { syncLocalStore } from '$lib/localStore.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		syncLocalStore();
	});
</script>

<div class="navbar sticky top-0 glass z-10 shadow-md">
    <div class="navbar-start mx-3">
        <h2 class="text-2xl font-bold">KINOPEN</h2>
    </div>
    <div class="navbar-center">
		<a href={resolve('/')} class="btn btn-ghost">
			Home
		</a>
		<a href={resolve('/search')} class="btn btn-ghost">
			All Movies
		</a>
    </div>
	<div class="navbar-end mx-3">
		<button class="btn btn-ghost btn-circle">
			<Icon icon="lucide:settings" inline={true} title="Settings" />
		</button>
	</div>
</div>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
