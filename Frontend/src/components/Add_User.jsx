import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Add_User = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    singleImage: null,
    multipleImages: [],
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSingleImageChange = (e) => {
    setFormData({ ...formData, singleImage: e.target.files[0] });
  };

  const handleMultipleImagesChange = (e) => {
    setFormData({ ...formData, multipleImages: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('singleImage', formData.singleImage);
    for (let i = 0; i < formData.multipleImages.length; i++) {
      formDataToSend.append('multipleImages', formData.multipleImages[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/images', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <Link to="/" className='bg-blue-400 rounded-md hover:bg-blue-500 py-2 px-3'>Back to home</Link>
        </div>
          <form onSubmit={handleSubmit}>
          <h1 className="mt-7 mb-5 text-center text-3xl font-bold">Add New User</h1>
            <div className='mt-2'>
                <label className="block text-md font-medium leading-5 text-gray-700" >Name:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className='mt-2'>
                <label className='block text-md font-medium leading-5 text-gray-700'>Age:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
              </div>
              <div className='mt-2'>
                <label className='block text-md font-medium leading-5 text-gray-700'>Single Image:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="file" name="singleImage" onChange={handleSingleImageChange} required />
                </div>
              </div>
              <div className='mt-2'>
                <label className='bloack text-md font-medium leading-5 text-gray-700'>Multiple Images:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="file" name="multipleImages" onChange={handleMultipleImagesChange} multiple required />
                </div>
              </div>
              {/* <button>Submit</button> */}
              <div className="mt-6 flex flex-row items-center">
                <button type="submit" className="bg-green-500 hover:bg-green-600 mx-auto text-white font-bold py-2 px-4 rounded inline-flex items-center">Add User</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Add_User;