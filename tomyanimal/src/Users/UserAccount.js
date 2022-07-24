import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import UserLogIn from './UserLogin'
import { authInstance } from '../utils/api'
import './UserHome.css'

const UserAccount = () => {
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();
  const [error, setError] = useState();


  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

  const loginId = localStorage.getItem('userid');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function callAPI() {
        const user = await authInstance.get(`api/members/${loginId}`);
        setUser(user);
        setUserName(user.data.result.data['name']) 
        setUserPhone(user.data.result.data['phoneNumber'])
        localStorage.setItem('usename', user.data.result.data['name']);
        //NOTE : 사용할 확장성 고려
        //localStorage.setItem('userInfo', JSON.stringify(user.data.result.data));
      } callAPI();
    } catch(err) {
      console.log(err);
    }
  }, []);

    
  const Logout = () => {
    localStorage.clear();
    localStorage.removeItem('logintoken');
    navigate.push('/')
  }

  //EDIT
  const handleEditFormChange = (e) => {
    e.preventDefault();
    
    const fieldName = e.target.getAttribute("name")
    const fieldValue = e.target.value;
    
    const newFormData = { ...editFormData };
    newFormData[fieldName]=fieldValue;
    
    setEditFormData(newFormData);
  };
  
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const editedContact = {
      memberId: loginId,
      name: editFormData.name,
      phoneNumber: editFormData.contact,
    }

    try {
      const response = await authInstance.put('api/member/' + loginId, editedContact)
      console.log(response);
      setUser(response.data);
      setEditContactId(null); 
      alert('수정이 완료되었습니다')
      window.location.reload();
    } catch (error) {
      setError(error)
    }
  }

  
  const handleEditClick = (e) => {
    e.preventDefault();
    setEditContactId(loginId);

    const formValues = {
      name: userName,
      contact: userPhone,
    }

    setEditFormData(formValues);
  };

  
  const handleCancelClick = () => {
    setEditContactId(null);
  }

        
  return (
  <div>

    {/*NOTE: 재로그인 시 필요한 기능*/}
    {/* { (!user) ?
      <UserLogIn />
    :
    <> */}
      <div className='userinfo__subtitle'>
        <h1>Details</h1>
      </div>

      <div className='userinfo__content'>

        <form onSubmit={handleEditFormSubmit} method="PUT">
          <table className='account__detail__form'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {/* {editContactId === loginId ? ( */}
              <Fragment>
              {editContactId === loginId ? (
                <EditableRow 
                editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadOnlyRow 
                  userPhone={userPhone} userName={userName}
                  handleEditClick={handleEditClick}
                />
              )}
              </Fragment>
            </tbody>
          </table>
        </form>

        <div className='welcome'>
          <button onClick={Logout} className='welcome__btn'>
            <a href="/user">Logout</a>
          </button>
          <button className='welcome__btn'>
            <a href="/">Home</a>
          </button>
        </div>

      </div>
    {/* </>
    } */}
  </div>
  )
}

export default UserAccount