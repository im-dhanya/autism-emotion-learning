import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Prediction from "../Prediction";

function RegisterPage(){

        // const check = prompt("Are you Visting as a Parent")
        // console.log(check)

    const navigate = useNavigate();

  //register
    let initialRegisterErrors = {name:{required:false},email:{required:false},password:{required:false},customError:null};
    let initialRegisterInputs = {name:"",email:"",password:""}

    const [registerInputs,setRegisterInputs] = useState(initialRegisterInputs);
    const [registerErrors,setRegisterErrors]=useState(initialRegisterErrors);

    const [page,setPage] = useState("register")

    const [registerHaveError,setRegisterHaveerror]=useState(true);


    function handleRegisterChange(e){
        const {name,value}=e.target;
        setRegisterInputs({...registerInputs,[name]:value})
    }

    function handleRegisterSubmit(e){
        e.preventDefault();
        let errors = initialRegisterErrors;
        let hasError=false;

        if(registerInputs.name === ""){
            errors.name.required = true;
            hasError=true;
        }
        if(registerInputs.email === ""){
            errors.email.required = true;
            hasError=true;
        }
        if(registerInputs.password === ""){
            errors.password.required = true;
            hasError=true;
        }


        
        if(registerInputs.name === "children"){
            async function registeruser(){
                try {
                    const url = await axios.post("http://localhost:5000/api/user/children/register",{
                        name : registerInputs.name,
                        email : registerInputs.email,
                        password : registerInputs.password
                    })
                    const response = url.data;
                    console.log(response)
                    alert("Registratrion Successfull")
                    alert("click the login to logged in")
                } catch (error) {
                    console.log(error)
                }
            }

            if(!hasError){
                registeruser();
                setRegisterInputs({name:"",email:"",password:""});
              }
        }

        if(registerInputs.name === "parent"){
            async function registerparent(){
                try {
                    const url = await axios.post("http://localhost:5000/api/user/parent/register",{
                        name : registerInputs.name,
                        email : registerInputs.email,
                        password : registerInputs.password
                    })
                    const response = url.data;
                    console.log(response)
                    alert("Registratrion Successfull")
                    alert("click the login to logged in")
                } catch (error) {
                    console.log(error)
                }
            }
            if(!hasError){
                registerparent();
                setRegisterInputs({name:"",email:"",password:""});
              }
        }

        setRegisterErrors({...errors})
        setRegisterHaveerror(hasError);

    }

    const [isClicked,setIsClicked] = useState(false);

    const handlePredict = useCallback((e)=>{
        e.preventDefault();
        setIsClicked(true);
        
        setTimeout(()=>{
            setIsClicked(false)
            return
        },30000)
    },[])



    //login  

    let initialErrors = {name:{required:false},email:{required:false},password:{required:false},customError:null};
    let initialInputs = {name:"",email:"",password:""}

    const [inputs,setInputs] = useState(initialInputs);
    const [errors,setErrors]=useState(initialErrors);

    const [haveError,setHaveerror]=useState(true);

    function handleChange(e){
        const {name,value}=e.target;
        setInputs({...inputs,[name]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        let errors = initialErrors;
        let hasError=false;

        if(inputs.name === ""){
            errors.name.required = true;
            hasError=true;
        }
        if(inputs.email === ""){
            errors.email.required = true;
            hasError=true;
        }
        if(inputs.password === ""){
            errors.password.required = true;
            hasError=true;
        }


        if(inputs.name === "children"){
            async function loginuser(){
                try {
                    const url = await axios.post("http://localhost:5000/api/user/children/login",{
                        name : inputs.name,
                        email : inputs.email,
                        password : inputs.password
                    })
                    const response = url.data;
                    alert("Login Successfull")
                    localStorage.setItem("userData",JSON.stringify(response))
                    localStorage.setItem("token",response.accesstoken);
                    navigate("/dashboard")
                } catch (error) {
                    console.log(error)
                }
            }

            if(!hasError){
                loginuser();
                setInputs({name:"",email:"",password:""})
              }
        }

        if(inputs.name === "parent"){
            async function loginparent(){
                try {
                    const url = await axios.post("http://localhost:5000/api/user/parent/login",{
                        name : inputs.name,
                        email : inputs.email,
                        password : inputs.password
                    })
                    const response = url.data;
                    alert("Login Successfull")
                    localStorage.setItem("userData",JSON.stringify(response))
                    localStorage.setItem("token",response.accesstoken);
                    navigate("/dashboard")
                } catch (error) {
                    console.log(error)
                }
            }

            if(!hasError){
                loginparent();
                setInputs({name:"",email:"",password:""})
              }
        }


        setErrors({...errors})
        setHaveerror(hasError)

    }

    return(
        <>
        {isClicked && <Prediction/>}
        {
          page === "register" ? 
          <main className="container-register">
        <section className="section-1">
          <h2>Welcome To <span>"Autism Personalized Learning"</span></h2>
        </section>
        <br/>
        <section className="section-2">
        <h2>Register Page</h2>
        <br/>
        <form className="form">
            <label className="label" htmlFor="name">Name</label>
            <input className="input" type="text" name="name" id="name" value={registerInputs.name} placeholder="Enter children or parent" onChange={handleRegisterChange} />
            {registerErrors.name.required ? <div>Enter Your Name</div> : null}
            <br/>
            <br/>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" name="email" id="email" value={registerInputs.email} placeholder="Enter Your Email" onChange={handleRegisterChange} />
            {registerErrors.email.required ? <div>Enter Your Email</div> : null}
            <br/>
            <br/>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" type="password" name="password" id="password" value={registerInputs.password} placeholder="Enter Your Password" onChange={handleRegisterChange} />
            {registerErrors.password.required ? <div>Enter Your Passowrd</div> : null}
            <br/>
            <br/>

            <div className="btns">
            <button onClick={handlePredict}>Take A Test</button>
            <br/>
            <button onClick={handleRegisterSubmit} disabled={!registerHaveError} >Submit</button>
            </div>
        </form>

        <br/>
        <div className="link">Do You Have An Account ? <Link className="link" onClick={()=>setPage("login")} >Login</Link></div>
        </section>
        </main> : 
        <main className="container-register">
         <section className="section-1">
          <h2>Welcome To <span>"Autism Personalized Learning"</span></h2>
        </section>
        <br/>
        <section className="section-2">
        <h2>Login Page</h2>
        <br/>
        <form className="form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="name">Name</label>
            <input className="input" type="text" name="name" id="name" value={inputs.name} placeholder="Enter children or parent" onChange={handleChange} />
            {errors.name.required ? <div>Enter Your Name</div> : null}
            <br/>
            <br/>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" name="email" id="email" value={inputs.email} placeholder="Enter Your Email" onChange={handleChange} />
            {errors.email.required ? <div>Enter Your Email</div> : null}
            <br/>
            <br/>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" type="password" name="password" id="password" value={inputs.password} placeholder="Enter Your Password" onChange={handleChange} />
            {errors.password.required ? <div>Enter Your Passowrd</div> : null}
            <br/>
            <br/>

            <div className="btns">
            <br/>
            <button disabled={!haveError} >Submit</button>
            </div>
        </form>

        <br/>
        <div className="link">Do You Have An Account ? <Link className="link" onClick={()=>setPage("register")} >Register</Link></div>
        </section>
         </main>
        }
        </>
    )
}

export default RegisterPage;