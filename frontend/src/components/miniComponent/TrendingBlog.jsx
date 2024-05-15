import React, {useContext} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Context} from '../../main';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const TrendingBlogs = () => {
  const {blogs} = useContext(Context)
  const trendBlogs = blogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1324, min: 1005 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1005, min: 700 },
    items: 2,
    slidesToSlideL: 1
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

return(
  <div className="trending">
    <h3>Trending</h3>
    <Carousel responsive={responsive}>
      {
      trendBlogs && trendBlogs.length > 0 ? (
        trendBlogs.slice(0, 6).map((element) => {
        return(
          <Link to={`/blog/${element._id}`} className='card' key={element._id}>
            <img src={element.mainImage.url} alt="blog" className='blogImg' />
            <span className='category'>{element.category}</span>
            <h4>{element.title}</h4>
            <div className="writer_section">
              <div className="author">
                <img src={element.authorAvatar} alt="authorAvatar" />
                <p>{element.authorName}</p>
              </div>
            </div>
          </Link>
          )
        })
      ) : (
        <BeatLoader size={30} color='grey'></BeatLoader>
      )
}
    </Carousel>
  </div>
)

}

export default TrendingBlogs