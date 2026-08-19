import movieUrls from "$lib/assets/movie-urls.txt?raw";

async function getVideoMetadata(url: string) {
  const endpoint = new URL("https://youtube.com/oembed");
  endpoint.searchParams.append("url", url);
  endpoint.searchParams.append("format", "json");

  const response = await fetch(endpoint);
  if (!response.ok) return null;
  const data = await response.json();
  return {
    title: data.title,
    url: url,
  };
}

export async function createMovieCatalog() {
  const movies = movieUrls.split("\n");
  const promises = movies.map((url) => getVideoMetadata(url));
  const catalog = await Promise.all(promises);
  catalog.filter((movie) => !!movie);
  return catalog;
};