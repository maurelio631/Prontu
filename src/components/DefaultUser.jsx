import { FaHospital, FaUser } from "react-icons/fa";

export function DefaultUser({user}) {
    return(
        <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
            {user
                ? < FaUser className="text-gray-400 text-2xl" /> 
                : < FaHospital className="text-gray-400 text-2xl" /> 
            }
        </div>
    )
}
  