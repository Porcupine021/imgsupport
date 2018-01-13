# ImgSupport.js
A javascript library for detecting support of less common image formats like WebP, JPEG-2000, and JPEG-XR.

## Usage
Include the script on your page. Call the ImgSupport.test() method, which accepts a callback function.
The callback function will be passed a simple object containing information about which image formats
are supported by the browser.
```html
<script src="ImgSupport.js"></script>
<script>
  ImgSupport.test(function(supports){
    console.log(supports);
  });
</script>
```

Outputs to the console
```json
{
  "jp2": 0,
  "jpx": 0,
  "webp-alpha": 1,
  "webp-animation": 1,
  "webp-lossless": 1,
  "webp-lossy": 1
}
```

## Features
Image support is cached by default using HTML5 LocalStorage if the browser supports it.

## Demo
See it in action [here](https://porcupine021.github.io/imgsupport/demos/index.html)

## License
This is free and unencumbered software released into the public domain.
For more information, please refer to [http://unlicense.org](http://unlicense.org)
