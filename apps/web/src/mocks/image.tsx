import React from "react";

// Simple mock implementation of Next.js Image component
export default function Image({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any;
}) {
  return <img src={src} alt={alt} width={width} height={height} {...props} />;
}