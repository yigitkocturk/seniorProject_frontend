import React, { useRef, useState } from "react";
import alkol from './images/alcohol.png';
import bagımlılık from './images/all.webp';
import sigara from './images/sigara.jpg';
import teknoloji from './images/tek.png';
import kumar from './images/kumar.png';
import alısveris from './images/alışveris.png'
import kafein from './images/kafein1.jpg'
import yeme from './images/yeme.png'
import iliski from './images/iliski.png'
import eroin from './images/eroin.png'
import kokain from './images/cocaine.jpg'
import esrar from './images/esrar.png'

const FiltrelemeEkrani = ({ handleFilterChange }) => {
  const storyListRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const stories = [
    { id: 1, value: '', name: "Hepsi", image: bagımlılık },
    { id: 2, value: 'Alkol', name: "Alkol", image: alkol },
    { id: 3, value: 'Sigara', name: "Sigara", image: sigara },
    { id: 4, value: 'Kumar', name: "Kumar", image: kumar },
    { id: 5, value: 'Teknoloji', name: "Teknoloji", image: teknoloji },
    { id: 6, value: 'Alışveriş', name: "Alışveriş", image: alısveris },
    { id: 21, value: 'Kafein', name: "Kafein", image: kafein },
    { id: 31, value: 'Yeme', name: "Yeme", image: yeme },
    { id: 41, value: 'İlişki', name: "İlişki", image: iliski },
    { id: 51, value: 'Eroin', name: "Eroin", image: eroin },
    { id: 23, value: 'Kokain', name: "Kokain", image: kokain },
    { id: 33, value: 'Esrar', name: "Esrar", image: esrar },
  ];

  const handleClick = (value) => {
    handleFilterChange(value);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - storyListRef.current.offsetLeft);
    setScrollLeft(storyListRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - storyListRef.current.offsetLeft;
    const dragDistance = x - startX;
    storyListRef.current.scrollLeft = scrollLeft - dragDistance;
  };

  return (
    <div className="card" style={{ background: "#e0efed" }}>
      <div
        style={{
          display: "flex",
          overflowX: "hidden",
          position: "relative",
        }}
        ref={storyListRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            
            }}
          >
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #ccc", /* Updated border color to gray (#ccc) */
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "55px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #fff", /* Added white border to create a frame effect */
                }}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    backgroundColor: '#fff'
                  }}
                  onClick={() => handleClick(story.value)}
                />
              </div>
            </div>
            <p style={{ marginTop: "5px" }}>{story.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltrelemeEkrani;