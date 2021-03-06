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
  const token = localStorage.getItem('logintoken');

  const navigate = useNavigate();

  //1
  useEffect(() => {
    axios({
      method: 'get', 
      url: `http://localhost:8084/api/members/${loginId}`,
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

  // const [stateUser, setUsertState] = useState([]);

  // const getUser = () => {
  //   axios
  //     .get('http://localhost:8084/api/members/' + loginId)
  //     .then(data => {
  //       let customer = data.data;
  //       setUsertState(
  //         {
  //           id: customer.id,
  //           userName: customer.userName,
  //           userPhone: customer.userPhone
  //         }
  //       )
  //     })
  //     .catch(err => alert(err));
  // }

    
  const Logout = () => {
    localStorage.clear();
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
  
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const editedContact = {
      memberId: loginId,
      name: editFormData.name,
      phoneNumber: editFormData.contact,
    }
    console.log(editedContact);

    // const newContacts = [...user];
    // const index = user.findIndex((it) => it.loginId === editContactId);
    // newContacts[index] = editedContact;
    // setUser(newContacts);
    // setEditContactId(null);

    //put or patch methond
    //ERROR??? ???????????? ????????????-> ??????

    axios.put('http://localhost:8084/api/member/' + loginId, editedContact,{
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
      alert('????????? ?????????????????????')
      window.location.reload();

      /*
      const userClone = [editedContact];
      const index = userClone.indexOf(response);
      userClone[index] = editedContact
      setUser(userClone);
      setEditContactId(null);
      */
    
    })
     .catch(function (error) {
      console.log(error.message);
     });


    // axios
    //   .put(`http://localhost:8084/api/member/${loginId}`, editedContact)
    //   .then(d => {
    //     // setUser(d.data);
    //     console.log(d);
    //   })
    //   .catch(err => alert(err));

    /*
    await fetch('http://localhost:8084/api/member/' + loginId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;',
        "Authorization": localStorage.getItem('logintoken'),
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(editedContact),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('??????:', data);
      })
    .catch((error) => {
      console.error('??????:', error);
    });
    alert('????????? ?????????????????????')
    */

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
    

    <form onSubmit={handleEditFormSubmit} method="PUT">
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
    GET method??? userName, userPhoneNumberOrUserId ????????????
    PUT or PATCH ??? ???????????? ??????

  </div>
  </div>
  )
}

export default UserAccount