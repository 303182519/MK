window.onload = function () {
  
  var point = new mk.Point(900,500)
  
  var path = [[400,200],[500,300],[500,50],[80,600]]
  var line = new mk.Line()
  line.path = path
  
  var rings = [[[500,400],[490,478],[350,350],[500,400]]]
  var polygon = new mk.Polygon(rings)
  
  var holeRings = [
    // 外环
    [
      [100, 600], [50, 680],
      [100, 760], [200, 690],
      [150, 580], [100, 600]
    ],
    // 洞1
    [
      [100, 640], [140, 650],
      [120, 680], [100, 640]
    ],
    // 洞2
    [
      [100, 690], [140, 700],
      [120, 720], [100, 690]
    ]
  ]
  var holePolygon = new mk.Polygon(holeRings)
  
  var mutilPolygonRings = [
    // 多边形1
    [
      [
        [500, 600], [450, 680],
        [500, 760], [600, 690],
        [550, 580], [500, 600]
      ],
      // 洞1
      [
        [500, 640], [540, 650],
        [520, 680], [500, 640]
      ]
    ],
    // 多边形2
    [
      [
        [700, 600], [650, 680],
        [700, 760], [800, 690],
        [750, 580], [700, 600]
      ]
    ]
  ]
  
  var mutilPolygon = new mk.MutilPolygon(mutilPolygonRings)
  
  var extent = new mk.Extent(700, 300, 1000, 600)
  
  // 定义一个平行四边形
  var paralletogramRings = [[
    [650, 100], [700, 200], [1000, 200], [950, 100], [650, 100]]
  ]
  
  var paralletogram = new mk.Parallelogram(paralletogramRings)
  
  var features = [new mk.Feature(point),
    new mk.Feature(line),
    new mk.Feature(polygon),
    new mk.Feature(holePolygon, null, '这是一个带洞的多边形'),
    new mk.Feature(mutilPolygon),
    new mk.Feature(paralletogram, null, '平行四边形'),
    new mk.Feature(extent)]
  
  // 将会获取缺省样式
  var selectLayer = new mk.FeatureLayer()
  
  var mapextent = [0, 0, 1024, 968];
  
  var map = new mk.Map({
    layers: [
      new mk.SingleImageLayer({
        url: 'source/online_communities.png',
        imageExtent: mapextent,
        projection: {
          extent: mapextent
        }
      }),
      selectLayer
    ],
    target: 'map',
    view: new mk.View({
      projection: {
        extent: mapextent
      },
      center: mk.ExtentUtil.getCenter(mapextent),
      resolution: 2,
      resolutions: [4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125]
      // zoom: 2,
      // maxZoom: 8
    })
  });
  
  selectLayer.addFeatures(features)
  
  // 选择工具
  var selectTool = new mk.Select({
    selectMode: mk.BrowserEvent.SINGLE_CLICK,
    selectMultiMode: function(event){
      return event.keyCode === 17
    }
  })

  map.addComponents(selectTool)
  
  var typeSelect = document.getElementById('type')
  
  /**
   * Handle change event.
   */
  typeSelect.onchange = function() {
    selectTool.selectMode = typeSelect.value
  }
}
