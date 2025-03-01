'use client'
import { useState, useEffect } from 'react';
import styles from "./StatisticalTracking.module.css";
import Header from "@/components/Header/Header";

const StatisticalTracking = () => {

  const [data, setData] = useState({
    breakfast: false,
    createData: '',
    dinner: false,
    email: '',
    foods: [],
    lunch: false,
    mid: '',
    rating: 0,
    titel: '',
    updateDate: ''
  })

  const [avgRating, setAvgRating] = useState()
  const [meatFree, setMeatFree] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/meals", {
        method: "GET",
      })
      const jsonData = await response.json()
     
      let sum = 0;
      let count = 0;
      for (let i = 0; i < jsonData.length; i++) {
        sum += jsonData[i].rating;
        for(let j = 0; j < jsonData[i].foods.length; j++) {
          if(!jsonData[i].foods[j].containsMeat) {
            count++;
          }
        }
      } 
      const average = sum / jsonData.length;
      setMeatFree(count);
      setAvgRating(average.toFixed(2))
      setData(jsonData)
    }
    fetchData()
  }, [])

  return (
    <>
      <Header />
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Statistical Tracking</h1>
        <div className={styles.statistic}>
          <h2 className={styles.statisticTitle}>Average Meal Rating</h2>
          <p className={styles.placeholder}>{avgRating}</p>
        </div>

        <div className={styles.statistic}>
          <h2 className={styles.statisticTitle}>Number of Meat-Free Meals</h2>
          <p className={styles.placeholder}>{meatFree}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default StatisticalTracking;
