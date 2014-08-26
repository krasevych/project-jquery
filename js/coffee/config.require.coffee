requirejs.config
  baseUrl: '/'
  paths:
#  lib
    jquery: "bower_components/jquery/dist/jquery.min",
    bootstrap: "bower_components/bootstrap/dist/js/bootstrap.min",
    vegas: "bower_components/vegas/dist/jquery.vegas.min"
    easing: "bower_components/jquery.easing/js/jquery.easing.min"
    quicksand: "bower_components/jquery.quicksand/index"

# modules
    header: "modules/header/js/index"
    home: "modules/home/js/index"
    service: "modules/service/js/index"
    portfolio: "modules/portfolio/js/index"

  shim:
    bootstrap:
      deps: [
       'jquery'
      ]
      exports: 'bootstrap'
    vegas:
      deps: [
       'jquery'
      ]
      exports:'vegas'
    easing:
      deps: [
       'bootstrap'
      ]
      exports:'easing'
    quicksand:
      deps: [
       'easing'
      ]
      exports:'quicksand'


requirejs ['jquery','bootstrap', 'vegas','easing','quicksand'], ()->
  requirejs ['header', 'home','service','portfolio'], ()->
