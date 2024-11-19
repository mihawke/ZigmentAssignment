import React, { useContext } from "react";
import { Field } from "./types";
import { ThemeContext } from "../App";

interface TextAreaProps {
    field: Field;
}

const TextArea: React.FC<TextAreaProps> = ({ field }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };

    return (
        <div className='flex flex-col w-full mb-2.5'>
            <label 
            htmlFor={field.id}
            className={`text-sm leading-5 font-medium mb-0.5 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}
            >{field.label}</label>
            <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder || ''}
                required={field.required || false}
                className={`w-full px-5 py-3 rounded-lg text-base leading-6 border-[2px] border-gray-700 ${theme == 'light' ? 'text-[#2E2E2E] bg-transparent' : 'text-gray-200 bg-transparent'} hover:border-purple-600 focus:border-purple-600 outline-none`}
                />
        </div>
    )
}

export default TextArea;