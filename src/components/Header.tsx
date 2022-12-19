import { ReactComponent as SettingsCog } from '../img/settingscog.svg';
import TimeDisplayer from "./TimeDisplayer";
import WeatherDisplayer from './WeatherDisplayer';

type HeaderProps = {
  isOpen: boolean;
  setIsOpen: any;
}

const Header = ({
  isOpen, setIsOpen
}: HeaderProps) => {
  return (
    <header>

      {/* <h2>Powered by lucashopman.nl</h2> */}
      <TimeDisplayer />
      <WeatherDisplayer />
      <h1>Nieuwsfeed</h1>
      <SettingsCog className={"settingsCog"} onClick={() => setIsOpen(!isOpen)}/>
    </header>
  );
};

export default Header;
