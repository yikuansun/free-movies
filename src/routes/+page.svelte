<script lang="ts">
	import { onMount } from 'svelte';
    import { createMovieCatalog } from '$lib/helpers/createMovieCatalog';

    let movies: any[] = $state([]);

    onMount(async () => {
        movies = await createMovieCatalog();
        console.log(movies);
    });
</script>

<div class="block text-center">   
    {#each movies as movie (movie.imdbId)}
        <div class="card bg-base-100 image-full w-54 h-80 shadow-sm inline-grid align-middle m-3">
            <figure>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    class="brightness-100" />
            </figure>
            <div class="card-body bg-base-100/72 opacity-0 hover:opacity-100 transition-opacity text-left">
                <h2 class="card-title">{movie.title}</h2>
                <p>{movie.description}</p>
                <div class="card-actions justify-center">
                    <!--<button class="btn btn-secondary">Info</button>-->
                    <a target="_blank" href={movie.watchUrl}>
                        <button class="btn btn-primary">Watch</button>
                    </a>
                </div>
            </div>
        </div>
    {/each}
</div>