import React, { createContext, useState } from 'react'
import Input from './components/Input'
import Download from './components/Download'
import axios from 'axios'
import { Footer } from './components/Footer'


export const InputCon = createContext()

const App = () => {
  
  const [ Inputval, setInputval ] = useState({
    url: ''
  })
  const [respon, setRespon] = useState('')
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false)

  const params = {
    headers: {
      Authorization: 'Bearer a6a3aac0-278d-11ee-bc9b-45d49a09d234'
    }
  }
  
  const bodyParams = {
    "size": 500,
    "colorDark": "rgb(0,0,0)",
    "logo": "https://i.postimg.cc/BZNpL1Gp/logo.png",
    "eye_outer": "eyeOuter1",
    "eye_inner": "eyeInner1",
    "qrData": "pattern1",
    "backgroundColor": "rgb(255,255,255)",
    "transparentBkg": false,
    "qrCategory": "url",
    "text": Inputval.url
  }

  const generator = async () => {
    try {
      setLoad(true)
      const res = await axios.post('https://qrtiger.com/api/qr/static', bodyParams, params)
      setRespon(res.data.url)
    } catch(err) {
      setError(err)
    } finally {
      setLoad(false)
    }
  }

  const value = {
    Inputval,
    setInputval,
    generator,
    respon,
    load,
    error, 
  }

  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-xl text-center mt-[200px] lg:px-[400px]'>
        <h1 className='text-3xl font-bold'>Url to QR Code Generator</h1>
        <InputCon.Provider value={value}>  
          <Input />
          <Download />
        </InputCon.Provider>
      </div>
      <Footer />
    </section>
  )
}

export default App