"use client"

import styles from "./page.module.css";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Login() {
    const [data,setData] = useState({username:"",password:""})
    const [confirm,setConfirm] = useState("")
    const [canSend,setCanSend] = useState(false)
    const { username,password } = data
    const router = useRouter()
   
    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const sendData = async(e)=>{
        e.preventDefault()
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API}/api/register`,data)
            Swal.fire({
                title: "สมัครบัญชีสำเร็จ",
                icon: "success",
                draggable: true
              });
              router.push("/login")
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(!username || !password || !confirm){
            setCanSend(false)
        }
        else if(password !== confirm){
            setCanSend(false)
        }
        else{
            setCanSend(true)
        }
    },[username,password,confirm])

  return (
    <div className={styles.formcontainer}>
        <h1 className="textmain">สมัครบัญชี</h1>
        <form onSubmit={sendData}>
            <p>username</p>
            <input type="text" onInput={inputValue("username")}></input>
            <p>password</p>
            <input type="password" onInput={inputValue("password")}></input>
            <p>confirm password</p>
            <input type="password" onInput={(e)=>setConfirm(e.target.value)}></input>
            <button type="submit" disabled={!canSend}>สมัครบัญชี</button>
            <div className={styles.des}>
                <p>มีบัญชีอยู่แล้ว <Link href="/login">เข้าสู่ระบบ</Link></p>
            </div>
        </form>
    </div>
  )
}
