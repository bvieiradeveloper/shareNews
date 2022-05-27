import { GetStaticProps } from "next";
import  Head  from "next/head";
import styles from './styles.module.scss';
import { getPrismicClient } from "../../services/prismic"
import Prismic from "@prismicio/client"


export default function Posts(){

  return(
    <>
      <Head>
        <title>Posts | ShareNews</title>        
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março de 2022</time>
            <strong>Loren Text</strong>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti ab porro eos aliquam quasi. Iure labore quo fuga quibusdam voluptatem a, magnam eius officia natus dicta earum amet, quos ab.</p>
          </a>
          <a>
            <time>12 de março de 2022</time>
            <strong>Loren Text</strong>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti ab porro eos aliquam quasi. Iure labore quo fuga quibusdam voluptatem a, magnam eius officia natus dicta earum amet, quos ab.</p>
          </a>
          <a>
            <time>12 de março de 2022</time>
            <strong>Loren Text</strong>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti ab porro eos aliquam quasi. Iure labore quo fuga quibusdam voluptatem a, magnam eius officia natus dicta earum amet, quos ab.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();
  const response = await prismic.query([  
    Prismic.predicates.at('document.type', 'post') //Aqui publication
  ], {
    fetch: ['title', 'content'],
    pageSize: 100
  });

  console.log(JSON.stringify(response, null, 2));
  return{
    props:{}
  }
}