/**
 * Created by Luis on 05/01/2017.
 */
const generateBMFont = require('scarlett-msdf-bmfont-xml');
const fs = require('fs');

const fontName = "arialbd.ttf";

const opt = {
    outputType: "json",
    distanceRange: 10, // spread
    smartSize: true,
    pot: true,
    fontSize: 50,
    texturePadding: 8 // padding between glyphs
  };

module.exports = generateBMFont('fnt/' + fontName, opt, (error, textures, font) => {
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