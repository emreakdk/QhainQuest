import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const AppTour = () => {
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    
    if (!hasSeenTour) {
      // Check if dark mode is active
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      const driverObj = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: "Tamamla",
        nextBtnText: "İleri",
        prevBtnText: "Geri",
        popoverClass: isDarkMode ? 'driver-popover-dark' : 'driver-popover-light',
        steps: [
          {
            element: "#tour-wallet-connect",
            popover: {
              title: "Cüzdanını Bağla 💼",
              description: "Freighter cüzdanını bağlayarak ilerlemeyi kaydet ve ödülleri topla. Cüzdan bağlı değilse bu butona tıklayarak başlayabilirsin.",
              side: "bottom",
              align: "end"
            }
          },
          {
            element: "#tour-ai-generator",
            popover: {
              title: "AI Sınav Modu ✨",
              description: "Yapay zeka ile istediğin konuda sınırsız test oluştur. Her test 20 CQT değerinde!",
              side: "bottom",
              align: "start"
            }
          },
          {
            element: "#tour-quest-list",
            popover: {
              title: "Görevleri Tamamla 📚",
              description: "Farklı zorluk seviyelerindeki görevleri tamamla, CQT Token kazan ve sertifika al.",
              side: "top",
              align: "start"
            }
          },
          {
            element: "#tour-profile-link",
            popover: {
              title: "Profilin 👤",
              description: "Kazandığın sertifikaları, rozetleri ve gelişmiş Web3 Kimlik Kartını buradan görüntüle.",
              side: "bottom",
              align: "start"
            }
          }
        ],
        onDestroy: () => {
          localStorage.setItem("hasSeenTour", "true");
        }
      });

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        driverObj.drive();
      }, 1500);
    }
  }, []);

  return (
    <>
      <style>{`
        /* Light Mode Styling */
        .driver-popover-light {
          background: white !important;
          color: #1e293b !important;
          border: 1px solid #e2e8f0 !important;
        }
        
        .driver-popover-light .driver-popover-title {
          color: #4f46e5 !important;
          font-weight: 700 !important;
        }
        
        .driver-popover-light .driver-popover-description {
          color: #475569 !important;
        }
        
        .driver-popover-light .driver-popover-footer button {
          background: linear-gradient(to right, #4f46e5, #7c3aed) !important;
          color: white !important;
          border: none !important;
          font-weight: 600 !important;
        }
        
        .driver-popover-light .driver-popover-footer button:hover {
          background: linear-gradient(to right, #4338ca, #6d28d9) !important;
        }
        
        .driver-popover-light .driver-popover-footer button.driver-popover-prev-btn {
          background: #f1f5f9 !important;
          color: #475569 !important;
        }
        
        .driver-popover-light .driver-popover-footer button.driver-popover-prev-btn:hover {
          background: #e2e8f0 !important;
        }
        
        /* Dark Mode Styling */
        .driver-popover-dark {
          background: #1e293b !important;
          color: #f1f5f9 !important;
          border: 1px solid #475569 !important;
        }
        
        .driver-popover-dark .driver-popover-title {
          color: #818cf8 !important;
          font-weight: 700 !important;
        }
        
        .driver-popover-dark .driver-popover-description {
          color: #cbd5e1 !important;
        }
        
        .driver-popover-dark .driver-popover-footer button {
          background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
          color: white !important;
          border: none !important;
          font-weight: 600 !important;
        }
        
        .driver-popover-dark .driver-popover-footer button:hover {
          background: linear-gradient(to right, #4f46e5, #7c3aed) !important;
        }
        
        .driver-popover-dark .driver-popover-footer button.driver-popover-prev-btn {
          background: #334155 !important;
          color: #cbd5e1 !important;
        }
        
        .driver-popover-dark .driver-popover-footer button.driver-popover-prev-btn:hover {
          background: #475569 !important;
        }
        
        /* Overlay styling */
        .driver-overlay {
          background: rgba(0, 0, 0, 0.5) !important;
        }
      `}</style>
    </>
  );
};

export default AppTour;

