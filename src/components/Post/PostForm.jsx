import React, { useState } from "react";
import '../../App.css'

const PostForm = ({ userId, userName, onPostSubmit }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [filtre, setFiltre] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    setFiltre("");
    setImageFile("");
    onPostSubmit();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleFiltre = (value) => {
    setFiltre(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const savePost = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("text", text);
    formData.append("filter", filtre);
    formData.append("imageFile", imageFile);

    fetch("/posts", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post oluşturuldu", data);
        onPostSubmit();
      })
      .catch((err) => {
        console.log("Hata oluştu", err);
      });
  };

  return (
    <div className="card" style={{backgroundColor: '#e0efed'}}>
      <div className="row">
        <div className="col-md-7">
          <input
            className="form-control input"
            type="title"
            placeholder="İçerik Başlığı"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          ></input>
        </div>
        <div className="col-md-4">
          <select
            className="form-control input"
            value={filtre}
            onChange={(e) => handleFiltre(e.target.value)}
          >
            <option value="">Filtre Seçiniz</option>
            <option value="Alkol">Alkol</option>
            <option value="Sigara">Sigara</option>
            <option value="Kumar">Kumar</option>
            <option value="Teknoloji">Teknoloji</option>
            <option value="Alışveriş">Alışveriş</option>
            <option value="Kafein">Kafein</option>
            <option value="Yeme">Yeme</option>
            <option value="İlişki">İlişki</option>
            <option value="Eroin">Eroin</option>
            <option value="Kokain">Kokain</option>
            <option value="Kokain">Esrar</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <input
            className="form-control input"
            type="text"
            placeholder="İçerik Detay"
            value={text}
            onChange={(e) => handleText(e.target.value)}
          ></input>
        </div>
        <div className="col-md-4">
          <input
            type="file"
            className="form-control input"
            id="customFile"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="text-center" style={{backgroundColor: '#e0efed', padding: '7px'}}>
        <button
          type="button"
          className="button1 "
          onClick={handleSubmit}
        >
          Paylaş
        </button>
      </div>
    </div>
  );
};

export default PostForm;
