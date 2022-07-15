import React, { useContext, useRef, useState } from 'react'
import {useOpenReply} from '../Message'
import { useMainContext } from '../Context/Context';

const SubCommentBox = (props) => {
  const {setMessageUpdate} = useMainContext();

  const changeOpenReply = useOpenReply();

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
      //axios.post
      setMessageUpdate([1, props.useKey])
      
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
                changeOpenReply()
            }}>cancle</button>
            </>
        )
        }
    </form>
  )
}
export default SubCommentBox