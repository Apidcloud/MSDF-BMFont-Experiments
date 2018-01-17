/**
 * Created by Luis on 05/01/2017.
 */

var generateBMFont = require('msdf-bmfont');
var fs = require('fs');

const font = "OpenSans-Regular.ttf";

generateBMFont('fnt/' + font, (error, textures, font) => {
    if (error)
    throw error;
textures.forEach((sheet, index) => {
    font.pages.push(`sheet${index}.png`);
fs.writeFile(`generated/sheet${index}.png`, sheet, (err) => {
    if (err)
    throw err;
});
});
fs.writeFile('generated/font.json', JSON.stringify(font), (err) => {
    if (err) throw err;
});
});