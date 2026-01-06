import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center font-mono text-white">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient" />

      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-[8rem] font-extrabold tracking-widest text-purple-500 drop-shadow-[0_0_35px_rgba(139,92,246,1)] animate-pulse">
          404
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Oops! You slipped into the <span className="text-purple-400">neon void</span>.
        </p>

        <Link to="/">
          <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Go Home</span>
            <span className="absolute inset-0 rounded-full blur-xl bg-purple-500 opacity-50" />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Error
