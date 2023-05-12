import React, { useState } from 'react'

const PostForm = ({ userId, userName }) => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [filtre, setFiltre] = useState("");
    const [image, setImage] = useState("")

    const handleSubmit = (e) => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        setFiltre("");
        setImage("")
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

    const handleImage = (value) => {
        setImage(value);
    };

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
                filter: filtre,
                image: image,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log("error"))

    };

    return (
        <div >
            <div className="card ">
                <div className="card-body">
                    <input
                        className="form-control input"
                        type="title"
                        placeholder="İçerik Başlğı"
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
                    <input type="file" className="form-control" id="customFile" style={{ width: "350px", margin: "10px" }}   value={image} onChange={(e) => handleImage(e.target.value)} />
                    <select
                        className="form-control"
                        style={{ width: "350px", marginLeft: "10px" }}
                        value={filtre}
                        onChange={(e) => handleFiltre(e.target.value)}
                    >
                        <option value="">Filtre Seçiniz</option>
                        <option value="Alcohol">Alcohol</option>
                        <option value="Smoking Addiction">Smoking Addiction</option>
                        <option value="Drugs">Drugs</option>
                        <option value="Gambling">Gambling</option>
                        <option value="Technology">Technology</option>
                    </select>
                    <button type="button" className="btn btn-success buttonn" onClick={handleSubmit}>Paylaş</button>
                </div>
            </div>
        </div>
    )
}

export default PostForm