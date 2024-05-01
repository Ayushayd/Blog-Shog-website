import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import {SERVER_URL} from '../../ServerURL.js'

const PopularAuthors = () => {

  const [authors, setAuthors] = useState([]);
  useEffect(()=>{
    const fetchUser = async () => {
      const {data} = await axios.get(`${SERVER_URL}/user/authors`, {withCredentials: true}
      );
      setAuthors(data.authors);
    };
    fetchUser();
  }, []);

  return (
    <section className='popularAuthors'>
      <h3>Popular Authors</h3>
      <div className="container">
        {
          authors && authors.length > 0 ? (authors.slice(0, 4).map(element =>{
            return(
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="author" />
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
            )
          })) : (<BeatLoader size={30} color="gray" />)
        }
      </div>

    </section>
  )
}

export default PopularAuthors
