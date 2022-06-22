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
            id: loginId,
            petName: animalName,
            registrationNumber: animalId,
            birthday: animalAge,
            weight: animalWeight,
            addedImages: animalPhoto
        }
        //console.log(animal);

        const formData = new FormData()
        formData.set('id', animal.id)
        formData.set('petName', animal.petName)
        formData.set('registrationNumber', animal.registrationNumber)
        formData.set('birthday', animal.birthday)
        formData.set('weight', animal.weight)

        const photoFile = document.getElementById('photo')
        formData.append("addedImages", photoFile.files[0]);

        if(animalName!="" && animalId!="" && animalAge!="" && animalWeight!="" ) {

            // await fetch('https://jsonplaceholder.typicode.com/posts', {
            /*
            await fetch('http://localhost:8084/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('logintoken'),
                },
                //body: JSON.stringify(animal),
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('성공:', data);
            })

            .catch((error) => {
                console.error('실패:', error);
            });

            localStorage.setItem("animalinfo", JSON.stringify(animal))
            console.log(formData);

            alert('가입이 완료되었습니다')
            navigate('/user')
            */
            axios.post('http://localhost:8084/api/pets', formData, {
               headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('logintoken'),
               }
            })
           .then((data) => {
             console.log('성공:', data);
           })

           .catch((error) => {
               console.error('실패:', error);
           });

           localStorage.setItem("animalinfo", JSON.stringify(animal))
           console.log(formData);

           alert('등록이 완료되었습니다')
           navigate('/user')    
        } else {
            setError("모든 항목을 입력하세요")
        }
    }

    //image upload
    const onChangeImg  = (e) => {
        e.preventDefault();

        if(e.target.files){
            const uploadFile = e.target.files[0]
            console.log(uploadFile)
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
                        <td><input label="사진" name="photo" id="photo" placeholder="사진" type='file' onChange={onChangeImg} /></td>
                        <td><input label="이름" name="animalname" placeholder="이름" required onChange={(e) => setAnimalName(e.target.value)} /></td>
                        <td><input label="등록번호" name="animalId" placeholder="등록번호" required onChange={(e) => setAnimalId(e.target.value)} /></td>
                        <td><input label="생일" name="age" placeholder="나이" type='date' required onChange={(e) => setAnimalAge(e.target.value)}/></td>
                        <td><input label="무게" name="kg" placeholder="무게" required onChange={(e) => setAnimalWeight(e.target.value)} /></td>
                    </tr>
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