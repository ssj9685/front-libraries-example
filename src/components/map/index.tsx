//@ts-nocheck
import { useEffect, useRef, useState } from "react";

const KakaoMap = () => {
  const kakaoMapRef = useRef();
  const mapRef = useRef(null);
  const [latlng, setlatlng] = useState();

  useEffect(() => {
    if (kakaoMapRef.current) return;

    kakaoMapRef.current = window.kakao.maps;

    const kakaoMap = kakaoMapRef.current;

    kakaoMap.load(() => {
      const map = new kakaoMap.Map(mapRef.current, {
        center: new kakaoMap.LatLng(33.450701, 126.570667),
        level: 3,
      });

      const marker = new kakaoMap.Marker({
        map,
        position: map.getCenter(),
      });

      new kakaoMap.Marker({
        map,
        position: new kakao.maps.LatLng(33.450936, 126.569477),
      });

      kakaoMap.event.addListener(map, "click", (mouseEvent) => {
        const latlng = mouseEvent.latLng;

        marker.setPosition(latlng);

        const message = `클릭한 위치의 위도는 ${latlng.getLat()}이고, 경도는 ${latlng.getLng()}`;
        setlatlng(message);
      });
    });
  }, []);

  return (
    <>
      <div>{latlng}</div>
      <div
        ref={mapRef}
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </>
  );
};

export default KakaoMap;
