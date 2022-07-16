import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnimalAdd = () => {
    const [animalName, setAnimalName] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalAge, setAnimalAge] = useState("");
    const [animalWeight, setAnimalWeight] = useState("");
    const [animalPhoto, setAnimalPhoto] = useState("");

    const [error, setError] = useState("");

    let localStorage = window.localStorage;
    const navigate = useNavigate();

    const loginId = localStorage.getItem('userid');

    const registerAnimal = async () => {
        const animal = {
            //id: loginId,
            name: animalName,
            registrationNumber: animalId,
            birthday: animalAge,
            weight: animalWeight,
            type: "dog"
        }

        const formData = new FormData()
        //formData.set('id', animal.id)
        formData.set('name', animal.name)
        formData.set('registrationNumber', animal.registrationNumber)
        formData.set('birthday', animal.birthday)
        formData.set('weight', animal.weight)
        formData.set('type', animal.type)

        //const file = document.getElementById('photo')
        //formData.append("addedImages", file.files[0]);

        Object.values(imgFile).forEach((file) => formData.append("images", file));

        if(animalName!=="" && animalId!=="" && animalAge!=="" && animalWeight!=="" ) {
            axios.post('http://localhost:8084/api/animals', formData, {
               headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('logintoken'),
               }
            })
           .then((data) => {
                console.log('성공:', data);
                alert("등록이 완료되었습니다")
                window.location.reload();
           })

           .catch((error) => {
               console.error('실패:', error);
           });

           //localStorage.setItem("animalinfo", JSON.stringify(animal))
           console.log(formData);

           navigate('/user')    
        } else {
            setError("모든 항목을 입력하세요")
        }
    }

    const [imgBase64, setImgBase64] = useState([]); // 파일 미리보기
    const [imgFile, setImgFile] = useState(null);	//파일	

    //image upload
    const onChangeImg  = (e) => {
        console.log(e.target.files);
        e.preventDefault();
        setImgFile(e.target.files)
        setImgBase64([])

        for(let i=0; i<e.target.files.length; i++) {
        if(e.target.files[i]){
            //const uploadFile = e.target.files[0]
            //console.log(uploadFile)
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
    }


  return (
    <div>
        <div className='animal__register__container'>
            {error}

            <table className='account__detail__form'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>No ID</th>
                        <th>Age</th>
                        <th>Weight</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {/*<td><input label="사진" name="photo" id="photo" placeholder="사진" type='file' onChange={(e) => setAnimalPhoto(e.target.files)} /></td>*/}
                        <td><input label="사진" name="photo" id="file" placeholder="사진" type='file' onChange={onChangeImg} multiple="multiple"/></td>
                        <td><input label="이름" name="animalname" placeholder="이름" required onChange={(e) => setAnimalName(e.target.value)} /></td>
                        <td><input label="등록번호" name="animalId" placeholder="등록번호" required onChange={(e) => setAnimalId(e.target.value)} /></td>
                        <td><input label="생일" name="age" placeholder="나이" type='date' required onChange={(e) => setAnimalAge(e.target.value)}/></td>
                        <td><input label="무게" name="kg" placeholder="무게" required onChange={(e) => setAnimalWeight(e.target.value)} /></td>
                    </tr>
                {imgBase64.map((item) => {
                    <img 
                    src={item}
                    alt="First file"
                    />
                })}
                </tbody>

            </table>
        </div>

        <div className='welcome'>
            <button className='welcome__btn' onClick={registerAnimal}>
                ADD
            </button>
            <button className='welcome__btn'>
                <a href="/">Home</a>
            </button>
        </div>

    </div>
  )
}

export default AnimalAdd