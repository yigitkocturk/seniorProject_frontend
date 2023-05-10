
import React from 'react'
import PostList from '../Post/PostList'
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar';


const Home = () => {
    return (
        <div className='container' >
            <Navbar></Navbar>
            <div className=' mt-5 '>
                <div className="row  ">
                    <div className="col-8 mt-5 " style={{ overflowY: 'scroll', height: '600px' }}>
                        <PostList key={58} userId={1} userName={1} title={"adsdas"} text={"sada"} />
                    </div>
                    <div className="col-4 mt-5 ">
                        <div><PostForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} /></div>
                        <div className="card mt-3 " style={{ overflowY: 'scroll', height: '300px' }}>
                            <div className="card-body">
                                <h3>Filter</h3>
                                <a href='alcohol'>Alcohol</a><br />
                                <a href='smokking'>Smokking Addiction</a><br />
                                <a href='drugs'>Drugs</a><br />
                                <a href='gambling'>Gambling</a><br />
                                <a href='technology'>Technology</a><br />
                                <a href='alcohol'>Alcohol</a><br />
                                <a href='smokking'>Smokking Addiction</a><br />
                                <a href='drugs'>Drugs</a><br />
                                <a href='gambling'>Gambling</a><br />
                                <a href='technology'>Technology</a><br />
                                <a href='alcohol'>Alcohol</a><br />
                                <a href='smokking'>Smokking Addiction</a><br />
                                <a href='drugs'>Drugs</a><br />
                                <a href='gambling'>Gambling</a><br />
                                <a href='technology'>Technology</a><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home