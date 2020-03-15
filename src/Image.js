import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Image = () => {

    const [image, setImage] = useState('');

    useEffect(() => {
        ipcRenderer.on("image", (event, arg) => {
            setImage(arg);
        });
    },[]);

    return (
        <div className="image">
            { image && <img src={image} alt="" /> }
        </div>
    );
};

export default Image;
