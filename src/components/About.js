import React from "react";
import Footer from "./Footer";
import GoogleMaps from "./GoogleMaps";
import "./css/About.css";

function About() {
  return (
    <div className="about-background-image">
      <div className="about-container">
        <h1>Carmouche Jewelers</h1>
        <p>
          Since our establishment in 1979, Carmouche Jewelers has been committed
          to providing unparalleled customer service. Our journey began with a
          simple yet profound vision: to not just sell jewelry, but to offer a
          personalized and caring service that turns every purchase into a
          memorable experience. Over the decades, our dedication to this mission
          has remained unwavering. We believe that purchasing jewelry is not
          just a transaction; it's an intimate experience that should be treated
          with the utmost care and attention. Each piece of jewelry tells a
          story, and we strive to make the process of choosing and buying these
          treasures as special as the moments they will commemorate.
        </p>
        <p>
          At Carmouche Jewelers, we pride ourselves on offering only the finest
          quality of jewelry. Our selection is guided by the principles of
          old-world craftsmanship, blending timeless techniques with
          contemporary designs. Each piece in our collection is chosen for its
          exceptional quality, unique design, and the exquisite skill evident in
          its creation. Our range includes a variety of styles, from classic
          elegance to modern sophistication, ensuring that every customer finds
          something that resonates with their personal taste and style. We
          understand that jewelry is an expression of one's personality, and our
          curated collection reflects this philosophy.
        </p>
        <p>
          We invite you to explore our story and discover the exclusive brands
          we carry in-store. Our collection is a testament to our commitment to
          excellence and quality. Each brand we feature has been selected for
          its alignment with our values and standards, ensuring that when you
          shop with us, you're choosing from the best. From engagement rings
          that symbolize love and commitment to elegant watches that represent
          timeless sophistication, our in-store selection caters to all
          occasions and preferences. Visit us at Carmouche Jewelers, where our
          history, quality craftsmanship, and dedication to customer service
          come together to offer you not just jewelry but a piece of art that
          you can cherish forever.
        </p>
      </div>
      <GoogleMaps/>
      <Footer />
    </div>
  );
}

export default About;
