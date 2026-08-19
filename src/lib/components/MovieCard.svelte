<script lang="ts">
    const { movie } = $props();

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
            <div class="w-full h-full flex justify-center items-center">
                <h2 class="text-2xl opacity-55 font-bold">{movie.title}</h2>
            </div>
        {/if}
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