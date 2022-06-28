import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ControlMenu from '../../Pages/ControlMenu';
import { ChecklistContext } from '../Checklist/CheckList'

const Detail = () => {
  const {id} = useParams();
  console.log(id);
  const checklist = useContext(ChecklistContext);

  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const contentRef = useRef();
  const userid = localStorage.getItem('userid');
  const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
  ]


  {/*
  seEffect(() => {

      const targetCheckList = checklist.find(
        (it) => parseInt(it.id) === parseInt(id)
      )
      console.log(targetCheckList);

      if(targetCheckList) {
        setData(targetCheckList)
      } else {
        alert("존재하지 않는 메모입니다")
        navigate('/', {replace:true})
      }
    
  }, [id, checklist]) */}

  const checklistBack = () => {
    navigate(-1);
  }

  const putList = [];
  
  useEffect ( () => {
    axios.get(`http://localhost:8084/api/posts?page=0&size=4&categoryId=${id}&memberId=${userid}`, {
      headers: {
        Authorization: localStorage.getItem('logintoken'),
      }
    }).then((response) => {
      //console.log(response.data.result.data.postList[0]);
      for (let i=0; i < response.data.result.data.postList.length; i++) {
        putList.push(response.data.result.data.postList[i])
        //console.log(putList);
      } setData(putList);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const submitHandler = async () => {
    console.log("submit");
    console.log(content);

    const newPost = {
      title: title, 
      content: content,
      categoryId: id
    }

    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if(title != "" || content != "") {
      await axios({
        method: 'post', 
        url: 'http://localhost:8084/api/posts',
        data: newPost,
        headers: { 
          'Authorization': localStorage.getItem('logintoken'),
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((data) => {
        console.log('성공:', data);
      })
      
      .catch((error) => {
        console.error('실패:', error);
      });
      alert('작성이 완료되었습니다')
      window.location.reload();
    } else {
      setError("한 글자 이상 입력하세요")
    }

  }

  return (
    <div className='info__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Header</h1>
          <div className='header__detail'>
            <p>Back</p>
          </div>
        </div>
      </div>

      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>

      <div className='info__content'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>Check list</li>
            <li onClick={checklistBack}>Back</li>
          </ul>
        </div>

        <div className='log__wrapper'>

          <div className='navi__container'>
            <ControlMenu 
              value={sortType} 
              onChange={setSortType}
              optionList={sortOptionList}
            />
            <button onClick={()=>setOpen(!isOpen)}>
            {isOpen ? "Close" : "Write"}
            </button>
          </div>

          {error}
          <div className='checklist__walk__container'>
            {id} detail
            
          </div>

          {isOpen ?
          <div className='checklist__walk__container'>
            Write
            <form>
              <input
                name="title" 
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <p>
                <textarea 
                  name="content" 
                  placeholder='What about your animal?'
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </p>
            </form>

            <button className='upload__btn'onClick={submitHandler} >write</button>
          </div>
            :
          <>
            {/* {data.title} 
            {data}*/}
            {data.map((it) => (
              <div>
                <p>{it.title}</p>
                <p>{it.content}</p>
              </div>
            ))}
          </>
          }



        </div>

      </div>

    </div>
  )
}

export default Detail