import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AnimalAdd = () => {
    const [animalName, setAnimalName] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalAge, setAnimalAge] = useState("");
    const [animalWeight, setAnimalWeight] = useState("");

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
            weight: animalWeight
        }
        console.log(animal);

        if(animalName!="" && animalId!="" && animalAge!="" && animalWeight!="" ) {
            // await fetch('https://jsonplaceholder.typicode.com/posts', {
            await fetch('http://localhost:8084/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                },
                body: JSON.stringify(animal),
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('성공:', data);
            })

            .catch((error) => {
                console.error('실패:', error);
            });

            localStorage.setItem("animalinfo", JSON.stringify(animal))
            alert('가입이 완료되었습니다')
            navigate('/user')
        } else {
            setError("모든 항목을 입력하세요")
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