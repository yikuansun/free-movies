<script lang="ts">
    import { onMount } from "svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";
    import movieCatalog from "$lib/assets/movie-catalog.json";
    import MovieCarousel from "$lib/components/MovieCarousel.svelte";

    let movies: any[] = $state([]);

    let topRatedMovies = $derived(movies.filter((movie) => parseFloat(movie.rating) >= 7.9));

    onMount(() => {
        movies = movieCatalog;
    })
</script>

<div class="p-10">
    <h2 class="text-2xl font-bold mb-2">Critically-Acclaimed</h2>
    <MovieCarousel movies={topRatedMovies} />
</div>