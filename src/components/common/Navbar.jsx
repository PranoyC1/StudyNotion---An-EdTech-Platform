import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* DROPDOWN */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 
                      p-4 text-richblack-900 opacity-0 transition-all duration-150 
                      group-hover:visible group-hover:translate-y-[1.65em] 
                      group-hover:opacity-100 lg:w-[300px]">

                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 
                        translate-x-[80%] translate-y-[-40%] rotate-45 rounded bg-richblack-5">
                      </div>

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 z-50 h-full w-72 bg-richblack-800 p-6 flex flex-col transition-transform duration-300">
            {/* Close Button & Logo */}
            <div className="flex items-center justify-between mb-6 text-richblack-5">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                <img src={logo} alt="Logo" width={140} height={28} />
              </Link>
              <button onClick={() => setIsSidebarOpen(false)}>
                <AiOutlineClose fontSize={24} />
              </button>
            </div>

            {/* Account Section */}
            <div className="mb-6 flex flex-col items-center text-richblack-5 gap-3">
              {token && user ? (
                <>
                  <div className="text-yellow-25 font-semibold">Your Account</div>
                  <ProfileDropdown
                    isMobile={true}
                    closeSidebar={() => setIsSidebarOpen(false)}
                  />
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      setIsSidebarOpen(false);
                      window.location.href = "/login";
                    }}
                    className="cursor-pointer hover:text-yellow-25"
                  >
                    Login
                  </div>
                  <div
                    onClick={() => {
                      setIsSidebarOpen(false);
                      window.location.href = "/signup";
                    }}
                    className="cursor-pointer hover:text-yellow-25"
                  >
                    Sign Up
                  </div>
                </>
              )}
            </div>

            <hr className="border-white/30 my-2" />

            {/* Courses Section */}
            <div className="flex flex-col gap-2 mb-6 items-center">
              <h3 className="text-yellow-25 font-semibold text-lg mt-4">Courses</h3>
              {loading ? (
                <p>Loading...</p>
              ) : subLinks?.length ? (
                subLinks.map((subLink, i) => (
                  <Link
                    key={i}
                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                    className="pl-2 hover:text-yellow-25 text-richblack-5 mt-2"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {subLink.name}
                  </Link>
                ))
              ) : (
                <p className="pl-2">No Courses Found</p>
              )}
            </div>

            <hr className="border-white/30 my-2" />

            {/* Other Links */}
            <div className="flex flex-col gap-2 mt-6 items-center">
              <Link
                to="/about"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-yellow-25 text-richblack-5"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-yellow-25 text-richblack-5"
              >
                Contact
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
