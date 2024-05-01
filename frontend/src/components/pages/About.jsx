import React, { useContext } from 'react'
import { Context } from '../../main';

const About = () => {
  const {mode} = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
      <h2>About</h2>
      <p>Welcome to Blog Shog, a vibrant platform where diverse minds meet to share their unique insights and experiences. Here at Blog Shog, we believe in the power of words and the magic they create when woven into compelling narratives. Our digital diary spans various topics, from travel and technology to food and lifestyle, regularly updated to keep our readers informed and engaged. Whether you're a seasoned professional or a curious beginner, Blog Shog is your space to learn, explore, and express. Join us in this journey of knowledge sharing and community building. Welcome to Blog Shog, where every story matters.</p>

      <p>Blog Shog is more than just a blogging platform - it's a community. We value the diversity of thoughts and the richness it brings to our content. Our writers are passionate individuals who bring their unique perspectives to the table, creating a tapestry of knowledge and experience. We invite you to be a part of this journey, to share your stories, learn from others, and grow with us. At Blog Shog, every voice is heard, every story is valued.</p>

      <p>Explore the world through the lens of our diverse contributors. Dive into the depth of their experiences, learn from their wisdom, and engage in enlightening discussions. Blog Shog is not just a website, it's a journey. Come, be a part of our story.</p>

      <p>Blog Shog is your digital companion, a place where curiosity meets knowledge. Our platform is a celebration of diversity, a space where every perspective is respected. We believe in the power of shared wisdom and the transformative potential of engaging discussions. We are committed to fostering a community that values learning and growth. Blog Shog is not just about sharing stories, it's about creating connections, sparking conversations, and inspiring change. Join us, and let's make the world a little more enlightened, one blog at a time.</p>

      <p>Blog Shog is a testament to the power of shared knowledge and the beauty of diverse perspectives. We are a community of thinkers, dreamers, and storytellers, each contributing to the rich tapestry of content that makes Blog Shog a treasure trove of insights. Our platform is a space for exploration and discovery, where you can delve into a myriad of topics and engage with a global community. We believe in the transformative power of words and the impact they can have when shared with the world. At Blog Shog, we are not just creating content, we are building bridges of understanding, fostering a culture of curiosity, and nurturing a love for learning. We invite you to join us on this journey, to share your stories, to learn, to grow, and to be a part of the Blog Shog family. Welcome to Blog Shog, where every word counts and every story makes a difference.</p>

      <p>Let's share experiences and knowledge to the world together!</p>
      </div>
    </article>
  )
}

export default About
