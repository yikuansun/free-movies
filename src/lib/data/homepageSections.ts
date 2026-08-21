import { type Movie } from "$lib/types";
import { localStore } from "$lib/localStore.svelte";

export interface HomepageSection {
    displayName: string;
    filter: (movie: Movie) => boolean;
}

export const homepageSectionsMap: Record<string, HomepageSection> = {
    "watchlist": {
        displayName: "Watchlist",
        filter: (movie) => localStore.watchlist.includes(movie.watchUrl),
    },
    "favorites": {
        displayName: "Favorites",
        filter: (movie) => localStore.favorites.includes(movie.watchUrl),
    },
    "top-rated": {
        displayName: "Top Rated",
        filter: (movie) => (movie.rating as number) >= 7.9,
    },
    "genre:crime": {
        displayName: "Crime Movies",
        filter: (movie) => movie.genres?.includes("Crime") || false,
    },
    "genre:drama": {
        displayName: "Dramas",
        filter: (movie) => movie.genres?.includes("Drama") || false,
    },
    "genre:action": {
        displayName: "Action Movies",
        filter: (movie) => movie.genres?.includes("Action") || false,
    },
    "genre:scifi": {
        displayName: "Science Fiction",
        filter: (movie) => movie.genres?.includes("Sci-Fi") || false,
    },
};

export const availableHomepageSectionKeys: string[] = Object.keys(homepageSectionsMap);