import React from 'react';

const FacebookPage = ({ pageUrl, width, height }) => {
  const encodedUrl = encodeURIComponent(pageUrl);

  return (
    <div className="facebook-page">
      <iframe 
        title="Facebook Page"
        src={`https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media">
      </iframe>
    </div>
  );
};

export default FacebookPage;
