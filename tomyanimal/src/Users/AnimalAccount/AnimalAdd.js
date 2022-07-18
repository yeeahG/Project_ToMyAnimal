import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fileInstance } from '../../utils/api';

const AnimalAdd = () => {
    const [type, setType] = useState("")
    const [animalName, setAnimalName] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalAge, setAnimalAge] = useState("");
    const [animalWeight, setAnimalWeight] = useState("");

    const [isOpen, setOpen] = useState(false);
    const [error, setError] = useState("");

    let localStorage = window.localStorage;
    const navigate = useNavigate();

    const loginId = localStorage.getItem('userid');

    const showInput = () => {
        setOpen(!isOpen)
    }

    const registerAnimal = async () => {
        const animal = {
            name: animalName,
            registrationNumber: animalId,
            birthday: animalAge,
            weight: animalWeight,
            type: type
        }

        const formData = new FormData()
        formData.set('name', animal.name)
        formData.set('registrationNumber', animal.registrationNumber)
        formData.set('birthday', animal.birthday)
        formData.set('weight', animal.weight)
        formData.set('type', animal.type)

        //const file = document.getElementById('photo')
        //formData.append("addedImages", file.files[0]);

        Object.values(imgFile).forEach((file) => formData.append("images", file));

        if(animalName!=="" && animalId!=="" && animalAge!=="" && animalWeight!=="" ) {

            try {
                await fileInstance.post('api/animals', formData);
                alert("등록이 완료되었습니다");
                window.location.reload();
            } catch(error) {
                console.error('실패:', error);
                alert("등록을 다시 진행해주세요")
                window.location.reload();
            }

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
                        <th>Species</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>No ID</th>
                        <th>Age</th>
                        <th>Weight</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className='reserve__keyword' id='reserve__keyword'>
                            <p value="동물종류" onClick={() => setType("dog")}>강아지</p>
                            <p value="동물종류" onClick={() => setType("cat")}>고양이</p>
                            <p value="동물종류" onClick={showInput}>기타</p>
                            {isOpen? 
                                <input 
                                    label="동물종류" name="type" 
                                    placeholder="동물종류를 입력하세요" 
                                    onChange={(e) => setType(e.target.value)}
                                /> 
                                : 
                                ""}
                        </td>
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