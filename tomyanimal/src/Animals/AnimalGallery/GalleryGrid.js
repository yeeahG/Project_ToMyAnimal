import React, { useEffect, useState } from 'react'
import { fileInstance } from '../../utils/api';
import GalleryPhoto from './GalleryPhoto';

const GalleryGrid = () => {
    const [petimg, setPetimg] = useState();
    const [collection, setCollection] = useState([]);

    const userid = localStorage.getItem('userid');

    const photoCollection = [];

    useEffect(() => {
        try {
          async function callAPI() {
            const response = await fileInstance.get('api/animals/1');
            
            setPetimg(response.data.result.data.images[0].uniqueName);

            //for (let i=0; i < response.data.result.data.length; i++) {
            //    photoCollection.push(response.data.result.data.images[i])
            //} setCollection(photoCollection);

          } callAPI();
        } catch(error) {
            console.log(error);
        }
    
      }, []);

  return (
    <div>

        {petimg? 
        <img  
          src={'http://localhost:8084/image/' + petimg}
          alt="animal profile"
        />

        :
        "Loading"
        }
    {/*
    {collection.map((it) => (
        <GalleryPhoto key={it.id}
        {...it}
    /> 
    ))}*/}

    </div>
  )
}

export default GalleryGrid