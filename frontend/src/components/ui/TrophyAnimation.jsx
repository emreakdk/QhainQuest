import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const TrophyAnimation = ({ className = "w-32 h-32" }) => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Use a reliable, simple gold trophy animation
    fetch("https://lottie.host/8b608910-6235-4349-813e-703835838528/o3t4551167.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
        setError(false);
      })
      .catch((err) => {
        console.error("Lottie Load Error:", err);
        setError(true);
      });
  }, []);

  // Fallback/Loading Skeleton
  if (!animationData || error) {
    return (
      <div className={`${className} bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full animate-pulse flex items-center justify-center`}>
        {/* Optional: A subtle static icon could go here, but a plain pulse is cleaner */}
        <div className="w-1/2 h-1/2 bg-yellow-500/20 dark:bg-yellow-500/30 rounded-full"></div>
      </div>
    );
  }

  return <Lottie animationData={animationData} loop={true} className={className} />;
};

export default TrophyAnimation;

