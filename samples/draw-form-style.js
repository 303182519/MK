var flayer = new mk.FeatureLayer()

var container = document.getElementById('popup')
var closeDom = document.getElementById('popup-closer')
var popup = document.getElementById('popup')
var gometrytypeSpan = document.getElementById('gometrytypeSpan')

var extent = [0, 0, 2783, 2125];
var overlay = new mk.Overlay(({
  element: container,
  autoPan: true
}))

var map = new mk.Map({
  layers: [
    new mk.SingleImageLayer({
      url: 'source/China_map.jpg',
      imageExtent: extent,
      projection: {
        extent: extent
      }
    }),
    flayer
  ],
  overlays: [overlay],
  target: 'map',
  view: new mk.View({
    projection: {
      extent: extent
    },
    center: mk.ExtentUtil.getCenter(extent),
    zoom: 2,
    maxZoom: 8
  })
});

// 绘图工具
var drawTool = new mk.Draw({
  type: 'point',
  drawLayer: flayer
})

map.addComponents(drawTool)

var select = new mk.Select()
map.addComponents(select)
select.active = false

// add select-end event linstener
select.addEventListener(mk.SelectEvent.EventType.SELECT, function(event) {
  var features = event.selectedFeatures
  if (features.length === 0) {
    return
  }

  var feature = features[0]
  var geometry = feature.geometry

  overlay.position = geometry.getFormShowPosition()
  currentFeature = feature
  formClose(true)

  gometrytypeSpan.innerHTML = geometry.geometryType
})

var modifyTool = new mk.Modify()

select.addEventListener(mk.SelectEvent.EventType.SELECT, function(event) {
  modifyTool.features = event.selectedFeatures
})

map.addComponents(modifyTool)

var typeSelect = document.getElementById('type')

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  if(typeSelect.value === "None"){
    drawTool.active = false
    select.active = true
    modifyTool.active = true
  }else {
    select.active = false
    modifyTool.active = false
    drawTool.drawMode = typeSelect.value
  }
}

var currentFeature = null

drawTool.addEventListener(mk.DrawEvent.EventType.DRAW_END, function(drawEvent){
  var feature = drawEvent.feature
  var geometry = feature.geometry

  overlay.position = geometry.getFormShowPosition()
  currentFeature = feature
  formClose(true)

  gometrytypeSpan.innerHTML = geometry.geometryType
})

function formClose(display) {
  display ? popup.style.display = 'block' : popup.style.display = 'none'
}

function onFormClosedClick(e){
  formClose(false)
}

function onEditBtnClick(){
  drawTool.active = false
  select.active = true
}

function onSubmitClick(){
  currentFeature.displayText = document.getElementById('textIpt').value
  currentFeature.style[0].textStyle.fill = [255,0,0]
  currentFeature.style[0].textStyle.stroke.width = 3
  map.render()
  formClose(false)
}
