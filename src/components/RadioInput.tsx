import React, { useContext } from 'react'
import { Field } from "../utils/types";
import { ThemeContext } from '../App';

interface RadioInputProps {
  field: Field;
}

const RadioInput: React.FC<RadioInputProps> = ({ field }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };

  return (
    <div className="flex flex-col w-full mb-2.5"  id="radioinput-container">
      <label
        htmlFor={field.id}
        className={`text-sm leading-5 font-medium mb-0.5 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}
      >{field.label}</label>
      {field.options?.map((radioItem, radioIndex) => (
        <div
          key={radioIndex}
          className="flex items-center gap-2 p-1 rounded-md"
        >
          <input
            type="radio"
            value={radioItem.value}
            id={radioItem.label}
            name={field.label}
            className={`w-4 h-4 text-blue-600 border-gray-300 ${theme == 'light' ? 'text-[#2E2E2E] bg-white' : 'text-gray-200 bg-gray-800'}`}
          />
          <label
            htmlFor={radioItem.label}
            className={`text-sm font-medium cursor-pointer ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}
          >
            {radioItem.label}
          </label>
        </div>

      ))}
    </div>
  )
}

export default RadioInput