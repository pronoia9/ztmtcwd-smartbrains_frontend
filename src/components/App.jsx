import React, { useState, useEffect } from 'react';
import Clarifai from 'clarifai';
// styles
import './App.scss';
// components
import Div from './General/Div';
import Preloader from './Preloader/Preloader';
import Background from './Background/Background';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Body from './Body/Body';
import Signin from './Signin/Signin';
// other / data
const logo = require('../images/logo.png');
const data = require('../data/data.json');
const keys = require('../data/keys.json');
// Clarifai
const app = new Clarifai.App({ apiKey: keys.clarifai });
// TEMPORARY
const Andrei = { username: 'aneagoi', name: 'Andrei', email: 'andrei@gmail.com', password: 'ztm', count: 0, rank: 0, history: [], imageURL: '', input: '', boxes: [] };
const users = [Andrei];

export default function App() {
  const [user, setUser] = useState(Andrei);

  // Form Functions
  const inputChange = (e) => setUser((user) => ({ ...user, input: e.target.value }));
  const clear = () => setUser((user) => ({ ...user, input: '' }));
  const buttonClick = () => {
    if (user.history[user.history.length - 1] !== user.input) {
      setUser((user) => ({ ...user, imageURL: user.input, boxes: [] }));
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, user.input)
        .then((response) => displayBox(calculateBox(response)))
        .then(() => setUser((user) => ({ ...user, count: user.count + 1, history: [...user.history, user.imageURL] })))
        .catch((err) => console.error(err));
    }
  };

  // Clarifai / Box functions
  const calculateBox = (data) => {
    const boxes = data.outputs[0].data.regions.map((elem) => elem.region_info.bounding_box);
    const image = document.getElementById('input-image'), width = Number(image.width), height = Number(image.height);
    return boxes.map((box => ({ left: box.left_col * width, top: box.top_row * height, right: width - (box.right_col * width), bottom: height - (box.bottom_row * height)})));
  };
  const displayBox = (box) => setUser((user) => ({ ...user, boxes: box }));
  
  return (
    <Div ids={['app-container']} classNames={['__next']}>
      <Preloader />
      <Navbar logo={logo} setState={setUser} />

      <Div ids={['body-container']} classNames={['particles circle-bg valign']}>
        {/* header if not signed in, body if logged in */}
        {/* {!user ? <Header /> : <Body {...user} inputChange={inputChange} buttonClick={buttonClick} clear={clear} />} */}
        <Signin />

        <Background data={data.particles.vie} />
      </Div>
    </Div>
  );
}