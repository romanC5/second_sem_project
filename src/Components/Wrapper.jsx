import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Wrapper = (props) => {
  return (
    <>
      <Header/>
     <div style={{ paddingTop: '100px' }}>{props.children}</div>
      <Footer/>
    </>
  )
}

export default Wrapper
