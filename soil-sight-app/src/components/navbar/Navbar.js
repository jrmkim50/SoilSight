import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    
    const [active, setActive] = useState("home");
    const HOME = "home";
    const MAP = "map";
    const NEW = "new";
    const pageNames = {};
    pageNames["home"] = "/";
    pageNames["map"] = "/map";
    pageNames["new"] = "/new";

    const handleItemClick = (e, { name }) => setActive(name)

    return (
        <div className = "p-2">
            <Menu borderless className = "Navbar">
                <Menu.Item
                    as = {Link}
                    to = ""
                    name = {pageNames[HOME]}
                    active={activeItem === pageNames[HOME]}
                    onClick={handleItemClick}
                >
                    Home
                </Menu.Item>   
                <Menu.Item
                    as = {Link}
                    to = ""
                    name = {pageNames[MAP]}
                    active={activeItem === pageNames[MAP]}
                    onClick={handleItemClick}
                >
                    Map
                </Menu.Item>    
                <Menu.Item
                    as = {Link}
                    to = ""
                    name = {pageNames[NEW]}
                    active={activeItem === pageNames[NEW]}
                    onClick={handleItemClick}
                >
                    New
                </Menu.Item>               
            </Menu>
        </div>
    );
}

export default Navbar;