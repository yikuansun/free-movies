export interface Movie {
    watchUrl: string;
    title: string | null;
    year: number | null;
    poster: string | null;
    imdbId: string | null;
    runtime: string | null;
    rating: number | null;
    genres: string[] | null;
    description: string | null;
}

export interface HomepageSection {
    id: string;
    displayName: string;
    filter: (movie: Movie) => boolean;
}