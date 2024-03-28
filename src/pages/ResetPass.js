import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPass = () => {
  return (
    <div className='py-5' style={{background:"#ffd333" , minHeight:"100vh"}}>
     <br />
     <br />
     <br />
     <br />
      <div className='p-4 my-5 w-25 bg-white rounded-3 mx-auto'>
        <h3>Reset Password</h3>
        <p>
          Please Enter Your New Password
        </p>
       <form action=''>
       <CustomInput type="password" label="New Password" i_id="password" i_class=""/>
       <CustomInput type="password" label="Confirm Password" i_id="conf-password" i_class=""/>
       <button className='border-0 px-3 py-2 text-white fw-bold w-100'
        style={{background:"#ffd333"}}
        type='submit'
        >
          Confirm
        </button>
       </form>

      </div>
    </div>
  )
}

export default ResetPass