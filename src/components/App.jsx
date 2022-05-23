/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Clarifai from 'clarifai';
// styles
import './App.scss';
// components
import Div from './General/Div';
import Background from './Background/Background';
import Navbar from './Navbar/Navbar';
import Routes from '../routes/Routes';
// other / data
const logo = require('../assets/images/logo.png');
const data = require('../data/data.json');
const keys = require('../data/keys.json');
// Clarifai
const app = new Clarifai.App({ apiKey: keys.clarifai });

export default function App() {
  const [state, setState] = useState({ input: '', imageURL: '', boxes: [], user: null });
  const user = state.user;

  // User Functions
  const signout = () => setState((state) => ({ input: '', imageURL: '', boxes: [], user: null }));
  const loadUser = (data) => setState((state) => ({ ...state, user: data }));

  // Image Form / Clarifai / Box Functions
  const inputChange = (e) => setState((state) => ({ ...state, input: e.target.value }));
  const clear = () => setState((state) => ({ ...state, input: '' }));
  const buttonClick = () => {
    // if the last searched image is not the current one
    if (!user || user.history[user.history.length - 1] !== state.input) {
      setState((state) => ({ ...state, imageURL: state.input }));
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, state.input)
        .then((response) => displayBox(calculateBox(response)))
        .then(
          () =>
            user &&
            setState((state) => ({
              ...state,
              user: { ...user, entries: user.entries + 1, history: [...user.history, { imageURL: state.imageURL, boxes: state.boxes }] },
            }))
        )
        .catch((err) => console.error(err));
    }
  };
  const calculateBox = (data) => {
    const boxes = data.outputs[0].data.regions.map((elem) => elem.region_info.bounding_box);
    const image = document.getElementById('input-image'),
      width = Number(image.width),
      height = Number(image.height);
    return boxes.map((box) => ({
      left: box.left_col * width,
      top: box.top_row * height,
      right: width - box.right_col * width,
      bottom: height - box.bottom_row * height,
    }));
  };
  const displayBox = (box) => setState((state) => ({ ...state, boxes: box }));

  return (
    <Div ids={['app-container']} classNames={['__next']}>
      <Navbar logo={logo} user={state.user} signout={signout} />
      <Background data={data.particles.vie} />
      <Routes
        state={state}
        setState={setState}
        loadUser={loadUser}
        inputChange={inputChange}
        clear={clear}
        buttonClick={buttonClick}
      />
    </Div>
  );
}
