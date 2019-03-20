window.onload = function () {
  
  var point = new mk.Point(900,500)
  
  var path = [[1400,1200],[1500,1300],[1500,150],[180,1600]]
  var line = new mk.Line()
  line.path = path
  
  var rings = [[[1500,1400],[1490,1478],[1350,1350],[1950,1350],[1500,1400]]]
  var polygon = new mk.Polygon(rings)
  
  var extent = new mk.Extent(1100, 300, 1400, 600)
  var extent1 = new mk.Extent(1100, 1300, 1400, 1600)

  var features = [new mk.Feature(point),
    new mk.Feature(line, null, '这是一条线'),
    new mk.Feature(polygon, null, '多边形'),
    new mk.Feature(extent1, null, '矩形'),
    new mk.Feature(extent)]

  // 将会获取缺省样式
  featureLayer = new mk.FeatureLayer()
  featureLayer.addFeatures(features)
  
  var mapextent = [0, 0, 2783, 2125];
  
  var map = new mk.Map({
    layers: [
      new mk.SingleImageLayer({
        url: 'source/China_map.jpg',
        imageExtent: mapextent,
        projection: {
          extent: mapextent
        }
      }),
      featureLayer
    ],
    target: 'map',
    view: new mk.View({
      projection: {
        extent: mapextent
      },
      center: mk.ExtentUtil.getCenter(mapextent),
      zoom: 1,
      maxZoom: 8
    })
  });
  
   select = new mk.Select()
  
  var modifyTool = new mk.Modify()

  delefeature = null
  
  // add select-end event linstener
  select.addEventListener(mk.SelectEvent.EventType.SELECT, function(event) {
    modifyTool.features = event.selectedFeatures
    delefeature = modifyTool.features[0]
  })
  
  map.addComponents(modifyTool)
  map.addComponents(select)
}


function onDrawClick () {

  select.clear()

  featureLayer.removeFeature(delefeature)
}

