requirejs.config({
  paths: {
    "jquery": [
      "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
      //If the CDN fails, load from this local module instead
      "lib/jquery.min"
    ]
  }
});