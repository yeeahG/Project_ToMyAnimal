import React, { useState } from 'react'
import AnimalAccount from './AnimalAccount'
import UserAccount from './UserAccount'


const Practice = () => {
    const [activeIndex, setActiveIndex]=useState(0);

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}> 탭1 </li>
            ),
            tabCont:(
                <div> <UserAccount /> </div>
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> 탭2 </li>
            ),
            tabCont:(
                <div> <AnimalAccount/> </div>
            )
        }
    ];
    
  return (
    <div>
    <ul className="tabs is-boxed">
      {tabContArr.map((section, index)=>{
          return section.tabTitle
      })}
    </ul>
    <div>
        {tabContArr[activeIndex].tabCont}
    </div>
  </div>

  )
}

export default Practice