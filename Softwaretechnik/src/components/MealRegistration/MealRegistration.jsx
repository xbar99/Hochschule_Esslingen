"use client"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"

const MealRegistration = () => {
  const [data, setData] = useState()
  const [breakfastData, setBreakfastData] = useState()
  const [lunchData, setLunchData] = useState()
  const [dinnerData, setDinnerData] = useState()
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

  useEffect(() => {
    const fetchData = async () => {
      const currentSession = await getSession()
      if (currentSession && currentSession.user) {
        const res = await fetch(
          `/api/meals/byEmail/${currentSession.user.email}`
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

  return (
    <div id="container">
      <header style={{ marginBottom: "1rem", marginLeft: "45%" }}>
        <h1>Enter your Meal</h1>
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
        <div></div>
      </div>
    </div>
  )
}
export default MealRegistration
