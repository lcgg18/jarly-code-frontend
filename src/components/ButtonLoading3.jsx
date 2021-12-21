import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading3 = ({ disabled, loading, text, onClick }) => {
  return (
    <button
      data-testid='button-loading'
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className={`bg-red-600 text-white font-bold text-sm py-1 px-2  rounded-md hover:bg-red-400 shadow-md my-2 mx-2 disabled:opacity-50 disabled:bg-gray-700`}
    >
      {loading ? <ReactLoading type='spin' height={10} width={10} /> : text}
    </button>
  );
};

export default ButtonLoading3;
