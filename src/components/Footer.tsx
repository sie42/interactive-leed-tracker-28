import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-12 border-t pt-6 pb-10 text-center text-xs text-muted-foreground">
    <p className="mb-1">
      Interactive LEED Tracker <span className="font-medium">v1.0.0</span>
    </p>
    <p>
      Adapted from the original LEED Tracker by{' '}
      <a
        href="https://www.linkedin.com/pulse/bridging-theory-practice-ai-david-klaasen-wrnlf/?trackingId=5f%2BTB8GKTrK5yv8eIaxMXw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        David Klaasen
      </a>{' '}
      · Maintained by <span className="font-medium">Simon Strehler</span>
    </p>
  </footer>
);
