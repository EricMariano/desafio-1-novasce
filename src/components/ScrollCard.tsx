import Card from "../components/Card"
import { useState, useEffect, useRef } from "react";

export default function ScrollableCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const cards = [
    {
      position: "01",
      title: "Desenvolvimento Web",
      description: "Nulla condimentum risus eget finibus facilisis. Donec nisi nibh, vestibulum efficitur dolor nec, dapibus maximus nisl. Aenean ipsum nisi, pulvinar in elementum ut, viverra ut ligula. Vestibulum ac posuere sem, a auctor ex. Aenean malesuada dignissim arcu tempus laoreet. Suspendisse condimentum maximus lorem, quis porttitor odio fringilla vitae. Proin non tincidunt ipsum. Fusce accumsan dolor et sollicitudin sagittis. Phasellus a fermentum turpis. Morbi venenatis augue quis elementum ullamcorper. Sed consectetur euismod leo ut commodo."
    },
    {
      position: "02",
      title: "Desenvolvimento de Aplicativos",
      description: "Nulla condimentum risus eget finibus facilisis. Donec nisi nibh, vestibulum efficitur dolor nec, dapibus maximus nisl. Aenean ipsum nisi, pulvinar in elementum ut, viverra ut ligula. Vestibulum ac posuere sem, a auctor ex. Aenean malesuada dignissim arcu tempus laoreet. Suspendisse condimentum maximus lorem, quis porttitor odio fringilla vitae. Proin non tincidunt ipsum. Fusce accumsan dolor et sollicitudin sagittis. Phasellus a fermentum turpis. Morbi venenatis augue quis elementum ullamcorper. Sed consectetur euismod leo ut commodo."
    },
    {
      position: "03",
      title: "Desenvolvimento de API's",
      description: "Nulla condimentum risus eget finibus facilisis. Donec nisi nibh, vestibulum efficitur dolor nec, dapibus maximus nisl. Aenean ipsum nisi, pulvinar in elementum ut, viverra ut ligula. Vestibulum ac posuere sem, a auctor ex. Aenean malesuada dignissim arcu tempus laoreet. Suspendisse condimentum maximus lorem, quis porttitor odio fringilla vitae. Proin non tincidunt ipsum. Fusce accumsan dolor et sollicitudin sagittis. Phasellus a fermentum turpis. Morbi venenatis augue quis elementum ullamcorper. Sed consectetur euismod leo ut commodo."
    }
  ];

  useEffect(() => {
    const smoothScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableHeight = height - viewportHeight;
      const scrolled = Math.max(0, -top);
      const totalProgress = Math.min(1, scrolled / scrollableHeight);
      
      const cardCount = cards.length;
      const segmentSize = 1 / cardCount;
      const currentCardIndex = Math.min(
        Math.floor(totalProgress / segmentSize),
        cardCount - 1
      );
      
      const cardStartProgress = currentCardIndex * segmentSize;
      const progressInCard = ((totalProgress - cardStartProgress) / segmentSize) * 100;
      
      setActiveIndex(currentCardIndex);
      setProgress(Math.min(100, Math.max(0, progressInCard)));
    };
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          smoothScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="space-y-4 flex flex-col items-center">
            {cards.map((card, index) => (
              <Card
                key={index}
                position={card.position}
                title={card.title}
                description={card.description}
                isActive={index === activeIndex}
                progress={index === activeIndex ? progress : index < activeIndex ? 100 : 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}