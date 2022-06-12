import React from 'react'

const Write = () => {
    const submitHandler = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const date = e.target.date.value;
        const content = e.target.content.value;
      }
  
  return (
    <div>
        <form>
            <div className='title__container'>
                <span>Title </span>
                <input type="text" name="title"></input>
                <span>Day </span>
                <input type="date" name='date'></input>
            </div>
              <p>
                <textarea 
                  name="content" placeholder='What about your animal?'/>
              </p>
              <p><input type="file" accept="image/*"/></p>
        </form>

        <input type="submit" value="upload" className='upload__btn' />
        {/* <button className='upload__btn' >upload</button> */}
    </div>
  )
}

export default Write