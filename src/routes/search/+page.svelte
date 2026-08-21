<script lang="ts">
	import { onMount } from 'svelte';
    import movieCatalog from '$lib/assets/movie-catalog.json';
	import MovieCard from '$lib/components/MovieCard.svelte';
    import Icon from '@iconify/svelte';

    let movies: any[] = $state([]);
    let searchTerm = $state("");

    onMount(() => {
        movies = movieCatalog;
    })
</script>

<div class="py-5 px-10 w-full sticky top-16 z-5 bg-base-100">
    <label class="input w-full">
        <Icon icon="lucide:search" inline={true} class="opacity-50" />
        <input type="search" bind:value={searchTerm} placeholder="Search" />
    </label>
</div>

<div class="block text-center">
    {#if movies.length === 0}
        No results found.
    {/if}
    {#each movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())) as movie (movie.watchUrl)}
        <MovieCard {movie} />
    {/each}
</div>