import './App.css'
import JsonEditor from './components/JsonEditor'
import FormGenerator from './components/FormGenerator'
import { createContext, useState } from 'react'
import { Form } from './components/types'

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
}

//creating theme context to update theme dynamically
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function App() {

  const [loadedJson, setLoadedJson] = useState<Form | null>(null);//useState hook to set JSON data
  const [theme, setTheme] = useState<Theme>('light');//useState hook to set app theme

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className='relative h-full'>

        {/* button to toggle theme */}
        <button
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          className={`fixed right-1 top-1 text-xs md:text-base px-3 py-1 rounded-md ${theme == 'dark' ? 'text-[#2E2E2E] bg-[#F5F5F5]' : 'text-[#F5F5F5] bg-[#2E2E2E]'}`}>
          {theme}
        </button>

        <div className='flex flex-col lg:flex-row w-full h-full'>
          <JsonEditor setLoadedJson={setLoadedJson} loadedJson={loadedJson} />
          <FormGenerator formData={loadedJson} />
        </div>
      </div>
    </ThemeContext.Provider >
  )
}

export default App
