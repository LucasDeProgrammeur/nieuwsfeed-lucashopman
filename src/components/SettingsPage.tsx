import { FunctionComponent, useState } from "react";
import { sourceArray, sourceToggle } from "../types/types";
import Selectable from "./Selectable";
import Modal from "./Modal";
import { useMutation } from "@tanstack/react-query";

interface SettingsPageProps {
  opened: boolean;
  setOpened: any;
  newsSourcesToFetch: any;
  setNewsSourcesToFetch: any;
  compactView: boolean;
  setCompactView: any;
  setPeaceMode: React.Dispatch<React.SetStateAction<boolean>>;
  peaceMode: boolean;
  setWeatherLocation: React.Dispatch<React.SetStateAction<string>>;
  weatherLocation: string;
  setKioskMode: React.Dispatch<React.SetStateAction<boolean>>;
  kioskMode: boolean;
}

const SettingsPage: FunctionComponent<SettingsPageProps> = ({
  opened,
  setOpened,
  newsSourcesToFetch,
  setNewsSourcesToFetch,
  compactView,
  setCompactView,
  setPeaceMode,
  peaceMode,
  setWeatherLocation,
  weatherLocation,
  kioskMode,
  setKioskMode
}) => {
  const updateInformation = () => {
    // Show modal if no news sources are selected
    if (
      localNewsSourcesToFetch.find(
        (x: sourceArray) => x.enabled === true
      ) === undefined
    ) {
      setModalOpen(true);
      return;
    }

    setNewsSourcesToFetch(localNewsSourcesToFetch);
    localStorage.setItem(
      "newsSources",
      JSON.stringify(localNewsSourcesToFetch)
    );
    localStorage.setItem(
      "kioskMode",
      localKioskMode ? "true" : "false"
    );
    localStorage.setItem(
      "compactView",
      localCompactView ? "true" : "false"
    );
    localStorage.setItem("location", localLocation);
    setCompactView(localCompactView);
    setOpened(false);
    setPeaceMode(localZenMode);
    setWeatherLocation(localLocation);
    setKioskMode(localKioskMode);
    console.log("test")
  }

  const [localNewsSourcesToFetch, setLocalNewsSourcesToFetch] =
    useState(newsSourcesToFetch);
  const [modalOpen, setModalOpen] = useState(false);
  const [localCompactView, setLocalCompactView] = useState(compactView);
  const [localZenMode, setLocalZenMode] = useState(false);
  const [localKioskMode, setLocalKioskMode] = useState(kioskMode);
  const [localLocation, setLocalLocation] = useState(weatherLocation);
  return opened ? (
    <>
      {modalOpen ? (
        <Modal
          text={"Selecteer tenminste één nieuwsbron"}
          setModalOpen={setModalOpen}
        />
      ) : (
        <></>
      )}
      <div className="darkBackground"></div>
      <div className="settingsMenu">
        <section className="mainSettingsItems">
          <h2>Instellingen</h2>
          <p>
            <h3>Nieuwsbronnen</h3>
          </p>
          {localNewsSourcesToFetch.map((x: sourceToggle, i: Number) => {
            return (
              <>
                <Selectable
                  checked={x.enabled}
                  setChecked={() => {
                    let newToggleArray = localNewsSourcesToFetch.map(
                      (categoryProps: sourceToggle) =>
                        categoryProps.category === x.category
                          ? {
                              ...categoryProps,
                              enabled: !categoryProps.enabled,
                              sources: x.sources.map((categoryToDisable) => ({
                                ...categoryToDisable,
                                enabled: !categoryProps.enabled,
                              })),
                            }
                          : { ...categoryProps }
                    );
                    setLocalNewsSourcesToFetch(newToggleArray);
                  }}
                  title={x.category}
                  useBigFont={true}
                />
                {x.sources.map((sourceToggle: sourceArray) => {
                  return (
                    <Selectable
                      checked={sourceToggle.enabled}
                      setChecked={() => {
                        const newArray = localNewsSourcesToFetch.map(
                          (x: sourceToggle) =>
                            x.sources.find(
                              (source) => source.name === sourceToggle.name
                            )
                              ? {
                                  ...x,
                                  enabled:
                                    x.sources.filter(
                                      (x) =>
                                        x.enabled &&
                                        x.name !== sourceToggle.name
                                    ).length > 0 || !sourceToggle.enabled,
                                  sources: x.sources.map((xy) =>
                                    xy.name === sourceToggle.name
                                      ? { ...xy, enabled: !xy.enabled }
                                      : { ...xy }
                                  ),
                                }
                              : { ...x }
                        );
                        setLocalNewsSourcesToFetch(newArray);
                      }}
                      title={sourceToggle.name}
                    />
                  );
                })}
              </>
            );
          })}
          <h3>Weerlocatie (stad of straat)</h3>
          <p>
            <em>
              Locaties worden automatisch omgezet naar coördinaten,
              locatievoorbeelden: "Groningen", "Arnhem"
            </em>
          </p>
          <input
            type="text"
            defaultValue={"De Bilt"}
            value={localLocation}
            onChange={(e) => {
              setLocalLocation(e.target.value);
            }}
          />
          <h3>Compacte weergave</h3>
          <Selectable
            title={"Compacted view"}
            checked={localCompactView}
            setChecked={() => setLocalCompactView(!localCompactView)}
          />
          <h3>Kiosk modus</h3>
          <Selectable
            title={"Kiosk modus voor TV's, informatiedisplays, narrowcasting setups"}
            setChecked={() => setLocalKioskMode(!localKioskMode)}
            checked={localKioskMode}
          />
          <h3>Overige instellingen</h3>
          <p>Peaceful mode</p>
          <Selectable
            title={"Geen nieuwsartikelen. Voel je weer zen!"}
            setChecked={() => setLocalZenMode(!localZenMode)}
            checked={localZenMode}
          />
        </section>

        <section className="bottomPanel">
          <button
            className="buttonLeft"
            onClick={() => {
              setOpened(false);
            }}
          >
            Sluiten
          </button>
          <button
            className="buttonRight"
            onClick={() => updateInformation()}
          >
            Opslaan
          </button>
        </section>
      </div>
    </>
  ) : (
    <></>
  );
};

export default SettingsPage;
