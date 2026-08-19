import movieUrls from "$lib/assets/movie-urls.txt?raw";
import { PUBLIC_OMDB_API_KEY } from "$env/static/public";

async function getVideoTitle(url: string) {
  const endpoint = new URL("https://youtube.com/oembed");
  endpoint.searchParams.append("url", url);
  endpoint.searchParams.append("format", "json");

  const response = await fetch(endpoint);
  if (!response.ok) return null;
  const data = await response.json();
  return data.title;
}

async function getOmdbData(title: string) {
  const endpoint = new URL("https://www.omdbapi.com/");
  endpoint.searchParams.append("apikey", PUBLIC_OMDB_API_KEY);
  endpoint.searchParams.append("t", title);

  const response = await fetch(endpoint);
  if (!response.ok) return null;
  const data = await response.json();
  return data;
}

async function getVideoMetadata(url: string) {
  const title = await getVideoTitle(url);
  if (!title) return null;
  const omdbData = await getOmdbData(title);
  if (!omdbData) return null;
  return {
    title: title,
    year: omdbData.Year,
    imdbId: omdbData.imdbID,
    poster: omdbData.Poster,
    description: omdbData.Plot,
    watchUrl: url,
  };
}

export async function createMovieCatalog() {
  const movies = movieUrls.split("\n");
  const promises = movies.map((url) => getVideoMetadata(url));
  const catalog = await Promise.all(promises);
  catalog.filter((movie) => !!movie);
  return catalog;
};