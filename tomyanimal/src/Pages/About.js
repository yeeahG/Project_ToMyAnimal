import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about__container'>
      <div className='member__container'>
          <section className='about__title'>
            <h1>To.</h1>
            <h1>My animal</h1>
          </section>
        <div className='member'>
          <div>
            가족의 형태가 변화함에 따라 반려동물과 함께 사는 가족이 늘고 있습니다. 그렇기에 많은 사람들이 자신의 가족인 반려동물을 신경쓰고 하나하나 기록하고 싶은 마음이 들 것이라 생각했고 이러한 생각을 바탕으로 모든 것을 기록하고 체크하고 케어할 수 있는 서비스를 기획하고 싶었습니다. 반려동물의 성장일지 기록, 반려인들만의 커뮤니티, 주변 지역의 반려동물 시설에 예약기능이 제공되는 서비스입니다. 
            마치 반려동물에게 편지를 쓰듯이 편안하게 쓸 수 있도록, 나의 동물에게 선물하는 To. my animal 이름을 떠올리게 되었습니다.
            <br/>
            <br/>
            로그인 후 반려동물의 정보를 입력하면 (이름, 생일, 체중, 사진) 📌Animal page 에서 정보를 확인할 수 있습니다. 
            Checklist menu 에서 반려동물에 관한 기록을 남길 수 있습니다. 
            반려동물 케어에 필요한 시설을 찾기 위해서는 📌Where page를 이용하면 됩니다. 
            조건에 따른 시설 목록과 예약기능도 이용할 수 있습니다. 
            <br/>
            <br/>
            자세한 내용은 아래의 깃허브와 노션에서 확인해주세요.
            <br/>
            <div className='about__link'>
              <a href='https://github.com/yeeahG/Project_ToMyAnimal'>Github</a>
              <a href='https://valiant-file-0a8.notion.site/To-my-animal-eb32e8757ca4473db706250ca48a0393'>Notion</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className='member__container'>
          <section className='about__title'>
            <h1>인라인</h1>
            <h1>동호회</h1>
          </section>
        <div className='member'>
          <h2>Team Member</h2>
          <h3>김예지</h3>
          <p>Frontend</p>
          <h3>김은혁</h3>
          <p>Data</p>
          <h3>이준석</h3>
          <p>Backend</p>
        </div>
      </div>
    </div>
  )
}

export default About