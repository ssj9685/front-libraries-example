//@ts-nocheck
import { javascript_app_key } from "@/const";
import { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${javascript_app_key}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var mapContainer = document.getElementById("map"),
          mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

        var map = new window.kakao.maps.Map(mapContainer, mapOption);

        var marker = new window.kakao.maps.Marker({
          map,
          position: map.getCenter(),
        });

        new window.kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(33.450936, 126.569477),
        });

        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            var latlng = mouseEvent.latLng;

            marker.setPosition(latlng);

            var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
            message += "경도는 " + latlng.getLng() + " 입니다";

            var resultDiv = document.getElementById("clickLatlng");
            resultDiv.innerHTML = message;
          }
        );
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <>
      <div id="clickLatlng"></div>
      <div
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
