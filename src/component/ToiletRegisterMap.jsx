import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useState } from "react";

const CustomMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

function ToiletRegisterMap(props) {
  const { location, setClickedLocation } = props;
  const [clickLocation, setClickLocation] = useState(location.center);

  const handleMapClick = (_target, mouseEvent) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setClickLocation({ lat, lng });
    setClickedLocation({ lat, lng });
  };
  console.log(clickLocation);
  return (
    <CustomMap
    center={location.center}
    style={{ width: "100%", height: "100%" }}
    level={1}
    onClick={handleMapClick}
    >
      <MapMarker position={clickLocation} />
    </CustomMap>
  );
};

export default ToiletRegisterMap;