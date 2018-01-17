/**
 * Created by Luis on 05/01/2017.
 */
const generateBMFont = require('msdf-bmfont-xml');
const fs = require('fs');
const path = require('path');

const fontName = "OpenSans-Regular.ttf";

//const basename = path.basename(filename, path.extname(fontName));

const opt = {
    outputType: "json",
    distanceRange: 4,
    smartSize: true,
    pot: true,
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