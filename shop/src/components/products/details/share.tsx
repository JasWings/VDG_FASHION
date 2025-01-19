import React from 'react';

const ShareButtons = ({ imageUrl, message }: { imageUrl: string; message: string }) => {

  const shareToWhatsApp = async () => {
    // Convert the image URL to a Blob and create a file
    const imageBlob = await fetch(imageUrl).then((res) => res.blob());
    const imageFile = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });

    // Prepare to share the file
    const shareData = {
      title: 'Check this out!',
      text: message,
      files: [imageFile],
    };

    try {
      // If the browser supports file sharing (navigator.share API)
      if (navigator.canShare && navigator.canShare({ files: shareData.files })) {
        await navigator.share(shareData); // Share image directly
      } else {
        alert('Sharing not supported on this browser for this file type.');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={shareToWhatsApp} // When clicked, it will share as image on WhatsApp
        className="px-6 py-3 bg-green-500 text-white rounded-md text-xl font-semibold transition transform hover:bg-green-400"
      >
        Share
      </button>
    </div>
  );
};

export default ShareButtons;
