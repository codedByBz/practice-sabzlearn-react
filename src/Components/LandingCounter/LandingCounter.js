import React, { useEffect, useState } from 'react';

function LandingCounter({ count, duration = 4000 }) {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCourseCounter(Math.floor(progress * count));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [count, duration]);

  return <span className="landing-status__count">{courseCounter.toLocaleString()}</span>;
}

export default LandingCounter;
