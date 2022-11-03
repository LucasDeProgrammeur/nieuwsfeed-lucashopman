import { FunctionComponent } from "react";
import Selectable from "./Selectable";

interface SettingsPageProps {
  opened: boolean;
  setOpened: any;
  newsSourcesToFetch: any;
  setNewsSourcesToFetch: any;
}

const SettingsPage: FunctionComponent<SettingsPageProps> = ({
  opened,
  setOpened,
  newsSourcesToFetch,
  setNewsSourcesToFetch
}) => {
  return opened ? (
    <>
      <div className="darkBackground"></div>
      <div className="settingsMenu">

        <section className="mainSettingsItems">
          <h3>Instellingen</h3>
          <p>
            <em>Nieuwsbronnen:</em>
          </p>
          <Selectable
            checked={newsSourcesToFetch.NU}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, NU:  !newsSourcesToFetch.NU})}
            title={"NU.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.AD}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, AD: !newsSourcesToFetch.AD })}
            title={"AD.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.NOS}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, NOS: !newsSourcesToFetch.NOS })}
            title={"NOS.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Security}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, Security: !newsSourcesToFetch.Security })}
            title={"Security.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Telegraaf}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, Telegraaf: !newsSourcesToFetch.Telegraaf })}
            title={"Telegraaf.nl"}
          />
          <Selectable
            checked={newsSourcesToFetch.Tweakers}
            setChecked={() => setNewsSourcesToFetch({ ...newsSourcesToFetch, Tweakers: !newsSourcesToFetch.Tweakers })}
            title={"Tweakers.net"}
          />
        </section>

        <section className="bottomPanel">
          <button className="buttonLeft" onClick={() => setOpened(false)}>Sluiten</button>
          <button
            className="buttonRight"
            onClick={() => {
              
              localStorage.setItem("newsSources", JSON.stringify(newsSourcesToFetch));
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
