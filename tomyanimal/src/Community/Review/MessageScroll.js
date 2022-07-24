import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useMainContext, } from './Context/Context'
import CommentsBox from '../components/CommentsBox'
import './Review.css'
import { useParams } from 'react-router-dom';
import { authInstance } from '../../utils/api';

export const MessagelistContext = React.createContext();

const messagelist = [
  {
    id: 1,
    user: "Yeji kim",
    message: "I am the best",
    likes:999,
    editable: false,
    replies: [
      {
        id: 2, 
        member: {
          name: "Junseok Lee",
        },
        content: "No I am",
        likes: 231
      },
      {
        id: 3, 
        member: {
          name: "Jeongmin kwon",
        },
        content: "Hmmm",
        likes: 2
      },
    ]
  },
  {
    id: 4, 
    user: "구미베어",
    message: "구미동 구미베어",
    likes:33,
    editable: false,
    replies: [
      {
        id: 5,
        member: {
          name: "민트초코",
        },
        content: "yesss",
        likes: 2
      },
    ]
  },
  {
    id: 6,
    user: "맥북",
    message: "갖고싶다",
    likes:1,
    editable: false,
    replies: [

    ]
  },
]

const MessageScroll = (props) => {
  //db연결시
  const [message, setMessages] = useState([])
  const [showBottomBar, setShowBottomBar] = useState(true);

  const {id} = useParams();

  const {messageReset, commentIncrement, setMethodIncrement, messageUpdate } = useMainContext();
  const commentIncrementRef = useRef(commentIncrement);

  const commentlist = [];

  useEffect(() => {
    setShowBottomBar(true);

    try {
      async function callAPI() {
        const data = await authInstance.get('api/comments', {
          params: {boardId: id}
        });
        console.log('성공:', data);
        setMessages(data.data.result.data);
      } callAPI();
    }catch(error) {
      console.error('실패:', error);
    }
  },[])


  const observer = React.useRef(new IntersectionObserver(entries => {
    const first = entries[0];

    if(first.isIntersecting) {
      //post commentIncrement=commentIncrementRef.current
      //.then(comments) 부분
      if(CommentsBox.length >0) {
        setTimeout(() => {
        //setMessages(prevState => [...prevState, ...comments])
      }, 3000)
      } else {
        setTimeout(() => {
          setShowBottomBar(false);
        }, 3000)
      }//setMethodIncrement(prevState => prevState += comments.length)
    }
  }), {threshold: 1})

  useEffect(() => {
    commentIncrementRef.current = commentIncrement;
  }, [commentIncrement])

  const [bottomBar, setBottomBar] = useState(null);

  return (
    <>
      {/*NOTE : DUMMY */}
      {messagelist.map(message => (
        <Message 
          user={message.user}
          editable={message.editable} 
          message={message.message}
          likes={message.likes} 
          replies={message.replies}
        />
      ))}

      {message.map(message => (
        <Message 
          id={message.id}
          user={message.member.name}
          message={message.content}
          replies={message.children}
        />
      ))}

      {message.length > 2 && showBottomBar ?
        <div className='bottomBar' ref={setBottomBar}>
          <div className='loader'></div>
        </div>
      : null}
    </>
  )
}

export default MessageScroll