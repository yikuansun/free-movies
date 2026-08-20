import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from 'node:process';
import { youtube } from '@googleapis/youtube';

loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));
const { OMDB_API_KEY } = process.env;

const inputFile = fileURLToPath(new URL('../src/lib/assets/movie-urls.txt', import.meta.url));
const outputFile = fileURLToPath(new URL('../src/lib/assets/movie-catalog.json', import.meta.url));

async function getVideoTitle(url) {
  const yt = youtube({
    version: "v3",
    auth: process.env.YOUTUBE_DATA_API_KEY,
  });

  const videoId = new URL(url).searchParams.get('v');
  if (!videoId) return null;

  const response = await yt.videos.list({
    part: ['status', 'snippet'],
    id: [videoId],
  });

  const video = response.data.items?.[0];
  if (!video) return null;

  const title = video.snippet.title;

  // Check if using title-year format (ex.: Cape Fear (1991))
  const match = title.match(/^(.+?)\s+\((\d{4})\)$/)
  if (match) return match[1];

  return title;
}

async function getOmdbData(title) {
  const endpoint = new URL("https://www.omdbapi.com/");
  endpoint.searchParams.append("apikey", OMDB_API_KEY);
  endpoint.searchParams.append("t", title);
  endpoint.searchParams.append("type", "movie");

  const response = await fetch(endpoint);
  if (!response.ok) return null;
  const data = await response.json();
  return data;
}

async function getVideoMetadata(url) {
  const title = await getVideoTitle(url);
  if (!title) return null;
  const omdbData = await getOmdbData(title);
  if (!omdbData) return null;
  return {
    title: title,
    year: parseInt(omdbData.Year),
    imdbId: omdbData.imdbID,
    poster: omdbData.Poster,
    description: omdbData.Plot,
    watchUrl: url,
    rating: parseFloat(omdbData.imdbRating),
    runtime: omdbData.Runtime,
    genres: omdbData.Genre?.split(/,\s*/),
    rated: omdbData.Rated,
  };
}

export async function createMovieCatalog(movieUrls) {
  const movies = movieUrls.split("\n");
  const promises = movies.map((url) => getVideoMetadata(url));
  let catalog = await Promise.all(promises);
  catalog = catalog.filter((movie) => !!movie);
  catalog.sort((a, b) => b.rating - a.rating);
  return catalog;
};

const movieUrls = await readFile(inputFile, 'utf8');
const catalog = await createMovieCatalog(movieUrls);
await writeFile(outputFile, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote ${catalog.length} movies to ${outputFile}`);