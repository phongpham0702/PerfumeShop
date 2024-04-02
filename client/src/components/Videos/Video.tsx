const Video = () => {
  return (
    <div className="mx-auto my-20 h-fit w-[1140px]">
      <iframe
        className="h-[96vh] w-full rounded-md"
        src="https://www.youtube.com/embed/QQKrvFFxQxI?si=07Ba6C1E7WmnRrjy"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
