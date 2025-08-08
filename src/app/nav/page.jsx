"use client"

import Link from "next/link"
import styles from "./page.module.css";

export default function Nav() {
  return (
    <div className={styles.navcontainer}>
        <ul>
            <Link href="/"><li>หน้าหลัก</li></Link>
            <Link href="/form"><li>เพิ่มบทความ</li></Link>
            <Link href="/login"><li>เข้าสู่ระบบ</li></Link>
        </ul>
    </div>
  )
}
