const logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#fff" stroke="#666" stroke-width="2"/>
  <path d="M32,40 Q50,15 68,40" fill="none" stroke="#f55" stroke-width="6" stroke-linecap="round"/>
  <path d="M32,60 Q50,85 68,60" fill="none" stroke="#f55" stroke-width="6" stroke-linecap="round"/>
  <text x="50" y="65" font-family="Arial" font-size="12" text-anchor="middle" fill="#333">MARKETING</text>
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
