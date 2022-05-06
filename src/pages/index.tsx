import style from "../styles/Home.module.scss"
import Head from "next/head"
export default function Home() {
  return (
    <>
      <Head>
          <title>Inicio | share.news</title>
      </Head>
      <h1 className={style.title}>Hello 
          <span> World</span>
      </h1>
    </>  
  )
}
