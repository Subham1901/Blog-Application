import React, { useState, useContext } from "react";
import Svg from "../Navigation/Svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../Navigation/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function MainHeader() {
  const [toggle, setToggle] = useState(false);
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleLogout = () => {
    auth.logout();
    navigate("/login");
    setToggle(false);
  };

  return (
    <nav className={toggle ? "navbar expanded" : "navbar"}>
      <div className="logo">
        <Link to={"/"} onClick={(e) => setToggle(false)}>
          <Svg />
        </Link>
      </div>
      <div className="toggle-icon" onClick={handleToggle}>
        {toggle ? (
          <AiOutlineClose color="black" size={28} />
        ) : (
          <AiOutlineMenu color="black" size={28} />
        )}
      </div>
      <ul className="links">
        <li>
          <Link to={"/"} onClick={(e) => setToggle(false)}>
            Home
          </Link>
        </li>

        {auth.isLoggedin && (
          <li>
            {" "}
            <Link
              to={`/${auth.userId}/myplaces`}
              onClick={(e) => setToggle(false)}
            >
              My Places
            </Link>
          </li>
        )}

        {auth.isLoggedin && (
          <li>
            {" "}
            <Link to={"/places/new"} onClick={(e) => setToggle(false)}>
              Add Place
            </Link>
          </li>
        )}
        {!auth.isLoggedin && (
          <li>
            <Link to={"/login"} onClick={(e) => setToggle(false)}>
              Login
            </Link>
          </li>
        )}
        {auth.isLoggedin && (
          <li>
            <Menu>
              <MenuButton as={Button} rightIcon={<IoMdArrowDropdown />}>
                Profile
              </MenuButton>

              <MenuList>
                <MenuItem>{auth.userName}</MenuItem>
                <MenuDivider />
                <MenuItem fontWeight={"bold"} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainHeader;
