<script lang="ts">
    import MovieCard from "$lib/components/MovieCard.svelte";
    const { movies } = $props();
</script>

<div class="w-full overflow-x-scroll snap-x snap-mandatory">
    <div class="w-fit flex flex-row">
        {#each movies as movie (movie.watchUrl)}
            <div class="snap-start">
                <MovieCard {movie} />
            </div>
        {/each}
    </div>
</div>