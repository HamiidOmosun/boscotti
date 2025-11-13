import {assets} from '../assets/assets'
import React from 'react'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row '>
      {/* hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>

        <div className='text-[#414141] '>
            <div className='flex items-center gap-2 mb-10 text-[#55142A] '>
                <h1 className='font-medium text-5xl mt-10 sm:mt-0 mx-auto sm:text-5xl md:text-6xl  text-center sm:text-left md:text-left max-w-[15ch]'>Where Elegance Becomes a Scent.</h1>
            </div>

            <h1 className='text-lg max-w-[50ch] text-[#55142A] leading-relaxed text-center sm:text-left mb-10'>Discover artisan fragrances crafted with rare ingredients and timeless sensibility</h1>

            <div className='flex items-center gap-2'>
              <Link to='/cart' className='font-semibold text-sm md:text-base cursor-pointer'>SHOP NOW</Link>
              <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
            </div>
        </div>

      </div>
          {/* hero right side */}
          <img className='w-full sm:w-1/2 object-contain p-6 sm:p-24' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero