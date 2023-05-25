import React, { useRef, useState } from "react";
import alkol from './images/alcohol.png';
import bagımlılık from './images/all.webp';
import sigara from './images/sigara.jpg';
import drugs from './images/drgs.webp';
import teknoloji from './images/tek.png';
import kumar from './images/kumar.png';

const FiltrelemeEkrani = ({ handleFilterChange }) => {

  const storyListRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const stories = [
    { id: 1, value: '', name: "All Posts", image: bagımlılık },
    { id: 2, value: 'Alcohol', name: "Alcohol", image: alkol },
    { id: 3, value: 'Smoking', name: "Smoking", image: sigara },
    { id: 4, value: 'Drugs', name: "Drugs", image: drugs },
    { id: 5, value: 'Technology', name: "Technology", image: teknoloji },
    { id: 6, value: 'Gambling', name: "Gambling", image: kumar },
    { id: 21, value: 'Alcohol', name: "Alcohol", image: alkol },
    { id: 31, value: 'Smoking', name: "Smoking", image: sigara },
    { id: 41, value: 'Drugs', name: "Drugs", image: drugs },
    { id: 51, value: 'Technology', name: "Technology", image: teknoloji },
    { id: 23, value: 'Alcohol', name: "Alcohol", image: alkol },
    { id: 33, value: 'Smoking', name: "Smoking", image: sigara },
    { id: 43, value: 'Drugs', name: "Drugs", image: drugs },
    { id: 53, value: 'Technology', name: "Technology", image: teknoloji },
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
    
      <div className="card " style={{background: '#f8f9fa'}}>
      <div
        style={{
          display: "flex",
          overflowX: "hidden",
          position: "relative"
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
              alignItems: "center"
            }}
          >
            <img
              src={story.image}
              alt={story.name}
              style={{ borderRadius: "50%", width: "60px", height: "55px", objectFit: 'orginal', cursor: 'pointer' }}
              onClick={() => handleClick(story.value)}
            />
            <p style={{ marginTop: "5px" }}>{story.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiltrelemeEkrani;
