import React from 'react';

const GoogleMaps = () => {
  const latitude = 30.086532686055403;
  const longitude = -90.5027877066184;
  const zoomLevel = 15;


  const mapUrl = `https://www.google.com/maps/@${latitude},${longitude},${zoomLevel}z`;

  return (
    <div className="google-map-container">
      <iframe
        title="Google Map"
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=${zoomLevel}&output=embed` || mapUrl}
        width="6000"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy">
      </iframe>
    </div>
  );
};

export default GoogleMaps;
