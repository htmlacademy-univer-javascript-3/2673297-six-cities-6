import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import {Offers} from '../../../../types/offer.ts';
import {City} from '../../../../types/city.ts';
import useMap from '../../../hooks/useMap.ts';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../../../const.ts';

export type MapProps = {
  city: City;
  offers: Offers;
  activeOfferId: string | null;
  className: string;
}

function Map({ city, offers, activeOfferId, className }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  // Ссылки для хранения маркеров и слоя маркеров
  const markerLayerRef = useRef<leaflet.LayerGroup | null>(null);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      if (markerLayerRef.current) {
        markerLayerRef.current.remove();
      }

      markerLayerRef.current = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {
        leaflet
          .marker(
            [offer.location.latitude, offer.location.longitude],
            {
              icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
            }
          )
          .addTo(markerLayerRef.current as leaflet.LayerGroup);
      });
    }

    return () => {
      if (markerLayerRef.current) {
        markerLayerRef.current.remove();
      }
    };
  }, [map, offers, city, activeOfferId, currentCustomIcon, defaultCustomIcon]);

  return (
    <div
      className={className}
      ref={mapRef}
    />
  );
}

export default Map;
