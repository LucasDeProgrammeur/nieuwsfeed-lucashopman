import * as React from "react";
import { ReactComponent as SettingsCog } from '../img/settingscog.svg';
import SettingsPage from "./SettingsPage";
import TimeDisplayer from "./TimeDisplayer";

type HeaderProps = {
  isOpen: boolean;
  setIsOpen: any;
}

const Header = ({
  isOpen, setIsOpen
}: HeaderProps) => {
  return (
    <header>
      <h1>Nieuwsfeed</h1>
      {/* <h2>Powered by lucashopman.nl</h2> */}
      <TimeDisplayer />
      <SettingsCog className={"settingsCog"} onClick={() => setIsOpen(!isOpen)}/>
    </header>
  );
};

export default Header;
