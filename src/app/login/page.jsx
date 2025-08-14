"use client"

import styles from "./page.module.css";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [data,setData] = useState({username:"",password:""})
    const { username,password } = data
    const router = useRouter()
   
    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const sendData = async(e)=>{
        e.preventDefault()
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
          });
      
          if (res.ok && !res.error) {
            Swal.fire({
              title: "เข้าสู่ระบบสำเร็จ",
              icon: "success",
              draggable: true
            });
            router.push("/"); 
          } else {
            console.log(res.error);
          }
    }

  return (
    <div className={styles.formcontainer}>
        <h1 className="textmain">เข้าสู่ระบบ</h1>
        <form onSubmit={sendData}>
            <p>username</p>
            <input type="text" onInput={inputValue("username")}></input>
            <p>password</p>
            <input type="password" onInput={inputValue("password")}></input>
            <button type="submit">เข้าสู่ระบบ</button>
            <div className={styles.des}>
                <p>ยังไม่มีบัญชี <Link href="/register">สมัครบัญชี</Link></p>
            </div>
        </form>
    </div>
  )
}
