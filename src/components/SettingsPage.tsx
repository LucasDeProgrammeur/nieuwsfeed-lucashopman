import * as React from "react";
import { FunctionComponent } from "react";
import Selectable from "./Selectable";
import { useEffect } from "react";

interface SettingsPageProps {
  opened: boolean;
  setOpened: any;
  newsSourcesToFetch: any;
  setNewsSourcesToFetch: any;
}

interface newsFilter {
  NU: boolean;
  Tweakers: boolean;
  NOS: boolean;
  AD: boolean;
  Security: boolean;
  Telegraaf: boolean;
}

type filterType = "NU" | "AD" | "NOS" | "Security" | "Telegraaf" | "Tweakers";

const SettingsPage: FunctionComponent<SettingsPageProps> = ({
  opened,
  setOpened,
  newsSourcesToFetch,
  setNewsSourcesToFetch
}) => {
  // const [checkedNU, setCheckedNU] = React.useState(localStorageToBool("NU.nl"));
  // const [checkedAD, setCheckedAD] = React.useState(localStorageToBool("AD.nl"));
  // const [checkedTweakers, setCheckedTweakers] = React.useState(
  //   localStorageToBool("Tweakers.net")
  // );
  // const [checkedNOS, setCheckedNOS] = React.useState(
  //   localStorageToBool("NOS.nl")
  // );
  // const [CheckedSecurity, setCheckedSecurity] = React.useState(
  //   localStorageToBool("Security.nl")
  // );
  // const [checkedTelegraaf, setCheckedTelegraaf] = React.useState(
  //   localStorageToBool("Telegraaf.nl")
  // );
  const [tempSettings, setTempSettings] = React.useState()

  useEffect(() => {

  }, [])


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
