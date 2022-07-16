import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../Community/components/Pagination';
import ControlMenu from '../../Pages/ControlMenu';
import { ChecklistContext } from '../Checklist/CheckList'
import AddChecklist from './AddChecklist';
import { DeleteFilled } from '@ant-design/icons';

import './CardItem.css'
import ChecklistFooter from './ChecklistFooter';
import ReadChecklist from './ReadChecklist';
import { authInstance } from '../../utils/api';


const sortOptionList = [
  {value: "latest", name: "최신순"},
  {value: "oldest", name: "오래된 순"},
]

const Detail = () => {
  const [sortType, setSortType] = useState('latest');

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

  const checklistBack = () => {
    navigate(-1);
  }

  const putList = [];
  const postIdList = [];
  
  useEffect ( () => {
    async function callAPI() {
      const response = await authInstance.get(`api/my-board?memberId=${userid}&categoryId=${id}&page=0&size=4&type=PRIVATE`);

      for (let i=0; i < response.data.result.data.length; i++) {
        putList.push(response.data.result.data[i])
        postIdList.push(response.data.result.data[i].id)
      }
      setData(putList);
      setNoteId(postIdList);
    } callAPI();
  }, []);
  
  const submitHandler = async (title, content) => {
    const newPost = {
      type: "PRIVATE",
      title: title, 
      content: content,
      categoryId: id
    }

    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    const newPosts = [...data, newPost];
    setData(newPosts);

    if(title != "" && content != "") {
      try {
        async function callAPI() {
          await authInstance.post('api/board', newPost)
          alert('작성이 완료되었습니다')
          window.location.reload();
        } callAPI();
      } catch {
        console.error('실패:', error);
      }
    } else {
      setError("한 글자 이상 입력하세요")
    }
  }


  const deleteNote = async (id) => {
    //글 각각의 id 필요 = noteId
    const newNotes = data.filter((note) => note.noteId != noteId)
    setData(newNotes);

    try {
      await authInstance.delete(`api/board/${id}`)
      alert("삭제가 완료되었습니다")
      window.location.reload();
    } catch (error) {
      console.error('실패:', error);
    }
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
          </div>

          <div className='checklist__walk__container'>
            {error}
          </div>

          <div className='checkllist__wrapper'>
            {currentPosts.map((it) => (
              <ReadChecklist 
                key={it.id}
                {...it}
                deleteNote={deleteNote}
              />
            ))}

            <div className='checklist__note'>
              <h3>ex) ㅇㅇ천 산책갔다옴</h3>
              <p>ex) 초코가 너무 좋아했다. ㅇㅇ천 근처에 잔디밭이 넓게 있어서 여기를 산책장소로 자주 다니면 되겠다. </p>
              <div className='checklist__note__footer'>
                <small>2022.07.01</small>
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