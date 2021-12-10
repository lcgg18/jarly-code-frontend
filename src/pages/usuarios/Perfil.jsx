import { Avatar } from 'components/Logo';
import { useUser } from 'context/userContext';
import React from 'react'
import { Link } from 'react-router-dom';
import { Enum_EstadoUsuario } from 'utils/enums';
import { Enum_Rol } from 'utils/enums';

const Perfil = () => {
    const { userData } = useUser();
    console.log("userD", userData)



    return (
        <div className='flex flex-col items-center  w-full h-full p-20 my-6'>
            <Avatar/>
            <h1 className='text-3xl p-4 my-6 font-bold'>Perfil de usuario</h1>
            <div className='flex flex-col border-4 p-10 rounded-3xl'>
                <div className='p-2 text-2xl'>Nombre: {userData.nombre}</div>
                <div className='p-2 text-2xl'>Apellido: {userData.apellido}</div>
                <div className='p-2 text-2xl'>Correo: {userData.correo}</div>
                <div className='p-2 text-2xl'>Rol: {Enum_Rol[userData.rol]}</div>
                <div className='p-2 text-2xl'>Estado: {Enum_EstadoUsuario[userData.estado]}</div>
            </div>
            <Link to={`/perfil/editar/${userData._id}`}>
                 <button  className='bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-5 disabled:opacity-50 disabled:bg-gray-700'>Actualizar Información</button>
            </Link>
           
        </div>
    )
}

export default Perfil
