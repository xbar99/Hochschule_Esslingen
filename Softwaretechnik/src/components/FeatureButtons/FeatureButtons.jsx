import styles from "./FeatureButtons.module.css"
import Link from "next/link"

const FeatureButtons = () => {
  return (
    <div className={styles.container}>
      {/* FEATURES */}
      <div className={styles.featuresTop}>
        <div className={styles.featuresTopItems}>
          <Link
            href="/dashboard/foodRegistration"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <strong>Food Registration</strong>
          </Link>
        </div>
        <div className={styles.featuresTopItems}>
          <Link
            href="/dashboard/nutrirating"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <strong>Rating System</strong>
          </Link>
        </div>
      </div>

      <div className={styles.featuresBottom}>
        <div className={styles.featuresBottomItems}>
          <Link
            href="/dashboard/statisticalTracking"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <strong>Statistical Tracking</strong>
          </Link>
        </div>
        <div className={styles.featuresBottomItems}>
          <Link
            href="/dashboard/mealRegistration"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <strong>Meal Registration</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeatureButtons
