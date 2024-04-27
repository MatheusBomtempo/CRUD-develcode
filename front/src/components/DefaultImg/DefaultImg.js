import React from 'react';
import defaultProfileImage from '../../img/dflImg.png';

const DefaultImg = ({ user }) => {
    const base64Photo = user?.foto ? `data:image/jpeg;base64,${user.foto}` : defaultProfileImage;

    return (
        <img
            src={base64Photo}
            alt={user?.nome || 'User Profile'}
            style={{
                borderRadius: '50%',
                width: '50px',
                height: '50px',
            }}
        />
    );
};

export default DefaultImg;
