import React, { useRef, useState } from 'react'
import { useMainContext } from './Context/Context';

const TopCommentsBox = (props) => {
    const message = useRef(null);
    const [showCommentLine, setCommentLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);

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
        //message를 post하면 됨
        //.then(() => {
        setMessageReset(prevState => !prevState);
        //delete text input, updata comments and disable comment btn
        message.current.value = '';
        setEnableBtn(true);
        //})
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
            <button disabled={enableBtn} onClick={sendComment}>comment</button>
            <button onClick={() => {
                setShowButtons(false);
                message.current.value = ""
            }}>cancle</button>
            </>
        )
        }
    </form>
  )
}

export default TopCommentsBox