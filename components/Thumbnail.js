import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#modal");

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
  },
};

const Thumbnail = ({ result }) => {
  const BaseUrl = "https://image.tmdb.org/t/p/original/";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [keyId, setKeyId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const notify = () =>
    toast.error("Sorry No Trailer!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const filterVideos = (videos) =>
    videos.filter((video) => video.name === "Official Trailer");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = () => {
    if (!keyId) {
      notify();
    } else {
      openModal();
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${result.id}?api_key=${API_KEY}&append_to_response=videos`
    )
      .then((res) => res.json())
      .then(({ videos }) => {
        if (videos?.results.length > 0) {
          const value = filterVideos(videos?.results);
          setKeyId(value[0]?.key);
        }
      });
  }, []);

  return (
    <>
      <div
        onClick={handleClick}
        className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105"
      >
        <Image
          layout="responsive"
          src={
            `${BaseUrl}${result.backdrop_path || result.poster_path}` ||
            `${BaseUrl}${result.poster_path}`
          }
          height={1080}
          width={1920}
        />
        <div className="p-2">
          <p className="max-w-md truncate">{result.overview}</p>
          <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
            {result.title || result.original_name}
          </h2>
          <p className="flex items-center opacity-0 group-hover:opacity-100">
            {result.media_type && `${result.media_type} .`}{" "}
            {result.release_date || result.first_air_date} .{" "}
            <ThumbUpIcon className="h-5 mx-2">{result.vote_count}</ThumbUpIcon>
          </p>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="bg-[#06202A]"
        style={customStyles}
      >
        <YouTube videoId={keyId} opts={{ width: "100%" }} />
        <p className="text-center p-2">{result.overview}</p>
      </Modal>
    </>
  );
};

export default Thumbnail;
