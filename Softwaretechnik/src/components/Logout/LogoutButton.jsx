import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "white",
        color: "black",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={() => signOut()}
    >
      Logout
    </button>
  )
}

export default LogoutButton
