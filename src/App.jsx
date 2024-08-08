import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import BusinessInfo from './components/BusinessInfo'
import ServicesList from './components/Service/ServiceList'

function App() {

  return (
    <div className=''>
      <Header />
      <BusinessInfo />
      <ServicesList />
    </div>
  )
}

export default App
