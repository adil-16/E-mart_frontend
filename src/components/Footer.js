import React from 'react'

const Footer = () => {
    return (
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          E-Mart.com
        </a>
      </div>
    )
}

export default Footer