"use client"

import Link from "next/link"
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
          
export default function Nav() {
  const { data:session } = useSession()
  const [status,setStatus] = useState(false)

  useEffect(()=>{
    if(session?.username){
      setStatus(true)
    }
  },[session?.username])

  return (
    <div className={styles.navcontainer}>
        <ul>
            <Link href="/"><li>หน้าหลัก</li></Link>
            <Link href="/form"><li>เพิ่มบทความ</li></Link>
            {!status && <Link href="/login"><li>เข้าสู่ระบบ</li></Link>}
            {status && <Link href="/login"><li onClick={()=>signOut()}>ออกจากระบบ</li></Link>}
        </ul>
    </div>
  )
}
