const MapViewer = () => {
  return (
    <div>
      <iframe
        title="Map Viewer"
        width="100%"
        height="600"
        src="https://www.arcgis.com/home/webmap/viewer.html?url=https://enterpriseaws.procalculo.com/arcgis/rest/services/Hosted/probando_imagen_desde_live/ImageServer&source=sd"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default MapViewer;