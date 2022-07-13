import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';
import {useOpenReply} from './Message'
import { useMainContext } from './Context/Context';
import { useParams } from 'react-router-dom';

const CommentsBox = (props) => {
    const {id} = useParams();
    
    const {setMessageUpdate} = useMainContext();
    const changeOpenReply = useOpenReply();
    const message = useRef(null);
    
    const [showCommentLine, setCommentLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [error, setError] = useState("");

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

    const sendComment = async (e) => {
        e.preventDefault();

        const newComment = {
            content: message.current.value,
            parentId: props.value,
            boardId: id
        }
        console.log(newComment);

        // NOTE : axios post
        if(message.current.value != "" ) {
            await axios.post(process.env.REACT_APP_BACK_BASE_URL + 'api/comments', newComment, {
            headers: {
                Authorization: localStorage.getItem('logintoken'),
            }
            })
            .then((data) => {
            console.log('성공:', data);
            //setCom([newComment, ...com]);
            alert('작성이 완료되었습니다')

            })
            .catch((error) => {
                console.error('실패:', error);
            });
        } else {
            setError("한 글자 이상 입력하세요")
        }
        //setMessageUpdate([1, props.useKey])
        message.current.value = '';
        setEnableBtn(false);
    }

    
  return (
    <form>
        <section>
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
            {error}
            <button disabled={enableBtn} onClick={sendComment}>등록</button>
            <button onClick={() => {
                setShowButtons(false);
                changeOpenReply()
            }}>cancle</button>
            </>
        )
        }
    </form>
  )
}

export default CommentsBox