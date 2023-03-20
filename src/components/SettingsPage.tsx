import { FunctionComponent } from "react";
import { sourceArray, sourceCategory, sourceToggle } from "../types/types";
import Selectable from "./Selectable";
import sources from "../sources.json";

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
  let srces = JSON.parse(JSON.stringify(sources));
  return opened ? (
    <>
      <div className="darkBackground"></div>
      <div className="settingsMenu">
        <section className="mainSettingsItems">
          <h2>Instellingen</h2>
          <p>
            <h3>Nieuwsbronnen</h3>
          </p>
          {newsSourcesToFetch.map((x: sourceToggle, i: Number) => {
            return (
              <>
                <Selectable
                  checked={x.enabled}
                  setChecked={() => {
                    let newToggleArray = newsSourcesToFetch.map(
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
                    setNewsSourcesToFetch(newToggleArray);
                  }}
                  title={x.category}
                  useBigFont={true}
                />
                {x.sources.map((sourceToggle: sourceArray) => {
                  return (
                    <Selectable
                      checked={sourceToggle.enabled}
                      setChecked={() => {
                        const newArray = newsSourcesToFetch.map(
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
                        setNewsSourcesToFetch(newArray);
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

{
  /* <Selectable
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
/> */
}
