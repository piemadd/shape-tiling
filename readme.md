# shape-tiling

This repo exists to grab geojson shapes from the `gtfs-schedule-data` and `passio-ignest` repositories and convert them into a pmtiles dataset for serving on cloudflare r2.

## installation
i no no wanna

## running
1. Make sure `./inputs/passio.json` and `./inputs/gtfs.json` are filled with the shape lists.
2. Run `node ./fetchShapes.js`.
3. (with tippecanoe installed) run `ingest.sh`
4. Using rclone, upload to your s3 compatible bucket of choice and SERVE