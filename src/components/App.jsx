import React, { useState, useEffect } from 'react';
import Clarifai from 'clarifai';
// styles
import './App.scss';
// components
import Preloader from './Preloader/Preloader';
import Background from './Background/Background';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Body from './Body/Body';
import react from 'react';
// other / data
const logo = require('../images/logo.png');
const data = require('../data/data.json');
const keys = require('../data/keys.json');
// Clarifai
const app = new Clarifai.App({ apiKey: keys.clarifai });

export default function App() {
  const [state, setState] = useState({ user: { name: 'Andrei', count: 0, rank: 0, imageURLs: [], imageURL: '', input: '' } });
  // update count when an imageurl is added to the urls array
  useEffect(() => setState((state) => ({user: {...state.user, count: state.user.imageURLs.length}})), [state.user.imageURLs])

  // Form Functions
  const inputChange = (e) => setState((state) => ({ user: { ...state.user, input: e.target.value } }));
  const buttonClick = () => {
    setState((state) => ({ user: { ...state.user, imageURL: state.user.input } }));

    app.models.predict(Clarifai.FACE_DETECT_MODEL, state.user.input).then(
      (response) => {
        console.log(response); // do something with response
        // if we got a positive response with the inputted imageURL, add it to the users search array and increase the search count
        setState((state) => ({ user: { ...state.user, imageURLs: [state.user.imageURL] } }));
      },
      (err) => console.err(err)
    );
  };
  const clear = () => setState((state) => ({ user: { ...state.user, input: '' } }));

  return (
    <div className='__next'>
      <Preloader />
      <Navbar logo={logo} setState={setState} />

      <div className='particles circle-bg valign'>
        {/* header if not signed in, body if logged in */}
        {!state.user ? (
          <Header />
        ) : (
          <Body {...state.user} placeholder='Enter an image URL' inputChange={inputChange} buttonClick={buttonClick} clear={clear} />
        )}

        <Background data={data.particles.vie} />
      </div>
    </div>
  );
}