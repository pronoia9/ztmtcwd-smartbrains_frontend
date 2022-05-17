import React from 'react';
import Div from '../General/Div';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';

export default function Body({ name, rank, placeholder = '', inputChange, buttonClick, url = '' }) {
  return (
    <Div classNames={['container']}>
      <Div classNames={['page-header', 'row justify-content-center', 'col-lg-10 col-md-8', 'cont text-center']}>
        <h2 className='mb-10'>
          <span className='color-font'>{name}</span> you are ranked <span className='color-font'>#{rank}</span>.
        </h2>
        <p>This Magic Brain will detect faces in your pictures. Give it a try.</p>
        <Div classNames={['pt-40 pb-20']}>
          <ImageLinkForm placeholder={placeholder} inputChange={inputChange} buttonClick={buttonClick} />
        </Div>
      </Div>
      <Div classNames={['blog-pg single', 'container', 'row justify-content-center', 'col-lg-6', 'post', 'img']}>
        <img src={url} alt='' />
      </Div>
    </Div>
  );
}