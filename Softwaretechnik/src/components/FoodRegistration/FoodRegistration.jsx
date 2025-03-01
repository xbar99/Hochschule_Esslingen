"use client"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import styles from "./FoodRegistration.module.css"

const Summary = () => {
  const [data, setData] = useState()
  const [breakfastData, setBreakfastData] = useState()
  const [lunchData, setLunchData] = useState()
  const [dinnerData, setDinnerData] = useState()
  const [showOverlay, setShowOverlay] = useState(false) //overlay false till button clicked
  const [chooseFood, setChooseFood] = useState("noFood")
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
    email: "",
  })
  const [session, setSession] = useState()

  const handleDeleteButton = async ({ fid }) => {
    console.log(fid)
    const result = confirm("Are you sure want to delete this food")
    if (result) {
      try {
        const res = await fetch(`/api/foods/byFid/${fid}`, {
          method: "DELETE",
        })
        location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleEdit = async (data) => {
    try {
      const res = await fetch(`/api/foods/byFid/${data.fid}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
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
    {
      field: "name",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        handleEdit(newData)
      },
    },
    {
      field: "calories",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "carbohydrates",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "protein",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "fat",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "containsMeat",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "vegetarian",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
    {
      field: "vegan",
      editable: true,
      onCellValueChanged: (event) => {
        const newData = event.data
        console.log(newData)
        handleEdit(newData)
      },
    },
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
        fid: item.fid,
        name: item.name,
        calories: item.calories,
        carbohydrates: item.carbohydrates,
        protein: item.protein,
        fat: item.fat,
        containsMeat: item.containsMeat,
        vegetarian: item.vegetarian,
        vegan: item.vegan,
        breakfast: item.breakfast,
        lunch: item.lunch,
        dinner: item.dinner,
      }))

      const breakfastItems = formattedData.filter((item) => item.breakfast)
      const lunchItems = formattedData.filter((item) => item.lunch)
      const dinnerItems = formattedData.filter((item) => item.dinner)

      setBreakfastData(breakfastItems)
      setLunchData(lunchItems)
      setDinnerData(dinnerItems)
    }
  }, [data])

  //make popup visible
  const foodSelected = (food) => {
    setShowOverlay(true), // when true overlay is seen
      setChooseFood(food)
  }

  //make popup visible
  const closePage = () => {
    setShowOverlay(false) // when false overlay is invisible
  }

  //buttons to choose meat, vegetarian, vegan
  const onOptionChange = (e) => {
    setMainDish(e.target.value)
  }

  useEffect(() => {
    const setCurrentSession = async () => {
      const s = await getSession()
      setSession(s)
    }

    setCurrentSession()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const main = mainDish
    let meat1 = false
    let vegetarian1 = false
    let vegan1 = false
    //finde the one thats picked
    if (main === "meat") {
      meat1 = true
    } else if (main === "vegetarian") {
      vegetarian1 = true
    } else if (main === "vegan") {
      vegan1 = true
    }

    const formData = new FormData(e.currentTarget)
    const food = {
      name: formData.get("name"),
      calories: Number(formData.get("calories")),
      carbohydrates: Number(formData.get("carbohydrates")),
      protein: Number(formData.get("protein")),
      fat: Number(formData.get("fat")),
      containsMeat: meat1,
      vegetarian: vegetarian1,
      vegan: vegan1,
      email: session.user.email,
      breakfast,
      lunch,
      dinner,
    }

    console.log(food)

    try {
      const res = await fetch("/api/foods", {
        method: "POST",
        body: JSON.stringify(food),
      })
    } catch (error) {
      console.log(error)
    }

    closePage()
    location.reload()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <div id="container">
      <header style={{ marginBottom: "1rem", marginLeft: "40%" }}>
        <h1>Enter your Food</h1>
      </header>
      <div>
        <h2>Breakfast</h2>
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
        <h2>Lunch</h2>
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
        <h2>Dinner</h2>
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
        <button
          onClick={() => {
            setBreakfast(true)
            foodSelected("breakfast")
          }}
        >
          Add Breakfast
        </button>
        <button
          onClick={() => {
            setLunch(true)
            foodSelected("lunch")
          }}
        >
          Add lunch
        </button>
        <button
          onClick={() => {
            setDinner(true)
            foodSelected("dinner")
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
                      Enter your {chooseFood}
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
