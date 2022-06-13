import React from 'react'
import User from '../Users/User'
import AnimalHome from './AnimalHome'

const Animal = () => {
  return (
    <div>
      <main>
        {localStorage.getItem('logintoken') ?
        <AnimalHome />
        :
        <User />
        }
      </main>
    </div>
  )
}

export default Animal