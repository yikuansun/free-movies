import { onMount } from "svelte";

export const localStore = $state({
    watchlist: [] as string[],
    favorites: [] as string[],
});

export function syncLocalStore() {
    localStore.watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    localStore.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    $effect(() => {
        localStorage.setItem("watchlist", JSON.stringify(localStore.watchlist));
        localStorage.setItem("favorites", JSON.stringify(localStore.favorites));
    });
}