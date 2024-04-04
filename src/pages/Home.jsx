/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-5">
        <Link to="/chufles">
          <button
            className="bg-blue-500 p-2 px-6 rounded-lg shadow-md focus:ring-blue-500 text-white"
            type="button"
          >
            Academia chufle's
          </button>
        </Link>

        <Link to="/abysa">
          <button
            className="bg-blue-500 p-2 px-6 rounded-lg shadow-md focus:ring-blue-500 text-white"
            type="button"
          >
            Academia Abysa
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
