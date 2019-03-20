// 多边形
var rings = [[[800, 580], [490, 600], [255, 820],
[200, 1000], [955, 1100,], [1000, 1000], [800, 580]]]
var polygon = new mk.Polygon(rings)

var feature1 = new mk.Feature(polygon)

var featureLayer = new mk.FeatureLayer()
featureLayer.addFeature(feature1)

// 初始化map、view和layer
var mapextent = [0, 0, 1920, 1200];
var map = new mk.Map({
  layers: [
    new mk.SingleImageLayer({
      url: 'source/timg.jpeg',
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
    zoom: 2,
    maxZoom: 8
  })
});

// 绘图工具
var draw = new mk.Draw({
  type: 'polygon',
  drawLayer: featureLayer
})

var select = new mk.Select({
  selectMode: mk.BrowserEvent.MOUSE_MOVE
})

map.addComponents(select)
map.addComponents(draw)

draw.addEventListener(mk.DrawEvent.EventType.DRAW_END, function (drawEvent) {
  var feature = drawEvent.feature
  var drawGeometry = feature.geometry

  var arr = getIntersectFeatures(feature, featureLayer)

  var becutedGeometry = polybool(drawGeometry)

  arr.forEach(function (fea) {
    var theGeometry = polybool(fea.geometry)
    becutedGeometry = PolyBool.difference(becutedGeometry, theGeometry)
  })

  console.log(becutedGeometry)

  var featureCollection = []

  var g = new mk.MutilPolygon()
  var regions = becutedGeometry.regions
  var coods = []
  regions.forEach(function (re, index) {
    re.push(re[0])
    coods.push([re])
  })

  g.setCoordinates(coods)
  featureCollection.push(new mk.Feature(g))

  featureLayer.addFeatures(featureCollection)
  featureLayer.removeFeature(feature)

  featureLayer.features.forEach(function (f, index) {
    f.displayText = index
  })
})

function polybool(geometry) {
  var coords = geometry.getCoordinates()[0]
  var poly1 = {
    regions: [
      coords
    ],
    inverted: false
  }

  return poly1
}

function getIntersectFeatures(feature, targetLayer) {
  var allFeatures = targetLayer.features
  var results = []

  for (var i = 0, len = allFeatures.length; i < len; i++) {
    var fet = allFeatures[i]
    if (fet.id === feature.id ||
      fet.geometry.geometryType === mk.Geometry.POINT) {
      continue
    }

    var extent1 = fet.geometry.extent
    var extent2 = feature.geometry.extent
    var extetnArr1 = [extent1.xmin, extent1.ymin, extent1.xmax, extent1.ymax]
    var extetnArr2 = [extent2.xmin, extent2.ymin, extent2.xmax, extent2.ymax]

    if (mk.ExtentUtil.intersects(extetnArr1, extetnArr2)) {
      results.push(fet)
    }
  }

  return results
}
