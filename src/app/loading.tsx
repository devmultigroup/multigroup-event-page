"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Replace "/logo.png" with your logo path */}
      <img src="/logo-small-white.png" alt="Logo" className="mb-8 w-16" />

      {/* Loading bar container */}
      <div className="w-48 h-px bg-gray-600 rounded-full overflow-hidden relative">
        {/* The animated white bar */}
        <div className="h-full bg-white animate-loading"></div>
      </div>
    </div>
  );
}
