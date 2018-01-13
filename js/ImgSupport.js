/**
 * ImgSupport allows one to test whether the browser supports alternate image formats like
 * WebP, JPEG-XR, and JPEG-2000.
 * 
 * @author Aaron Graham
 */
var ImgSupport = (function(){

  /** var @type Object keeps track of supported image formats */
  var supports = {};

  /**
   * Tests the browser's support for various image formats like WebP, JPX, and Jpeg2000
   * 
   * @public
   * @param {Function} callback (optional) A function that is called once all image tests have completed. Function is passed an object containing image support.
   * @param {Number} version (optional) A cache-kill-like string to override image format test results cached in localStorage
   * @returns {void}
   */
  function test(){
    var callback = arguments.length >= 1 ? arguments[0] : function(){},
        version = arguments.length >= 2 ? arguments[1]*1 : null,
        webpMime = 'webp',
        jpxMime = 'vnd.ms-photo',
        jp2Mime = 'jp2',
        data = 'data:image/',
        base64 = ';base64,',
        images = {
          "webp-lossy": data+webpMime+base64+'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
          "webp-lossless": data+webpMime+base64+'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
          "webp-alpha": data+webpMime+base64+'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
          "webp-animation": data+webpMime+base64+'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
          jpx: data+jpxMime+base64+'SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAgAAAMC8BAABAAAAWgAAAMG8BAABAAAARgAAAAAAAAAkw91vA07+S7GFPXd2jckQV01QSE9UTwAZAMFxAAAAATAAoAAKAACgAAAQgCAIAAAEb/8AAQAAAQDCPwCAAAAAAAAAAAAAAAAAjkI/AIAAAAAAAAABIAA=',
          jp2: data+jp2Mime+base64+'/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k='
        },
        numTypes = 0,
        cnt = 0,
        name = 'ImgSupport',
        s, i, o, d, mm, dd;

    // if no version string was supplied, use the current date so that image support is cached for up to 24 hours
    if(version === null){
      d = new Date();
      mm = d.getMonth() + 1;
      dd = d.getDate();
      if(mm < 10) mm = '0'+mm;
      if(dd < 10) dd = '0'+dd;
      version = d.getFullYear()+mm+dd;
    }

    // count number of image types 
    for(i in images){ numTypes++; }

    // test for localStorage support
    s = storageAvailable('localStorage');

    // if local storage is supported and a support object is already cached, use it
    if(s){
      o = localStorage.getItem(name+':v'+version);
      if(o !== null){
        supports = JSON.parse(o);
        callback(supports);
        return;
      }
    }

    // otherwise, run the tests
    for(i in images){
      testImage(i, images[i], function(type, supported){
        supports[type] = supported;

        // detect if all image tests have completed
        cnt++;
        if(cnt === numTypes){
          // save the results to local storage
          if(s){
            localStorage.setItem(name+':v'+version, JSON.stringify(supports));
          }
          callback(supports);
        }
      });
    }
  }

  /**
   * Tests to see whether a browser is able to load an image from a data uri
   * 
   * @private
   * @param {String} type The name of the image type (Ex 'webp-lossless')
   * @param {String} dataUri The image's data uri
   * @param {Function} callback 
   * @returns {void}
   */
  function testImage(type, dataUri, callback){
    var img = new Image();
    img.onload = function(){
      callback(type, (img.width && img.height)*1);
    };
    img.onerror = function(){
      callback(type, 0);
    };
    img.src = dataUri;
  }

  /**
   * Tests whether the browser supports localStorage
   * 
   * @private
   * @param {String} type Either 'localStorage' or 'sessionStorage'
   * @returns {Number} 1 for support. 0 for no support.
   */
  function storageAvailable(type) {
    try {
      var storage = window[type],
          x = '__st__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return 1;
    }
    catch(e) {
      return 0;
    }
  }

  // expose public methods
  return {
    test: test
  };
})();