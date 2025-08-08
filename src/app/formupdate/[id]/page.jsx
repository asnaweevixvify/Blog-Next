"use client"

import styles from "./page.module.css";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Formupdate() {
    const [data,setData] = useState({title:"",content:"",author:""})
    const { title,content,author } = data
    const router = useRouter()
    const [canSend,setCanSend] = useState(false)
    const { id } = useParams()

    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const getSingle = async()=>{
        try {
            const blog = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/singleData/${id}`)
            setData({
                title:blog.data.title,
                content:blog.data.content,
                author:blog.data.author
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    const sendData = async(e)=>{
        e.preventDefault()
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API}/api/updateData/${id}`,data)
            Swal.fire({
                title: "แก้ไขบทความสำเร็จ",
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
        getSingle()
    },[])

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
        <h1 className="textmain">แก้ไขบทความ</h1>
        <form onSubmit={sendData}>
            <p>ชื่อบทความ</p>
            <input type="text" onInput={inputValue("title")} value={title}></input>
            <p>เนื้อหาบทความ</p>
            <textarea onInput={inputValue("content")} value={content}></textarea>
            <p>ชื่อผู้เขียน</p>
            <input type="text" onInput={inputValue("author")} value={author}></input>
            <button type="submit" disabled={!canSend}>อัพเดทบทความ</button>
        </form>
    </div>
  )
}
