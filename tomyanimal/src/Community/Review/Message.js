import React, { useContext, useRef, useState } from 'react'
import CommentsBox from './CommentBox';
import SubMessages from './SubMsg/SubMessages';
import {MessagelistContext} from './MessageScroll'

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}

const Message = (props) => {
    const messagelist = useContext(MessagelistContext);

    //console.log(messagelist[0].replies);

    const likeIcons = useRef();
    const numLikes = useRef();

    const [arrowUp, setArrowUp] = useState(false);
    const [openReply, setOpenReply] = useState(false);

    const changeOpenReply = () => {
        setOpenReply(prevState => prevState = !prevState);
    }

    let arrow = <i className='fas fa-caret-down'></i>
    const changeArrow = () => {
        setArrowUp(prevState => prevState = !prevState);
    }

    if(arrowUp) {
        arrow = <i className='fas fa-caret-up'></i>
    } else {
        arrow = <i className='fas fa-caret-down'></i>
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
        {/*{messagelist.map( (it) => */}
            <>
            <div className='messageUser'>{props.user}</div>
            <div className='messageText'>{props.message}</div>

            <section className='messageIconsContainer'>
                <i className='fas fa-thumbs-up' ref={likeIcons} onClick={likeComment}></i>
                <div ref={numLikes}>{props.likes}</div>

                <i className='fas fa-thumbs-down'></i>
                {
                    !props.edpropsable ? (
                        <div onClick={changeOpenReply}>reply</div>
                    ) : ( 
                        <div onClick={deleteMessage}>delete</div>
                    )
                }
            </section>

            <showReply.Provider value={changeOpenReply}>
                {openReply && <CommentsBox autoFocus={true} />}
            </showReply.Provider>

            <section className='arrowReplies' onClick={changeArrow}>
                {arrow}
                <div>View 4 replies</div>
            </section>
            </>
          {/*  )} */}
            {arrowUp && (
            <section className='subMessages'>
                {props.replies.map(reply => 
                <>
                    {/*<SubMessages 
                     user='Dummy Reply User' 
                     message="This is a dummy reply" 
                    likes={2} />*/}
                
                    <SubMessages 
                        user={reply.user} 
                        message={reply.message}
                        likes={reply.likes}
                    />
                </>
                )}
            </section>
            )}
        </section>

    </div>
  )
}

export default Message