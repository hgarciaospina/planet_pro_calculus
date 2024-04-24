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

    const initializeMap = () => {
      if (mapRef.current) {
        map = new EsriMap({
          basemap: 'streets-night-vector',
          layers: [
            new ArcGISMapImageLayer({
              url: 'https://enterpriseaws.procalculo.com/arcgis/rest/services/Hosted/probando_imagen_desde_live/ImageServer?f=pjson',
              title: 'Imagen desde Live'
            })
          ]
        });

        view = new MapView({
          container: mapRef.current,
          map: map,
          extent: new Extent({
            xmin: 375549,
            ymin: 196384.53002929688,
            xmax: 380439,
            ymax: 200014.53002929688,
            spatialReference: {
              wkid: 32618
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
