import { ReactElement } from "react";

export const SidebarItems = ({text, icon}: {
    text: string;
    icon: ReactElement
}) => {

    return <>
        <div className="flex items-center cursor-pointer hover:bg-secondary-1 rounded pl-2 transition-all duration-300">
            <div className=" text-gray-500 ">
                {icon}
            </div>
            <div className="p-1 text-gray-500 ">
                {text}
            </div>
        </div>
    </>
}