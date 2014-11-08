(($) ->
  $ ->
    $grid = $( '#tp-grid' )
    $name = $( '#name' )
    $close = $( '#close' )
    $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid )
    stapel = $grid.stapel(
        onLoad : ->
          $loader.remove();

        onBeforeOpen : ( pileName )->
          $name.html( pileName )

        onAfterOpen : ( pileName )->
          $close.show()
    )

    $close.on 'click', ()->
        $close.hide()
        $name.empty()
        stapel.closePile()

    return
  return
) jQuery