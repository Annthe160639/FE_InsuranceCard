import React from "react";
import { Carousel, Image } from "antd";
const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#FFFFFF ",
};
const Banner = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <Image
            height={400}
            width={1000}
            src="https://mybic.vn/uploads/slide/36/Nam-moi.jpg"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            height={400}
            width={1000}
            src="https://mybic.vn/uploads/photos/75/xe-may.jpg"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image
            height={400}
            width={1000}
            src="https://mybic.vn/uploads/slide/22/MVL.jpg"
          />
        </h3>
      </div>
    </Carousel>
  );
};

export default Banner;
