import React, { useRef, useState } from 'react'

const TopCommentsBox = (props) => {
    const message = useRef(null);
    const [showCommentLine, setCommentLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);

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