import axios from 'axios';
import React, { useRef, useState } from 'react'
import { youtube_parser } from  "./components/utils"



const App = () => {
  const [urlResult, setUrlResult] = useState(null)
  const inputUrlRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault()
    const youtbeId = youtube_parser(inputUrlRef.current.value)

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtbeId
      }

    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }
  return (
    <div className='app'>
      <span>Youtube Downloader Kevin</span>
      <section className='content'>
        <h1 className='title'>Youtube mp3 Downloader</h1>
        <p className='description'>Youtube video Downloader</p>
      
      <form onSubmit={handleSubmit} className='form' >
        <input ref={inputUrlRef} placeholder='Paste youtube link ' type='text ' className='form_input' />
        <button type='submit' className='form_button'>Search</button>
       
      </form>
      {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}
      </section>
    </div>
  )
}

export default App