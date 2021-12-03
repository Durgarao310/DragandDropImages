import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch } from 'react-redux';
import {  useNavigate } from "react-router";
import { addProject } from "../redux/project";
import folder from '../assests/folder.png'
var uuid = require("uuid");

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [alrt, setAlrt] = useState(false)
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const addFiles = (files) => {
    var id = uuid.v4();
    // for (let i = 0; i < files.length; i++){
      setImages([...images, { id:id, label: "hello", imageFile:  files[0]}]);
    // }
  };

  const submitProject = (e) => {
    e.preventDefault()
    if (images.length > 0) {
      dispatch(addProject({name: name, description:description, project: images }))
      navigate('/label-images');
    }
    else {
      setAlrt(true)
      setTimeout(() => {
        setAlrt(false)
      },3000)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center my-8 z-auto">
         {alrt &&
          <div className="flex justify-center items-center w-96 bg-red-500">
              <p className="px-10 py-2 text-white">please upload the images</p>
          </div>
        }
      </div>
      <form className="mt-10" onSubmit={submitProject}>
        <div className="flex justify-center items-center">
          <FileDrop onDrop={(files) => addFiles(files)}>
            <div className="bg-gray-100 border-2 rounded-lg w-60 h-48 flex justify-center items-center border-dashed border-gray-400">
              <div className="flex flex-col justify-center items-center">
                 <img className="w-10 h-10" src={folder} alt="folder"/>
                 <p className="text-sm">Drag & Drop images here!</p>
             </div>
            </div>
          </FileDrop>
          <div className="flex flex-col place-items-start mx-10">
            <label className="">Name</label>
            <input
              required
              placeholder="type someting....."
              className="px-6 py-2 bg-gray-100 my-4 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="">Description</label>
            <textarea
              style={{resize:"none"}}
              rows="4" 
              required
              placeholder="type something..."
              className="px-10 bg-gray-100 my-4 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          <div className="flex bg-gray-900 text-white p-2 rounded-md">
            <button type="submit">Create</button>
          </div>
          </div>
        </div>
      </form>
      <div className="mt-4">
        {images.map((i) => (
          <div key={i.id}>
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center p-6 bg-gray-300 mt-6 w-96">
                <img className="w-20 h-20" src={URL.createObjectURL(i.imageFile)} alt={i.imageFile.name} />
                <p className="ml-10">{i.imageFile.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProject;
