import React, { useState } from 'react';
import UserActivity from './UserActivity';
import Navbar from '../Navbar';
import User from './User';


const UserView = () => {

    return (
        <div className='container' style={{ backgroundColor: '#fff' }}>
            <Navbar />
            <div className='mt-4'>
                <div className="row">
                    <div className="col-md-7 col-sm-12 mt-5" style={{ overflowY: 'scroll', height: '600px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <UserActivity />
                    </div>
                    <div className="col-md-5 col-sm-12 mt-5">
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <User />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserView;
