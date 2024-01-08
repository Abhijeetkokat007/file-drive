import logo from './logo.svg';
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const[title, setTitle] = useState("");
  const[file, setFile] = useState("");
  const  submitImage = async(e) => {
       e.preventDefault();
       const formData =  new FormData();
       formData.append("title",title);
       formData.append9("file ",  file );
       console.log(title,file);
        }
  return (
    <div className="App">
      <form className='formStyle'>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          required
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
        />
        <br />
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          required
          onChange={(e)=>{
            setFile(e.target.files[0])
          }}
        />
        <br />


      </form>
    </div>
  );
}

export default App;
