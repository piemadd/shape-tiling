const fs = require('fs');
const fetch = require('node-fetch');
const turf = require('@turf/turf');

const gtfsPaths = require('./input/gtfs.json').map(path => `https://gtfs.piemadd.com/data/${path}`);
const passioPaths = require('./input/passio.json').map(path => `https://passio.piemadd.com/data/${path}`);

const allPaths = gtfsPaths.concat(passioPaths);

if (fs.existsSync('./geojson')) fs.rmSync('./geojson', { recursive: true });
fs.mkdirSync('./geojson');

Promise.all(allPaths.map(path => fetch(path).then(res => res.json()))).then((geoJSON) => {
  let allFeatures = [];
  geoJSON.forEach((featureCollection) => {
    if (featureCollection.type === 'Feature') {
      allFeatures.push(featureCollection)
    } else if (featureCollection.type === 'FeatureCollection') {
      allFeatures.push(...featureCollection.features);
    } else {
      throw new Error('Unknown feature type. Needs to be a feature or a feature collection')
    }
  })

  //saving to disk
  fs.writeFileSync('./allFeatures.geojson', JSON.stringify(
    {
      "type": "FeatureCollection",
      "features": allFeatures,
    }
  ), {
    encoding: 'utf8'
  })
});