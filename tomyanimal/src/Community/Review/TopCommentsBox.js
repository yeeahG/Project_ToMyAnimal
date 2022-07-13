import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMainContext } from './Context/Context';

const TopCommentsBox = (props) => {
    const {id} = useParams();
    const message = useRef(null);

    const [showCommentLine, setCommentLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [error, setError] = useState("");

    const {setMessageReset} = useMainContext

    const commentFocus = () => {
      setCommentLine(true);
      setShowButtons(true);
    }
 
    const commentFocusOut = () => {
      setCommentLine(false);
    }

    const commentStroke = e => {
      let currMessage = e.target.value;

      if(currMessage) {
        setEnableBtn(false);
      } else {
        setEnableBtn(true);
      }
    }

    const sendComment = (e) => {
      e.preventDefault();
      console.log("Comment send");
      
      //axios post사용
      //message를 post하면 됨 message.current.value
      //process.env.REACT_APP_BACK_BASE_URL + api/comments
      //.then(() => {
        setMessageReset(prevState => !prevState);
        //delete text input, updata comments and disable comment btn
        message.current.value = '';
        setEnableBtn(true);
        //})
    }


    /*
    const addComment = async () => {
      const newComment = {
        content: message.current.value,
        boardId: id
      }
      console.log(newComment);
    
      if(message.current.value != "" ) {
        await axios.post(process.env.REACT_APP_BACK_BASE_URL + 'api/comments', newComment, {
          headers: {
            Authorization: localStorage.getItem('logintoken'),
          }
        })
        .then((data) => {
          console.log('성공:', data);
          //setMessageReset(prevState => !prevState);
          message.current.value = '';
          //setEnableBtn(true);
          alert('작성이 완료되었습니다')
        })
        .catch((error) => {
          console.error('실패:', error);
        });
      } else {
        setError("한 글자 이상 입력하세요")
      }
    }
    */
    const addComment = async (e) => {
      const newComment = {
        content: message.current.value,
        boardId: id
      }
      console.log(newComment);
  
      if(message.current.value != "" ) {
        await axios.post(process.env.REACT_APP_BACK_BASE_URL + 'api/comments', newComment, {
          headers: {
            Authorization: localStorage.getItem('logintoken'),
          }
        })
        .then((data) => {
          console.log('성공:', data);
          message.current.value = '';
          alert('작성이 완료되었습니다')
        })
        .catch((error) => {
          console.error('실패:', error);
        });
      } else {
        setError("한 글자 이상 입력하세요")
      }
    }

    
  return (
    <form>
      <section>
        {error}
        <input 
          autoFocus={props.autoFocus}
          type='text'
          placeholder='Add a comment'
          ref={message}
          onFocus={commentFocus}
          onBlur={commentFocusOut}
          onKeyUp={commentStroke}
        />
        {showCommentLine && <div className='commentLine'></div>}
      </section>

      {showButtons && (
        <>
          <button 
            disabled={enableBtn} 
            //onClick={addComment}
            onClick={addComment}
          >
            comment
          </button>
          <button onClick={() => {
            setShowButtons(false);
            message.current.value = ""
          }}>cancle</button>
        </>
      )}
    </form>
  )
}

export default TopCommentsBox