import { useState, useEffect } from "react";

const useScrollSpy = (ids = [], offset = 80) => {
  const [activeId, setActiveId] = useState(ids[0]);

  const scrollTo = (id) => {
    
    if (id === ids[0]) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveId(ids[0]);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY < 100) {
        setActiveId(ids[0]);
        return;
      }

      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= offset + 10 && rect.bottom > offset + 10;
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