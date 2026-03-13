(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const root = document.documentElement;
  const updateHeaderHeight = () => {
    const h = header.offsetHeight || 0;
    root.style.setProperty("--site-header-height", `${h}px`);
  };

  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight, { passive: true });

  let lastY = window.scrollY || 0;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || 0;
    const delta = y - lastY;

    header.classList.toggle("site-header--shadow", y > 10);

   
    if (y < 20) {
      header.classList.remove("site-header--hidden");
      lastY = y;
      ticking = false;
      return;
    }

    if (delta > 0 && y > 80) {
      header.classList.add("site-header--hidden");
    }

    
    if (delta < 0) {
      header.classList.remove("site-header--hidden");
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    },
    { passive: true }
  );
})();

