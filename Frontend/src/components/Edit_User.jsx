import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Edit_User = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    singleImage: null,
  });
  const navigate = useNavigate();
  const {id} = useParams();  
  const [singleImagePreview, setSingleImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, singleImage: file });
    setSingleImagePreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    const newImages = files.map(file => {
      return URL.createObjectURL(file);
    });
    setImages(prevImages => [...prevImages, ...newImages]);

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = id; // Replace with the actual user ID

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    if (formData.singleImage) {
      formDataToSend.append('singleImage', formData.singleImage);
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/images/update/${userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }

    const formData2 = new FormData();
    Array.from(selectedImages).forEach(image => {
        formData2.append('multipleImages', image);
    });

    try {
        const response = await axios.put(`http://localhost:5000/api/images/${userId}/add-images`, formData2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Updated Object:', response.data);
        navigate("/")
    } catch (error) {
        console.error('Error uploading images:', error);
    }
  };
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/images/getone/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const deleteImage = async (imgpath) => {
    const imageUrl = imgpath;
    const objectId = id;
  try {
      const response = await axios.put(`http://localhost:5000/api/images/${objectId}/delete-image`, { imageUrl });
      console.log('Updated Object:', response.data);
  } catch (error) {
      console.error('Error deleting image:', error);
  }
  fetchForms();
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
          <h1 className="text-center text-2xl font-bold">Edit User Data</h1>
            <div className='mt-2'>
                <label className="block text-md font-medium leading-5 text-gray-700" >Name:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                </div>
              </div>
              <div className='mt-2'>
                <label className='block text-md font-medium leading-5 text-gray-700'>Age:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="number" name="age" value={formData.age} onChange={handleChange}  required />
                </div>
              </div>
              <div className='mt-2'>
                <label className='block text-md font-medium leading-5 text-gray-700'>Single Image:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="file" name="singleImage" onChange={handleSingleImageChange}  required />
                </div>
                <div>
                  {singleImagePreview && <img src={singleImagePreview} alt="Single Image Preview" width="100" />}
                </div>
              </div>

              <div className='mt-2'>
                <label className='bloack text-md font-medium leading-5 text-gray-700'>Multiple Images:</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input className='w-full px-3 py-2 border border-gray-300 rounded-md' type="file" accept="image/*" multiple onChange={handleImageChange} required />
                </div>
                <div>
                  <div>
                    <div>
                    {images.map((image, index) => (
          <img key={index} src={image} alt={`uploaded ${index}`} className="uploaded-image"/>
        ))}

                    </div>
                  </div>
                </div>
              </div>

              <div>
                  <div key={formData._id} className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-2 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {formData.multipleImages && formData.multipleImages.length > 0 ? (
                      formData.multipleImages.map((image, index) => (
                        <div key={index} className="w-28 h-24 bg-white shadow-md rounded-xl ">
                          <button onClick={()=> deleteImage(image)} className="hover:text-red-600 mx-auto text-black font-bold py-2 px-6 rounded inline-flex items-center">X</button>

                          <img  src={`http://localhost:5000/${image}`} alt="Product" className="h-24 w-28 object-cover rounded-t-xl" />
                        </div>    
                        ))
                      ) : (
                        <p>Loading images...</p>
                      )}
                  </div>
              </div>

              {/* <button>Submit</button> */}
              <div className="mt-6 flex flex-row items-center">
                <button  type="submit" className="bg-green-500 hover:bg-green-600 mx-auto text-white font-bold py-2 px-4 rounded inline-flex items-center">Update User</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Edit_User;
