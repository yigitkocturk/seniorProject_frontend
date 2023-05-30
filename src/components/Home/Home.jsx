import React, { useState } from 'react';
import PostList from '../Post/PostList';
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar';
import FiltrelemeEkrani from '../Filtre';
import Client from '../chatrooms/Client';

const Home = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (name) => {
    setFilter(name);
  };

  return (
    <div className='container-fluid' style={{ backgroundColor: '#fff', height: '100vh' }}>
      <Navbar></Navbar>
      <div className='row' style={{ height: 'calc(100vh - 56px)' }}>
        <div className='col-md-8  mt-5' style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', height: '100%' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mt-4'>
                <FiltrelemeEkrani handleFilterChange={handleFilterChange} />
              </div>
              <div className='col-12'>
                <PostList filter={filter} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4  mt-4' style={{ position: 'sticky', bottom: '0', overflowY: 'auto', paddingTop: '15px', marginLeft: '-15px', marginRight: '-15px' }}>
          <div style={{ position: 'sticky', display: 'flex', flexDirection: 'column' }}>
            <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} />
            <div>
              <Client></Client>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;