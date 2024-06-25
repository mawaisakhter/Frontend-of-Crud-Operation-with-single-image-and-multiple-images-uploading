import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };
  const delUser = async(UserId) =>{
    await axios.delete(`http://localhost:5000/api/images/delete/${UserId}`)
    .then((response)=>{
      setForms((prevUser)=> prevUser.filter((user)=> user._id !== UserId))
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
 }
  return (
    <>
    <div className='p-20'>
        <Link to="/Adduser" className='bg-green-400 rounded-sm hover:bg-green-500 py-2 px-4'>Add New User</Link>
        {/* <Link to="/Awaispk" className='bg-red-400 rounded-sm hover:bg-red-500 ml-20 py-2 px-4'>Test</Link> */}
        <div className="">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-surface">
                  <thead className="border-b border-neutral-200 font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Age</th>
                      <th scope="col" className="px-6 py-4">Image</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      forms.map((user, index)=>{
                        return(                        
                            <tr className="border-b border-neutral-200" key={user._id}>
                              <th className="px-6 py-4">{index + 1}</th>
                              <td className="px-6 py-4 font-medium">{user.name}</td>
                              <td className="px-6 py-4 font-medium">{user.age}</td>
                              <td className="px-6 py-4">
                                <img src={`http://localhost:5000/${user.singleImage}`} className='w-20 h-16' alt="" />
                              </td>
                              <td className="px-6 py-4">
                                <Link to={`/view_user/`+user._id}  className="bg-blue-500 hover:bg-blue-600 mx-auto text-white font-bold py-2 px-6 rounded inline-flex items-center">View</Link>
                              </td>
                              <td className="px-6 py-4">
                                <Link to={`/Edituser/`+user._id} className="bg-blue-500 hover:bg-blue-600 mx-auto text-white font-bold py-2 px-6 rounded inline-flex items-center">Edit</Link>
                              </td>
                              <td className="px-6 py-4">
                                <button onClick={()=> delUser(user._id)} className="bg-red-500 hover:bg-red-600 mx-auto text-white font-bold py-2 px-6 rounded inline-flex items-center">Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

