import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const ImageUploader = ({idImage, size=400}) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dul3zl1av' } });
  
  const img = cld
        .image(idImage)
        .format('auto') 
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(size).height(size)); 

  return (<AdvancedImage className='rounded-5' cldImg={img}/>);
};

export default ImageUploader