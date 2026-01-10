document.addEventListener("DOMContentLoaded", () => {
  const data = [{
    type: "choropleth",
    locationmode: "country names",
    locations: [
      "Russia",
      "India",
      "Belarus",
      "Uzbekistan",
      "Brazil"
    ],
    z: [92, 63, 88, 73, 63],
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
