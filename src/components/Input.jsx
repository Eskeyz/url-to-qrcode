import React, { useContext, useState } from "react";
import { InputCon } from "../App";
import validator from 'validator'

const Input = () => {
  const { Inputval, setInputval, generator } = useContext(InputCon);

  const handleValue = e => setInputval({ ...Inputval, validate: validate(e.target.value), url: e.target.value });

  const handleGen = () => generator();

  const [errorMessage, setErrorMessage] = useState('')
    
  const validate = (value) => {
    
    if (validator.isURL(value)) {
      setErrorMessage('')
    } else {
      setErrorMessage('Is Not Valid URL')
    }
  }

  return (
    <div className="grid gap-2 p-6">
      <label className="text-xl font-semibold">Your URL</label>
      <input
        type="url"
        className="px-5 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        placeholder="https://example.com"
        value={Inputval.url}
        onChange={handleValue}
      />
      <div className="text-red-500">{errorMessage}</div>  
      <button
        disabled={!Inputval.url || errorMessage}
        onClick={handleGen}
        className="disabled:cursor-not-allowed disabled:bg-gray-500 disabled: text-white bg-gray-700 border border-gray-300 focus:outline-none hover:bg-gray-600  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Generate
      </button>
    </div>
  );
};

export default Input;
