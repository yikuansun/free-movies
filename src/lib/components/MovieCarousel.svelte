<script lang="ts">
    import Icon from "@iconify/svelte";
    import MovieCard from "$lib/components/MovieCard.svelte";

    import type { Movie } from "$lib/types";
    interface Props {
        movies: Movie[];
    }

    const { movies }: Props = $props();

    let scrollableDiv: HTMLDivElement | null = $state(null);

    const MOVIE_CARD_WIDTH = 240;

    let showRightArrow = $state(false);
    let showLeftArrow = $state(false);
    let rightArrowHoverBox: HTMLDivElement | null = $state(null);
    let leftArrowHoverBox: HTMLDivElement | null = $state(null);
</script>

<div class="w-full relative">
    <div class="w-full overflow-x-scroll snap-x snap-mandatory" bind:this={scrollableDiv}>
        <div class="w-fit flex flex-row">
            {#each movies.filter((movie) => !!movie) as movie (movie.watchUrl)}
                <div class="snap-start">
                    <MovieCard {movie} />
                </div>
            {/each}
        </div>
    </div>

    <div class="absolute right-0 top-0 translate-x-1/2 w-20 h-full pointer-events-none" bind:this={rightArrowHoverBox}></div>
    <button class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 btn btn-circle opacity-{showRightArrow ? '100' : '0'}"
        onclick={() => scrollableDiv?.scrollTo({ left: Math.floor((scrollableDiv?.scrollLeft + scrollableDiv?.clientWidth) / MOVIE_CARD_WIDTH) * MOVIE_CARD_WIDTH, behavior: "smooth" })}>
        <Icon icon="lucide:chevron-right" class="w-6 h-6" />
    </button>

    <div class="absolute left-0 top-1/2 -translate-1/2 w-20 h-full opacity-0 hover:opacity-100 transition-opacity" bind:this={leftArrowHoverBox}></div>
    <button class="absolute top-1/2 left-0 -translate-1/2 btn btn-circle opacity-{showLeftArrow ? '100' : '0'}"
        onclick={() => scrollableDiv?.scrollTo({ left: Math.ceil((scrollableDiv?.scrollLeft - scrollableDiv?.clientWidth) / MOVIE_CARD_WIDTH) * MOVIE_CARD_WIDTH, behavior: "smooth" })}>
        <Icon icon="lucide:chevron-left" class="w-6 h-6" />
    </button>
</div>

<svelte:window onmousemove={(e) => {
    if (e.clientX > rightArrowHoverBox?.getBoundingClientRect().left && e.clientX < rightArrowHoverBox?.getBoundingClientRect().right
        && e.clientY > rightArrowHoverBox?.getBoundingClientRect().top && e.clientY < rightArrowHoverBox?.getBoundingClientRect().bottom) {
        showRightArrow = true;
        showLeftArrow = false;
    } 
    else if (e.clientX > leftArrowHoverBox?.getBoundingClientRect().left && e.clientX < leftArrowHoverBox?.getBoundingClientRect().right
        && e.clientY > leftArrowHoverBox?.getBoundingClientRect().top && e.clientY < leftArrowHoverBox?.getBoundingClientRect().bottom) {
        showLeftArrow = true;
        showRightArrow = false;
    }
    else {
        showRightArrow = false;
        showLeftArrow = false;
    }
}} />