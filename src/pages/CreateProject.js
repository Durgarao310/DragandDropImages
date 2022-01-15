import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { addProject } from "../redux/project";
import { v4 as uuid } from 'uuid'


const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alrt, setAlrt] = useState(false)
  let [images, setImages] = useState([])
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const addFiles = async (files) => {
    // console.log(files[0].imageFile.name)
    for (let i = 0; i < files.length; i++) {
      const id = uuid()
      images = [{ id: id, label: `images-${id}`, imageFile: files[i] }, ...images]
    }
    setImages(images)
  };

  const removeImage = (id) => setImages(images.filter((item) => item.id !== id))


  const submitProject = (e) => {
    e.preventDefault()
    if (images.length > 0) {
      dispatch(addProject({ name: name, description: description, project: images }))
      navigate('/label-images');
    }
    else {
      setAlrt(true)
      setTimeout(() => {
        setAlrt(false)
      }, 10000)
    }
  }

  return (
    <div className="">
      <div className="absolute w-full flex justify-center items-center p-2">
        {alrt &&
          <div className="bg-gray-900 border border-red-900 text-red-700 px-4 py-1 rounded relative flex flex-row justify-between items-center">
            <p className="p-2 font-sans text-red-300">please drag and drop the images</p>
            <p className="cursor-pointer ml-5  items-center text-center rounded-full flex-nowrap text-red-300 hover:bg-gray-700 px-2" onClick={() => setAlrt(false)}>x</p>
          </div>
        }
      </div>
      <form className="pt-32" onSubmit={submitProject}>
        <div className="flex justify-center items-center flex-wrap">
          <div className="shadow-xl">
            <FileDrop onDrop={(files) => addFiles(files)}>
              <div className="bg-gray-800 border-2 rounded-lg w-72 h-72 flex justify-center items-center border-dashed border-gray-400">
                <div className="flex flex-col justify-center items-center">
                  <img className="w-10 h-10" src="images/folder.png" alt="folder" />
                  <p className="text-sm text-gray-500">Drag & Drop images here!</p>
                </div>
              </div>
            </FileDrop>
          </div>
          <div className="flex flex-col place-items-start m-6">
            <label className="text-gray-500">Name</label>
            <input
              required
              placeholder="type someting....."
              className="px-3 py-1.5 bg-gray-800 my-2 rounded-md w-full shadow-sm	text-white focus:text-gray-100 focus:bg-gray-800 focus:border-blue-600 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-gray-500">Description</label>
            <textarea
              style={{ resize: "none" }}
              rows="4"
              required
              placeholder="type something..."
              className="px-3 py-1.5 bg-gray-800 my-2 rounded-md w-full shadow-sm	text-white focus:text-gray-100 focus:bg-gray-800 focus:border-blue-600 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex my-4">
              <button className="flex bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-6 py-2 rounded-lg text-white" type="submit">create</button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-row justify-center flex-wrap p-4 w-full h-full">
        {images && images.map((i) => (
          <div key={i.id}>
            <div>
              <div className="relative flex justify-center flex-col items-center p-2 bg-gray-200 w-72 h-72 m-4 shadow-xl rounded-lg">
                <img className="w-48 h-48" src={URL.createObjectURL(i.imageFile)} alt={i.imageFile.name} />
                <p className="m-4 w-60 text-center truncate overflow-hidden">{i.imageFile.name}</p>
                <div className="absolute top-0 cursor-pointer right-0 h-8 w-8 bg-gray-400 flex justify-center items-center rounded-full m-1" onClick={() => removeImage(i.id)}>
                  <p className=" text-white font-bold">X</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProject;
