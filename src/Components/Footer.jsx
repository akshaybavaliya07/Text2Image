import React, { memo } from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src="/images/logo.svg" alt="" width={150}/>
        <p className='flex-1 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @akshay | All right reserved.</p>
        <div className='flex gap-3'>
            <img src="images/facebook_icon.svg" alt="" width={35}/>
            <img src="images/twitter_icon.svg" alt="" width={35}/>
            <img src="images/instagram_icon.svg" alt="" width={35}/>
        </div>
    </div>
  )
}

export default memo(Footer)