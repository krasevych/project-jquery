$(->
  mod='#portfolio'
  $thumbnails = $ mod+' .projects-list ul'
  $nav=$ mod+' .projects-nav  li'

  $data = $thumbnails.clone();

  $nav.children('a').on 'click',(e)->
    $el=$ @

    this_id = $el.attr 'data-id'
    if this_id == 'all'
      $filteredData = $data.find('li')
    else
      $filteredData = $data.find 'li[data-type=' + this_id + ']'

    $thumbnails.quicksand($filteredData, {
      duration: 800,
      attribute: 'id',
      adjustWidth:false
      easing: 'easeOutCirc'
      useScaling:true
    })

    $nav.removeClass('active')
    $el.parent().addClass('active')
    return false

  return
)