"use client"
import 'bootstrap/dist/css/bootstrap.css'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={`${styles.main} justify-content-center gap-2`}>
      <h2>Please choose your role!</h2>
      <button className='btn btn-primary' onClick={() => { window.location.href = "/manager" }}>I am a Manager</button>
      <button className='btn btn-primary' onClick={() => { window.location.href = "/customer" }}>I am a Customer</button>
    </main>
  )
}
