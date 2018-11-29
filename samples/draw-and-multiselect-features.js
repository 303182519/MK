var drawTool,
  selectTool,
  Fortesting,
  modifyTool;

window.onload = function (){
   Fortesting = new mk.FeatureLayer()
  var extent = [0,0,1280,800]

  //随机添加i个点
  for(i = 0; i<=2; i++){
    var x = parseInt(Math.random()*1280)
    var y = parseInt(Math.random()*800)
    var point = new mk.Point(x,y)
    var features = [new mk.Feature(point)]
    Fortesting.addFeatures(features)
  }

  var map = new mk.Map({
    layers:[new mk.SingleImageLayer({
      url : "source/image01450.jpg",
      imageExtent :extent,
      projection:{
        extent: extent
      }
    }),
      Fortesting
    ],
    target:'map',
    view : new mk.View({
      projection:{
        extent:extent
      },
      center: mk.ExtentUtil.getCenter(extent),
      zoom: 2,
      maxZoom: 8
    })
  })

  //回车结束
  var finishCondition = function (event) {
    return event.keyCode === 13
  }

  var selectMultiMode = function (event){
    return event.keyCode === 17
  }

  drawTool = new mk.Draw({
    type: 'point',
    drawLayer: Fortesting,
    finishCondition :finishCondition
  });

  drawTool.addEventListener(mk.DrawEvent.EventType.DRAW_END, function(e){
    polyF = e.feature
  })

  modifyTool = new mk.Modify({
    features: Fortesting.features
  });

  selectTool = new mk.Select({
    selectMode: mk.BrowserEvent.CLICK,
    selectMultiMode: selectMultiMode
  });

  map.addComponents(drawTool)
  map.addComponents(selectTool)
  map.addComponents(modifyTool)
  selectTool.active = false
  modifyTool.active = false

  var MouseStyle = document.getElementById('map')
  MouseStyle.style.cursor='crosshair'

  var typeSelect = document.getElementById('type')

  typeSelect.onchange = function(){
    if(typeSelect.value === "None"){
      drawTool.active = false
      drawTool.display = false
      selectTool.active = true
      modifyTool.active = true
    }else{

      selectTool.clear()

      drawTool.active = true
      drawTool.drawMode = typeSelect.value
      selectTool.active = false
      modifyTool.active = false
    }
  }

  var onZoominClick = document.getElementById('onZoominClick')

  onZoominClick.onclick = function() {
    const delta = 1
    let view = drawTool.map.view
    let opt_anchor = view.center
    const opt_duration = 250
    drawTool.zoomByDelta(view,delta,opt_anchor,opt_duration)
  }

  var onZoomoutClcik = document.getElementById('onZoomoutClcik')

  onZoomoutClcik.onclick = function() {
    const delta = -1
    let view = drawTool.map.view
    let opt_anchor = view.center
    const opt_duration = 250
    drawTool.zoomByDelta(view,delta,opt_anchor,opt_duration)
  }
}

var polyF

function onDrawClick () {
  // if(polyF.styleHighLight) {
  //   polyF.styleHighLight = false
  // }else{
  //   polyF.styleHighLight = true
  // }

  Fortesting.removeFeature(polyF)
}
