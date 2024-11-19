import React, { useContext, useState } from "react";
import { Field } from "../utils/types";
import { ThemeContext } from "../App";
import { validateInput } from "../utils/validateInput";

interface CustomInputProps {
    field: Field;
}

const InputField: React.FC<CustomInputProps> = ({ field }) => {
    const { theme } = useContext(ThemeContext) ?? { theme: 'light' };
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        validateInput(newValue, field.validation?.pattern, field.validation?.message, setError);
    };

    return (
        <div className="flex flex-col w-full mb-2.5 bg-transparent" id="inputfield-container">
            <label
                htmlFor={field.id}
                className={`text-sm leading-5 font-medium mb-0.5 ${theme === 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'
                    }`}
            >
                {field.label}
            </label>
            <input
                id={field.id}
                name={field.id}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                required={field.required || false}
                pattern={field.validation?.pattern || "^[A-Za-z\\s]+$"}
                title={field.validation?.message || ""}
                value={value}
                onChange={handleChange}
                className={`w-full px-5 py-3 rounded-lg text-base leading-6 border-[2px]
                     ${theme === 'light'
                        ? 'text-[#2E2E2E] bg-transparent'
                        : 'text-gray-200 bg-transparent'}
                    border-gray-700 
                    ${error ?
                        'border-red-600 hover:border-red-600 focus:border-red-600'
                        : 'hover:border-purple-600 focus:border-purple-600'
                    } outline-none`}
            />
            {error && <p className="text-red-500 text-sm mt-1 max-w-full">{error}</p>}
        </div>
    );
};

export default InputField;
