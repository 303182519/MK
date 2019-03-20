var container = document.getElementById('popup')
var content = document.getElementById('popup-content')
var closer = document.getElementById('popup-closer')
var overlay = new mk.Overlay(({
  element: container,
  autoPan: true
}))

/**
 * Add a click handler to hide the popup.
 */
closer.onclick = function() {
  overlay.position = undefined
  closer.blur()
  return false
}

/**
 * Create the map.
 */
var mapextent = [0, 0, 2783, 2125];
var map = new mk.Map({
  layers: [
    new mk.SingleImageLayer({
      url: 'source/China_map.jpg',
      imageExtent: mapextent,
      projection: {
        extent: mapextent
      }
    })
  ],
  overlays: [overlay],
  target: 'map',
  view: new mk.View({
    projection: {
      extent: mapextent
    },
    center: mk.ExtentUtil.getCenter(mapextent),
    zoom: 2,
    maxZoom: 8
  })
})

map.addEventListener('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  
  content.innerHTML = '<p>Coordiante:</p><code>' + coordinate[0] +',' + coordinate[1] +
    '</code>';
  
  overlay.position = coordinate
})