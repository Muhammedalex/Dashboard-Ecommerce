import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const ForgotPass = () => {
  return (
    <div className='py-5' style={{background:"#ffd333" , minHeight:"100vh"}}>
     <br />
     <br />
     <br />
     <br />
      <div className='p-4 my-5 w-25 bg-white rounded-3 mx-auto'>
        <h3>Forgot Password ?</h3>
        <p>
          Please Enter Your Email
        </p>
       <form action=''>
       <CustomInput type="text" label="Email Address" i_id="email" i_class=""/>
        <button className='border-0 px-3 py-2 text-white fw-bold w-100'
        style={{background:"#ffd333"}}
        type='submit'
        >
          Send
        </button>
        <Link to="/" className='text-center text-decoration-none my-2 border-0 px-3 py-2 text-white fw-bold w-100'
        style={{background:"#ffd333"}}
        type='submit'
        >
          Cancel
        </Link>
       </form>

      </div>
    </div>
  )
}

export default ForgotPass