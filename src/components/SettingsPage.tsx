import { FunctionComponent } from "react";
import Selectable from "./Selectable";

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
  return opened ? (
    <>
      <div className="darkBackground"></div>
      <div className="settingsMenu">
        <section className="mainSettingsItems">
          <h2>Instellingen</h2>
          <p>
            <h3>Nieuwsbronnen</h3>
          </p>
          <Selectable
            checked={newsSourcesToFetch.NU}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                NU: !newsSourcesToFetch.NU,
              })
            }
            title={"NU.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.AD}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                AD: !newsSourcesToFetch.AD,
              })
            }
            title={"AD.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.NOS}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                NOS: !newsSourcesToFetch.NOS,
              })
            }
            title={"NOS.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Security}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                Security: !newsSourcesToFetch.Security,
              })
            }
            title={"Security.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Telegraaf}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                Telegraaf: !newsSourcesToFetch.Telegraaf,
              })
            }
            title={"Telegraaf.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Tweakers}
            setChecked={() =>
              setNewsSourcesToFetch({
                ...newsSourcesToFetch,
                Tweakers: !newsSourcesToFetch.Tweakers,
              })
            }
            title={"Tweakers.net"}
          />
          <h3>Compacte weergave</h3>
          <Selectable
            title={"Compacted view"}
            checked={compactView}
            setChecked={() => setCompactView(!compactView)}
          />
          <h3>Overige instellingen</h3>
        <p>Peaceful mode</p>
        <Selectable
          title={"Geen nieuwsartikelen. Voel je weer zen!"}
          setChecked={() => setPeaceMode(!peaceMode)}
          checked={peaceMode}
        />
        </section>
        
        <section className="bottomPanel">
          <button className="buttonLeft" onClick={() => setOpened(false)}>
            Sluiten
          </button>
          <button
            className="buttonRight"
            onClick={() => {
              localStorage.setItem(
                "newsSources",
                JSON.stringify(newsSourcesToFetch)
              );
              localStorage.setItem(
                "compactView",
                compactView ? "true" : "false"
              );
              setOpened(false);
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
