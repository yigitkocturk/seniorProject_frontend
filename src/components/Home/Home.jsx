import React, { useState } from 'react';
import PostList from '../Post/PostList';
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar';
import FiltrelemeEkrani from '../Filtre';

const Home = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (name) => {
    setFilter(name);
  };
  return (
    <div className='container' style={{backgroundColor: '#fff'}}>
      <Navbar></Navbar>
      <div className='mt-4'>
        <div className="row">
          <div className="col-md-8 col-sm-12 mt-5" style={{ overflowY: 'scroll', height: '600px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <FiltrelemeEkrani handleFilterChange={handleFilterChange} />
            <PostList filter={filter} />
          </div>
          <div className="col-md-4 col-sm-12 mt-5">
            <div style={{ position: 'sticky', top: '20px' }}>
              <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
