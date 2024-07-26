import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/ThemeSlice";
import { signOutSuccess } from "../Redux/Slice/UserSlice";



const Header = () => {

  const path = useLocation().pathname;
  const navigate = useNavigate()
  // after login store the user for currentuser
  const {currentuser} = useSelector((state)=>state.user)
  const {theme} = useSelector((state)=>state.theme)
  const dispatch = useDispatch()

  const handleSignout=()=>{
    dispatch(signOutSuccess())
    localStorage.removeItem("Token")
    navigate('/signin')
  }

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white "
      >
        <span className="px-2 py-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-lg text-white ">
          Marapuk
        </span>
        Kalam!
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search Blog...."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className=" lg:hidden text-dark"
        gradientDuoTone="purpleToPink"
        outline
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2 ">
        <Button
          className="hidden sm:inline"
          gradientDuoTone="purpleToPink"
          outline
          pill
          onClick={()=>dispatch(toggleTheme())}
        >
          {theme === 'light'?(<FaMoon/>):(<FaSun/>)}
      </Button>

      {currentuser ? (
        <Dropdown  arrowIcon={false} inline label={<Avatar alt="user" img={currentuser.rest.profilePicture} rounded />} >
          <Dropdown.Header>
            <span className="block text-sm" >{currentuser.rest.username}</span>
          </Dropdown.Header>
          <Link to="/dashboard?tab=profile">
          <Dropdown.Item>profile</Dropdown.Item>
          </Link>
          <DropdownDivider/>
          <Dropdown.Item onClick={handleSignout} >Sign Out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/signin">
        <Button gradientDuoTone="purpleToPink"  >
        SignIn
        </Button>
        </Link>
      )}

      </div>
      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/blogs'} as={'div'}>
          <Link to="/blogs">Blogs</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
