<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Icon from '@iconify/svelte';
	import { resolve } from '$app/paths';
	import { syncLocalStore } from '$lib/localStore.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	let burgerMenuOpen = $state(false);

	onMount(() => {
		syncLocalStore();
	});
</script>

<div class="navbar sticky top-0 glass z-10 shadow-md">
    <div class="navbar-start mx-3">
        <h2 class="text-2xl font-bold">KINOA</h2>
    </div>
    <div class="navbar-center hidden sm:flex">
		<a href={resolve('/')} class="btn btn-ghost">
			Home
		</a>
		<a href={resolve('/search')} class="btn btn-ghost">
			All Movies
		</a>
    </div>
	<div class="navbar-end mx-3 hidden sm:flex">
		<button class="btn btn-ghost btn-circle" title="Settings">
			<Icon icon="lucide:settings" inline={true} width="20" />
		</button>
	</div>
	<div class="navbar-end mx-3 flex sm:hidden">
		<button class="btn btn-ghost btn-circle" title="Menu" onclick={() => { burgerMenuOpen = true; }}>
			<Icon icon="lucide:menu" inline={true} width="20" />
		</button>
	</div>
</div>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

{#if burgerMenuOpen}
	<div class="modal modal-end modal-open sm:hidden" out:fade={{ duration: 100 }}>
		<button class="modal-backdrop" onclick={() => { burgerMenuOpen = false; }}
			title="Return to page"></button>
		<div class="modal-box">
			<ul class="menu min-h-full w-64">
				<li><a href={resolve('/')} onclick={() => { burgerMenuOpen = false; }}>Home</a></li>
				<li><a href={resolve('/search')} onclick={() => { burgerMenuOpen = false; }}>All Movies</a></li>
				<li><button onclick={() => { burgerMenuOpen = false; }}>Settings</button></li>
			</ul>
			<button class="btn btn-circle btn-ghost absolute right-5 top-3" title="Close Menu" onclick={() => { burgerMenuOpen = false; }}>
				<Icon icon="lucide:x" inline={true} width="20" />
			</button>
		</div>
	</div>
{/if}