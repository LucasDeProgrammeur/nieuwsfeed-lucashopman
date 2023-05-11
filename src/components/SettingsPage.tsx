import { FunctionComponent, useState } from "react";
import { sourceArray, sourceToggle } from "../types/types";
import Selectable from "./Selectable";
import Modal from "./Modal";

interface SettingsPageProps {
  opened: boolean;
  setOpened: any;
  newsSourcesToFetch: any;
  setNewsSourcesToFetch: any;
  compactView: boolean;
  setCompactView: any;
  setPeaceMode: React.Dispatch<React.SetStateAction<boolean>>;
  peaceMode: boolean;
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
}) => {
  const [localNewsSourcesToFetch, setLocalNewsSourcesToFetch] = useState(newsSourcesToFetch);
  const [modalOpen, setModalOpen] = useState(false);
  const [localCompactView, setLocalCompactView] = useState(compactView);
  const [localZenMode, setLocalZenMode] = useState(false);
  return opened ? (
    <>
      {modalOpen ? <Modal text={"Selecteer tenminste één nieuwsbron"} setModalOpen={setModalOpen}/> : <></>}
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
                                  enabled: x.sources.filter(x => x.enabled && x.name !== sourceToggle.name).length > 0 || !sourceToggle.enabled,
                                  sources: x.sources.map((xy) =>
                                    xy.name === sourceToggle.name
                                      ? { ...xy, enabled: !xy.enabled }
                                      : { ...xy }
                                  ),
                                }
                              : { ...x }
                        );
                        console.log(newArray);
                        setLocalNewsSourcesToFetch(newArray);
                      }}
                      title={sourceToggle.name}
                    />
                  );
                })}
              </>
            );
          })}
          <h3>Compacte weergave</h3>
          <Selectable
            title={"Compacted view"}
            checked={localCompactView}
            setChecked={() => setLocalCompactView(!localCompactView)}
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
          <button className="buttonLeft" onClick={() => { 
            setOpened(false); }}>
            Sluiten
          </button>
          <button
            className="buttonRight"
            onClick={() => {
              if (localNewsSourcesToFetch.find((x: sourceArray) => x.enabled === true) === undefined) {
                setModalOpen(true);
                return;
              }

              setNewsSourcesToFetch(localNewsSourcesToFetch);
              localStorage.setItem(
                "newsSources",
                JSON.stringify(localNewsSourcesToFetch)
              );
              localStorage.setItem(
                "compactView",
                localCompactView ? "true" : "false"
              );
              setCompactView(localCompactView);
              setOpened(false);
              setPeaceMode(localZenMode)
            }}
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

