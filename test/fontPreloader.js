const parallel = require('run-parallel');
const loadBmfont = require('load-bmfont');
const parseXml = require('xml2js').parseString;
const path = require('path');
const fs = require('fs');
const noop = () => {};

let loadedResult;
let isFinished = false;

module.exports = function (cb = noop, fontFile) {
  if (isFinished) {
    process.nextTick(() => {
      cb(null, loadedResult);
    });
    return loadedResult;
  }
  fs.readFile(fontFile, (err, data) => {
    const textureFile = path.join(path.dirname(fontFile), JSON.parse(data).pages[0]);
      parallel({
        texture: (next) => {
          let texture = new THREE.TextureLoader().load(textureFile, () => {
            next(null, texture);
          }, noop, () => {
            next(new Error('Could not load font image'));
          });
        },
        font: (next) => {
          loadBmfont(fontFile, (err, font) => {
            if (err) return next(err);
            next(null, font);
          });
        }
      }, (err, results) => {
        isFinished = true;
        if (err) return cb(err);
        loadedResult = results;
        cb(null, results);
      });
    });
  
};
