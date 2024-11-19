import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form } from '../utils/types';
import { ThemeContext } from '../App';
import sample1 from '../data/sample1.json'
import sample2 from '../data/sample2.json'
import sample3 from '../data/sample3.json'
import sample4 from '../data/sample4.json'
import sample5 from '../data/sample5.json'
import { validateJson } from '../utils/validateJson';

interface JsonEditorProps {
  setValidJson: React.Dispatch<React.SetStateAction<Form | null>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ setValidJson, setIsValid }) => {

  const { theme } = useContext(ThemeContext) ?? { theme: 'light' };

  const [jsonString, setJsonString] = useState(JSON.stringify(null));
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeBtn, setactiveBtn] = useState<string>('');

  // Handle file upload and update the state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  //update EditorJson states
  const updateEditorJson = (json: any) => {
    setJsonString(JSON.stringify(json, null, 2))
  }

  //function to upload selected file
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.readAsText(file);//read contents of file as text
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          updateEditorJson(data)
          setError(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setFile(null);
        } catch (error) {
          setError("Error parsing JSON file");
        }
      };
    } else {
      alert('Please upload a valid JSON file');
    }
  };

  // Handle changes in the text area
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonString = e.target.value;
    setJsonString(newJsonString);
  };

  useEffect(() => {
    const result = validateJson(jsonString, setError);
    if (result?.isValid) {
      setIsValid(true)
      setValidJson(result.data)
    }
    else {
      setIsValid(false)
      setValidJson(null)
    }
  }, [jsonString])


  return (
    <div
      id='jsoneditor-container'
      className={`flex flex-col items-center w-full lg:h-full px-6 py-6 md:py-10 lg:py-10  ${theme == 'light' ? 'text-[#2E2E2E] bg-white' : 'text-[#F5F5F5] bg-gray-950'}`}>
      <h1 className='text-2xl md:text-3xl lg:text-5xl leading-5 font-bold mb-4'>JSON Editor</h1>
      <div className='flex flex-col text-center md:flex-row mb-4'>
        <p className='font-bold text-base lg:text-2xl mr-2'>Sample Json:</p>
        <nav className='flex flex-row gap-2 items-center justify-center'>
          <button onClick={() => { updateEditorJson(sample1), setactiveBtn('1') }} className={`text-xs md:text-base px-2 py-1 bg-green-600 text-white rounded-md border-[2px] border-transparent ${activeBtn == '1' ? 'border-green-950' : ''}`}>sample 1</button>
          <button onClick={() => { updateEditorJson(sample2), setactiveBtn('2') }} className={`text-xs md:text-base px-2 py-1 bg-green-600 text-white rounded-md border-[2px] border-transparent ${activeBtn == '2' ? 'border-green-950' : ''}`}>sample 2</button>
          <button onClick={() => { updateEditorJson(sample3), setactiveBtn('3') }} className={`text-xs md:text-base px-2 py-1 bg-green-600 text-white rounded-md border-[2px] border-transparent ${activeBtn == '3' ? 'border-green-950' : ''}`}>sample 3</button>
          <button onClick={() => { updateEditorJson(sample4), setactiveBtn('4') }} className={`text-xs md:text-base px-2 py-1 bg-green-600 text-white rounded-md border-[2px] border-transparent ${activeBtn == '4' ? 'border-green-950' : ''}`}>sample 4</button>
          <button onClick={() => { updateEditorJson(sample5), setactiveBtn('5') }} className={`text-xs md:text-base px-2 py-1 bg-green-600 text-white rounded-md border-[2px] border-transparent ${activeBtn == '5' ? 'border-green-950' : ''}`}>Clear</button>
        </nav>
      </div>
      <textarea
        value={jsonString}
        onChange={handleChange}
        spellCheck={false}
        className={`border-2 p-4 w-full h-[50vh] font-mono text-sm font-semibold rounded-lg ${theme == 'light' ? '' : 'text-[#D3D3D3] bg-[#121212]'}`}
      />
      {error && (
        <div className='text-[#E74C3C]'>
          <strong>{error}</strong>
        </div>
      )}

      <form className='flex flex-col items-center md:flex-row mt-4' onSubmit={handleFileUpload}>
        <input type="file" accept=".json" ref={fileInputRef} onChange={handleFileChange} className='border-2 rounded-md place-content-center border-gray-700' />
        <button type='submit' className={`w-fit bg-[#7F56D9] text-white text-sm md:text-base px-2 md:px-4 py-1.5 rounded-md disabled:opacity-50`} disabled={file ? false : true}>Copy from JSON</button>
      </form>
    </div>
  );
};

export default JsonEditor;
