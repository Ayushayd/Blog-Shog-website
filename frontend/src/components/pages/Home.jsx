import React, { useContext } from 'react'
import { Context } from '../../main'
import HeroSection from '../miniComponent/HeroSection'
import TrendingBlogs from '../miniComponent/TrendingBlog'
import LatestBlogs from '../miniComponent/LatestBlog'
import PopularAuthors from '../miniComponent/PopularAuthors'

const Home = () => {
  const {mode, blogs} = useContext(Context)
  const filteredBlogs = blogs.slice(0, 6);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection />
      <TrendingBlogs />
      <LatestBlogs blogs={filteredBlogs} heading={"Latest Blogs"}/>
      <PopularAuthors/>

    </article>
  )
}

export default Home
