<script lang="ts">
	import { onMount } from 'svelte';
    import movieCatalog from '$lib/assets/movie-catalog.json';
	import MovieCard from '$lib/components/MovieCard.svelte';

    let movies: any[] = $state([]);

    onMount(() => {
        movies = movieCatalog;
    })
</script>

<div class="block text-center">
    {#if movies.length === 0}
        <br />
        <span class="loading loading-spinner loading-lg"></span>
    {/if}
    {#each movies as movie (movie.watchUrl)}
        <MovieCard {movie} />
    {/each}
</div>