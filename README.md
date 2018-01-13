# ImgSupport.js
A javascript library for detecting support of less common image formats like WebP, JPEG-2000, and JPEG-XR.

## Usage
```html
<script src="ImgSupport.js"></script>
<script>
  ImgSupport.test(function(supports){
    if(supports['webp-lossless']){
      // TODO your code here
    }
  });
</script>
```

## Demos
See it in action [here](https://raw.githubusercontent.com/Porcupine021/imgsupport/master/demos/index.html)

## License
This is free and unencumbered software released into the public domain.
For more information, please refer to [http://unlicense.org](http://unlicense.org)
