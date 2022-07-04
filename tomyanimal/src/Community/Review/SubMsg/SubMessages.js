import React, { useContext, useRef, useState } from 'react'
import CommentsBox from '../CommentBox';
import SubCommentBox from './SubCommentBox';

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}

const SubMessages = (props) => {
    const likeIcons = useRef();
    const numLikes = useRef();

    const [openReply, setOpenReply] = useState(false);

    const changeOpenReply = () => {
        setOpenReply(prevState => prevState = !prevState);
    }

    //like message
    let toggleLike = false;
    let likes = props.likes;
    const likeComment = () => {
        toggleLike = !toggleLike;
        
        if (toggleLike) {
            likes++;
            likeIcons.current.style.color = "#559df2"
        } else {
            likes--;
            likeIcons.current.style.color = "gray"
        }
        numLikes.current.innerHTML = likes;
    }


    const deleteMessage = () => {
        
    }


  return (
    <div>
        <section className='messageContainer'>
            <div className='messageUser'>{props.user}</div>
            <div className='messageText'>{props.message}</div>

            <section className='messageIconsContainer'>
                <i className='fas fa-thumbs-up' ref={likeIcons} onClick={likeComment}></i>
                <div ref={numLikes}>{props.likes}</div>

                <i className='fas fa-thumbs-down'></i>
                {
                    !props.editable ? (
                        <div onClick={changeOpenReply}>reply</div>
                    ) : ( 
                        <div onClick={deleteMessage}>delete</div>
                    )
                }
            </section>

            <showReply.Provider value={changeOpenReply}>
                {openReply && <SubCommentBox autoFocus={true} />}
            </showReply.Provider>


        </section>
    </div>
  )
}

export default SubMessages