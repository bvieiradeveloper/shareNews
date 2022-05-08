import Head from "next/head"
import styles from './home.module.scss'
export default function Home() {
  return (
    <>
      <Head>
          <title>Home | share.news</title>
      </Head>
      <main className={styles.containerContent}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the 
              <span> React </span>
            World
          </h1>
          <p>
            Get acess to all the publication <br/>
            <span>for $9.90 month</span>
          </p>
          <button type="button">Subscribe now</button>
        </section>
        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>  
  )
}
