'use client'

import { useMarineData } from "@/context/MarineDataContext"
import { APIProvider, Map } from "@vis.gl/react-google-maps"

export const Maps = () => {
  const { selectedBeach } = useMarineData();
  if (!selectedBeach) return null;
  const postion = { lat: selectedBeach.lat, lng: selectedBeach.lon }

  return (

    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '300px', width: '300px'}}>
        <Map defaultZoom={14} defaultCenter={postion} mapId={process.env.NEXT_PUBLIC_MAP_ID} />
      </div>
    </APIProvider>
  )
}
