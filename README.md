# MSDF BMFont Experiments

![resultElectronMSDFBMFontRendering](https://imgur.com/ZLpvaC7.png)

This repo basically takes a truetype font (e.g., OpenSans-Regular.ttf), generates a corresponding MSDF BMFont texture and spec, which are then used to render text using three.js on top of electron.

Based on the following:
- [msdfgen](https://github.com/Chlumsky/msdfgen)
- [msdf-bmfont](https://github.com/Jam3/msdf-bmfont)
- [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml)
- [electron-quick-start](https://github.com/electron/electron-quick-start)

## Setup
Install dependencies
```sh
$ yarn install
```

## Basic usage
1. Run with prebuilt BMFont texture and spec (already inside `/fnt` folder)
   ```sh
    $ npm start
    ```
2. Generate a new BMFont texture and spec
   ```sh
    $ npm test
    ```   
3. Generate and run
   ```sh
    $ npm run debug
    ```
