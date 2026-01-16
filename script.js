document.addEventListener("DOMContentLoaded", () => {
  const multiselects = document.querySelectorAll(".multiselect");

  multiselects.forEach(ms => {
    const header = ms.querySelector(".multiselect-header");
    const dropdown = ms.querySelector(".multiselect-dropdown");

    // по умолчанию скрываем
    dropdown.style.display = "none";

    header.addEventListener("click", (e) => {
      e.stopPropagation();

      // закрыть все остальные
      multiselects.forEach(other => {
        if (other !== ms) {
          const d = other.querySelector(".multiselect-dropdown");
          d.style.display = "none";
        }
      });

      // toggle текущего
      dropdown.style.display =
        dropdown.style.display === "none" ? "block" : "none";
    });
  });

  // клик вне — закрыть всё
  document.addEventListener("click", () => {
    document.querySelectorAll(".multiselect-dropdown").forEach(d => {
      d.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const managerRows = document.querySelectorAll(".manager-row");
  const summaryRow = document.querySelector(".summary-row");
  let activeManager = null;

  const resetBtn = document.getElementById("reset-filters-btn");

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetAll();
      activeManager = null;
      updateResetState();
    });
  }

  summaryRow?.addEventListener("dblclick", resetAll);

  managerRows.forEach(row => {
    row.addEventListener("dblclick", () => {
      const manager = row.dataset.manager;
      const geo = row.dataset.geo;
      const segment = row.dataset.segment;

      if (activeManager === manager) {
        resetAll();
        activeManager = null;
      } else {
        applyFilter(row, geo, segment);
        activeManager = manager;
      }
      updateResetState();
    });
  });


  const segmentToCountry = {
    ASIA: "Uzbekistan",
    TURK: "Turkey",
    CIS: "Russia",
    LAT: "Chile",
    AF: "Nigeria"
  };

  const geoEnToRu = {
    Russia: "Россия",
    Uzbekistan: "Узбекистан",
    Turkey: "Турция",
    Chile: "Чили",
    Nigeria: "Нигерия",
    India: "Индия",
    Belarus: "Беларусь",
    Brazil: "Бразилия",
    Azerbaijan: "Азербайджан",
    Venezuela: "Венесуэла",
    Moldova: "Молдова",
    Armenia: "Армения",
    Mexico: "Мексика",
    Pakistan: "Пакистан",
    Kazakhstan: "Казахстан",
    "South Korea": "Южная Корея"
  };

  function fillFiltersFromManager(row) {
      const office = row.dataset.office;
      const project = row.dataset.project;
      const manager = row.dataset.managerName;


      // ===== OFFICE =====
      checkMultiselectValue("filter-office", office);

      // ===== PROJECT =====
      checkMultiselectValue("filter-project", project);

      // ===== MANAGER =====
      checkMultiselectValue("filter-manager", manager);
  }

  function checkMultiselectValue(wrapperId, value) {
    if (!value) return;

    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const checkboxes = wrapper.querySelectorAll("input[type='checkbox']");
    let found = false;

    checkboxes.forEach(cb => {
      const match = cb.value === value;
      cb.checked = match;
      if (match) found = true;
    });

    const header = wrapper.querySelector(".multiselect-header");
    if (header && found) {
      header.childNodes[0].textContent = value;
    }
  }

  /* ===== APPLY FILTER ===== */

  function applyFilter(activeRow, geo, segment) {
    fillFiltersFromManager(activeRow);
    const managerName = activeRow.dataset.manager;
    const geoEn = activeRow.dataset.geo;          // Russia, Uzbekistan
    const geoRu = geoEnToRu[geoEn]; 
    const country = activeRow.dataset.geo;

    managerRows.forEach(r => {
      r.style.display = r === activeRow ? "" : "none";
      r.style.background = r === activeRow ? "#eef2ff" : "";
    });

    if (summaryRow) {
      summaryRow.style.display = "";
    }

    // geo table
    document.querySelectorAll("#geo-table tbody tr").forEach(row => {
      const cell = row.children[0];
      if (!cell || !cell.innerText.trim()) {        
        row.style.display = "none";
        return;
      }

      const geoName = cell.innerText.trim();
      row.style.display = geoName === geoRu ? "" : "none";
    });

    // partners
    document.querySelectorAll("#partners-table tbody tr").forEach(row => {
      const rowSegment = row.dataset.segment;
      const emailManager = row.children[1].innerText.toLowerCase();

      const matchSegment = rowSegment === segment;
      const matchManager = emailManager.includes(managerName.split(" ")[0].toLowerCase());

      row.style.display = matchSegment && matchManager ? "" : "none";
    });

    // charts
    document.getElementById("chart-nps-dynamic").src = "images/NPS_Dynamic_M.png";
    document.getElementById("chart-nps-dist").src = "images/NPS_Dist_M.png";
    document.getElementById("chart-cr").src = "images/CR_M.png";
    document.getElementById("quick-ans").src = "images/QuickAns_M.png";

    // map
    Plotly.restyle("nps-map", {
      locations: [[country]],
      z: [[92]]
    });
  }

  /* ===== RESET ===== */

  function resetAll() {
    // managers
    managerRows.forEach(r => {
      r.style.display = "";
      r.style.background = "";
    });

    if (summaryRow) {
      summaryRow.style.display = "";
    }

    // geo table
    document.querySelectorAll("#geo-table tbody tr").forEach(row => {
      row.style.display = "";
    });

    // partners
    document.querySelectorAll("#partners-table tbody tr").forEach(row => {
      row.style.display = "";
    });

    // charts
    document.getElementById("chart-nps-dynamic").src = "images/NPS_Dynamic_NF.png";
    document.getElementById("chart-nps-dist").src = "images/NPS_Dist_NF.png";
    document.getElementById("chart-cr").src = "images/CR_NF.png";
    document.getElementById("quick-ans").src = "images/QuickAns_NF.png";

    // map
    Plotly.restyle("nps-map", {
      locations: [[
        "Russia",
        "India",
        "Belarus",
        "Uzbekistan",
        "Brazil",
        "Azerbaijan",
        "Venezuela",
        "Chile",
        "Nigeria",
        "Moldova",
        "Armenia",
        "Mexico",
        "Pakistan",
        "Kazakhstan"
      ]],
      z: [[92, -63, 88, 73, 63, 75, 80, 73, 95, 100, 60, 100, 100, 100]]
    });
    resetFiltersUI();
  }

  function resetFiltersUI() {
    ["filter-office", "filter-project", "filter-manager"].forEach(id => {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;

      wrapper.querySelectorAll("input[type='checkbox']").forEach(cb => {
        cb.checked = false;
      });

      const header = wrapper.querySelector(".multiselect-header");
      if (header) {
        header.childNodes[0].textContent = "(All)";
      }
    });
  }

  function updateResetState() {
    if (!resetBtn) return;

    resetBtn.disabled = !activeManager;
    resetBtn.style.opacity = activeManager ? "1" : "0.5";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const chart = document.getElementById("chart-nps-dynamic");

  if (!chart) return;

  // создаём tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "chart-tooltip";
  tooltip.innerHTML = `
    <div>Месяц: <b>Ноябрь 2025</b></div>
    <div>NPS: <b>81</b></div>
  `;
  document.body.appendChild(tooltip);

  chart.addEventListener("mouseenter", () => {
    tooltip.style.opacity = "1";
  });

  chart.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  chart.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 12 + "px";
    tooltip.style.top = e.clientY + 12 + "px";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chart = document.getElementById("chart-nps-dist");
  const tooltip = document.getElementById("nps-dist-tooltip");

  if (!chart || !tooltip) return;

  chart.addEventListener("mouseenter", () => {
    tooltip.style.opacity = "1";
  });

  chart.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  chart.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 16 + "px";
    tooltip.style.top = e.clientY + 16 + "px";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chart = document.getElementById("quick-ans");
  if (!chart) return;

  const tooltip = document.createElement("div");
  tooltip.className = "chart-tooltip";
  tooltip.innerHTML = `
    <div><b>Период:</b> 22.12.2026 — 28.12.2026</div>
    <div>Быстрые ответы: <b>528 (31%)</b></div>
    <div>Всего: <b>1844</b></div>
  `;

  document.body.appendChild(tooltip);

  chart.addEventListener("mouseenter", () => {
    tooltip.style.opacity = "1";
  });

  chart.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  chart.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 12 + "px";
    tooltip.style.top = e.clientY + 12 + "px";
  });
});


document.querySelectorAll(".geo-list li").forEach(item => {
  item.addEventListener("click", () => {
    // убрать рамку у всех
    document.querySelectorAll(".geo-list li").forEach(li => {
      li.classList.remove("active");
    });

    // добавить рамку выбранному
    item.classList.add("active");
  });
});


document.querySelectorAll(".rating-cell").forEach(el => {
  const value = Number(el.innerText);

  if (value === 5) {
    el.style.background = "#7ed193";
  } else if (value === 4) {
    el.style.background = "#82ffa3";
  } else if (value === 3) {
    el.style.background = "#f6db70";
    el.style.color = "#111";
  } else {
    el.style.background = "#e09292";
  }
});
