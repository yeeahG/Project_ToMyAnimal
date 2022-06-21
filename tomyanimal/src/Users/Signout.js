import React from 'react'
 
const Signout = () => {
  return (
    <div>
      <div className='userinfo__subtitle'>
        <h1>ByeBye</h1>
      </div>
      
      <p>탈퇴하기</p>
      <p>비밀번호 재 확인 후 확인창 띄우고 삭제</p>

      <div className='userinfo__content'>
        input.password === DB의 userid password ? 탈퇴창 : error
        <form>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Contact</th>
            </tr>
          </thead>
        </form>
      </div>
    </div>
  )
}

export default Signout