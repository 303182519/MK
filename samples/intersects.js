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
    zoom: 2,
    maxZoom: 8
  })
});

// 绘图工具
var draw = new mk.Draw({
  type: 'point',
  drawLayer: flayer
})

map.addComponents(draw)

var typeSelect = document.getElementById('type')

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  draw.drawMode = typeSelect.value
}

// 多边形
var rings = [[[800,580],[490,600],[400,660],[300, 700],[270, 780],[255, 820],[230, 860],[280,1050],
  [1000,1000],[1000,800],[800,580]]]
var polygon = new mk.Polygon(rings)
var feature = new mk.Feature(polygon)

flayer.addFeature(feature)

var infoDom = document.getElementById('info')
draw.addEventListener(mk.DrawEvent.EventType.DRAW_END, function(e){
  var feature = e.feature
  
  var geometry = feature.geometry
  var info = ''
  
  var result = mk.intersects(geometry, polygon)
  if(result) {
    info = '相交'
  } else {
    info = '不相交'
  }
  
  infoDom.innerText = '图形ID为：' + geometry.id + '与存在图形ID：' + polygon.id + '的结果： ' + info
})

