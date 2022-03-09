import * as React from "react";
import { ReactComponent as SettingsCog } from '../img/settingscog.svg';
import SettingsPage from "./SettingsPage";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <header>
      <h1>Nieuwsfeed</h1>
      <h2>Powered by lucashopman.nl</h2>
      <SettingsCog className={"settingsCog"} onClick={() => setIsOpen(!isOpen)}/>
      <SettingsPage opened={isOpen} setOpened={setIsOpen} />
    </header>
  );
};

export default Header;
