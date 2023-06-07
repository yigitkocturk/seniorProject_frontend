import React, { useState } from 'react';
import PostList from '../Post/PostList';
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar';
import FiltrelemeEkrani from '../Filtre';
import Client from '../chatrooms/Client';


const Home = () => {
  const [filter, setFilter] = useState('');
  const [refreshList, setRefreshList] = useState(false);

  const handlePostSubmit = () => {
    setRefreshList(!refreshList); // Toggle refreshList state
  };

  const handleFilterChange = (name) => {
    setFilter(name);
  };



  return (
    <div className='container-fluid' style={{ backgroundColor: '#fafafa', height: '100vh' }}>
      <Navbar></Navbar>
      <div className='row' style={{ height: 'calc(100vh - 56px)' }}>
        <div className='col-md-8 mt-5' style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', height: '100%' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mt-4'>
                <FiltrelemeEkrani handleFilterChange={handleFilterChange} />
              </div>
              <div className='col-12'>
                <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} onPostSubmit={handlePostSubmit} />
                <PostList filter={filter} refreshList={refreshList} /> {/* Pass refreshList as prop */}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4 mt-4' style={{  position: 'sticky', bottom: '0', overflowY: 'auto', paddingTop: '45px', marginLeft: '-15px', marginRight: '-15px', borderRadius: '0 0 10px 10px' }}>
          <div style={{ position: 'sticky', display: 'flex', flexDirection: 'column' }}>
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
