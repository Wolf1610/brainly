
export const Input = ({onChange, placeholder}: {
    placeholder: string;
    onChange: () => void
}) => {
    return <>
        <input type={"text"} placeholder={placeholder} className="px-4 min-w-xs py-2 border border-gray-300 rounded-md m-2" onChange={onChange} />
    </>
}