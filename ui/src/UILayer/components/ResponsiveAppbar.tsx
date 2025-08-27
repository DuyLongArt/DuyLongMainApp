import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

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
  // console.log("page list: "+pageList);
  const listNameAndPage: ListNameAndPageInterface[] = [];
  pageList.forEach((value, index) => {
  if(!(value==="Index")) {
    listNameAndPage.push({name: value, path: pathList[index]});
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
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {listNameAndPage.map((element) => (
        <Typography
          key={element.name}
          as="li"
          variant="small"
          className="font-black"
          style={{ color: 'white' }}
        >
          <a
            href={`/home/${element.path.toLowerCase().replace(' ', '-')}`}
            className="flex items-center px-3 py-2 rounded-lg text-white hover:text-purple-900 hover:bg-purple-50 duration-200 font-medium"
          >
            {element.name}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="w-full border border-red-500"> {/* Debug border - remove in production */}
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-gradient-to-r bg-indigo-700 border-none shadow-xl">
        <div className="flex items-center justify-end text-white">
          
          {/* Desktop Logo */}
          <Typography
            as="a"
            href="/home/index"
            className="mr-4 cursor-pointer py-1.5  font-bold text-xl lg:text-2xl hidden md:block hover:text-purple-200  duration-200"
            style={{ fontFamily: 'Times New Roman, serif', color: 'white' }}
          >
            DuyLongApp
          </Typography>

          {/* Mobile Logo */}
          <div className="flex items-center md:hidden">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
            </svg>
            <Typography
              as="a"
              href="/"
              className="cursor-pointer py-1.5 font-bold text-lg hover:text-purple-200 text-white duration-200"
              style={{ fontFamily: 'monospace', letterSpacing: '0.3rem' ,color:'white'}}
            >
              LOGO
            </Typography>
          </div>

          {/* Desktop Navigation */}
          <div className="mr-4 hidden lg:block">
            {navList}
          </div>

          {/* Call to Action Buttons - Desktop */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">

              <Button
                variant="filled"
                size="sm"
                className="bg-white text-purple-600 hover:bg-gray-100 transition-colors duration-200"
              >
                 Settings
              </Button>
            </div>

            {/* Mobile Menu Button */}
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
            {/* Mobile Navigation Links */}
            <ul className="mt-2 mb-4 flex flex-col gap-2">
              {listNameAndPage.map((element) => (
                <Typography
                  key={element.name}
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <a
                    href={`/home/${element.path.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center px-3 py-2 rounded-lg text-white hover:text-purple-200 hover:bg-white/10 transition-colors duration-200 font-medium"
                    onClick={() => setOpenNav(false)}
                  >
                    {element.name}
                  </a>
                </Typography>
              ))}
            </ul>

            {/* Mobile Call to Action Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
              >
                💼 Hire Me
              </Button>
              <Button
                variant="filled"
                size="sm"
                fullWidth
                className="bg-white text-purple-600 hover:bg-gray-100 transition-colors duration-200"
              >
                📱 Contact
              </Button>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ResponsiveAppBar;