import { youtube } from "@googleapis/youtube";
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from 'node:process';

loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));

const yt = youtube({
  version: "v3",
  auth: process.env.YOUTUBE_DATA_API_KEY,
});

const url = 'https://www.youtube.com/watch?v=3DaUsU_2bpI';
const videoId = new URL(url).searchParams.get('v');

const response = await yt.videos.list({
  part: ['status', 'snippet'],
  id: [videoId],
});

console.log(response.data.items);