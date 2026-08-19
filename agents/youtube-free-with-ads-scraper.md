# YouTube Free-with-Ads Movie Collector

## Purpose

Discover full movies in the recommendations beside a known YouTube movie and
append only verified, canonical, unique URLs to
`src/lib/assets/movie-urls.txt`.

This agent requires a browser that can render and inspect YouTube. Availability
and the **Free with ads** label can vary by region, account, and time, so the
visible page is the source of truth. Do not infer eligibility from a title,
channel, description, duration, thumbnail, or search result.

## Workflow

1. Read `src/lib/assets/movie-urls.txt`.
2. Choose any nonblank URL in that file as the seed. If the file contains no
   URL, ask the user for one known free-with-ads YouTube movie URL.
3. Open the seed URL in the browser and wait for the watch page and its
   recommendations column to finish loading.
4. Inspect every currently rendered recommendation card in the recommendations
   column. Scroll that column/page to load more cards until either:
   - no new recommendation cards appear after two scroll attempts, or
   - 100 distinct recommendation cards have been inspected.
5. Keep a recommendation only when its own card visibly displays the exact
   **Free with ads** tag. The recommendation must be a normal YouTube watch
   video; exclude playlists, Shorts, live streams, rentals, paid purchases,
   trailers, clips, and cards without that exact tag.
6. Collect each qualifying card's link target. Do not follow recommendations
   recursively during the same run.
7. From the repository root, pass all collected URLs to the deterministic
   writer:

   ```text
   node scripts/add-movie-urls.mjs <url> [<url> ...]
   ```

   Quote an argument if the shell would interpret `&` or another character.
   The writer reduces every accepted URL to
   `https://www.youtube.com/watch?v=VIDEO_ID`, preserves existing order, and
   removes duplicates across both the file and the new results.

8. Run the final integrity check:

   ```text
   node scripts/add-movie-urls.mjs --check
   ```

9. Report the seed URL, number of recommendation cards inspected, number with a
   visible **Free with ads** tag, and number of URLs actually added. If none are
   added, say so plainly and leave the file unchanged.

## Safety and accuracy rules

- Never claim a movie is free with ads unless that exact tag is visible on its
  recommendation card during this run.
- Never disable ads, bypass geographic restrictions, sign in as another user,
  or circumvent YouTube access controls.
- Never add tracking parameters, playlist parameters, timestamps, or duplicate
  video IDs.
- Do not rewrite or reorder valid existing entries except when the writer is
  removing an already-present duplicate representation of the same video ID.
- If YouTube presents a consent, sign-in, CAPTCHA, or region gate that prevents
  inspection, stop and tell the user what interaction is required.
