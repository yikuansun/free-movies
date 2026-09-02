import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from 'node:process';
import { youtube } from '@googleapis/youtube';
import { get } from 'node:http';

loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));
const { TMDB_API_TOKEN } = process.env;

const inputFile = fileURLToPath(new URL('../src/lib/assets/movie-urls.txt', import.meta.url));
const outputFile = fileURLToPath(new URL('../src/lib/assets/movie-catalog.json', import.meta.url));

const TMDB_BASE_URL = "https://api.themoviedb.org/";

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

  /*// Check if using title-year format (ex.: Cape Fear (1991))
  const match = title.match(/^(.+?)\s+\((\d{4})\)$/)
  if (match) return match[1];*/

  return title;
}

async function getTmdbId(title) {
  const endpoint = new URL("3/search/movie", TMDB_BASE_URL);
  endpoint.searchParams.append("query", title);
  endpoint.searchParams.append("type", "movie");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) return null;
  const data = (await response.json())?.results?.[0];
  return data?.id;
}

async function getTmdbData(title) {
  const id = await getTmdbId(title);
  if (!id) return null;

  const endpoint = new URL("3/movie/" + id, TMDB_BASE_URL);
  endpoint.searchParams.append("append_to_response", "external_ids,release_dates");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) return null;
  const data = await response.json();
  return data;
}

function getMovieCertification(tmdbData) {
  const usReleaseDates = tmdbData.release_dates?.results?.filter((release) => release["iso_3166_1"] === "US")[0]?.release_dates;
  if (!usReleaseDates) return "Unknown";
  const certifiedRelease = usReleaseDates?.filter((release) => release.certification)?.[0];
  if (!certifiedRelease) return "Unknown";
  return certifiedRelease.certification;
}

async function getVideoMetadata(url) {
  const title = await getVideoTitle(url);
  if (!title) return null;
  const tmdbData = await getTmdbData(title);
  if (!tmdbData) return null;
  return {
    title: title,
    year: parseInt(tmdbData.release_date?.substring(0, 4)),
    imdbId: tmdbData.external_ids?.imdb_id,
    poster: "https://image.tmdb.org/t/p/w300" + tmdbData.poster_path,
    description: tmdbData.overview,
    watchUrl: url,
    rating: Math.round(tmdbData.vote_average * 10) / 10,
    runtime: tmdbData.runtime,
    genres: tmdbData.genres?.map((genre) => genre.name),
    rated: getMovieCertification(tmdbData),
  };
}

export async function createMovieCatalog(movieUrls) {
  const movies = movieUrls.split("\n").filter((url) => url.trim() !== "");
  const promises = movies.map((url) => getVideoMetadata(url));
  let catalog = await Promise.all(promises);
  catalog = catalog.filter((movie) => !!movie);
  catalog.sort((a, b) => b.rating - a.rating);
  return catalog;
};

const movieUrls = await readFile(inputFile, 'utf8');
const catalog = await createMovieCatalog(movieUrls);

if (catalog.length === 0) throw new Error("Could not write any movies. Check API limits.");

await writeFile(outputFile, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote ${catalog.length} movies to ${outputFile}`);