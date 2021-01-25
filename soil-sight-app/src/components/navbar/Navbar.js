import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    
    const [active, setActive] = useState("home");
    const HOME = "home";
    const MAP = "map";
    const NEW = "new";
    const pageNames = {};
    pageNames[HOME] = "/";
    pageNames[MAP] = "/map";
    pageNames[NEW] = "/new";

    const handleItemClick = (e, { name }) => setActive(name)

    return (
        <div className = "p-2">
            <Menu borderless className = "Navbar">
                <Menu.Item
                    as = {Link}
                    to = {pageNames[HOME]}
                    name = {pageNames[HOME]}
                    active={active === pageNames[HOME]}
                    onClick={handleItemClick}
                >
                    Home
                </Menu.Item>   
                <Menu.Item
                    as = {Link}
                    to = {pageNames[MAP]}
                    name = {pageNames[MAP]}
                    active={active === pageNames[MAP]}
                    onClick={handleItemClick}
                >
                    Map
                </Menu.Item>    
                <Menu.Item
                    as = {Link}
                    to = {pageNames[NEW]}
                    name = {pageNames[NEW]}
                    active={active === pageNames[NEW]}
                    onClick={handleItemClick}
                >
                    New
                </Menu.Item>               
            </Menu>
        </div>
    );
}

export default Navbar;