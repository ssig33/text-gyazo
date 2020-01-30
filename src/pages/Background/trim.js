export const trim = (dataUrl, { x, y, width, height }) => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const ratio = window.devicePixelRatio;
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      const context = canvas.getContext('2d');
      context.drawImage(
        img,
        x * ratio,
        y * ratio,
        width * ratio,
        height * ratio,
        0,
        0,
        width * ratio,
        height * ratio
      );
      resolve(canvas.toDataURL('image/jpeg'));
    };
  });
};
