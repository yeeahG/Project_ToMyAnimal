import React, { useRef, useState } from 'react'
import { useOpenReply } from './Article';

const CommentsBox = (props) => {
    const changeOpenReply = useOpenReply();

    const message = useRef(null);

    const [showCommentLine, setCommentLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [enableBtn, setEnableBtn] = useState(true);

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

    const sendComment = e => {
        e.preventDefault();
    }

  return (
      <form>
          <section>
              <input
                autoFocus={props.autoFocus}
                type="text"
                placeholder='Add a comment'
                ref={message}
                onFocus={commentFocus}
                onBlur={commentFocusOut}
                onKeyUp={commentStroke}
              />

              {showCommentLine && <div></div>}
          </section>

          {showButtons && (
              <>
                <button disabled={enableBtn} onClick={sendComment}>comment</button>
                <button onClick={() => {
                    setShowButtons(false);
                    changeOpenReply()
                }}>취소</button>
              </>
          )}
      </form>
  )
}

export default CommentsBox