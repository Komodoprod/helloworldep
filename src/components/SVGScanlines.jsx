import React from 'react';

const SVGScanlines = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        pointerEvents: 'none',
        opacity: 0.7, // Adjust as needed
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: 'block' }}
      >
        <defs>
          <pattern
            id="scanlines"
            width="1"
            height="2"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1, 1)"
          >
            <rect x="0" y="0" width="1" height="1" fill="rgba(0, 0, 0, 0.7)" />
            <rect x="0" y="1" width="1" height="1" fill="transparent" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scanlines)" />
      </svg>
    </div>
  );
};

export default SVGScanlines;