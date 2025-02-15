import { useNavigate } from "react-router-dom"


const HomeNav = () => {
    const navigate = useNavigate()
  return (
    <div className=" px-8 py-4 mt-0 bg-gradient-to-r to-teal-300 from-blue-200 via-slate-100 items-center w-screen h-16 flex flex justify-between px-4">
            <div onClick={()=>{navigate("/")}} className="text-2xl sm:text-3xl font-bold text-gray-800 transition duration-300 cursor-pointer">QuickLink</div>
            <button onClick={()=>{navigate("/")}}
          className="bg-teal-500 text-white sm:py-2 py-1 px-2 sm:px-4 rounded-full hover:bg-teal-400 transition duration-300">Home</button>

    </div>
  )
}

export default HomeNav