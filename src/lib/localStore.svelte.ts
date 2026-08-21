export const localStore = $state({
    watchlist: [] as string[],
    favorites: [] as string[],
    homepageLayout: [
        "watchlist",
        "favorites",
        "top-rated",
        "genre:crime",
        "genre:drama",
        "genre:action",
        "genre:scifi",
    ],
});

export function syncLocalStore() {
    localStore.watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    localStore.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    localStore.homepageLayout = JSON.parse(localStorage.getItem("homepageLayout") || `["watchlist","favorites","top-rated","genre:crime","genre:drama","genre:action","genre:scifi"]`);

    $effect(() => {
        localStorage.setItem("watchlist", JSON.stringify(localStore.watchlist));
        localStorage.setItem("favorites", JSON.stringify(localStore.favorites));
        localStorage.setItem("homepageLayout", JSON.stringify(localStore.homepageLayout));
    });
}