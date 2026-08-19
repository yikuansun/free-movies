<script lang="ts">
	import { onMount } from 'svelte';
    import { createMovieCatalog } from '$lib/helpers/createMovieCatalog';
    import Icon from '@iconify/svelte';

    let movies: any[] = $state([]);

    onMount(async () => {
        movies = await createMovieCatalog();
        console.log(movies);
    });
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
        <div
            class="group image-full card m-3 inline-grid h-80 w-54 bg-base-100 align-middle shadow-lg/32"
            role="button"
            tabindex="0"
            aria-label="Show details for {movie.title}"
        >
            <figure>
                <img src={movie.poster} alt={movie.title} loading="lazy"
                    class="w-full brightness-100 bg-base-300" />
            </figure>
            <div
                class="pointer-events-none card-body min-h-0 overflow-hidden rounded-lg bg-neutral/72 text-left opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100"
            >
                <h2 class="card-title">{movie.title}</h2>
                <div class="grow overflow-hidden">
                    <p class="text-xs">{movie.description}</p>
                </div>
                <div class="card-actions justify-center">
                    <a target="_blank" href="https://www.imdb.com/title/{movie.imdbId}">
                        <button class="btn btn-secondary btn-sm">
                            <Icon icon="lucide:info" inline={true} />
                            Info
                        </button>
                    </a>
                    <a target="_blank" href={movie.watchUrl}>
                        <button class="btn btn-primary btn-sm">
                            <Icon icon="lucide:play" inline={true} />
                            Watch
                        </button>
                    </a>
                </div>
            </div>
        </div>
    {/each}
</div>