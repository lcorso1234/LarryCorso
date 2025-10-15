const logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- Bat symbol logo -->
  <g transform="translate(50, 50) scale(0.5)">
    <path fill="#000000" d="M -80,-20 Q -90,-40 -95,-30 Q -100,-20 -90,-10 Q -85,0 -75,5 Q -65,8 -55,5 L -40,-5 Q -50,-15 -60,-20 Q -70,-22 -80,-20 Z"/>
    <path fill="#000000" d="M 80,-20 Q 90,-40 95,-30 Q 100,-20 90,-10 Q 85,0 75,5 Q 65,8 55,5 L 40,-5 Q 50,-15 60,-20 Q 70,-22 80,-20 Z"/>
    <ellipse fill="#000000" cx="0" cy="-15" rx="15" ry="20"/>
    <path fill="#000000" d="M -40,-5 Q -45,10 -50,20 Q -55,25 -60,22 Q -58,15 -55,5 L -40,-5 Z"/>
    <path fill="#000000" d="M 40,-5 Q 45,10 50,20 Q 55,25 60,22 Q 58,15 55,5 L 40,-5 Z"/>
    <ellipse fill="#000000" cx="0" cy="10" rx="12" ry="18"/>
    <path fill="#000000" d="M -8,-30 L -12,-40 L -5,-35 Z"/>
    <path fill="#000000" d="M 8,-30 L 12,-40 L 5,-35 Z"/>
  </g>
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
