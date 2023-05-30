import React, { useState } from 'react';

const PostForm = ({ userId, userName }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [filtre, setFiltre] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    savePost();
    setIsSent(true);
    setTitle('');
    setText('');
    setFiltre('');
    setImageFile('');
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
    // ...
  };

  return (
    <div className="container" style={{height: '350px', marginTop: '30px'}}>
      <div className="card">
        <div className="card-body">
          <input
            className="form-control input"
            type="title"
            placeholder="İçerik Başlığı"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          ></input>
          <input
            className="form-control input"
            type="text"
            placeholder="İçerik Detay"
            value={text}
            onChange={(e) => handleText(e.target.value)}
          ></input>
          <input
            type="file"
            className="form-control"
            id="customFile"
            onChange={handleImageChange}
            style={{marginLeft: '8px'}}
          />
          <select
            className="form-control"
            value={filtre}
            onChange={(e) => handleFiltre(e.target.value)}
            style={{marginTop:'10px', marginLeft: '8px'}}
          >
            <option value="">Filtre Seçiniz</option>
            <option value="Alcohol">Alcohol</option>
            <option value="Smoking Addiction">Smoking Addiction</option>
            <option value="Drugs">Drugs</option>
            <option value="Gambling">Gambling</option>
            <option value="Technology">Technology</option>
          </select>
          <button
            type="button"
            className="btn btn-success buttonn"
            onClick={handleSubmit}
          >
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
