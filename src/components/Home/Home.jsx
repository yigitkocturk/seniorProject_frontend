
import React, { useState } from 'react'
import PostList from '../Post/PostList'
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar';


const Home = () => {
    const [filter, setFilter] = useState("");
    return (
        <div className='container' >
            <Navbar></Navbar>
            <div className=' mt-5 '>
                <div className="row  ">
                    <div className="col-8 mt-5 " style={{ overflowY: 'scroll', height: '600px' }}>
                        <PostList key={58} userId={1} userName={1} title={"adsdas"} text={"sada"} filter={filter} />
                    </div>
                    <div className="col-4 mt-5 ">
                        <div><PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} /></div>
                        <div className="card mt-3 " style={{ overflowY: 'scroll', height: '280px' }}>
                            <div className="card-body">
                                <h3>Filter</h3>
                                <a value='' onClick={() => setFilter('')} onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }}>All Posts</a><br />
                                <a value='Alcohol' onClick={() => setFilter('Alcohol')} onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }}>Alcohol</a><br />
                                <a onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }} value='Smoking Addiction ' onClick={() => setFilter('Smoking Addiction')}>Smokking Addiction</a><br />
                                <a onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }} value='Drugs' onClick={() => setFilter('Drugs')}>Drugs</a><br />
                                <a onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }} value='Gambling' onClick={() => setFilter('Gambling')}>Gambling</a><br />
                                <a onMouseEnter={(e) => {
                                    e.target.style.color = 'blue';
                                    e.target.style.cursor = 'pointer';
                                }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'initial';
                                        e.target.style.cursor = 'initial';
                                    }} value='Technology' onClick={() => setFilter('Technology')}>Technology</a><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home