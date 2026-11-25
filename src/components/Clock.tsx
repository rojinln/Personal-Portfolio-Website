"use client";

import { useEffect, useState } from "react";

/** Live local time in Vancouver, like a console home-screen clock. */
export function Clock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", hour12: true }).format(now)
    : "--:--";
  const date = now
    ? new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", month: "short", day: "numeric" }).format(now)
    : "";

  return (
    <div>
      <p className="font-pixel text-2xl text-text sm:text-3xl" suppressHydrationWarning>
        {time}
      </p>
      <p className="font-term mt-1 text-xl text-muted" suppressHydrationWarning>
        {date}
      </p>
    </div>
  );
}
