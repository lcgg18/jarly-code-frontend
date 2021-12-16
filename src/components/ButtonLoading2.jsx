import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading2 = ({ disabled, loading, text, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className={`bg-${color}-600 text-white font-bold text-sm py-1 px-2  rounded-md hover:bg-${color}-400 shadow-md my-2 mx-2 disabled:opacity-50 disabled:bg-gray-700`}
    >
      {loading ? <ReactLoading type='spin' height={10} width={10} /> : text}
    </button>
  );
};

export default ButtonLoading2;
