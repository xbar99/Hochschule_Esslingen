"use client"
import { useState, useEffect } from "react"
import styles from "./DashboardBox.module.css"

export default function DashboardBox() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [startX, setStartX] = useState(0)
  const [endX, setEndX] = useState(0)
  const [data, setData] = useState([
    {
      breakfast: false,
      createData: "",
      dinner: false,
      email: "",
      foods: [],
      lunch: false,
      mid: "",
      rating: 0,
      titel: "",
      updateDate: "",
    },
  ])
  const [breakfast, setBreakfast] = useState({
    title: "",
    totalCarbs: 0,
    totalFat: 0,
    totalProtein: 0,
    co2: 0,
  })
  const [lunch, setLunch] = useState({
    title: "",
    totalCarbs: 0,
    totalFat: 0,
    totalProtein: 0,
    co2: 0,
  })
  const [dinner, setDinner] = useState({
    title: "",
    totalCarbs: 0,
    totalFat: 0,
    totalProtein: 0,
    co2: 0,
  })
  const [isProcessed, setIsProcessed] = useState(false)

  const showSlide = (index) => {
    setCurrentSlide(index)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDots = () => {
    const dots = document.getElementsByClassName(styles.navDot)
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle(styles.active, i === currentSlide)
    }
  }

  useEffect(() => {
    updateDots()
  }, [currentSlide, updateDots])

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    setEndX(event.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (startX - endX > 50) {
      setCurrentSlide(Math.min(currentSlide + 1, 2))
    } else if (endX - startX > 50) {
      setCurrentSlide(Math.max(currentSlide - 1, 0))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/meals", {
        method: "GET",
      })
      const jsonData = await response.json()
      //setData(jsonData)
      let countAmountMeals = 0
      jsonData.map((index) => {
        console.log(`index mid ${index.titel}`)

        // Initialize variables
        let title = index.titel
        let totalCarbs = 0
        let totalFat = 0
        let totalProtein = 0
        let co2 = 0

        // Aggregate values
        index.foods.forEach((food) => {
          totalCarbs += food.carbohydrates
          totalFat += food.fat
          totalProtein += food.protein
          if (food.containsMeat) {
            co2 += 5
          }
        })

        if (index.breakfast) {
          setBreakfast({
            title: title,
            totalCarbs: totalCarbs,
            totalFat: totalFat,
            totalProtein: totalProtein,
            co2: co2,
          })
        }
        if (index.lunch) {
          setLunch({
            title: title,
            totalCarbs: totalCarbs,
            totalFat: totalFat,
            totalProtein: totalProtein,
            co2: co2,
          })
        } else if (index.dinner) {
          setDinner({
            title: title,
            totalCarbs: totalCarbs,
            totalFat: totalFat,
            totalProtein: totalProtein,
            co2: co2,
          })
        }
        countAmountMeals += 1
      })
      setIsProcessed(true)
      console.log("processed + " + jsonData)
    }
    fetchData()
  }, [])

  const setFixedValues = (
    meal,
    carbsValue,
    fatValue,
    proteinValue,
    co2Value
  ) => {
    const carbsLimit = 65
    const fatLimit = 40
    const proteinLimit = 50

    document.getElementById(`${meal}-carbs-value`).innerText = `${carbsValue}g`
    document
      .getElementById(`${meal}-carbs-circle`)
      .style.setProperty("--percent", `${(carbsValue / carbsLimit) * 100}%`)
    document.getElementById(
      `${meal}-carbs-limit`
    ).innerText = `${carbsValue} / ${carbsLimit}g`

    document.getElementById(`${meal}-fat-value`).innerText = `${fatValue}g`
    document
      .getElementById(`${meal}-fat-circle`)
      .style.setProperty("--percent", `${(fatValue / fatLimit) * 100}%`)
    document.getElementById(
      `${meal}-fat-limit`
    ).innerText = `${fatValue} / ${fatLimit}g`

    document.getElementById(
      `${meal}-protein-value`
    ).innerText = `${proteinValue}g`
    document
      .getElementById(`${meal}-protein-circle`)
      .style.setProperty("--percent", `${(proteinValue / proteinLimit) * 100}%`)
    document.getElementById(
      `${meal}-protein-limit`
    ).innerText = `${proteinValue} / ${proteinLimit}g`

    document.getElementById(`${meal}-co2-value`).innerText = `${co2Value} CO2`
    document
      .getElementById(`${meal}-co2-circle`)
      .style.setProperty("--percent", `${(co2Value / proteinLimit) * 100}%`)
  }

  useEffect(() => {
    console.log(breakfast)
    if (isProcessed == true) {
      setFixedValues(
        "breakfast",
        breakfast.totalCarbs,
        breakfast.totalFat,
        breakfast.totalProtein,
        breakfast.co2
      )
      setFixedValues(
        "lunch",
        lunch.totalCarbs,
        lunch.totalFat,
        lunch.totalProtein,
        lunch.co2
      )
      setFixedValues(
        "dinner",
        dinner.totalCarbs,
        dinner.totalFat,
        dinner.totalProtein,
        dinner.co2
      )
    }
  }, [
    breakfast.co2,
    breakfast.totalCarbs,
    breakfast.totalFat,
    breakfast.totalProtein,
    dinner.co2,
    dinner.totalCarbs,
    dinner.totalFat,
    dinner.totalProtein,
    isProcessed,
    lunch.co2,
    lunch.totalCarbs,
    lunch.totalFat,
    lunch.totalProtein,
  ])

  return (
    <div
      className={styles.container}
      id="container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.slides}
        id="slides"
        style={{ transform: `translateX(${(-currentSlide * 100) / 3}%)` }}
      >
        <div className={styles.slide} id="breakfast">
          <h2>Breakfast</h2>
          <p>{breakfast.title}</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.carbs}`}
                id="breakfast-carbs-circle"
              >
                <div
                  className={styles.statValue}
                  id="breakfast-carbs-value"
                ></div>
              </div>
              <div className={styles.statLabel}>Carbohydrates</div>
              <div
                className={styles.statLimit}
                id="breakfast-carbs-limit"
              ></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.fat}`}
                id="breakfast-fat-circle"
              >
                <div
                  className={styles.statValue}
                  id="breakfast-fat-value"
                ></div>
              </div>
              <div className={styles.statLabel}>Fat</div>
              <div className={styles.statLimit} id="breakfast-fat-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.protein}`}
                id="breakfast-protein-circle"
              >
                <div
                  className={styles.statValue}
                  id="breakfast-protein-value"
                ></div>
              </div>
              <div className={styles.statLabel}>Protein</div>
              <div
                className={styles.statLimit}
                id="breakfast-protein-limit"
              ></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.co2}`}
                id="breakfast-co2-circle"
              >
                <div
                  className={styles.statValue}
                  id="breakfast-co2-value"
                ></div>
              </div>
              <div className={styles.statLabel}>CO2</div>
              <div className={styles.statLimit} id="breakfast-co2-limit"></div>
            </div>
          </div>
        </div>
        <div className={styles.slide} id="lunch">
          <h2>Lunch</h2>
          <p>{lunch.title}</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.carbs}`}
                id="lunch-carbs-circle"
              >
                <div className={styles.statValue} id="lunch-carbs-value"></div>
              </div>
              <div className={styles.statLabel}>Carbohydrates</div>
              <div className={styles.statLimit} id="lunch-carbs-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.fat}`}
                id="lunch-fat-circle"
              >
                <div className={styles.statValue} id="lunch-fat-value"></div>
              </div>
              <div className={styles.statLabel}>Fat</div>
              <div className={styles.statLimit} id="lunch-fat-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.protein}`}
                id="lunch-protein-circle"
              >
                <div
                  className={styles.statValue}
                  id="lunch-protein-value"
                ></div>
              </div>
              <div className={styles.statLabel}>Protein</div>
              <div className={styles.statLimit} id="lunch-protein-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.co2}`}
                id="lunch-co2-circle"
              >
                <div className={styles.statValue} id="lunch-co2-value"></div>
              </div>
              <div className={styles.statLabel}>CO2</div>
              <div className={styles.statLimit} id="lunch-co2-limit"></div>
            </div>
          </div>
        </div>
        <div className={styles.slide} id="dinner">
          <h2>Dinner</h2>
          <p>{dinner.title}</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.carbs}`}
                id="dinner-carbs-circle"
              >
                <div className={styles.statValue} id="dinner-carbs-value"></div>
              </div>
              <div className={styles.statLabel}>Carbohydrates</div>
              <div className={styles.statLimit} id="dinner-carbs-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.fat}`}
                id="dinner-fat-circle"
              >
                <div className={styles.statValue} id="dinner-fat-value"></div>
              </div>
              <div className={styles.statLabel}>Fat</div>
              <div className={styles.statLimit} id="dinner-fat-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.protein}`}
                id="dinner-protein-circle"
              >
                <div
                  className={styles.statValue}
                  id="dinner-protein-value"
                ></div>
              </div>
              <div className={styles.statLabel}>Protein</div>
              <div className={styles.statLimit} id="dinner-protein-limit"></div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.statCircle} ${styles.co2}`}
                id="dinner-co2-circle"
              >
                <div className={styles.statValue} id="dinner-co2-value"></div>
              </div>
              <div className={styles.statLabel}>CO2</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.navDots}>
        <div className={styles.navDot} onClick={() => showSlide(0)}></div>
        <div className={styles.navDot} onClick={() => showSlide(1)}></div>
        <div className={styles.navDot} onClick={() => showSlide(2)}></div>
      </div>
    </div>
  )
}
