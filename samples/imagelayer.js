window.onload = function () {
  var extent = [0, 0, 1024, 768];
  
  var map = new mk.Map({
    layers: [
      new mk.SingleImageLayer({
        url: 'source/Tulips.jpg',
        imageExtent: extent,
        projection: {
          extent: extent
        }
      })
    ],
    target: 'map',
    view: new mk.View({
      projection: {
        extent: extent
      },
      center: mk.ExtentUtil.getCenter(extent),
      zoom: 1,
      maxZoom: 8
    })
  });
}
