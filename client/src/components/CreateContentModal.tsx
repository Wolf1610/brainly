import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"

// Controlled component
export const CreateContentModal = ({open, onClose}) => {
    
    return <>
        {open && <div className="w-screen h-screen bg-gray-200 fixed top-0 left-0 opacity-70 flex justify-center">
            <div className=" flex flex-col justify-center">
                <span className=" bg-white opacity-100 p-5 rounded-md">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon />
                        </div>
                    </div>
                    <div className="flex flex-col p-5">
                        <Input placeholder={"Title"}/>
                        <Input placeholder={"Link"}/>
                    </div>
                    <div className="flex justify-center cursor-pointer">
                        <Button variant="primary" text="Submit" />
                    </div>
                </span>
            </div>
        </div>}
    </>
}

const Input = ({onChange, placeholder} : {onChange: () => void}) => {
    return <>
        <input type={"text"} placeholder={placeholder} className="px-4 py-2 border border-gray-300 rounded-md mb-3" onChange={onChange} />
    </>
}