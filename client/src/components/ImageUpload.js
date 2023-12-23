import React from "react";
import { useEffect, useRef, useState } from "react";
import "../styles/imageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.value || "");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid; // because of useState batching

    if (event.target.files && event.target.files.length !== 0) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={"form-control centered"}>
      <input
        id={props.id}
        name={props.name}
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .jpeg, .png"
        ref={filePickerRef}
        onChange={pickedHandler}
      />

      <div className={`image-upload ${props.center && "center"}`}>
        <div className={"image-upload__preview"}>
          {!previewUrl && <p>Выберите картинку</p>}
          {previewUrl && <img src={previewUrl} alt="Preview"></img>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          ВЫБРАТЬ ФОТО
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
