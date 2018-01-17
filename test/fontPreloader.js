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
  fs.readFile(path.join(__dirname, fontFile), (err, data) => {
    parseXml(data, {mergeAttrs: true}, (err, fontNode) => {
      let textureFile = path.join(__dirname, path.dirname(fontFile), fontNode.font.pages[0].page[0].file[0]);
      parallel({
        texture: (next) => {
          let texture = new THREE.TextureLoader().load(textureFile, () => {
            next(null, texture);
          }, noop, () => {
            next(new Error('Could not load font image'));
          });
        },
        font: (next) => {
          loadBmfont(path.join(__dirname, fontFile), (err, font) => {
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
  });
  
};
