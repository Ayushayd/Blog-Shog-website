import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URL } from '../../ServerURL.js';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    }
  };
  const {mode, isAuthenticated} = useContext(Context);
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("avatar", avatar);

    try {
      const {data} = await axios.post(`${SERVER_URL}/user/register`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": 'multipart/form-data'
        },
      }
    );
    setName("");
    setEmail("");
    setEducation("");
    setAvatarPreview("");
    setAvatar("");
    setPassword("");
    setPhone("");
    setRole("");
    navigateTo('/');
    toast.success(data.message); 
    console.log(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  if(isAuthenticated){
    return <Navigate to={'/'} />
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className='auth-form'>
        <form onSubmit={handleRegister}>
        <h1>REGISTER</h1>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">SELECT ROLE</option>
          <option value="Reader">READER</option>
          <option value="Author">AUTHOR</option>
        </select>
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name'/>
        </div>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email'/>
        </div>
        <div>  
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Your Number'/>
        </div>
        <div>  
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your Password'/>
        </div>
          <select value={education} onChange={(e) => setEducation(e.target.value)}>
            <option value="">SELECT YOUR EDUCATION</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div className="avatar">
            <img src={avatarPreview ? `${avatarPreview}` : "/pic.jpg"} alt="avatar" />
          </div>
          <input type="file" onChange={changeAvatarHandler} className='avatar_input_tag' style={{border: "none"}} />
        </div>
        <p>Already Registered? <Link to={'/login'}>Login Now</Link></p>
        <button type='submit' className='submit-btn'>
          REGISTER
        </button>
        </form>
      </section>
    </article>
  )
}

export default Register