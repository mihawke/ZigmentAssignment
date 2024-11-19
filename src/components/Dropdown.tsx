import React, { useContext } from 'react'
import { Field } from "../utils/types";
import { ThemeContext } from '../App';

interface DropdownProps {
    field: Field;
}

const Dropdown: React.FC<DropdownProps> = ({ field }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };

    return (
        <div className='flex flex-col  w-full mb-2.5' id='dropdown-container'>
            <label
                htmlFor={field.id}
                className={`text-sm leading-5 font-medium mb-0.5 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}
            >{field.label}</label>
            <select
                id={field.id}
                name={field.id}
                required={field.required || false}
                className={`w-full px-5 py-3 rounded-lg text-base leading-6 border-[2px] border-gray-700 ${theme == 'light' ? 'text-[#2E2E2E] bg-transparent' : 'text-gray-200 bg-transparent'} hover:border-purple-600 focus:border-purple-600 outline-none`}
                >
                <option></option>
                {field.options?.map((optionItem, optionIndex) => (
                    <option key={optionIndex} value={optionItem.value}>{optionItem.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown