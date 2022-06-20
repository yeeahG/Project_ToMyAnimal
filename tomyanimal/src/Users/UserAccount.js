import axios from 'axios';
import React, { useEffect, useState, Fragment, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import UserEdit from './UserEdit'
import { userData } from './data'
import './UserHome.css'
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

const UserAccount = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState();
  //const [userInfo, setUserInfo] = useState(userInfo);
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();

  //console.log(userData);
  //console.log(userInfo);

  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

  // const [data, dispatch] = useReducer(User, dummyData);

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

  const loginId = localStorage.getItem('userid');
  //console.log(loginId);

  const navigate = useNavigate();

  //1
  useEffect(() => {
    axios({
      method: 'get', 
      // url: 'https://jsonplaceholder.typicode.com/posts',
      url: 'http://localhost:8084/api/members/' + loginId,
    }).then((user) => {
      setUser(user);
      setUserName(user.data.result.data['userName']) 
      setUserPhone(user.data.result.data['userPhoneNumber'])
      localStorage.setItem('userInfo', JSON.stringify(user.data.result.data));
    })
  }, []);
  //console.log(user.result.data['userName']);
  //console.log(user.result.data['userId']);

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
      // userId: editContactId,
      userPhoneNumber: editFormData.contact,
      username: editFormData.name
    }

    // const newContacts = [...user];
    // const index = user.findIndex((it) => it.loginId === editContactId);
    // newContacts[index] = editedContact;
    // setUser(newContacts);
    // setEditContactId(null);

    //put or patch methond
    //ERROR남 작동에는 문제없음
    axios.put('http://localhost:8084/api/member/' + loginId, { editedContact,
      headers: {"Access-Control-Allow-Origin": "*"} 
    })
    .then(function (response) {
      console.log(response);

      const userClone = [editedContact];
      const index = userClone.indexOf(response);
      userClone[index] = editedContact
      setUser(userClone);
      setEditContactId(null);

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  
  const handleEditClick = (e, user) => {
    e.preventDefault();
    // setEditContactId(user.id);
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

    <div className='userinfo__subtitle'>
      <h1>Details</h1>
    </div>

    <div className='userinfo__content'>
      {/* <div className='userinfo__subtitle'>
        <h1>Details</h1>
        <button onClick={()=>setOpen(!isOpen)}>
        {isOpen ? "X" : "Edit"}
        </button>
      </div> */}

      {/* {isOpen ?
        <UserEdit isOpen={isOpen} />
        :
      <>
        <div className='userinfo__table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>user[0].title</td>
              </tr>
              <tr>
                <td>user[0].body</td>
              </tr>
            
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
      } */}
    

    <form onSubmit={handleEditFormSubmit} >
      <table className='account__detail__form'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/* {user.map((user) => (
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
          ))} */}

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

    {localStorage.getItem('userinfo')}&nbsp;
    GET method로 userName, userPhoneNumberOrUserId 가져오기
    PUT or PATCH 로 회원정보 수정

  </div>
  </div>
  )
}

export default UserAccount