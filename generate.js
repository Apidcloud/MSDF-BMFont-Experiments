/**
 * Created by Luis on 05/01/2017.
 */
const generateBMFont = require('msdf-bmfont-xml');
const fs = require('fs');

const font = "OpenSans-Regular.ttf";

const opt = {
    outputType: 'json'
  };

generateBMFont('fnt/' + font, opt, (error, textures, font) => {
  if (error) throw error;
  textures.forEach((texture, index) => {
    fs.writeFile("generated/" + `sheet${index}.png`, texture.texture, (err) => {
      if (err) throw err;
    });
  });
  fs.writeFile("generated/font.json", font.data, (err) => {
    if (err) throw err;
  });
});