import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './HomeChat.css'

const HomeChat = () => {
    const theme = {
        background: 'transport',
        botBubbleColor: '#fe81b9',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
        bubbleOptionStyle: '#559df2',
    };
      
    const steps = [
        {
          id: '0',
          message: '안녕하세요 To.my animal 설명상담사 챗봇입니다.',
          trigger: '1'
        },
        {
          id: '1',
          message: '이용방법을 알고싶으시면 시작버튼을 눌러주세요',
          trigger: '2',
        },
        {
          id: '2',
          options: [
              {value: 1, label: '시작', trigger: '3'},
          ]
        },
        {
          id: '3',
          message: '원하시는 서비스를 선택해주세요',
          trigger: '4',
        },
        {
          id: '4',
          options: [
              {value: 1, label: '회원가입', trigger: '5'},
              {value: 2, label: '동물등록', trigger: '6'},
              {value: 3, label: '동물 정보 확인', trigger: '7'},
              {value: 4, label: '기록하기', trigger: '8'},
              {value: 5, label: '원하는 장소 찾기', trigger: '9'},
              {value: 6, label: '종료', trigger: '10'},
          ]
        },
        {
          id: '5',
          message: '아이디, 비밀번호, 이메일주소, 닉네임으로 우측상단에서 회원가입을 할 수 있습니다.',
          trigger: '4',
        },
        {
          id: '6',
          message: '동물사진, 이름, 생일, 무게를 입력하여 내 동물 프로필을 완성해보세요.',
          trigger: '4',
        },
        {
          id: '7',
          message: 'menu-my animal에서 프로필을 확인할 수 있습니다.',
          trigger: '4',
        },
        {
          id: '8',
          message: 'menu-my animal의 My Record부분에서 반려동물에 관한 것들을 기록할 수 있습니다.',
          trigger: '4',
        },
        {
          id: '9',
          message: 'menu-where에서 원하는 장소를 찾아보고 예약이 필요하면 예약을 진행할 수 있습니다.',
          trigger: '4',
        },
        {
          id: '10',
          message: 'To.my animal을 이용해주셔서 감사합니다',
          end: true,
        },
    ];
      

  return (
    <ThemeProvider theme={theme}>
      <ChatBot 
        steps={steps}
        hideHeader={true} 
        placeholder={'채팅이 불가능한 채널입니다.'}
      />
   </ThemeProvider>
  )
}

export default HomeChat