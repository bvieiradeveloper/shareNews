import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi' 
import { useSession, signIn, signOut } from "next-auth/react"

import styles from '../SignInButton/style.module.scss'

export function SignInButton(){

  const { data: session } = useSession();

  return session ? (
  <button className={styles.signInButton} type="button" onClick={()=> signOut()}>
    <FaGithub color='#04d361'/>
    {session.user?.name}
    <FiX className={styles.closeIcon}></FiX>
  </button>
) : (
  <button className={styles.signInButton} type="button"  onClick={()=> signIn('github')}>
    <FaGithub color='#eba417'/>
    Sign in With Github
  </button>
)
}