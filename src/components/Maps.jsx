'use client'

import { useMarineData } from "@/context/MarineDataContext"
import { APIProvider, Map } from "@vis.gl/react-google-maps"

export const Maps = () => {
  const { selectedBeach } = useMarineData();
  if (!selectedBeach) return null;
  const postion = { lat: selectedBeach.lat, lng: selectedBeach.lon }
  // -29.784948, -50.024671
  return (

    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '300px', width: '300px'}}>
        <Map zoom={14} center={postion} mapId={process.env.NEXT_PUBLIC_MAP_ID} />
      </div>
    </APIProvider>
  )
}
