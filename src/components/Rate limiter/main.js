import React from "react";

function RateLimiter() {
  React.useEffect(() => {
    function rateLimiter(fn, limit, timeWindow) {
      let callTimestamps = [];

      return function (...args) {
        const now = Date.now();
        // filter out stale timestamps, i.e. diff > 'timeWindow'
        callTimestamps = callTimestamps.filter(
          (callTime) => now - callTime < timeWindow
        );

        if (callTimestamps.length < limit) {
          // only pushing the timestamps of successful calls
          callTimestamps.push(now);
          fn(...args);
        } else {
          console.log("Rate limit exceeded");
        }
      };
    }

    // Example usage
    const rateLimitedFn = rateLimiter(
      () => {
        console.log("Function executed");
      },
      2,
      1000
    );

    rateLimitedFn(); // Function executed
    rateLimitedFn(); // Function executed
    rateLimitedFn(); // Rate limit exceeded
    setTimeout(() => rateLimitedFn(), 1000); // Function executed after 1 second
  }, []);

  return (
    <div>
      <h2>Rate limiter</h2>
      <div>(check console)</div>
    </div>
  );
}

export default RateLimiter;
