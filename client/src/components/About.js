import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
const About = () => {
    const navigation=useNavigate();
    const [userData,setUserData]=useState({});
    const callAbout=async ()=>{
        try{
            const res=await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data=await res.json();
            console.log('data-------',data);
            setUserData(data);
            if(res.status===401){
                navigation("/login");
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        callAbout();
    },[]);
    return (
        <>
        <form method="GET">
        <div className="home-page">
         <div className="home-div mt-5">
             <h3 className="pt-5" style={{marginLeft:'20%'}}>
              Hi {userData.name} Tech KT is a platform for learning mern stack related courses.
             </h3>
         </div>
        </div>
        </form>
    </>
    )
}

export default About;
