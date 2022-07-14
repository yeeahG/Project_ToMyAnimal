import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import UserLogIn from './UserLogin'
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
    axios({
      method: 'get', 
      url: process.env.REACT_APP_BACK_BASE_URL + `api/members/${loginId}`,
      headers: {
        Authorization: localStorage.getItem('logintoken') 
      }
    }).then((user) => {
      setUser(user);
      setUserName(user.data.result.data['name']) 
      setUserPhone(user.data.result.data['phoneNumber'])
      localStorage.setItem('usename', user.data.result.data['name']);
      localStorage.setItem('userInfo', JSON.stringify(user.data.result.data));
    })
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

    // const newContacts = [...user];
    // const index = user.findIndex((it) => it.loginId === editContactId);
    // newContacts[index] = editedContact;
    // setUser(newContacts);
    // setEditContactId(null);

    axios.put(process.env.REACT_APP_BACK_BASE_URL + 'api/member/' + loginId, editedContact,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': localStorage.getItem('logintoken'),
        'Content-Type': 'application/json'
      }
    })
    .then( function (response){
      console.log(response);
      setUser(response.data);
      setEditContactId(null); 
      alert('수정이 완료되었습니다')
      window.location.reload();
    })
    .catch(function (error) {
      setError(error)
    });

  }

  
  const handleEditClick = (e) => {
    e.preventDefault();
    // setEditContactId(user.data.result.data['userId']);
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

    { (!user) ?
      <UserLogIn />
    :
    <>
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
    </>
    }
  </div>
  )
}

export default UserAccount