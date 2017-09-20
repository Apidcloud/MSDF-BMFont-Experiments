/**
 * Created by Luis on 05/01/2017.
 */

var generateBMFont = require('msdf-bmfont');
var fs = require('fs');

generateBMFont('fnt/OpenSans-Regular.ttf', (error, textures, font) => {
    if (error)
    throw error;
textures.forEach((sheet, index) => {
    font.pages.push(`sheet${index}.png`);
fs.writeFile(`sheet${index}.png`, sheet, (err) => {
    if (err)
    throw err;
});
});
fs.writeFile('font.json', JSON.stringify(font), (err) => {
    if (err) throw err;
});
});