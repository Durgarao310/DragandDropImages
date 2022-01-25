import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const CreateLabels = () => {
    let getProject = useSelector((state) => state?.project?.project)
    let [images, setImages] = useState([])
    let [label, setLabel] = useState("")
    let [index, setIndex] = useState(0)
    let [loading, setLoading] = useState(false)


    useEffect(() => {
        addImages()
    }, [])

    useEffect(() => {
        if (images?.length > 0) {
            setLabel(images[index].label)
        }
    }, [index || images])

    useEffect(()=>{
        if(images.length > 0){
            images[index].label = label
        }
    },[label])

    const addImages = () => {
        setLoading(true)
        setImages(getProject?.project)
        setLoading(false)
    }

    const indexIncrement = async () => {
        if (images.length > index + 1) {
            setIndex(index + 1)
        }
    }
    const indexDecrement = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }


    const SaveLabel = () => {
        return (
            <div>
                <a
                    href={
                        "data:text/json;charset=utf-8," +
                        encodeURIComponent(JSON.stringify({ projectName: getProject.name, description: getProject.description, labels: images }))
                    }
                    download={`${getProject.name}.json`}
                >
                    <p className="text-white bg-gradient-to-br flex justify-center items-center from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 font-medium  text-sm px-5 py-2.5 text-center h-12 rounded-md cursor-pointer" >Save</p>
                </a>
            </div>
        );

    }



    return (
        <div className="flex justify-center items-center py-8">
            {loading ?
                <div>
                    loading....
                </div> :
                <div>
                    <div className="py-4 px-2">
                        <p className="text-3xl text-gray-400">Label Images</p>
                    </div>
                    <div className="flex flex-col items-start">
                        {images?.length > 0 &&
                            <div>
                                <div className="flex flex-col mb-6 bg-gray-800 p-6 rounded-lg justify-center items-center">
                                    <div className="flex flex-col items-star">
                                        <div className="items-star">
                                            <label className="flex float-left mt-2 text-gray-200">Label</label>
                                        </div>
                                        <div className=" flex float-left">
                                            <input
                                                className="px-3 py-1.5 bg-gray-300 my-2 rounded-md w-full shadow-sm	text-gray-900 focus:text-gray-900 focus:bg-gray-350 focus:border-blue-600 focus:outline-none"
                                                value={label}
                                                onChange={(e) => setLabel(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-48 w-60">
                                        <img className="rounded-lg w-56 h-44" src={URL.createObjectURL(images[index].imageFile)} alt={images[index].imageFile.name} />
                                    </div>
                                </div>

                                <div className="flex flex-row items-center">
                                    <div className="mx-2">
                                        <p className={index === 0 ? "bg-gray-800 text-white px-6 rounded-md cursor-not-allowed h-12  flex justify-center items-center" : "flex justify-center items-center h-12 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 px-6 py-1 cursor-pointer rounded-md text-gray-200"} onClick={() => indexDecrement()}>Prev</p>
                                    </div>
                                    <div className="mx-2">
                                        <p className={index === images.length - 1 ? "bg-gray-800 text-white px-6 flex justify-center mx-2 items-center rounded-md cursor-not-allowed h-12" : "mx-2 h-12 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 px-6 flex justify-center items-center cursor-pointer rounded-md text-gray-200"} onClick={() => indexIncrement()}>Next</p>
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

