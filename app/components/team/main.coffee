(($) ->
  $ ->
    mod = '#team '
    $grid = $ mod + '#tp-grid'
    $name = $ mod + '#name'
    $close = $ mod + '#close'
    $topbar = $ mod + '.topbar'
    $loader = $('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>').insertBefore($grid)
    stapel = $grid.stapel(
      onLoad: ->
        $loader.remove();

      onBeforeOpen: (pileName)->
        $topbar.children().addClass('invisible')
        $name.html(pileName)

      onAfterOpen: (pileName)->
        $topbar.addClass('open')
        $topbar.children().removeClass('invisible')
        $close.show()
    )

    $close.on 'click', ()->
      $close.hide()
      $name.empty()
      $topbar.removeClass('open')
      stapel.closePile()

    return
  return) jQuery