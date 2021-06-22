import React,{ useState } from 'react';
import { useFormik } from 'formik';

import axios from 'axios';

function Registration() {

    const [status, setSuccess] = useState(false)
    const formik = useFormik({
        initialValues:{
            uname:'',
            email:'',
            pwd:''
        },
        onSubmit: values =>{
            console.log(values)
            axios.post('http://tutorslog.com/user.php', {
                values
            })
            .then(response =>{
                setSuccess(true)
                formik.resetForm();
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            });

            
        },
        validate: values =>{
            let errors = {}
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const pas=/^[A-Za-z]\w{7,14}$/;
            const ph= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if(!values.uname){
                errors.uname = 'Username Required'
            }
            if(!values.email){
                errors.email = 'Email Required'
            }
            else
            {
                if(!re.test(values.email)){
                    errors.email = 'Please enter valid Email'
                }
            }
            
            if(!values.phone){
                errors.phone = 'enter phone number'
            }
            else
            {
                if (!ph.test(values.phone)){
                    errors.phone="enter valid number"
                }
            }
            if(!values.pwd){
                errors.pwd = 'Password Required'
            }else
            {
                if (!pas.test(values.pwd)){
                    errors.pwd="enter strong password"
                }
            }
            if(!values.cpwd){
                errors.cpwd="required confirm password"
            }
            else{
                if(values.pwd!=values.cpwd){
                    errors.cpwd="cpassword should be match with password "
                }
            }

            return errors;
        }
    })

    return (
        <div className="container">
            <div className="row">
                <h2 className="text-center">Registration</h2>
                <div className="col">
                    { (status) ? <div className='alert alert-success'>Account Created....</div>: null }

                    <form onSubmit = {formik.handleSubmit}>
                        <div className="form-group">
                    <label>Gender</label>
                     Mail  <input type="radio" name="mail"/>Femail   <input type="radio" name="mail"/>
                     </div>
                     {/* <div className="form-group">
                    
                     Mr <input type="checkbox" name="mr" value="mr"/> Mis  <input type="checkbox" name="mis" value="mr"/>
                     </div> */}
                    
                        <div className="form-group">
                            <label>UserName</label>
                            <input  onChange={formik.handleChange} type="text" placeholder="enter your username" name='uname' className="form-control" />
                            { (formik.errors.uname) ? <div className="text-danger">{formik.errors.uname}</div> :null }
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input value={formik.values.email} onChange={formik.handleChange} type="text" name='email' className="form-control" />
                            { (formik.errors.email) ? <div className="text-danger">{formik.errors.email}</div> :null }
                        </div>
                        
                        <div className="form-group">
                             <label>Phone</label>
                             <input type="number" name="phone" className="form-control" onChange={formik.handleChange}/>
                             {(formik.errors.phone)? <div className="text-danger">{formik.errors.phone}</div>:null}
                                
                        </div>
                        <div className="form-group">
                             <label>DateofBirth</label>
                             <input type="date"  className="form-control" onChange={formik.handleChange}/>
 
                        </div>
                           
                            <div className="form-group">
                                <label> select state</label>
                                <select className="custom-select">
                                    <option value="AP">Andrapradesh</option>
                                    <option value="TS">Telangana</option>
                                    <option value="mp">madhyapradesh</option>
                                    
                                </select>
                                <div className="form-group">
                                <label> select country</label>
                                <select className="custom-select">
                                    <option value="india">India</option>
                                    <option value="australia">Australia</option>

                                </select>
                                </div>
                                </div> 

                                <div className="form-group">
                                     <label>password</label>
                                    <input type="password" name="pwd" className="form-control" onChange={formik.handleChange}/>
                                    {(formik.errors.pwd)? <div className="text-danger">{formik.errors.pwd}</div>:null}
                                </div>
                            <div className="form-group">
                                <label>confirm password</label>
             <input type="text" name="cpwd" className="form-control" onChange={formik.handleChange}/>
             {(formik.errors.cpwd)? <div className="text-danger">{formik.errors.cpwd}</div>:null}
             </div>

                        <div className="form-group">
                            <input type="submit" value="Add Employee" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration
