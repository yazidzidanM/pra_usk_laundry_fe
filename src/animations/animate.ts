import { useEffect, useState } from "react";

export type AnimateCounter = {
  target: number;
  duration: number;
  
}

export const AnimatedCounter = ({ target, duration }: AnimateCounter) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const fps = 60;
    const incrementTime = 1000 / fps;
    const totalFrames = Math.round(duration / incrementTime);

    let frame = 0;

    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      const eased = easeOutQuad(progress);
      const newValue = Math.floor(eased * end);
      setCount(newValue);

      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      }
    };

    requestAnimationFrame(counter);
  }, [target, duration]);

  return count.toLocaleString(`id-ID`)
}

function easeOutQuad(t: number) {
  return t * (2 - t);
}
