import { useState, useEffect } from "react";

const useScrollSpy = (ids = [], offset = 80) => {
  const [activeId, setActiveId] = useState(ids[0]);
  const getOffset = () => {
    const nav = document.querySelector("nav");
    const navHeight = nav?.getBoundingClientRect().height ?? 0;
    // Keep a little breathing space below fixed navbar.
    return Math.max(offset, navHeight + 16);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getOffset();
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = getOffset();
      
      if (window.scrollY < 100) {
        setActiveId(ids[0]);
        return;
      }

      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
          rect.top <= currentOffset + 10 &&
          rect.bottom > currentOffset + 10
        );
      });

      if (current) setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return { activeId, scrollTo };
};

export default useScrollSpy;