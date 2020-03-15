import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { ipcRenderer, remote: { Menu }} = window.require("electron");

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initMenu();
        axios.get("https://www.reddit.com/r/aww.json")
            .then(res => {
                setLoading(false);
                setData(res.data.data.children);
            });
    },[]);

    const showImage = image => {
        ipcRenderer.send("toggleImage", image);
    };

    const initMenu = () => {
        const menu = Menu.buildFromTemplate([{
            label: "File",
            submenu: [{ 
                label: "New Window" 
            }, {
                label: "Settings",
                accelerator: "CmdOrCtrl+,",
                click: () => {
                    ipcRenderer.send("toggleSettings");
                }
            }, { 
                type: "separator" 
            }, {
                label: "Quit",
                accelerator: "CmdOrCtrl+Q"
            }]
        }, {
            label: "Edit",
            submenu: [{ 
                label: "Menu Item 1" 
            }, { 
                label: "Menu Item 2" 
            }, { 
                label: "Menu Item 3" 
            }]
        }]);
        Menu.setApplicationMenu(menu);
    };

    return (
        <div className="home">
            { loading ? 
                <div className="loading">
                    <i className="fas fa-spin fa-spinner"></i>
                </div> : 
                <ul className="list-group">
                    { data.map(item => (
                        <li 
                            className="list-group-item"
                            key={item.data.id}
                            onClick={() => {
                                showImage(item.data.thumbnail);
                            }}
                        >
                            <img src={item.data.thumbnail} alt="" />
                            <p>{ item.data.title }</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default Home;
