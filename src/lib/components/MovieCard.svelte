<script lang="ts">
    const { movie } = $props();
    import { localStore } from "$lib/localStore.svelte";
    
    let watchlisted = $derived(localStore.watchlist.includes(movie.watchUrl));
    let favorited = $derived(localStore.favorites.includes(movie.watchUrl));

    import Icon from '@iconify/svelte';

    let imageError = $state(false);
</script>

<div
    class="group image-full card m-3 inline-grid h-80 w-54 bg-base-300 align-middle shadow-lg/32"
    role="button"
    tabindex="0"
    aria-label="Show details for {movie.title}"
>
    <figure>
        {#if !imageError}
            <img src={movie.poster} alt={movie.title} loading="lazy"
                class="w-full brightness-100" onerror={() => { imageError = true; }} />
        {:else}
            <div class="w-full h-full flex justify-center items-center text-center">
                <h2 class="text-2xl opacity-55 font-bold">{movie.title}</h2>
            </div>
        {/if}
    </figure>
    <div
        class="pointer-events-none card-body min-h-0 overflow-hidden rounded-lg bg-neutral/72 backdrop-blur-xs text-left opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100"
    >
        <h2 class="card-title">{movie.title}</h2>
        <div class="grow overflow-hidden">
            <p class="text-sm mb-1 text-nowrap">{movie.runtime} • {movie.rated} • {movie.genres?.[0]}</p>
            <p class="text-xs">{movie.description}</p>
        </div>
        <div class="card-actions justify-center">
            <div class="w-full flex flex-row gap-2">
                <a target="_blank" href="https://www.imdb.com/title/{movie.imdbId}" class="btn btn-soft btn-info btn-sm flex-1" title="Learn More">
                    <Icon icon="lucide:info" inline={true} />
                </a>
                <button title={watchlisted ? "Remove from Watchlist" : "Add to Watchlist"} class="btn {watchlisted ? "" : "btn-soft"} btn-accent btn-sm flex-1"
                    onclick={() => {
                        if (watchlisted) {
                            localStore.watchlist = localStore.watchlist.filter((url) => url !== movie.watchUrl);
                        } else {
                            localStore.watchlist = [movie.watchUrl, ...localStore.watchlist];
                        }
                    }}>
                    <Icon icon="lucide:list-video" inline={true} />
                </button>
                <button title={favorited ? "Unfavorite" : "Favorite"} class="btn {favorited ? "": "btn-soft"} btn-secondary btn-sm flex-1"
                    onclick={() => {
                        if (favorited) {
                            localStore.favorites = localStore.favorites.filter((url) => url !== movie.watchUrl);
                        } else {
                            localStore.favorites = [movie.watchUrl, ...localStore.favorites];
                        }
                    }}>
                    <Icon icon="lucide:heart" inline={true} />
                </button>
            </div>
            <a target="_blank" href={movie.watchUrl} class="btn btn-primary btn-sm btn-block w-full">
                <Icon icon="lucide:play" inline={true} />
                Watch Now
            </a>
        </div>
    </div>
</div>