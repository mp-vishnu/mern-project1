import React,{useState,useEffect} from 'react'

const Contact = () => {
  const [userData,setUserData]=useState({name:"",email:"",message:"",phone:""});
 
  const callContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await res.json();
      console.log('data-------', data);
      setUserData({...userData,name:data.name,phone:data.phone,email:data.email});
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
    useEffect(()=>{
        callContact();
    },[]);
    const handleChange=(e)=>{
      const name=e.target.name;
      const value=e.target.value;

      setUserData({...userData,[name]:value})
  }

  const handleContact=async (e)=>{
      e.preventDefault();
      const {name,email,phone,message}=userData;

      const res=await fetch('/contact',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,email,phone,message
        })
      });

      const data=await res.json();
      console.log('send data',data);
      if(!data)
      {
        console.log('No data available');
      }
      else{
        alert("msg send");
        setUserData({...userData,message:""});
      }


  }
    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">

                            <div className="contact_info_item">
                            <div className="row">
                            <div className="col">
  <div className="d-flex flex-column align-items-center">
    <div className="d-flex align-items-center">
      <i className="zmdi zmdi-email material-icons-name mr-4"></i>
      <h4>mail</h4>
    </div>
    <p>abcd@gmail.com</p>
  </div>
</div>
<div className="col">
  <div className="d-flex flex-column align-items-center">
    <div className="d-flex align-items-center">
    <i className="zmdi zmdi-phone material-icons-name mr-4"></i>
      <h4>phone</h4>
    </div>
    <p>989898989898</p>
  </div>
</div>
</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

  <div className="contact_form">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="contact_form_title mt-5 mb-4">
              <h3>Get in touch</h3>
            </div>
            <form id="contact_form" method="POST">
                <div className="contact_form d-flex justify-content-between align-items-between">
                <input type='email' name='email' id='email' autoComplete='off' value={userData.email}
                                             onChange={handleChange} placeholder="Email" style={{border:'none',outline: 'none'}}
                                          />
                 <input type='phone' name='phone' id='phone' autoComplete='off' value={userData.phone}
                                            onChange={handleChange}  placeholder="Phone" style={{border:'none',outline: 'none'}}
                                          />
                </div>

                <div className="contact_form_text">
                    <textarea className="text_field contact_form_message mt-3" 
                    value={userData.message}
                   // onCHange={handleChange}
                   onChange={handleChange}
                    name='message'
                    placeholder="message" cols="70" rows="10" ></textarea>
                </div>
                <div className="contact_form_button">
                  <button type="submit" onClick={handleContact} className="button contact_submit_button mt-2">Send Message</button>
                </div>
            </form>
          </div> 

        </div>

      </div>

  </div>
        </>
    )
}

export default Contact;
