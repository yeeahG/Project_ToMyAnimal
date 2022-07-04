import React, { useEffect, useState } from 'react'
import Message from './Message'
import axios from 'axios'
import './Review.css'

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

const MessageScroll = () => {
  //db연결시
  const [message, setMessages] = useState([])
  const [showBottomBar, setShowBottomBar] = useState(true);

  
  // useEffect(async () => {
  //   setShowBottomBar(true);
    
  //   await axios({
  //     method: 'get', 
  //     url: 'https://jsonplaceholder.typicode.com/posts',
  //     headers: {
  //       'Authorization': localStorage.getItem('logintoken'),
  //       'Content-Type': 'multipart/form-data',
  //     }
  //   })
  //   .then((data) => {
  //     console.log('성공:', data);
  //     setMessages(data)
  //   }) 
  //   .catch((error) => {
  //     console.error('실패:', error);
  //   });
  // },[])


  console.log(messagelist);

  return (
    <>
    {/*<MessagelistContext.Provider value={messagelist}>
        <div>
            <Message />

            {messagelist.length > 9 && showBottomBar ?
            <div className='bottomBar'>
                <div className='loader'></div>
            </div>
            : null}

        </div>
    </MessagelistContext.Provider> */}

    {/* <Message 
      user="Dummy user" 
      editable={false} 
      message="Dummy Message"
      likes={25} 
    /> */}

    {messagelist.map(message => (
    <Message 
      user={message.user}
      editable={message.editable} 
      message={message.message}
      likes={message.likes} 
      replies={message.replies}
    />
    ))}

    {messagelist.length > 2 && showBottomBar ?
      <div className='bottomBar'>
        <div className='loader'></div>
      </div>
    : null}
  </>
  )
}

export default MessageScroll