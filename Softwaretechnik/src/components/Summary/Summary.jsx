"use client"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import styles from "./Summary.module.css"

const Summary = () => {
  const [data, setData] = useState()
  const [breakfastData, setBreakfastData] = useState()
  const [lunchData, setLunchData] = useState()
  const [dinnerData, setDinnerData] = useState()
  const [showOverlay, setShowOverlay] = useState(false) //overlay false till button clicked
  const [chooseMeal, setChooseMeal] = useState("noMeal")
  const [mainDish, setMainDish] = useState("nothing")
  const [breakfast, setBreakfast] = useState(false)
  const [lunch, setLunch] = useState(false)
  const [dinner, setDinner] = useState(false)
  const [foodData, setFoodData] = useState({
    name: "",
    calories: "",
    carbohydrates: "",
    protein: "",
    fat: "",
    meat: "",
    vegetarian: "",
    vegan: "",
    breakfast: false,
    lunch: false,
    dinner: false,
  })

  const handleDeleteButton = async ({ Id }) => {
    const result = confirm("Are you sure want to delete this food")
    if (result) {
      try {
        const res = await fetch(`/api/foods/byFid/${Id}`, {
          method: "DELETE",
        })
        location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleEditButton = async ({ Id }) => {
    try {
      const res = await fetch(`/api/foods/byFid/${Id}`, {
        method: "PATCH",
      })
      location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const CustomButtonComponent = ({ data }) => {
    return (
      <div>
        <button
          style={{
            backgroundColor: "#512da8",
            color: "#fff",
            fontSize: "12px",
            padding: "5px 10px",
            border: "1px solid transparent",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleEditButton(data)}
        >
          Edit
        </button>
        <button
          style={{
            backgroundColor: "#512da8",
            color: "#fff",
            fontSize: "12px",
            padding: "5px 10px",
            border: "1px solid transparent",
            borderRadius: "8px",
            marginLeft: "1rem",
            cursor: "pointer",
          }}
          onClick={() => handleDeleteButton(data)}
        >
          Delete
        </button>
      </div>
    )
  }

  const [colDefs, setColDefs] = useState([
    { field: "Name" },
    { field: "Kalorien" },
    { field: "Kohlenhydrate" },
    { field: "Proteine" },
    { field: "Fett" },
    { field: "Fleisch" },
    { field: "Vegetarisch" },
    { field: "Vegan" },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: CustomButtonComponent,
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      const currentSession = await getSession()
      if (currentSession && currentSession.user) {
        const res = await fetch(
          `/api/foods/byEmail/${currentSession.user.email}`
        )
        const jsonData = await res.json()
        setData(jsonData)
      } else {
        setData([])
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item) => ({
        Id: item.fid,
        Name: item.name,
        Kalorien: item.calories,
        Kohlenhydrate: item.carbohydrates,
        Proteine: item.protein,
        Fett: item.fat,
        Fleisch: item.containsMeat,
        Vegetarisch: item.vegetarian,
        Vegan: item.vegan,
        Breakfast: item.breakfast,
        Lunch: item.lunch,
        Dinner: item.dinner,
      }))

      const breakfastItems = formattedData.filter((item) => item.Breakfast)
      const lunchItems = formattedData.filter((item) => item.Lunch)
      const dinnerItems = formattedData.filter((item) => item.Dinner)

      setBreakfastData(breakfastItems)
      setLunchData(lunchItems)
      setDinnerData(dinnerItems)
    }
  }, [data])

  //make popup visible
  const mealSelected = (meal) => {
    setShowOverlay(true), // when true overlay is seen
      setChooseMeal(meal)
  }

  //make popup visible
  const closePage = () => {
    setShowOverlay(false) // when false overlay is invisible
  }

  //buttons to choose meat, vegetarian, vegan
  const onOptionChange = (e) => {
    setMainDish(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const currentSession = await getSession()
      if (!currentSession) {
        console.error("Failed to get session")
        return
      }

      const main = mainDish
      console.log(main)

      let meat1 = false
      let vegetarian1 = false
      let vegan1 = false

      // Finde die Auswahl
      if (main === "meat") {
        meat1 = true
      } else if (main === "vegetarian") {
        vegetarian1 = true
      } else if (main === "vegan") {
        vegan1 = true
      }

      const formData = new FormData(e.currentTarget)

      const foodData = {
        name: formData.get("name"),
        calories: formData.get("calories"),
        carbohydrates: formData.get("carbohydrates"),
        protein: formData.get("protein"),
        fat: formData.get("fat"),
        meat: meat1,
        vegetarian: vegetarian1,
        vegan: vegan1,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        email: currentSession.user.email,
      }

      console.log(foodData)

      const res = await fetch(`/api/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      // location.reload();
    } catch (error) {
      console.error(error)
    }

    closePage()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <div id="container">
      <div>
        <h1>Breakfast</h1>
        <div
          className="ag-theme-quartz"
          style={{
            width: "100%",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          <AgGridReact
            rowData={breakfastData}
            columnDefs={colDefs}
            domLayout="autoHeight"
            headerHeight={40}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit()
            }}
          />
        </div>
      </div>

      <div>
        <h1>Lunch</h1>
        <div
          className="ag-theme-quartz"
          style={{
            width: "100%",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          <AgGridReact
            rowData={lunchData}
            columnDefs={colDefs}
            domLayout="autoHeight"
            headerHeight={40}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit()
            }}
          />
        </div>
      </div>

      <div>
        <h1>Dinner</h1>
        <div
          className="ag-theme-quartz"
          style={{
            width: "100%",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          <AgGridReact
            rowData={dinnerData}
            columnDefs={colDefs}
            domLayout="autoHeight"
            headerHeight={40}
            frameworkComponents={{
              customButtonRenderer: CustomButtonComponent,
            }}
            cellRenderer="customButtonRenderer"
            cellRendererParams={{ rowData: dinnerData }}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit()
            }}
          />
        </div>
      </div>
      <div>
        Summary Page
        <button
          onClick={() => {
            setBreakfast(true)
            mealSelected("breakfast")
          }}
        >
          Add Breakfast
        </button>
        <button
          onClick={() => {
            setLunch(true)
            mealSelected("lunch")
          }}
        >
          Add lunch
        </button>
        <button
          onClick={() => {
            setDinner(true)
            mealSelected("dinner")
          }}
        >
          Add dinner
        </button>
        <div>
          {showOverlay && (
            <div className={styles.overlay}>
              <div className={styles.text}>
                <form onSubmit={onSubmit} onKeyPress={handleKeyPress}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => closePage()}
                  >
                    close
                  </button>
                  <div className={styles.tables}>
                    <div className={styles.headline}>
                      Enter your {chooseMeal}
                    </div>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label className={styles.label} htmlFor="name">
                                Name :
                              </label>
                              <input
                                type="name"
                                id="name"
                                name="name"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label
                                className={styles.label}
                                htmlFor="calories"
                              >
                                Calories :
                              </label>
                              <input
                                type="calories"
                                id="calories"
                                name="calories"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label
                                className={styles.label}
                                htmlFor="carbohydrates"
                              >
                                Carbohydrates :
                              </label>
                              <input
                                type="carbohydrates"
                                id="carbohydrates"
                                name="carbohydrates"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className={styles.label} htmlFor="protein">
                                Protein :
                              </label>
                              <input
                                type="protein"
                                id="protein"
                                name="protein"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className={styles.label} htmlFor="fat">
                                Fat :
                              </label>
                              <input
                                type="fat"
                                id="fat"
                                name="fat"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className={styles.label} htmlFor="meat">
                                Meat :
                              </label>
                              <input
                                type="radio"
                                id="meat"
                                name="mainDish"
                                value="meat"
                                checked={mainDish === "meat"}
                                onChange={onOptionChange}
                                className="radio-button"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label
                                className={styles.label}
                                htmlFor="vegetarian"
                              >
                                Vegetarian :
                              </label>
                              <input
                                type="radio"
                                id="vegetarian"
                                name="mainDish"
                                value="vegetarian"
                                checked={mainDish === "vegetarian"}
                                onChange={onOptionChange}
                                className="radio-button"
                                required
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label className={styles.label} htmlFor="vegan">
                                Vegan :
                              </label>
                              <input
                                type="radio"
                                id="vegan"
                                name="mainDish"
                                value="vegan"
                                checked={mainDish === "vegan"}
                                onChange={onOptionChange}
                                className="radio-button"
                                required
                              ></input>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <button
                                type="submit"
                                className={styles.sendButton}
                              >
                                Send
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Summary
