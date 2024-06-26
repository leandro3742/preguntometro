import { useState } from 'react';
import brand from '../assets/logo.png';

// eslint-disable-next-line react/function-component-definition
const Header = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const classNameGenerator = (key) => {
    const url = window.location.pathname;
    // eslint-disable-next-line no-restricted-globals
    if (key === url && screen.width < 768) {
      return 'block py-2 px-3 rounded bg-blue-600 text-gray-200 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
    }
    if (key === url && screen.width >= 768) return 'block py-2 px-3 rounded text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
    return 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
  };

  return (
    <nav className="rounded-b-md shadow-xl bg-white border-gray-200 dark:bg-gray-900 top-0 w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={brand} className="lg:h-16 h-14" alt="Flowbite Logo" />
        <>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavbarOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isNavbarOpen ? '' : 'hidden'}`} id="navbar-default">
            {/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li onClick={toggleNavbar}>
                <a href="/" className={classNameGenerator('/')}>Inicio</a>
              </li>
              <li onClick={toggleNavbar}>
                <a href="/examen" className={classNameGenerator('/examen')}>Exámen</a>
              </li>
            </ul> */}
          </div>
        </>
      </div>

    </nav>
  );
};

export default Header;
