"use client"

import styles from "./page.module.css";
import axios from "axios";
import { useState,useEffect } from "react";
import { FaRegTrashAlt,FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import confirmAlert from "./confirmAlert";
import Link from "next/link";

export default function Home() {
  const [data,setData] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [isDelete,setIsDelete] = useState("none")

  const getData = async()=>{
    try {
      const allData = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/getData`)
      setData(allData.data)
    } 
    catch(err) {
      console.log(err);
    } 
  } 

  const confirmDelete = (id)=>{
    Swal.fire(confirmAlert)
    .then((result) => {
      if (result.isConfirmed) {
        deleteItem(id)
      }
    });
  }

  const deleteItem = async (id) =>{
    setIsDelete(false)
    await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/deleteData/${id}`)
    setIsDelete(true)
    Swal.fire({
      title: "ลบข้อมูลสำเร็จ",
      icon: "success",
      draggable: true
    });
    getData()
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    if(data.length === 0){
      setIsLoading(true)
    }
    else{
      setIsLoading(false)
    }
  },[data])

  useEffect(()=>{
    if(isDelete === false){
      Swal.fire({
        title: "กำลังลบบทความ",
        showConfirmButton: false
    });
    }
  },[isDelete])

  if(!isLoading){
    return (
      <div className="home-container">
        <h1 className="textmain">Note App Next.js</h1>
        <div className={styles.blogcontainer}>
          {data.map((e,index)=>{
            return(
              <div className={styles.blogbox} key={index}>
                <h2>{e.title}</h2>
                <h5>{e.content}</h5>
                <div className={styles.des}>
                  <h6>ผู้เขียน {e.author}</h6>
                  <div className={styles.icons}>
                    <FaRegTrashAlt 
                      style={{cursor:"pointer"}} 
                      onClick={()=>confirmDelete(e.id)}
                    />
                    <Link href={`/formupdate/${e.id}`}><FaPencilAlt/></Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  else{
    return(<h1 className="load">กำลังโหลดข้อมูล...</h1>)
  }
}
