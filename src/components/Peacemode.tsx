import React from "react";

type PeaceModeProps = {
  setPeaceMode: any;
};

const PeaceMode = ({ setPeaceMode }: PeaceModeProps) => {
  const [shouldUnlock, setShouldUnlock] = React.useState(false);
  return (
    <div className="peaceMode">
      <p className="peaceModeWeather">B</p>
      <h1>Relax</h1>
      <h3>
        Nieuwsartikelen zijn uitgeschakeld. Ga naar buiten en geniet van het
        weer.
      </h3>

      {!shouldUnlock ? <h4
        onClick={() => {
          let minutes = prompt("Hoeveel minuten?", "5");
          if (isNaN(Number(minutes))) {
            alert("Geen getal. Probeer anders opnieuw");
            return;
          }

          if (!minutes) {
            return;
          }
          
          setShouldUnlock(true);
          setTimeout(() => {
            setPeaceMode(false);
            setShouldUnlock(false);
          }, Number(minutes) * 1000 * 60);
        }}
      >
        Ontgrendel automatisch na bepaalde tijd
      </h4> : <h4>Je scherm unlockt binnenkort. Meteen ontgrendelen? Gebruik Instellingen.</h4>}
    </div>
  );
};

export default PeaceMode;
