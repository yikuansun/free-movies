<script lang="ts">
    import { onMount } from "svelte";

    import Icon from "@iconify/svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";

    import type { Movie } from "$lib/types";
    interface Props {
        movies: Movie[];
    }

    const { movies }: Props = $props();

    let scrollableDiv: HTMLDivElement | null = $state(null);

    const MOVIE_CARD_WIDTH = 240;

    let leftButtonDisabled = $state(false);
    let rightButtonDisabled = $state(false);

    const onScroll = () => {
        const scrollLeft = scrollableDiv?.scrollLeft as number;
        leftButtonDisabled = scrollLeft <= 0;
        rightButtonDisabled = scrollLeft >= (scrollableDiv?.scrollWidth as number) - (scrollableDiv?.clientWidth as number);
    }

    onMount(() => {
        onScroll();
    });
</script>

<div class="w-full relative group/carousel">
    <div class="w-full overflow-x-scroll snap-x snap-mandatory" bind:this={scrollableDiv} onscroll={onScroll}>
        <div class="w-fit flex flex-row">
            {#each movies.filter((movie) => !!movie) as movie (movie.watchUrl)}
                <div class="snap-start">
                    <MovieCard {movie} />
                </div>
            {/each}
        </div>
    </div>

    <div class="absolute left-full top-0 w-8 h-full"></div>
    <button class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 btn btn-circle opacity-0 group-hover/carousel:opacity-100 {rightButtonDisabled ? 'btn-disabled' : ''}"
        onclick={() => scrollableDiv?.scrollTo({ left: Math.floor((scrollableDiv?.scrollLeft + scrollableDiv?.clientWidth) / MOVIE_CARD_WIDTH) * MOVIE_CARD_WIDTH, behavior: "smooth" })}>
        <Icon icon="lucide:chevron-right" class="w-6 h-6" />
    </button>

    <div class="absolute right-full top-0 w-8 h-full"></div>
    <button class="absolute top-1/2 left-0 -translate-1/2 btn btn-circle opacity-0 group-hover/carousel:opacity-100 {leftButtonDisabled ? 'btn-disabled' : ''}"
        onclick={() => scrollableDiv?.scrollTo({ left: Math.ceil((scrollableDiv?.scrollLeft - scrollableDiv?.clientWidth) / MOVIE_CARD_WIDTH) * MOVIE_CARD_WIDTH, behavior: "smooth" })}>
        <Icon icon="lucide:chevron-left" class="w-6 h-6" />
    </button>
</div>