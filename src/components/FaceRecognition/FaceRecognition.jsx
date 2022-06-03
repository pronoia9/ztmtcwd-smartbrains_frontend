import React, { useEffect } from 'react';
import Div from '../General/Div';
import ImageForm from './ImageForm';
import Image from './Image';

export default function ImageDetection({ state, clearImages, inputChange, clear, buttonClick }) {
  const user = state.user;
  useEffect(() => clearImages(), []);

  return (
    <Div classNames={['face-recognition section-padding position-re mh-100vh']}>
      <Div classNames={['container']}>
        <Div classNames={['page-header', 'row justify-content-center', 'col-lg-10 col-md-8', 'cont text-center']}>
          {user ? (
            <h2 className='mb-10'>
              <span className='color-font'>{user.name ? user.name : user.username}</span> you have successfully detected{' '}
              <span className='color-font'>{user.entries}</span> image{user.entries !== 1 && `s`}.
            </h2>
          ) : (
            <h2 className='mb-10'>
              It looks like you're <span className='color-font'>not logged in</span>.
            </h2>
          )}
          <p>
            This <span className='color-font'>Magic Brain</span> will {!user && ' still '} detect faces in your pictures. Give it a
            try.
          </p>
          <ImageForm input={state.input} inputChange={inputChange} clear={clear} buttonClick={buttonClick} />
        </Div>
        <Image {...state} />
      </Div>
      <div className='line bottom right'></div>
    </Div>
  );
}