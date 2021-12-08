import { useUser } from 'context/userContext';
import React from 'react'

const Perfil = () => {
    const { userData } = useUser();
    console.log("userD", userData)



    return (
        <div className='flex flex-col items-center  w-full h-full p-20 my-6'>
            <h1 className='text-3xl p-4 my-6 font-bold'>Perfil de usuario</h1>
            <div className='flex flex-col'>
                <div className='p-1 text-2xl'>Nombre: {userData.nombre}</div>
                <div className='p-1 text-2xl'>Apellido: {userData.apellido}</div>
                <div className='p-1 text-2xl'>Correo: {userData.correo}</div>
                <div className='p-1 text-2xl'>Rol: {userData.rol}</div>
                <div className='p-1 text-2xl'>Estado: {userData.estado}</div>
            </div>
        </div>
    )
}

export default Perfil
