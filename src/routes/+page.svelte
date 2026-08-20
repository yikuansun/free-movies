<script lang="ts">
	import { onMount } from 'svelte';
    import movieCatalog from '$lib/assets/movie-catalog.json';
	import MovieCard from '$lib/components/MovieCard.svelte';

    let movies: any[] = $state([]);

    onMount(() => {
        movies = movieCatalog;
    })
</script>

<div class="navbar sticky top-0 glass z-10 shadow-md">
    <div class="flex-1">
        <h2 class="text-2xl font-bold mx-3">Legally Free Movies</h2>
    </div>
    <div class="flex-none">
    </div>
</div>

<div class="block text-center">
    {#if movies.length === 0}
        <br />
        <span class="loading loading-spinner loading-lg"></span>
    {/if}
    {#each movies as movie (movie.watchUrl)}
        <MovieCard {movie} />
    {/each}
</div>