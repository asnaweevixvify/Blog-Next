"use client"

import styles from "./page.module.css";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Form() {
    const [data,setData] = useState({title:"",content:"",author:""})
    const { title,content,author } = data
    const router = useRouter()
    const [isCreate,setIsCreate] = useState("none")
    const [canSend,setCanSend] = useState(false)

    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const sendData = async(e)=>{
        e.preventDefault()
        try {
            setIsCreate(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API}/api/createData`,data)
            setIsCreate(false)
            Swal.fire({
                title: "เผยแพร่บทความสำเร็จ",
                icon: "success",
                draggable: true
              });
              router.push("/")
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(isCreate===true){
            Swal.fire({
                title: "กำลังเผยแพร่บทความ",
                showConfirmButton: false
            });
        }
    },[isCreate])

    useEffect(()=>{
        if(!title || !content || !author){
            setCanSend(false)
        }
        else{
            setCanSend(true)
        }
    },[title,content,author])
    
  return (
    <div className={styles.formcontainer}>
        <h1 className="textmain">เพิ่มบทความ</h1>
        <form onSubmit={sendData}>
            <p>ชื่อบทความ</p>
            <input type="text" onInput={inputValue("title")}></input>
            <p>เนื้อหาบทความ</p>
            <textarea onInput={inputValue("content")}></textarea>
            <p>ชื่อผู้เขียน</p>
            <input type="text" onInput={inputValue("author")}></input>
            <button type="submit" disabled={!canSend}>เผยแพร่บทความ</button>
        </form>
    </div>
  )
}
