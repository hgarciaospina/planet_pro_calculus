import { useRef, useEffect } from 'react';
import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import ArcGISMapImageLayer from "@arcgis/core/layers/FeatureLayer";
import { Extent } from "@arcgis/core/geometry";

const HomePage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: EsriMap | null = null;
    let view: MapView | null = null;

    const initializeMap = async () => {
      if (mapRef.current) {
        const apiUrl = 'https://enterpriseaws.procalculo.com/arcgis/rest/services/Hosted/probando_imagen_desde_live/ImageServer?f=pjson';
        const response = await fetch(apiUrl);
        const data = await response.json();

        const { xmin, ymin, xmax, ymax, spatialReference } = data.extent;
        const { wkid } = spatialReference;

        map = new EsriMap({
          basemap: 'streets-night-vector',
          layers: [
            new ArcGISMapImageLayer({
              url: apiUrl,
              title: data.name
            })
          ]
        });

        view = new MapView({
          container: mapRef.current,
          map: map,
          extent: new Extent({
            xmin: xmin,
            ymin: ymin,
            xmax: xmax,
            ymax: ymax,
            spatialReference: {
              wkid: wkid
            }
          }),
          scale: 50000,
          zoom: 14
        });
      }
    };

    initializeMap();

    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
      if (map) {
        map.destroy();
        map = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '580px' }}></div>;
};

export default HomePage;
