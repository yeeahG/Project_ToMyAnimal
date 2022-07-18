import React, { useState } from 'react'
import { fileInstance } from '../../utils/api';
import ProgressBar from './ProgressBar'

const GalleryUpload = () => {
    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]); // 파일 미리보기
    const [error, setError] = useState("");

    const typeCheck = ['image/png', 'image/jpeg', 'image/jpg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0]
        
        if (selected && typeCheck.includes(selected.type)) {
            setImgFile(selected);
            setImgBase64([])
            setError('')

            for(let i=0; i<e.target.files.length; i++) {
                if(e.target.files[i]){
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[i])
        
                    reader.onloadend = () => {
                        const base64 = reader.result;
        
                        if(base64) {
                            var base64Sub = base64.toString()
                            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        }
                    }
                }
            }
            
        } else {
            setImgFile(null);
            setError("사진(png, jpeg)만 올릴 수 있습니다. ");
        }
    }


    const registerPhoto = async () => {
        const animal = {
            name: "초코",
            registrationNumber: "1111",
            birthday: "1",
            weight: "1",
            type: "dog"
        }

        const formData = new FormData()

        formData.set('name', animal.name)
        formData.set('registrationNumber', animal.registrationNumber)
        formData.set('birthday', animal.birthday)
        formData.set('weight', animal.weight)
        formData.set('type', animal.type)

        Object.values(imgFile).forEach((file) => formData.append("images", file));

        try {
            async function callAPI() {
              await fileInstance.post('api/animals/1', formData)
              alert('작성이 완료되었습니다')
              //window.location.reload();
            } callAPI();
        } catch {
            console.error('실패:', error);
        }
    }



  return (
    <form className='gallery__form'>
        <input label='사진' name='photo' id="file" type='file' onChange={changeHandler} multiple="multiple" />
        <div className='gallery__container'>
            { error && <div className='error'>{error}</div> }
            { imgFile && <div className='gellery__photo'>{imgFile.name}</div> }
            { imgFile && <ProgressBar file={imgFile} setFile={setImgFile} /> }
        </div>

        <div>
            <button onClick={registerPhoto}>확인</button>
        </div>

    </form>

  )
}

export default GalleryUpload