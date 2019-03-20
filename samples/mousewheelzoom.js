window.onload = function () {
  
  var extent = [0, 0, 1024, 968];
  
  var map = new mk.Map({
    layers: [
      new mk.SingleImageLayer({
        url: 'source/online_communities.png',
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
      zoom: 2,
      maxZoom: 8
    })
  });
  
}
