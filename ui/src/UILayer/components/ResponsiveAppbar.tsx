import React, { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import PersonProfileIcon from "./PersonProfileIcon";
import { useNavigate } from 'react-router-dom';

// Interface definitions
interface ListNameAndPageInterface {
  name: string;
  path: string;
}

interface ResponsiveListProps {
  pageList: string[];
  pathList: string[];
}

const ResponsiveAppBar: React.FC<ResponsiveListProps> = ({ pageList, pathList }) => {
  // State for mobile menu toggle
  const [openNav, setOpenNav] = useState(false);

  // Create navigation list
  const listNameAndPage: ListNameAndPageInterface[] = [];
  pageList.forEach((value, index) => {
    if (value !== "Index") {

      listNameAndPage.push({ name: value, path: pathList[index] });
    }
  });

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop navigation list
  const navList = (
    <ul className="flex  flex-col gap-2   lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {listNameAndPage.map((element) => (
        <Typography
          key={element.name}
          as="li"
          variant="small"
          className="font-bold text-lg"
          style={{ color: 'white' }}
        >
          <div
            onClick={() => navigate(`/${element.path.toLowerCase().replace(' ', '-')}`)}
            className="flex 
            
            items-center justify-center  rounded-lg
             text-black hover:text-purple-200
              hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            {element.name}
          </div>
          {/* <button
            onClick={() => navigate(`/${element.path.toLowerCase().replace(' ', '-')}`)}
            className="flex items-center justify-center px-3 py-2 rounded-lg text-white hover:text-purple-200 hover:bg-white/10 transition-colors duration-200"
          >
            {element.name}
          </button> */}
        </Typography>
      ))}
    </ul>
  );

  const navigate = useNavigate();

  return (
    <div className="w-full h-full border-2 border-blue-500">
      <Navbar className="sticky top-0 z-10 h-full max-w-full rounded-none px-4 py-2 lg:px-8 border-none shadow-xl">
        <div className="flex items-center justify-between text-white w-full h-full">

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Typography
              as="div"
              onClick={() => navigate("/home/index")}
              className="cursor-pointer py-1.5 font-bold text-xl lg:text-2xl hover:text-black transition-colors duration-200"
              style={{ fontFamily: 'Times New Roman, serif', color: 'black' }}
            >
              ICE SITE
            </Typography>
          </div>

          {/* Desktop Navigation - Centered (Hidden on Mobile) */}
          <div className="hidden lg:block">
            {navList}
          </div>

          {/* Call to Action Buttons / Profile / Toggle */}
          <div className="flex items-center gap-4">
            <PersonProfileIcon
              onClick={() => navigate("/admin/person-profile")}
            />

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        {/* Mobile Navigation Collapse */}
        <Collapse open={openNav}>
          <div className="container mx-auto">
            <ul className="flex flex-col gap-2 mt-4 mb-4">
              {listNameAndPage.map((element) => (
                <li key={element.name}>
                  <div
                    onClick={() => {
                      setOpenNav(false);
                      navigate(`/${element.path.toLowerCase().replace(' ', '-')}`);
                    }}
                    className="block py-2 px-3 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Typography variant="small" className="font-bold">
                      {element.name}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ResponsiveAppBar;