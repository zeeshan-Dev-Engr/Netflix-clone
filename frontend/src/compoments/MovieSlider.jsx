import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_SIZE_URL } from "../utils/baseUrl.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);

	const sliderRef = useRef(null);

	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	useEffect(() => {
        const getContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${category}`);
                console.log("Content fetched:", res.data); // debug
                setContent(res.data?.trailer?.results || []); // fallback to empty array
            } catch (err) {
                console.error("Error fetching content:", err);
                setContent([]); // prevent undefined issues
            }
        };    
        getContent();
    }, [contentType, category]);
    

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

	return (
		<div
  className="bg-black text-white relative px-5 md:px-20 py-8"
  onMouseEnter={() => setShowArrows(true)}
  onMouseLeave={() => setShowArrows(false)}
>
  <h2 className="mb-6 text-2xl md:text-3xl font-semibold tracking-wide">
    {formattedCategoryName} {formattedContentType}
  </h2>

  <div
    ref={sliderRef}
    className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth transition-all duration-300 no-scrollbar"
  >
    {content?.map((item) =>
      item.backdrop_path ? (
        <Link
          to={`/watch/${item.id}`}
          key={item.id}
          className="min-w-[250px] sm:min-w-[300px] relative group transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <div className="rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <img
              src={SMALL_SIZE_URL + item.backdrop_path}
              alt="Movie image"
              className="w-full h-auto object-cover group-hover:brightness-75 transition-all duration-300"
            />
          </div>
          <p className="mt-2 text-center text-sm sm:text-base font-medium truncate px-1">
            {item.title || item.name}
          </p>
        </Link>
      ) : null
    )}
  </div>

  {/* Arrows */}
  {showArrows && (
    <>
      <button
       className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
       size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
       '
        onClick={scrollLeft}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
        '
        onClick={scrollRight}
      >
        <ChevronRight size={24} />
      </button>
    </>
  )}
</div>

	);
};
export default MovieSlider;