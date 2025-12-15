import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col justify-center items-center text-white font-mono">
      <h1 className="text-6xl font-bold mb-4 animate-pulse text-neon">
        404
      </h1>
      <p className="text-xl mb-6 text-center">
        Oops! You’ve wandered into the neon void.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-purple-700 hover:bg-purple-500 text-white rounded-full shadow-lg transition-all duration-300">
            Go Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
