/**
 * Created by Luis on 05/01/2017.
 */
const generateBMFont = require('msdf-bmfont-xml');
const fs = require('fs');
const path = require('path');

const fontName = "arialbd.ttf";

//const basename = path.basename(filename, path.extname(fontName));

const opt = {
    outputType: "json",
    distanceRange: 10, // spread
    smartSize: true,
    pot: true,
    fontSize: 50,
    texturePadding: 8 // padding between glyphs
  };

generateBMFont('fnt/' + fontName, opt, (error, textures, font) => {
  if (error) throw error;

  textures.forEach((texture, index) => {
    fs.writeFile(texture.filename + ".png", texture.texture, (err) => {
      if (err) throw err;
    });
  });
  fs.writeFile(font.filename, font.data, (err) => {
    if (err) throw err;
  });
});