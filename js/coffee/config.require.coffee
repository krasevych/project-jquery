requirejs.config
  baseUrl: '/'
  paths:
#  lib
    jquery: "bower_components/jquery/dist/jquery.min",
    bootstrap: "bower_components/bootstrap/dist/js/bootstrap.min",
    vegas: "bower_components/vegas/dist/jquery.vegas.min"

# modules
    header: "modules/header/js/index"
    home: "modules/home/js/index"

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

requirejs ['jquery','bootstrap', 'vegas'], ()->
  requirejs ['header', 'home'], ()->
