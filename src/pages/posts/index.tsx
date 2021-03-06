import { GetStaticProps } from "next";
import  Head  from "next/head";
import styles from './styles.module.scss';
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

interface Post{
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string
}

interface PostProps{
  posts: Post[]
}
export default function Posts({posts}:PostProps){

  return(
    <>
      <Head>
        <title>Posts | ShareNews</title>        
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <a key={post.slug}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </a>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();
  const response = await prismic.query<any>([  
    Prismic.predicates.at('document.type', 'post') //Aqui publication
  ], {
    fetch: ['title', 'content'],
    pageSize: 100
  });

  const posts = response.results.map(post => {
    return{
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: "long",
        year: "numeric"
      }),
    }
  })
  console.log(JSON.stringify(response, null, 2));
  return{
    props:{
      posts
    }
  }
}