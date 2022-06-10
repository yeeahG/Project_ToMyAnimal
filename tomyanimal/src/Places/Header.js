import React from 'react'

const Header = ( {setType, setRatings, setCoordinates} ) => {
  return (
    <div>

        <input type='text' placeholder='Search'/>
            <button>Search</button>

        <select >
            <option aria-readonly>별점</option>
            <option onClick={() => setRatings(4)}>4.0</option>
            <option onClick={() => setRatings(3)}>3.0</option>
            <option onClick={() => setRatings(2)}>2.0</option>
            <option onClick={() => setRatings(1)}>1.0</option>
        </select>

        {/*Hospital*/}
        <select>
            <option onClick={() => setType("Hospital")}>동물병원</option>
            <option onClick={() => setType("Hospital")}>훈련소</option>
        </select>


    </div>
  )
}

export default Header