import { Button } from "../components/Button"
import { Input } from "../components/Input"


export const Signup = () => {

    return <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center flex justify-center items-center">
            <div className="bg-white p-5 rounded-md border-secondary-1 min-w-48 flex flex-col">
                <Input placeholder="Username"/>
                <Input placeholder="Password"/>
                <div className="flex justify-center pt-3">
                    <Button variant="primary" text="Signup" fullwidth={true}/>
                </div>
            </div>
        </div>
    </>
}