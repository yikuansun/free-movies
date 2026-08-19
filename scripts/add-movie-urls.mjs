import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const outputFile = fileURLToPath(new URL('../src/lib/assets/movie-urls.txt', import.meta.url));
const canonicalPrefix = 'https://www.youtube.com/watch?v=';
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;

function canonicalize(raw) {
	let url;
	try {
		url = new URL(raw.trim(), 'https://www.youtube.com');
	} catch {
		throw new Error(`Invalid URL: ${raw}`);
	}

	const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
	let videoId;
	if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
		if (url.pathname !== '/watch') throw new Error(`Not a YouTube watch URL: ${raw}`);
		videoId = url.searchParams.get('v');
	} else if (hostname === 'youtu.be') {
		videoId = url.pathname.split('/').filter(Boolean)[0];
	} else {
		throw new Error(`Not a YouTube URL: ${raw}`);
	}

	if (!videoId || !videoIdPattern.test(videoId)) {
		throw new Error(`Invalid YouTube video ID: ${raw}`);
	}
	return `${canonicalPrefix}${videoId}`;
}

const args = process.argv.slice(2);
const checkOnly = args.length === 1 && args[0] === '--check';
if (args.includes('--check') && !checkOnly) {
	throw new Error('--check cannot be combined with URLs');
}

const original = await readFile(outputFile, 'utf8');
const existing = original.split(/\r?\n/).filter((line) => line.trim());
const normalizedExisting = existing.map(canonicalize);
const candidates = checkOnly ? [] : args.map(canonicalize);
const unique = [...new Set([...normalizedExisting, ...candidates])];
const normalizedText = unique.length ? `${unique.join('\n')}\n` : '';
const existingIsCanonical =
	existing.every((line, index) => line === normalizedExisting[index]) &&
	new Set(normalizedExisting).size === normalizedExisting.length;

if (checkOnly) {
	if (!existingIsCanonical) {
		throw new Error('movie-urls.txt contains a duplicate or noncanonical URL');
	}
	console.log(`OK: ${unique.length} canonical, unique movie URLs`);
} else {
	const added = unique.length - new Set(normalizedExisting).size;
	if (!existingIsCanonical || added > 0) await writeFile(outputFile, normalizedText, 'utf8');
	console.log(`Added ${added}; ${unique.length} total`);
}
