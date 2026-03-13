(() => {
  const forms = Array.from(document.querySelectorAll('form[role="search"]'));
  if (forms.length === 0) return;

  const isModelsPage = document.body.classList.contains("models-page");
  const grid = document.querySelector(".models-grid .row");
  const cards = grid ? Array.from(grid.querySelectorAll(".col-md-4")) : [];

  const getQuery = () => {
    const url = new URL(window.location.href);
    return (url.searchParams.get("q") || "").trim();
  };

  const setQueryInUrl = (q) => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  };

  const filterModels = (q) => {
    if (!isModelsPage || cards.length === 0) return;
    const query = (q || "").trim().toLowerCase();

    cards.forEach((col) => {
      const text = (col.innerText || "").toLowerCase();
      const match = query === "" || text.includes(query);
      col.style.display = match ? "" : "none";
    });
  };

  const applyToAllInputs = (q) => {
    forms.forEach((f) => {
      const input = f.querySelector('input[type="search"]');
      if (input) input.value = q;
    });
  };

  
  const initialQ = getQuery();
  if (initialQ) {
    applyToAllInputs(initialQ);
    filterModels(initialQ);
  }


  if (isModelsPage) {
    forms.forEach((f) => {
      const input = f.querySelector('input[type="search"]');
      if (!input) return;
      input.addEventListener(
        "input",
        () => {
          const q = input.value || "";
          setQueryInUrl(q);
          filterModels(q);
        },
        { passive: true }
      );
    });
  }

 
  forms.forEach((f) => {
    f.addEventListener("submit", (e) => {
      const input = f.querySelector('input[type="search"]');
      const q = (input?.value || "").trim();
      if (isModelsPage) {
       
        e.preventDefault();
        setQueryInUrl(q);
        filterModels(q);
      } else {
        e.preventDefault();
        const url = new URL("modeles.html", window.location.href);
        if (q) url.searchParams.set("q", q);
        window.location.href = url.toString();
      }
    });
  });
})();

