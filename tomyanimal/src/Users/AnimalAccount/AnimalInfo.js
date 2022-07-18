import React, { useState } from 'react'
import { authInstance } from '../../utils/api';

const AnimalInfo = ({id, type, name, registrationNumber, birthday, weight}) => {
    const [petArray, setPetArray] = useState([]);

    //반려동물 나이 계산
    const date = new Date();
    const dateYear = date.getFullYear()

    const animalDelete = async (id) => {
        try {
            const data = await authInstance.delete('api/animals/' + id);
            console.log('성공:', data);
            setPetArray(it.filter((p) => p.id !== it.id));
        } catch (error) {
            console.error('실패:', error);
        }
    }

  return (
    <tr key={id}>
        <td>{type}</td>
        <td>{name}</td>
        <td>{registrationNumber}</td>
        <td>{birthday}</td>
        <td>{parseInt(dateYear) - parseInt(birthday)}살</td>
        <td>{weight}kg</td>
        <td><button onClick={() => animalDelete(id)}>delete</button></td>
    </tr>
  )
}

export default AnimalInfo