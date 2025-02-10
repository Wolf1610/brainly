
interface InputProps {
    placeholder: string;
    reference?: any;
}

export const Input = ({reference, placeholder}: InputProps) => {
    return <>
        <input ref={reference} type={"text"} placeholder={placeholder} className="px-4 min-w-xs py-2 border border-gray-300 rounded-md m-2" />
    </>
}