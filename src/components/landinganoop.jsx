import React from 'react'
import Testimonials from './Testimonials'
import WallofLove from './walloflove'
import Footer from './footer';
import { toast } from 'react-toastify';

function LandingAnoop() {
  return (
    <div className="min-h-screen bg-gray-50">
    <main className="container mx-auto px-4 py-8">
      <Testimonials/>
      <WallofLove/>
      <Footer/>
    </main>
    </div>
  )
}

export default LandingAnoop ; 
