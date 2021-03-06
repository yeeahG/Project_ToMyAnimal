import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../Community/components/Pagination';
import ControlMenu from '../../Pages/ControlMenu';
import { ChecklistContext } from '../Checklist/CheckList'
import AddChecklist from './AddChecklist';
import { DeleteFilled } from '@ant-design/icons';

import './CardItem.css'

const sortOptionList = [
  {value: "latest", name: "최신순"},
  {value: "oldest", name: "오래된 순"},
]

const Detail = () => {
  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [noteId, setNoteId] = useState([]);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const {id} = useParams();

  const userid = localStorage.getItem('userid');

  const checklist = useContext(ChecklistContext);

  const navigate = useNavigate();
  const contentRef = useRef();



  {/*
  useEffect(() => {

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
    //axios.get(`http://localhost:8084/api/posts?page=0&size=4&categoryId=${id}&memberId=${userid}`, {
    axios.get(`http://localhost:8084/api/my-board?memberId=${userid}&categoryId=${id}&page=0&size=4&type=1`, {
      headers: {
        Authorization: localStorage.getItem('logintoken'),
      }
    }).then((response) => {
      //console.log(response.data.result.data.postList[0]);
      for (let i=0; i < response.data.result.data.postList.length; i++) {
        putList.push(response.data.result.data.postList[i])
        //console.log(putList);
      } setData(putList);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  
  console.log(data);

  const submitHandler = async (content) => {
    console.log("submit" + content);

    const newPost = {
      type: 1,
      title: title, 
      content: content,
      categoryId: id
    }

    // if(content.length < 1) {
    //   contentRef.current.focus();
    //   return;
    // }

    const newPosts = [...data, newPost];
    console.log(newPosts);
    setData(newPosts);

    if(title != "" || content != "") {
      await axios({
        method: 'post', 
        url: 'http://localhost:8084/api/board',
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
      //window.location.reload();
    } else {
      setError("한 글자 이상 입력하세요")
    }
  }


  const deleteNote = (noteId) => {
    //글 각각의 id 필요
    //noteId
    data.filter((note) => note.noteId != noteId)
  }

  //pagination
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  let currentPosts = 0;
  currentPosts = data.slice(indexOfFirst, indexOfLast);


  return (
    <div className='info__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Checklist</h1>
          <div className='header__detail'>
            <p>나의 동물이 좋아하고 행동했던 것들을 기록하기</p>
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

          <div className='checklist__walk__container'>
            {error}
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

            <button className='upload__btn' onClick={submitHandler} >write</button>
          </div>
            :
          // <div className='checklist__read__container'>
          //   {/* {data.title} 
          //   {data.map((it) => ( */}
          //   {currentPosts.map((it) => (
          //     <div className='checklist__read__content'>
          //       <h3>{it.title}</h3>
          //       <p>{it.content}</p>
          //     </div>
          //   ))}
          // </div>
          null
          }


          <div className='checkllist__wrapper'>

            {currentPosts.map((it) => (
              <div className='checklist__note'>
                <div className='checklist__text'>
                  <h3>{it.title}</h3>
                  <p>{it.content}</p> 
                </div>
                <div className='checklist__note__footer'>
                  <small>2022/07.01</small>
                  <button><DeleteFilled style={{fontSize: '18px'}} /></button>
                </div>
              </div>
            ))}

            <div className='checklist__note'>
              <h3>title</h3>
              <p>content</p>
              <div className='checklist__note__footer'>
                <small>2022/07.01</small>
                <button><DeleteFilled style={{fontSize: '18px'}} /></button>
              </div>
            </div>
            <div className='checklist__note'>
              <h3>title</h3>
              <p>content</p>
              <div className='checklist__note__footer'>
                <small>2022/07.01</small>
                <button><DeleteFilled style={{fontSize: '18px'}} /></button>
              </div>
            </div>
            <div className='checklist__note'>
              <h3>title</h3>
              <p>content</p>
              <div className='checklist__note__footer'>
                <small>2022/07.01</small>
                <button><DeleteFilled style={{fontSize: '18px'}} /></button>
              </div>
            </div>


            <AddChecklist 
              submitHandler={submitHandler}
            />

          </div>


          <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={setCurrentPage}
          />



        </div>

      </div>

    </div>
  )
}

export default Detail