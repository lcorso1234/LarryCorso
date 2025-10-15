const logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- Batman-style logo -->
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <circle cx="50" cy="50" r="48" fill="url(#bgGrad)"/>
  
  <g transform="translate(50, 52) scale(0.5)">
    <path fill="#000000" d="
      M 0,-50
      L -8,-45 L -12,-48 L -18,-45 L -25,-38
      Q -35,-28 -38,-20 L -42,-10 L -45,0 L -42,10 L -35,20
      L -28,25 L -22,18 L -18,10 L -12,5 L -6,10 L -3,18
      L 0,25
      L 3,18 L 6,10 L 12,5 L 18,10 L 22,18 L 28,25
      L 35,20 L 42,10 L 45,0 L 42,-10 L 38,-20
      Q 35,-28 25,-38
      L 18,-45 L 12,-48 L 8,-45
      Z
    "/>
    <ellipse fill="#000000" cx="-25" cy="-5" rx="8" ry="12" transform="rotate(-20 -25 -5)"/>
    <ellipse fill="#000000" cx="25" cy="-5" rx="8" ry="12" transform="rotate(20 25 -5)"/>
    <ellipse fill="#000000" cx="0" cy="-20" rx="10" ry="15"/>
    <path fill="#000000" d="M -6,-45 L -10,-55 L -4,-48 Z"/>
    <path fill="#000000" d="M 6,-45 L 10,-55 L 4,-48 Z"/>
  </g>
  
  <circle cx="50" cy="50" r="48" fill="none" stroke="#000000" stroke-width="1"/>
</svg>
`;

// Convert SVG to a data URL
const svgBlob = new Blob([logo], { type: "image/svg+xml" });
const url = URL.createObjectURL(svgBlob);

// Create an image from the SVG
const img = new Image();
img.onload = () => {
  // Create a canvas to draw the image
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Convert canvas to blob
  canvas.toBlob((blob) => {
    // Create a link to download the image
    const link = document.createElement("a");
    link.download = "marketing-logo.png";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

img.src = url;
