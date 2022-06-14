import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import UserEdit from './UserEdit'
import { userData } from './data'
import './UserHome.css'
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

const UserAccount = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState(userData);

  //console.log(userData);

  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

  const data = [
    {
      "id": 1, 
      "name": "Yeji Kim",
      "contact": "01011112222",
    },
    {
      "id": 2, 
      "name": "Junseok Lee",
      "contact": "01022342234",
    },
  ]

  const navigate = useNavigate();

  //1
  // useEffect(() => {
  //   axios({
  //     method: 'get', 
  //     // url: 'http://localhost:8084/api/auth/',
  //     url: 'https://jsonplaceholder.typicode.com/posts',
  //   }).then((user) => {
  //     setUser(user.data);
  //   })
  // }, []);
  // console.log(user[0]);
  
  //2
  //useEffect( async () => {
  //     (
  //         async () => {
  //             const {data} = axios.get('http://localhost:8084/api/auth/signin');
  //             setName(data.userName);
  //         }
  //     )();
  // }, []);

  /*
  useEffect(() => {
    const getUser = async () => {
      const {data: res} = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setUser(res);
    };
    getUser();
  }, [])
  */

    
  const Logout = () => {
    // console.log("log out");
    // setUser({name: "", id: ""});
  
    // localStorage.clear();
    //localStorage.removeItem('logininfo');
    localStorage.removeItem('logintoken');
    navigate.push('/')
  }

  //EDIT
  // const editHandler = (e) => {
  //   e.preventDefault();

  //   user.history.push('/UserEdit')({
  //     pathname: '/UserEdit',
  //     userInfo: {
  //       userName: user[0].userId,
  //       userPhoneNumberOrUserId: user[0].title,
  //     },
  //   });
  // }

  
  const handleEditFormChange = (e) => {
    e.preventDefault();
    
    const fieldName = e.target.getAttribute("name")
    const fieldValue = e.target.value;
    
    const newFormData = { ...editFormData };
    newFormData[fieldName]=fieldValue;
    
    setEditFormData(newFormData);
  };
  
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      contact: editFormData.contact
    }

    const newContacts = [...user];
    const index = user.findIndex((it) => it.id === editContactId);
    newContacts[index] = editedContact;
    setUser(newContacts);
    setEditContactId(null);
  }

  
  const handleEditClick = (e, user) => {
    e.preventDefault();
    setEditContactId(user.id);

    const formValues = {
      name: user.name,
      contact: user.contact,
    }

    setEditFormData(formValues);
  };

  
  const handleCancelClick = () => {
    setEditContactId(null);
  }

        
  return (
  <div className='userinfo__content'>
    <div className='userinfo__subtitle'>
      {/* <h1>{user.length} Details</h1> */}
      <h1>Details</h1>
      {/* <button onClick={editHandler}>Edit</button> */}
      <button onClick={()=>setOpen(!isOpen)}>
        {isOpen ? "X" : "Edit"}
      </button>
    </div>

    {isOpen ?
      <UserEdit isOpen={isOpen} />
      :
    <>
      <div className='userinfo__table'>
        <table>
          <tbody>
            <tr>
              <td>Name </td>
              {/*<td>{user[0].title}</td>*/}
            </tr>
            <tr>
              <td>Contact </td>
              {/*<td>{user[0].body}</td>*/}
            </tr>
            
            {/*
            {user.map(user => 
            <tr key={user.id}>
              <td>Contact </td>
              <td>
                {user.title}
              </td>
            </tr>
            )}*/}
          </tbody>
        </table>
      </div>

      <div className='welcome'>
        <button onClick={Logout} className='welcome__btn'>
          <a href="/user">Logout</a>
        </button>
        <button className='welcome__btn'>
          <a href="/">Home</a>
        </button>
      </div>
    </>
    }
    

    <form onSubmit={handleEditFormSubmit} >
      <table className='account__detail__form'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <Fragment>
              {editContactId === user.id ? (
              <EditableRow 
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
              />
              ) : (
              <ReadOnlyRow 
                user={user} 
                handleEditClick={handleEditClick}
              />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>

    {localStorage.getItem('userinfo')}&nbsp;
    GET method로 userName, userPhoneNumberOrUserId 가져오기
    PUT or PATCH 로 회원정보 수정

  </div>
  )
}

export default UserAccount