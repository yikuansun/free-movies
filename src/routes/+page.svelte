<script lang="ts">
    import { onMount } from "svelte";
    import movieCatalog from "$lib/assets/movie-catalog.json";
    import MovieCarousel from "$lib/components/MovieCarousel.svelte";
    import { localStore } from "$lib/localStore.svelte";
    import { homepageSectionsMap } from "$lib/data/homepageSections";

    let movies: any[] = $state([]);

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

{#if localStore.showWelcomeScreen}
    <div class="modal modal-open">
        <div class="modal-box text-center">
            <h2 class="text-3xl font-bold mb-2">Welcome to Kinoa!</h2>
            <p class="mb-2">
                Kinoa is the world's first completely free, open-source, and legal movie streaming website.
            </p>
            <p class="mb-2">
                Find movies to add to your watchlist, and save your favorites for future rewatching. Customize your homepage in Settings to browse your way.
            </p>
            <p class="mb-2">
                All data is stored locally on your device and never leaves your browser. No tracking, no ads, no data collection.
            </p>
            <button class="btn btn-primary mt-2" onclick={() => { localStore.showWelcomeScreen = false; }}>
                Start Watching
            </button>
        </div>
    </div>
{/if}