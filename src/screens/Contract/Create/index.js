import React, { useState } from "react";
import axios from "axios";
import { Form, Typography, Button } from "antd";

const { Title } = Typography;

const CreateContract = () => {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "zmtq5y1s");

    axios
      .post("https://api.cloudinary.com/v1_1/dlgs1eqbv/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
      });
  };
  return (
    <div>
      <Title className="title">Tạo hợp đồng</Title>
      <input
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />
      <Button onClick={uploadImage}>Upload</Button>
    </div>
  );
};

export default CreateContract;
