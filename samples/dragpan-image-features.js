window.onload = function () {
  
  var point = new mk.Point(200,700)
  
  var path = [[400,200],[500,300],[500,50],[80,600]]
  var line = new mk.Line()
  line.path = path
  
  var rings = [[[500,400],[490,478],[350,350],[500,400]]]
  var polygon = new mk.Polygon(rings)
  
  var extent = new mk.Extent(1100, 300, 1400, 600)
  
  var features = [new mk.Feature(point),
    new mk.Feature(line),
    new mk.Feature(polygon),
    new mk.Feature(extent)]

  var extent = [0, 0, 1024, 968]
  
  // 将会获取缺省样式
  var tempLayer = new mk.FeatureLayer({features: features})
  var imageLayer = new mk.SingleImageLayer({
    url: 'source/online_communities.png',
    imageExtent: extent,
    projection: {
      extent: extent
    }
  })
  
  var map = new mk.Map({
    layers: [imageLayer, tempLayer],
    target: 'map',
    view: new mk.View({
      projection: {
        extent: extent
      },
      center: mk.ExtentUtil.getCenter(extent),
      zoom: 2,
      maxZoom: 8
    })
  })
  
  var dragPan = new mk.DragPan({
    kinetic: new mk.Kinetic(-0.005, 0.05, 100)
  })
  
  map.addComponents(dragPan)
}
