import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../context/ThemeContext";

const Web3Particles = () => {
  const [init, setInit] = useState(false);
  const { isDarkMode } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false }, // Important: Stay inside container
      background: {
        color: {
          value: "transparent", // Transparent so the purple gradient shows through
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Connecting lines get stronger near mouse
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: isDarkMode ? "#ffffff" : "#1e293b", // White in dark mode, dark slate in light mode
        },
        links: {
          color: isDarkMode ? "#ffffff" : "#475569", // White in dark mode, slate-600 in light mode
          distance: 150,
          enable: true,
          opacity: isDarkMode ? 0.2 : 0.3, // More visible in light mode
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1, // Slow, elegant movement
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60, // Number of nodes over the area
        },
        opacity: {
          value: isDarkMode ? 0.3 : 0.4, // More visible in light mode
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [isDarkMode],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 -z-0" // Position absolutely behind everything
      />
    );
  }

  return null;
};

// Wrap in memo to prevent re-renders when parent state changes
export default memo(Web3Particles);

