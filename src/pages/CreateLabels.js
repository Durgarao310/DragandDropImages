import React, { useState, useEffect }from 'react'
import { useSelector } from 'react-redux';

const CreateLabels = () => {
    let getProject = useSelector((state) => state?.project?.project)
    let [images, setImages] = useState([])
    let [label, setLabel] = useState("")
    let [index, setIndex ] = useState(0)
    let [loading, setLoading] = useState(false)
    

    useEffect(() => {
        addImages()
    }, [])

    useEffect(() => {
        if (images?.length > 0) {
             setLabel(images[index].label)
         }
    }, [index || images])

    const addImages = async () => {
        setLoading(true)
        setImages(getProject?.project)
        setLoading(false)
    }

    const indexIncrement = async () => {
        let id = images[index].id
        let res = images.filter(v => v.id !== id)
        let imgfile = images[index].imageFile
        let r = { id: id, label: label, imageFile: imgfile }
        let b = [r,...res]
        setImages(b)
        if (images.length > index+1) {
            setIndex(index+1)
        }
        
    }
    const indexDecrement = () => {
        let id = images[index].id
        let res = images.filter(v => v.id !== id)
        let imgfile = images[index].imageFile
        let r = { id: id, label: label, imageFile: imgfile }
        let a = [...res,r]
        setImages(a)
        if (index > 0) {
            setIndex(index-1)
        }
    }

    const SaveLabel = () => {
       return (
            <div>
            <a
                href={
                "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify({projectName: getProject.name, description: getProject.description, labels:images}))
                }
                download={`${getProject.name}.json`}
            >
            <p   className="bg-gray-900 text-white px-4 py-1 rounded-md cursor-pointer" >Save</p>
            </a>
            </div>
        );
        
    }

    

    return (
        <div className="h-screen w-screen">
            {loading ?
                <div>
                    loading....
                </div> :
                <div>
                        <div className="py-4">
                            <p className="text-3xl">Label Images</p>
                        </div>
                    <div className="flex flex-col items-start">
                        {images?.length > 0 &&
                            <div className="px-10">
                                <div className="flex flex-col mb-6 bg-gray-200 p-10 rounded-lg">
                                    <div className="flex flex-col items-star">
                                        <div className="items-star">
                                            <label className="flex float-left mt-2">Label</label>
                                        </div>
                                        <div className="my-2 flex float-left">
                                            <input
                                                className="p-2 text-black bg-gray-400 w-52 mb-4 rounded-md"
                                                value={label}
                                                onChange={(e)=>setLabel(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-48 w-60">
                                        <img className="rounded-lg w-56 h-44" src={URL.createObjectURL(images[index].imageFile)} alt={images[index].imageFile.name} />
                                    </div>
                                </div>
                                <div className="flex flex-row ">
                                    <div className="mx-2">
                                        <p className={index === 0 ? "bg-gray-400 text-white px-4 py-1 rounded-md cursor-not-allowed" : "bg-gray-900 text-white px-4 cursor-pointer py-1 rounded-md"} onClick={()=>indexDecrement()}>Prev</p>
                                    </div>
                                    <div className="mx-2">
                                        <p className={index === images.length-1 ? "bg-gray-400 text-white px-4 py-1 rounded-md cursor-not-allowed": "cursor-pointer bg-gray-900 text-white px-4 py-1 rounded-md"} onClick={() => indexIncrement()}>Next</p>
                                     </div>
                                
                                    <div className="mx-2">
                                        <SaveLabel />
                                    </div>
                                </div>
                           </div>
                        }
                    </div>
                </div>
            } 
        </div>
    )
 }
export default CreateLabels;

