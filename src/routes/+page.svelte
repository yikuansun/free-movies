<script lang="ts">
	import { onMount } from 'svelte';
    import { createMovieCatalog } from '$lib/helpers/createMovieCatalog';

    let movies: any[] = $state([]);

    onMount(async () => {
        movies = await createMovieCatalog();
        console.log(movies);
    });
</script>

<ul>
    {#each movies as movie}
        <li>{movie.title} ({movie.year})</li>
    {/each}
</ul>