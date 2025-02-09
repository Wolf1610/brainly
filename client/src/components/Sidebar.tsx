import { BrainlyIcon } from "../icons/BrainlyIcon"
import { TwitterIcon } from "../icons/Twitter"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItems } from "./SidebarComponents"

export const Sidebar = () => {

    return <>
        <div className="h-screen bg-white border border-gray-300 w-72 fixed left-0 top-0 p-5">
            <div className="flex items-center">
                <div className="text-primary-1 pr-2">  
                    <BrainlyIcon />
                </div>
                <div className=" text-2xl">
                    Brainly
                </div>
            </div>
            <div className="pt-4 pl-4">
                <SidebarItems text="Twitter" icon={<TwitterIcon />}/>
                <SidebarItems text="Youtube" icon={<YoutubeIcon />}/>
            </div>
        </div>
    </>
}