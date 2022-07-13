import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Message from './Message'
import { useMainContext, } from './Context/Context'
import CommentsBox from '../components/CommentsBox'
import './Review.css'
import { useParams } from 'react-router-dom';

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
        user: "Junseok Lee",
        message: "No I am",
        likes: 231
      },
      {
        id: 3, 
        user: "Jeongmin kwon",
        message: "Hmmm",
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
        user: "민트초코",
        message: "yesss",
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
  //console.log(messageReset);
  const commentIncrementRef = useRef(commentIncrement);

  const commentlist = [];

  useEffect(() => {
    setShowBottomBar(true);

    axios.get(process.env.REACT_APP_BACK_BASE_URL + 'api/comments',
      {
        params: {boardId: id}
      },
      {
      headers: { 
        Authorization: localStorage.getItem('logintoken')
      },
    })
    .then((data) => {
      console.log('성공:', data);

      // for(let i=0; i < data.data.result.data.length; i++) {
      //   commentlist.push(data.data.result.data[i])
      // }
      // setMessages(commentlist);
      setMessages(data.data.result.data);
    }) 
    .catch((error) => {
      console.error('실패:', error);
    });
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

    {messagelist.length > 2 && showBottomBar ?
      <div className='bottomBar' ref={setBottomBar}>
        <div className='loader'></div>
      </div>
    : null}
  </>
  )
}

export default MessageScroll