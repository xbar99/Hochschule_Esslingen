"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from "./Login.module.css"
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa"

export default function Login() {
  const [loginUserInfo, setloginUserInfo] = useState({
    email: "",
    password: "",
  })
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [res, setRes] = useState()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email: loginUserInfo.email,
      password: loginUserInfo.password,
      redirect: false,
    })
    setRes(res)

    if (res?.ok) {
      router.push("/dashboard")
      router.refresh()
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
    })
    setRes(res)

    if (res?.ok) {
      location.reload()
    }
  }

  return (
    <div className={styles.loginRoot}>
      <div className={styles.container} id="container">
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form className={styles.formElemente} onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaGooglePlusG />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaFacebookF />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaGithub />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaLinkedinIn />
              </a>
            </div>
            <span className={styles.spanTexte}>
              or use email for registration
            </span>
            <label htmlFor="firstName"></label>
            <input
              className={styles.inputElemente}
              type="text"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, firstName: target.value })
              }
            />
            <label htmlFor="lastName"></label>
            <input
              className={styles.inputElemente}
              type="text"
              placeholder="Last Name"
              value={userInfo.lastName}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, lastName: target.value })
              }
            />
            <label htmlFor="email"></label>
            <input
              className={styles.inputElemente}
              type="email"
              placeholder="E-mail"
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
            <label htmlFor="password"></label>
            <input
              className={styles.inputElemente}
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />
            <button
              className={styles.buttonElemente}
              onClick={() => {
                const container = document.getElementById("container")
                container.classList = `${styles.container}`
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form className={styles.formElemente} onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaGooglePlusG />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaFacebookF />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaGithub />
              </a>
              <a href="#" className={`${styles.icon} ${styles.aElement}`}>
                <FaLinkedinIn />
              </a>
            </div>
            <span className={styles.spanTexte}>or use email for login</span>
            <input
              className={styles.inputElemente}
              type="email"
              placeholder="E-mail"
              value={loginUserInfo.email}
              onChange={({ target }) =>
                setloginUserInfo({ ...loginUserInfo, email: target.value })
              }
            />
            <input
              className={styles.inputElemente}
              type="password"
              placeholder="Password"
              value={loginUserInfo.password}
              onChange={({ target }) =>
                setloginUserInfo({ ...loginUserInfo, password: target.value })
              }
            />
            <a href="#" className={styles.aElement}>
              Forget Your Password?
            </a>
            <button className={styles.buttonElemente} id="login">
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p className={styles.pTexte}>
                Enter your personal details to use all of site features
              </p>
              <button
                className={`${styles.hidden} ${styles.login} ${styles.buttonElemente}`}
                onClick={() => {
                  const container = document.getElementById("container")
                  container.classList = `${styles.container}`
                }}
              >
                Sign in
              </button>
            </div>

            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p className={styles.pTexte}>
                Register with your personal details to use all of site features
              </p>
              <button
                className={`${styles.hidden} ${styles.register} ${styles.buttonElemente}`}
                onClick={() => {
                  const container = document.getElementById("container")
                  container.classList = `${styles.container} ${styles.active}`
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
