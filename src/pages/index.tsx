import React, { useState, useEffect, useRef } from "react";

import {
  Page,
  Button,
  Avatar,
  ImageViewer,
  useSnackbar,
  useNavigate,
  Box,
  Picker,
  Input,
  Text,
  Icon,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import axios from "axios";
import Resizer from "react-image-file-resizer";

import UserCard from "../components/user-card";
import { chooseImage } from "zmp-sdk/apis";
import { openMediaPicker } from "zmp-sdk/apis";

export const HomePage: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setImageFile] = useState("");
  const [image, setImage] = useState(
    "https://static.thenounproject.com/png/4974686-200.png"
  );
  const navigate = useNavigate();

  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const timmerId = useRef();

  useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    },
    []
  );

  useEffect(() => {
    // Your Blob URL
    const blobUrl = image;

    // Convert Blob URL to Blob object
    if (blobUrl.startsWith("blob")) {
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Resize the image
          Resizer.imageFileResizer(
            blob,
            1000, // New width
            1000, // New height
            "JPEG", // định dạng đầu ra mong muốn (JPEG, PNG, WEBP)
            100,
            1,
            (uri) => {
              // Xử lý hình ảnh đã được resize (uri là đường dẫn của hình ảnh đã được resize)
              setImageFile(uri);
              console.log(uri);
            },
            "base64" // kiểu đầu ra (base64 hoặc blob)
          );
        })
        .catch((error) => {
          console.error("Error fetching Blob:", error);
        });
    }
  }, [image]);

  // Fetch attachment
  const handleChooseImage = async () => {
    const { filePaths, tempFiles } = await chooseImage({
      sourceType: ["camera"],
      cameraType: "front",
      count: 1,
    });
    const [selectedFile] = filePaths;
    setImage(selectedFile);
  };

  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       new Blob([file], { type: "image/png" }),
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "file"
  //     );
  //   });

  // const onChange = async () => {
  //   try {
  //     const file = image;
  //     console.log(file);
  //     const image2 = await resizeFile(file);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const InsertDB = async () => {
    let formData = new FormData(); //formdata object
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("image", file);

    console.log(file);
    // console.log(base64Img);
    axios
      .post("http://localhost:8000/api/zalo-mini-app/push", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        openSnackbar({
          text: response.data.status,
          type: "success",
        });
        navigate("/lucky-wheel");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        Object.values(JSON.parse(error.response.data.message)).forEach(
          (element) => {
            openSnackbar({
              text: element,
              type: "error",
            });
          }
        );
      });
  };

  return (
    <div className="section-container">
      <Page className="section-container">
        <Box mt={6} flex={true}>
          <img
            className="slide-img"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            src={
              image ??
              "https://www.energyfit.com.mk/wp-content/plugins/ap_background/images/default/default_large.png"
            }
            alt="slide-2"
          />
          <Box ml={6} flex={false} width={1000}>
            <Input
              label="Họ và tên"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              label="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <Button variant="primary" size="small" onClick={onChange}>
              onChange
            </Button> */}
            <Button variant="primary" size="small" onClick={handleChooseImage}>
              Chọn ảnh
            </Button>
            <Button variant="primary" size="small" onClick={InsertDB}>
              Gửi
            </Button>
          </Box>
        </Box>
      </Page>
    </div>
  );
};

export default HomePage;
