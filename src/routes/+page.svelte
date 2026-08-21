<script lang="ts">
    import { onMount } from "svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";
    import movieCatalog from "$lib/assets/movie-catalog.json";
    import MovieCarousel from "$lib/components/MovieCarousel.svelte";
    import { localStore } from "$lib/localStore.svelte";
    import { homepageSectionsMap } from "$lib/data/homepageSections";

    let movies: any[] = $state([]);

    let watchlist = $derived(localStore.watchlist);
    let favorites = $derived(localStore.favorites);

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
    {#each localStore.homepageLayout as homepageSectionId, i (homepageSectionId)}
        {@const sectionTitle = homepageSectionsMap[homepageSectionId].displayName}
        {@const sectionMovies = movies.filter(homepageSectionsMap[homepageSectionId].filter)}
        {#if sectionMovies.length > 0}
            <h2 class="text-2xl font-bold mb-2">{sectionTitle}</h2>
            <MovieCarousel movies={sectionMovies} />
            {#if i < localStore.homepageLayout.length - 1}
                <div class="divider"></div>
            {/if}
        {/if}
    {/each}
</div>