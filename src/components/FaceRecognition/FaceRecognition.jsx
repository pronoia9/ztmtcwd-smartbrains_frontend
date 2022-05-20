import React from 'react';
import Div from '../General/Div';
import ImageLinkForm from './ImageForm';
import ImageFaceDetection from './Image';

export default function ImageDetection({ name, count, input, imageURL, boxes, inputChange, buttonClick, clear }) {
  return (
    <Div classNames={['face-recognition section-padding position-re mh-100vh']}>
      <Div classNames={['container']}>
        <Div classNames={['page-header', 'row justify-content-center', 'col-lg-10 col-md-8', 'cont text-center']}>
          <h2 className='mb-10'>
            <span className='color-font'>{name}</span> you have successfully detected <span className='color-font'>{count}</span>{' '}
            images.
          </h2>
          <p>This Magic Brain will detect faces in your pictures. Give it a try.</p>
          <ImageLinkForm input={input} inputChange={inputChange} buttonClick={buttonClick} clear={clear} />
        </Div>
        <ImageFaceDetection imageURL={imageURL} boxes={boxes} />
      </Div>
      <div className='line bottom right'></div>
    </Div>
  );
}