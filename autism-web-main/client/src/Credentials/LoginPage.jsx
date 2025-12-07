// import { useCallback, useState } from "react";
// import { Link } from "react-router-dom";


// function Loginpage(){

//     let initialErrors = {name:{required:false},email:{required:false},password:{required:false},customError:null};
//     let initialInputs = {name:"",email:"",password:""}

//     const [inputs,setInputs] = useState(initialInputs);
//     const [errors,setErrors]=useState(initialErrors);


//     const [haveError,setHaveerror]=useState(true);

//     const handlePage = useCallback((val)=>{
//         localStorage.setItem("page",val);
//     },[])

//     function handleChange(e){
//         const {name,value}=e.target;
//         setInputs({...inputs,[name]:value})
//     }

//     function handleSubmit(e){
//         e.preventDefault();
//         let errors = initialErrors;
//         let hasError=false;

//         if(inputs.name === ""){
//             errors.name.required = true;
//             hasError=true;
//         }
//         if(inputs.email === ""){
//             errors.email.required = true;
//             hasError=true;
//         }
//         if(inputs.password === ""){
//             errors.password.required = true;
//             hasError=true;
//         }



//         if(!hasError){
//             console.log("fetch datas")
//         }

//         setErrors({...errors})
//         setHaveerror(hasError)

//     }

//     return(
//         <>
//         {page === "login" ?
//          <main>
//          <h2>Login Page</h2>
//          <br/>
//          <form onSubmit={handleSubmit}>
//              <label htmlFor="name">Name</label>
//              <input type="text" name="name" id="name" placeholder="Enter Your Name" onChange={handleChange} />
//              {errors.name.required ? <div>Enter Your Name</div> : null}
//              <br/>
//              <label htmlFor="email">Email</label>
//              <input type="email" name="email" id="email" placeholder="Enter Your Email" onChange={handleChange} />
//              {errors.email.required ? <div>Enter Your Email</div> : null}
//              <br/>
//              <label htmlFor="password">Password</label>
//              <input type="password" name="password" id="password" placeholder="Enter Your Password" onChange={handleChange} />
//              {errors.password.required ? <div>Enter Your Passowrd</div> : null}
//              <br/>
//              <button disabled={!haveError} >Submit</button>
//          </form>
 
//          <div>Don't You Have An Account ? <Link to={"/register"} onClick={()=>handlePage("register")} >Register</Link></div>
//          </main> : null}
//         </>
//     )
// }

// export default Loginpage;