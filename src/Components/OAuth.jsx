import { Button } from 'flowbite-react';
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { sigInFailure, signInSuccess } from '../Redux/Slice/UserSlice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';




const OAuth = () => {

    const auth = getAuth(app)
    const dispatche = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async()=>{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt:"select_account"})
      try {
        const result = await signInWithPopup(auth,provider)
        const res = await fetch("https://marapu-kalam-blog-app-backend.onrender.com/api/auth/google",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                profilePic:result.user.photoURL
            })
           
        })

        const data = await res.json();
        if(res.ok){
          console.log(data);
            localStorage.setItem("Token",data.token)
            dispatche(signInSuccess(data))
            navigate('/')
        }
        
      } catch (error) {
        dispatche(sigInFailure(error.message))
      }
    }



  return (
    <div>
        <Button type='button' className='w-full' gradientDuoTone="purpleToPink" onClick={handleSubmit}  >
            <AiFillGoogleCircle className='w-7 h-6 mr-2'/>
            Continue With Google
        </Button>
    </div>
  )
}

export default OAuth;