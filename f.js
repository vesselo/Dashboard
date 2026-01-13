document.addEventListener("DOMContentLoaded", () => {
  const data = [{
    type: "choropleth",
    locationmode: "country names",
    locations: [
      "Russia",
      "India",
      "Belarus",
      "Uzbekistan",
      "Brazil",
      "Azerbaijan",
      "Venezuela",
      "Chili",
      "Nigeria",
      "Moldova",
      "Armenia",
      "Mexico",
      "Pakistan",
      "Kazakhstan"
    ],
    z: [92, -63, 88, 20, 63, 75, 80, 73, 95, 100, 60, 100, 100, 100],
    zmin: -100,
    zmax: 100,
    colorscale: [
      [0, "#ef4444"],
      [0.5, "#facc15"],
      [1, "#10b981"]
    ],
    colorbar: {
      title: {
        text: "NPS",
        side: "top"
      },
      orientation: "h",     // горизонтальная
      thickness: 10,        // тонкая
      len: 0.25,            // длина 
      x: 0.95,              // слева
      y: 1.02,              // снизу
      xanchor: "right",
      yanchor: "top",
      tickvals: [-100, 0, 100],
      ticktext: ["-100", "0", "100"]
    }
  }];

  const layout = {
    margin: { t: 0, r: 0, b: 0, l: 0 },
    geo: {
    showframe: false,
    showcoastlines: false,
    showcountries: true,
    countrycolor: "#ffffff",
    countrywidth: 0.5,

    showland: true,
    landcolor: "#e5e7eb",
    projection: { type: "natural earth", scale: 1.25 },
    center: { lat: 20, lon: 30 },
    showframe: false,
    showcoastlines: false,
    bgcolor: "#ffffff"
    }
  };

  Plotly.newPlot("nps-map", data, layout, {
    displayModeBar: false,
    responsive: true
  });
});

const geoTooltipData = {
  Russia: {
    nps: 92,
    delta: -4,
    deltaPct: -15,
    promoters: { value: 93, pct: 89 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 11, pct: 11 },
    total: 460
  },
  India: {
    nps:-63,
    delta: -37,
    deltaPct: -22,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 195
  },
  Belarus: {
    nps: 88,
    delta: -12,
    deltaPct: -20,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 85
  },
  Uzbekistan: {
    nps: 92,
    delta: 73,
    deltaPct: -14,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 92
  },
  Brazil: {
    nps: 63,
    delta: 0,
    deltaPct: 22,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 82
  },
  Azerbaijan: {
    nps:-63,
    delta: -37,
    deltaPct: -22,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 160
  },
  Venezuela: {
    nps:-63,
    delta: -37,
    deltaPct: -22,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 160
  },
  Chili: {
    nps: 73,
    delta: 173,
    deltaPct: -22,
    promoters: { value: 120, pct: 75 },
    passives: { value: 20, pct: 12 },
    detractors: { value: 20, pct: 13 },
    total: 37
  },
  Nigeria: {
    nps: 95,
    delta: 9,
    deltaPct: -12,
    promoters: { value: 12, pct: 87 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 7, pct: 13 },
    total: 19
  },
  Moldova: {
    nps: 100,
    delta: 6,
    deltaPct: 22,
    promoters: { value: 6, pct: 100 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 0, pct: 0 },
    total: 6
  },
  Armenia: {
    nps: 60,
    delta: -40,
    deltaPct: -22,
    promoters: { value: 3, pct: 80 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 2, pct: 20 },
    total: 5
  },
  Mexico: {
    nps: 100,
    delta: 29,
    deltaPct: 30,
    promoters: { value: 3, pct: 3 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 0, pct: 0 },
    total: 3
  },
  Pakistan: {
    nps: 100,
    delta: 0,
    deltaPct: 0,
    promoters: { value: 3, pct: 3 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 0, pct: 0 },
    total: 3
  },
  Kazakhstan: {
    nps: 100,
    delta: 3,
    deltaPct: 9,
    promoters: { value: 3, pct: 3 },
    passives: { value: 0, pct: 0 },
    detractors: { value: 0, pct: 0 },
    total: 3
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("nps-map");
  const tooltip = document.getElementById("map-tooltip");

  if (!map || !tooltip) return;

  map.on("plotly_hover", (data) => {
    const point = data.points[0];
    const country = point.location;
    const info = geoTooltipData[country];

    if (!info) return;

    tooltip.innerHTML = `
      <div><b>ГЕО трафика:</b> ${country}</div>
      <div>NPS: <b>${info.nps}</b></div>
      <div>
        Отклонение:
        <span class="${info.delta < 0 ? "delta-negative" : "delta-positive"}">
          ${info.delta > 0 ? "+" : ""}${info.delta} п.п.
          (${info.deltaPct}% к ПП)
        </span>
      </div>

      <div class="tooltip-divider"></div>

      <div class="tooltip-row">
        <span class="dot green"></span>
        Промоутеры: ${info.promoters.value} (${info.promoters.pct}%)
      </div>
      <div class="tooltip-row">
        <span class="dot yellow"></span>
        Нейтралы: ${info.passives.value} (${info.passives.pct}%)
      </div>
      <div class="tooltip-row">
        <span class="dot red"></span>
        Критики: ${info.detractors.value} (${info.detractors.pct}%)
      </div>

      <div class="tooltip-divider"></div>
      <div><b>Всего:</b> ${info.total}</div>
    `;

    tooltip.style.opacity = "1";
  });

  map.on("plotly_unhover", () => {
    tooltip.style.opacity = "0";
  });

  map.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 16 + "px";
    tooltip.style.top = e.clientY + 16 + "px";
  });
});
