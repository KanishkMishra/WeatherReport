import React from "react";

function Legend({ layer }) {
  const legends = {
    precipitation: {
      title: "Rain (mm)",
      min: 0,
      max: 140,
      stops: [
        { value: 0, color: "rgba(225,200,100,0)" },
        { value: 0.5, color: "rgba(120,120,190,0)" },
        { value: 1, color: "rgba(110,110,205,0.3)" },
        { value: 10, color: "rgba(80,80,225,0.7)" },
        { value: 140, color: "rgba(20,20,255,0.9)" }
      ]
    },

    snow: {
      title: "Snow (mm)",
      min: 0,
      max: 25,
      stops: [
        { value: 0, color: "transparent" },
        { value: 5, color: "#00d8ff" },
        { value: 10, color: "#00b6ff" },
        { value: 25, color: "#9549ff" }
      ]
    },

    clouds: {
      title: "Clouds (%)",
      min: 0,
      max: 100,
      stops: [
        { value: 0, color: "rgba(255,255,255,0)" },
        { value: 50, color: "rgba(247,247,255,0.5)" },
        { value: 100, color: "rgba(240,240,255,1)" }
      ]
    },

    temp: {
      title: "Temperature (°C)",
      min: -65,
      max: 30,
      stops: [
        { value: -65, color: "rgba(130,22,146,1)" },
        { value: -30, color: "rgba(130,87,219,1)" },
        { value: -20, color: "rgba(32,140,236,1)" },
        { value: -10, color: "rgba(32,196,232,1)" },
        { value: 0, color: "rgba(35,221,221,1)" },
        { value: 10, color: "rgba(194,255,40,1)" },
        { value: 20, color: "rgba(255,240,40,1)" },
        { value: 25, color: "rgba(255,194,40,1)" },
        { value: 30, color: "rgba(252,128,20,1)" }
      ]
    },

    pressure: {
      title: "Pressure (Pa)",
      min: 94000,
      max: 108000,
      stops: [
        { value: 94000, color: "rgba(0,115,255,1)" },
        { value: 98000, color: "rgba(75,208,214,1)" },
        { value: 100000, color: "rgba(141,231,199,1)" },
        { value: 101000, color: "rgba(176,247,32,1)" },
        { value: 102000, color: "rgba(240,184,0,1)" },
        { value: 104000, color: "rgba(251,85,21,1)" },
        { value: 108000, color: "rgba(198,0,0,1)" }
      ]
    },

    wind: {
      title: "Wind (m/s)",
      min: 0,
      max: 200,
      stops: [
        { value: 1, color: "rgba(255,255,255,0)" },
        { value: 5, color: "rgba(238,206,206,0.4)" },
        { value: 15, color: "rgba(179,100,188,0.7)" },
        { value: 25, color: "rgba(63,33,59,0.8)" },
        { value: 50, color: "rgba(116,76,172,0.9)" },
        { value: 100, color: "rgba(70,0,175,1)" },
        { value: 200, color: "rgba(13,17,38,1)" }
      ]
    }
  };

  const legend = legends[layer];
  if (!legend) return null;

  // Build gradient
  const gradient = legend.stops.map(stop => {
    const percent = ((stop.value - legend.min) / (legend.max - legend.min)) * 100;
    return `${stop.color} ${percent}%`;
  }).join(",");

  return (
    <div className="legend">
      <p>{legend.title}</p>
      <div
        className="legendBar"
        style={{ background: `linear-gradient(to right, ${gradient})` }}
      />
      <div className="legendLabels">
        {legend.stops.map((stop, i) => {
          const percent = ((stop.value - legend.min) / (legend.max - legend.min)) * 100;
          return (
            <span key={i} style={{ left: `${percent}%` }}>
              {stop.value}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Legend;