import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import axios from "axios";
import { BACKEND_URL } from "../config";

// define at onece and use it where it will require
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter" 
}


// Controlled component
export const CreateContentModal = ({open, onClose}: {open: any; onClose: any;}) => { 

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);


    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })
        onClose();
    }


    return <>
        {open && <div>
            <div className="w-screen h-screen bg-gray-200 fixed top-0 left-0 opacity-70 flex justify-center"></div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className=" flex flex-col justify-center">
                    <span className=" bg-white opacity-100 p-5 rounded-md">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="flex flex-col p-5">
                            <Input reference={titleRef} placeholder={"Title"}/>
                            <Input reference={linkRef} placeholder={"Link"}/>

                            <div className="flex p-1 gap-4">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)}/>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)}/>
                            </div>
                        </div>
                        
                        <div className="flex justify-center cursor-pointer">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>    
        </div>}
    </>
}

    
const Input = ({onChange, placeholder} : {
    placeholder: string;
    onChange: () => void;
    reference?: any;
}) => {
    return <>
        <input type={"text"} placeholder={placeholder} className="px-4 py-2 border border-gray-300 rounded-md mb-3" onChange={onChange} />
    </>
}








