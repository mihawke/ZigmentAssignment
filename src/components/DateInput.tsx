import React, { useContext } from "react";
import { Field } from "../utils/types";
import { ThemeContext } from "../App";

interface DateInputProps {
    field: Field;
}

const DateInput: React.FC<DateInputProps> = ({ field }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };

    return (
        <div className="flex flex-col w-full mb-2.5" id="dateinput-container">
            <label
                htmlFor={field.id}
                className={`text-sm leading-5 font-medium mb-0.5 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}
            >
                {field.label}
            </label>
            <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder || ''}
                required={field.required || false}
                pattern={field.validation?.pattern || "^[A-Za-z\\s]+$"}
                title={field.validation?.message || ''}
                className={`w-full px-5 py-3 rounded-lg text-base leading-6 border-[2px] border-gray-700 ${theme == 'light' ? 'text-[#2E2E2E] bg-transparent' : 'text-gray-200 bg-transparent'} hover:border-purple-600 focus:border-purple-600 outline-none`}
                />
        </div>
    );
};

export default DateInput;
