<script lang="ts">
    import { onMount } from "svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";
    import movieCatalog from "$lib/assets/movie-catalog.json";
    import MovieCarousel from "$lib/components/MovieCarousel.svelte";

    let movies: any[] = $state([]);

    let topRatedMovies = $derived(movies.filter((movie) => parseFloat(movie.rating) >= 7.9));
    let crimeMovies = $derived(movies.filter((movie) => movie.genres?.includes("Crime")));
    let dramaMovies = $derived(movies.filter((movie) => movie.genres?.includes("Drama")));
    let actionMovies = $derived(movies.filter((movie) => movie.genres?.includes("Action")));
    let scifiMovies = $derived(movies.filter((movie) => movie.genres?.includes("Sci-Fi")));

    onMount(() => {
        movies = movieCatalog;
    })
</script>

<div class="p-10">
    <h2 class="text-2xl font-bold mb-2">Critically-Acclaimed</h2>
    <MovieCarousel movies={topRatedMovies} />

    <div class="divider"></div>

    <h2 class="text-2xl font-bold mb-2">Crime Movies</h2>
    <MovieCarousel movies={crimeMovies} />

    <div class="divider"></div>

    <h2 class="text-2xl font-bold mb-2">Dramas</h2>
    <MovieCarousel movies={dramaMovies} />

    <div class="divider"></div>

    <h2 class="text-2xl font-bold mb-2">Action Movies</h2>
    <MovieCarousel movies={actionMovies} />

    <div class="divider"></div>

    <h2 class="text-2xl font-bold mb-2">Science Fiction</h2>
    <MovieCarousel movies={scifiMovies} />
</div>