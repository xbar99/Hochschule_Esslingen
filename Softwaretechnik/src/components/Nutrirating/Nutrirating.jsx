"use client"
import React from "react"

function NutriRating() {
  const showMessage = (color) => {
    const message = document.getElementById("message")
    switch (color) {
      case "red":
        message.innerHTML =
          "Your meal lacks in Nutrition and has a huge Carbon Dioxide Footprint. We hope you enjoy your guilty pleasure.<br/>-5 Points"
        break
      case "orange":
        message.innerHTML =
          "Your meal needs improvement. High fat and carbon dioxide levels detected.<br/>-3 Points"
        break
      case "yellow":
        message.innerHTML =
          "Your meal is average. Some improvements can be made.<br/>0 Points"
        break
      case "lightgreen":
        message.innerHTML =
          "Your meal is quite good and has a small Carbon Dioxide Footprint. Keep it up!<br/>+2 Points"
        break
      case "green":
        message.innerHTML =
          "Your meal is very nutritious and has a minimal Carbon Dioxide Footprint. Great job!<br/>+5 Points"
        break
      default:
        break
    }
    message.style.display = "block"
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "80%",
          maxWidth: "800px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: "1.2em" }}>We are so happy to see you again!</p>
          <button
            style={{
              background: "yellow",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Go Premium <span style={{ fontSize: "1.2em" }}>👑</span>
          </button>
        </header>
        <main style={{ textAlign: "center" }}>
          <h1>Nutri Rating</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              className="rating red"
              onClick={() => showMessage("red")}
              style={{
                width: "50px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "2em",
                background: "red",
              }}
            >
              <span className="icon">😡</span>
            </div>
            <div
              className="rating orange"
              onClick={() => showMessage("orange")}
              style={{
                width: "50px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "2em",
                background: "orange",
              }}
            >
              <span className="icon">😟</span>
            </div>
            <div
              className="rating yellow"
              onClick={() => showMessage("yellow")}
              style={{
                width: "50px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "2em",
                background: "yellow",
              }}
            >
              <span className="icon">😐</span>
            </div>
            <div
              className="rating lightgreen"
              onClick={() => showMessage("lightgreen")}
              style={{
                width: "50px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "2em",
                background: "lightgreen",
              }}
            >
              <span className="icon">🙂</span>
            </div>
            <div
              className="rating green"
              onClick={() => showMessage("green")}
              style={{
                width: "50px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "2em",
                background: "green",
              }}
            >
              <span className="icon">😄</span>
            </div>
          </div>
          <div
            id="message"
            className="message"
            style={{
              marginTop: "20px",
              fontSize: "1.2em",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              display: "none",
            }}
          ></div>
        </main>
        <footer style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            High-fat and carbon dioxide levels, as well as containing meat, will
            influence your score negatively. High vitamin and protein levels, as
            well as vegetarian or vegan meals, will influence your score
            positively.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="#">👤</a>
            <a href="#">💬</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
            <a href="#">🎥</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NutriRating
