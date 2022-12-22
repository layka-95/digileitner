import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // console.log(err);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block"
      }}
      data-ad-client="ca-pub-5592080580535773"
      data-ad-slot="7624414003"
    />
  );
};

export default AdBanner;




