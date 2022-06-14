import React, { useState } from 'react'

const AnimalAdd = () => {
    const [animalName, setAnimalName] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalAge, setAnimalAge] = useState("");
    const [animalWeight, setAnimalWeight] = useState("");


    const registerAnimal = async () => {
        const animal = {
            animalName: animalName,
            animalId: animalId,
            animalAge: animalAge,
            animalWeight: animalWeight
        }
        console.log(animal);
    }


  return (
    <div>
        <div className='animal__register__container'>
            <input label="이름" name="animalname" placeholder="이름" required onChange={(e) => setAnimalName(e.target.value)} />
            <input label="등록번호" name="animalId" placeholder="등록번호" required onChange={(e) => setAnimalId(e.target.value)} />
            <input label="나이" name="age" placeholder="나이" required onChange={(e) => setAnimalAge(e.target.value)}/>
            <input label="무게" name="kg" placeholder="무게" required onChange={(e) => setAnimalWeight(e.target.value)} />
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