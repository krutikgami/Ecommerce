import React, { useState, useEffect } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../Redux/userSlice";
import { IoSearchOutline } from "react-icons/io5";
import useSearch from "../Redux/ContextApi/Cartcontext";
import Search from "./Search";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  GlobeAmericasIcon,
  PhoneIcon,
  RectangleGroupIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    link: "/product",
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
    link: "/specialoffer",
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    link: "/aboutus",
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
    link: "/support",
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
    link: "/contactus",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <NavLink
              to={link}
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </NavLink>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />

      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <NavLink to="/cart" className="flex items-center gap-2 py-2 pr-4">
          Cart
        </NavLink>
      </Typography>
    </List>
  );
}

function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signoutSuccess());
    navigate("/sign-in");
  };

  return (
    <>
      <Navbar className="ml-5 w-full sticky top-0 z-50 py-1">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-black font-bold lg:ml-2"
          >
            Ecommerce
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex bg-gray-200 border-1 rounded-md">
              <Search />
            </div>
          </div>
          <div className="hidden lg:flex gap-2">
            {!currentUser ? (
              <NavLink
                to="/sign-in"
                className="text-white bg-black hover:bg-black focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
              >
                Log in
              </NavLink>
            ) : (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className="w-10 h-8 hidden lg:block"
                    alt="user"
                    img={`https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png`}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    @{currentUser ? currentUser.data.user.username : null}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.data.user.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <NavList />
          <div className="flex flex-col items-start lg:hidden">
            {!currentUser ? (
              <NavLink
                to="/sign-in"
                className="text-white bg-black hover:bg-black focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mt-2"
              >
                Log in
              </NavLink>
            ) : (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <p className="block py-2 pr-4 pl-3 text-gray-700 border-b bg-black text-white border-gray-100 lg:border-0 lg:p-0 rounded cursor-pointer">Profile</p>
                 }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    @{currentUser ? currentUser.data.user.username : null}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.data.user.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavbarWithMegaMenu;
