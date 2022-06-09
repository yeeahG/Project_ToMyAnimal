import React from 'react'
import AnimalInfo from './AnimalInfo'
import User from '../Users/User'

const Animal = () => {
  return (
    <div>
      <main>
        {localStorage.getItem('logintoken') ?
        <AnimalInfo />
        :
        <User />
        }
      </main>
    </div>
  )
}

export default Animal