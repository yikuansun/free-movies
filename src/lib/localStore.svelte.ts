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
    showWelcomeScreen: false,
});

export function syncLocalStore() {
    localStore.watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    localStore.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    localStore.homepageLayout = JSON.parse(localStorage.getItem("homepageLayout") || `["watchlist","favorites","top-rated","genre:crime","genre:drama","genre:action","genre:scifi"]`);
    localStore.showWelcomeScreen = JSON.parse(localStorage.getItem("showWelcomeScreen") || "true");

    $effect(() => {
        localStorage.setItem("watchlist", JSON.stringify(localStore.watchlist));
        localStorage.setItem("favorites", JSON.stringify(localStore.favorites));
        localStorage.setItem("homepageLayout", JSON.stringify(localStore.homepageLayout));
        localStorage.setItem("showWelcomeScreen", JSON.stringify(localStore.showWelcomeScreen));
    });
}