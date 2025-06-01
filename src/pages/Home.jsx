import React from 'react'
import Header from '../Components/Header.jsx'
import Steps from '../Components/Steps.jsx'
import Description from '../Components/Description.jsx'
import Testimonials from '../Components/Testimonials.jsx'
import GenerateBtn from '../Components/GenerateBtn.jsx'

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  )
}

export default Home