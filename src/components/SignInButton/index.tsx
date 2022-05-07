import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi' 

import styles from '../SignInButton/style.module.scss'

export function SignInButton(){

  const isUserLoggedIn = true
  return isUserLoggedIn ? (
  <button className={styles.signInButton} type="button">
    <FaGithub color='#04d361'/>
    Sign in With Github
    <FiX  className={styles.closeIcon}/>
  </button>
) : (
  <button className={styles.signInButton} type="button">
    <FaGithub color='#eba417'/>
    Sign in With Github
    <FiX className={styles.closeIcon}/>
  </button>
)
}