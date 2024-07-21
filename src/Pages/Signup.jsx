import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";



 
const Signup = () => {

  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const navigate = useNavigate()

  const handlechage = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
        return setErrorMessage("please fill out the fields");
    }
    try {
        setLoading(true)
        setErrorMessage(null)
      const response = await fetch("http://localhost:5000/api/auth/register-user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
      const data = await response.json()

      if(data.success === false){
        return setErrorMessage(data.message)
      }
      if(response.ok){
        navigate('/signin')
      }
      
    } catch (error) {
     setErrorMessage(error.message)
     setLoading(false)
      
    }

  }
  
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center ">
        <div className=" flex-1">
          <div className="font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Marapuk
            </span>
            Kalam!
          </div>

          <p className="text-sm mt-6  ">
            You can sign Up your Email and password or you can use the Google
            
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                onChange={handlechage}
                type="text"
                placeholder="Enter Your User Name"
                id="username"
              />
            </div>

            <div>
              <Label value="Email" />
              <TextInput
                onChange={handlechage}
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput type="password"   onChange={handlechage} placeholder="Password" id="password" />
            </div>

            <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>

              {loading? 
              (
              <>
              <Spinner color="purple" aria-label="Purple spinner example" />
              <span className="pl-3" >Loading...</span>
              </>
              )
            
            : (' Sign Up')}

            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-6" >
          <span>Already Have An Account ?</span>
          <Link to='/signin' className="text-blue-500" >Sign In</Link>
          </div>
          {errorMessage && (
             <Alert color="failure" icon={HiInformationCircle} className="mt-5">
              <span className="font-medium ">OOPS! 🤯</span><>{errorMessage}</>
             </Alert>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Signup;
