import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../compoments/Navbar'
import { Play, Info } from 'lucide-react';
import  useGetTrendingContent  from '../../hooks/useGetTrendingContent';
import { MOVIE_CATEGORIES, ORIGNAL_SIZE_img_URL, TV_CATEGORIES } from "../../utils/baseUrl.js";
import {useContentStore} from '../../store/content.js';
import MovieSlider from "../../compoments/MovieSlider.jsx";

export default function HomeScreen() {
  const { trendingContent } = useGetTrendingContent();
  console.log("trending content is: ",trendingContent);
  const {contentType}=useContentStore()

  return (
    <>
    <div className='relative h-screen text-white '>
      {/* <Navbar /> */}
      <Navbar/>

      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
      {(
        <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center shimmer -z-10' />
      )}

      <img
        src={ORIGNAL_SIZE_img_URL+trendingContent?.backdrop_path}
        alt='Hero img'
        className='absolute top-0 left-0 w-full h-full object-cover -z-50'
        onLoad={() => {
          
        }}
      />

      <div className='absolute top-0 left-0 w-full h-full bg-black/30 -z-50' aria-hidden='true' />

      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
        <div
          className='bg-gradient-to-b from-black via-transparent to-transparent 
        absolute w-full h-full top-0 left-0 -z-10'
        />

        <div className='max-w-2xl'>
          <h1 className='mt-4 text-6xl font-extrabold text-balance'>
            {trendingContent?.title || trendingContent?.name || trendingContent?.original_name}
          </h1>
          <p className='mt-2 text-lg'>
            {trendingContent?.overview.slice(0, 200)}...
          </p>

          <p className='mt-4 text-lg'>
            {trendingContent?.release_date || trendingContent?.first_air_date} - {trendingContent?.vote_average} ⭐
          </p>
        </div>

        <div className='flex mt-8'>
          <Link
            to={`/watch/${trendingContent?.id}`}
            className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
             items-center'
          >
            <Play className='size-6 mr-2 fill-black' />
            Play
          </Link>

          <Link
            to={`/watch/${trendingContent?.id}`}
            className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
          >
            <Info className='size-6 mr-2' />
            More Info
          </Link>
        </div>
      </div>
    </div>

    <div className='flex flex-col gap-10 bg-black py-10'>
    <div className='flex flex-col gap-10 bg-black py-10'>
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>
    </div>
  </>
  )
}
