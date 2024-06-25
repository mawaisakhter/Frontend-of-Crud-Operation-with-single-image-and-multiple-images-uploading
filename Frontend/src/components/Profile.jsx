import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const Profile = () => {
  const [forms, setForms] = useState([]);
  const {id} = useParams();  
  //  console.log(id);
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/images/getone/${id}`);
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const deleteImage = async (imgpath, objId) => {
      const imageUrl = imgpath;
      // console.log(imageUrl);
      const objectId = objId;
      // console.log(objectId);
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
      <div className="container w-4/5 mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <Link to="/" className='bg-blue-400 rounded-md hover:bg-blue-500 py-2 px-3'>Back to home</Link>
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 text-center">User Information</h3>
          <h2 className="text-2xl text-gray-800"><strong>Name: </strong>{forms.name}</h2>
          <p className="text-gray-600"><strong>Age: </strong> {forms.age}</p>
            <div className="space-y-4">
              <p className="text-gray-600 mt-5"><strong>Main Image:</strong>
                <img  className="h-44 w-48 object-cover rounded-t-xl" src={`http://localhost:5000/${forms.singleImage}`}  alt="" />
              </p>
              <p className="text-gray-600"><strong>Multiple Images:</strong>
                <div key={forms._id} className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                  {forms.multipleImages && forms.multipleImages.length > 0 ? (
                    forms.multipleImages.map((image, index) => (
                      <div key={index} className="w-48 bg-white shadow-md rounded-xl ">

                        <button onClick={()=> deleteImage(image, forms._id)} className="hover:text-red-600 mx-auto text-black font-bold py-2 px-6 rounded inline-flex items-center">X</button>

                        <img  src={`http://localhost:5000/${image}`} alt="Product" className="h-44 w-48 object-cover rounded-t-xl" />
                      </div>    
                    ))
                    ) : (
                      <p>Loading images...</p>
                    )}
                </div>
              </p> 

              <div className="text-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">Edit Profile</button>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile