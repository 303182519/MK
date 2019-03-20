window.onload = function () {

  var flayer = new mk.FeatureLayer()
  
  var extent = [0, 0, 2783, 2125];
  
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
    target: 'map',
    view: new mk.View({
      projection: {
        extent: extent
      },
      center: mk.ExtentUtil.getCenter(extent),
      resolution: 4,
      resolutions: [4,2,1,0.5,0.25,0.125, 0.0625, 0.03125]
    })
  });
  
  // 绘图工具
  var drawTool = new mk.Draw({
    type: 'point',
    drawLayer: flayer
  })
  
  map.addComponents(drawTool)
  
  var typeSelect = document.getElementById('type')
  
  /**
   * Handle change event.
   */
  typeSelect.onchange = function() {
    drawTool.drawMode = typeSelect.value
  }
  
  drawTool.addEventListener(mk.DrawEvent.EventType.DRAW_END, function(e){
    var feature = e.feature
    feature.displayText = '测试测试'
  })
}
