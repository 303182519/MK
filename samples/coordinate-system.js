window.onload = function () {

  var point = new mk.Point(100, 100)
  
  var features = [
    new mk.Feature(point)
  ]
  
  // 将会获取缺省样式
  var featureLayer = new mk.FeatureLayer({
    features: features
  })

  var mapextent = [0, 0, 2783, 2125];
  var map = new mk.Map({
    layers: [
      featureLayer,
      new mk.SingleImageLayer({
        url: 'source/China_map.jpg',
        imageExtent: mapextent,
        projection: {
          extent: mapextent
        }
      })
      
    ],
    target: 'map',
    view: new mk.View({
      projection: {
        extent: mapextent
      },
      center: mk.ExtentUtil.getCenter(mapextent),
      zoom: 2,
      maxZoom: 8
    })
  });
}


