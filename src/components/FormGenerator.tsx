import React, { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown';
import RadioInput from './RadioInput';
import DateInput from './DateInput';
import { Form } from '../utils/types';
import { ThemeContext } from '../App';
import TextArea from './TextArea';
import { downloadJSON } from '../utils/downloadJSON';
import { checkUniqueId } from '../utils/checkUniqueId';

interface FormGeneratorProps {
  formData: Form | null;
  isValid: boolean
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ formData, isValid }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };
  const [isUnique, setIsUnique] = useState<boolean>(true);//Initialize the error state 

  //form submit logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();//prevent default event.
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    alert('Form submitted successfully!')
    console.log('Form submitted with data:', formObject);
    let downloadPrompt = confirm('Download JSON data?')
    if (downloadPrompt != null) { downloadJSON(formObject); }
  };

  //check is formData is empty
  const isFormEmpty = !formData || !formData.fields || formData.fields.length === 0;

  useEffect(() => {
    if (formData?.fields?.length != 0) {
      setIsUnique(checkUniqueId(formData?.fields))
    }
  }, [formData])


  return (
    <div
      id='form-container'
      className={`h-full w-full flex flex-col items-center text-black px-6 py-6 md:py-10 lg:py-10  ${theme == 'light' ? 'text-[#2E2E2E] bg-gray-100' : 'text-gray-200 bg-gray-900 form-container'}`}
    >
      <h2 className={`text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-200'}`}>{formData?.formTitle}</h2>
      <h3 className={`text-lg text-center md:text-xl lg:text-2xl font-semibold mb-6 ${theme == 'light' ? 'text-[#2E2E2E]' : 'text-gray-300'}`}>{formData?.formDescription}</h3>

      {/* Check if required formData is available */}
      {!isValid ?
        (<div className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 text-red-600">
          Invalid JSON
        </div>) :
        isFormEmpty ? (
          <div className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 text-red-600">
            No fields available to display.
          </div>) :
          !isUnique ? (
            <div className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 text-red-600">
              Each field must have unique id.
            </div>) :
            (<form onSubmit={handleSubmit} autoComplete='off' className='w-[50%] md:w-full p-8'>
              {/* Render form fields dynamically based on jsonData */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {formData?.fields.map((field, index) => {
                  if (field.id != null && field.type != null) {
                    switch (field.type) {
                      case 'select':
                        return (
                          <div key={index}>
                            <Dropdown field={field} />
                          </div>
                        );
                      case 'radio':
                        return (
                          <div key={index}>
                            <RadioInput field={field} />
                          </div>
                        );
                      case 'date':
                        return (
                          <div key={index}>
                            <DateInput field={field} />
                          </div>
                        );
                      case 'textarea':
                        return (
                          <div key={index}>
                            <TextArea field={field} />
                          </div>
                        );
                      case 'text':
                      case 'email':
                      case 'password':
                        return (
                          <div key={index}>
                            <InputField field={field} />
                          </div>
                        );
                      default:
                        return (
                          <div key={index}>
                            <p>No inputfield for type:{field.type}</p>
                          </div>
                        );
                    }
                  }
                })}
              </div>
              {/* Submit and Reset buttons */}
              {isFormEmpty ? (
                null
              ) : (
                <div className='flex flex-row gap-8 items-center justify-center mt-5'>
                  <button type='submit' className='w-fit bg-[#7F56D9] text-white px-4 py-1.5 rounded-md'>Submit</button>
                </div>
              )}
            </form>
            )}
    </div>
  );
}

export default FormGenerator;
