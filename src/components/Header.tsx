import { ReactComponent as SettingsCog } from "../img/settingscog.svg";
import Hamburger from "./Hamburger";
import TimeDisplayer from "./TimeDisplayer";
import WeatherDisplayer from "./WeatherDisplayer";

type HeaderProps = {
  isOpen: boolean;
  setIsOpen: any;
  weatherLocation: string;
};

const Header = ({ isOpen, setIsOpen, weatherLocation }: HeaderProps) => {
  return (
    <header>
      {/* <h2>Powered by lucashopman.nl</h2> */}
      <TimeDisplayer />
      <WeatherDisplayer weatherLocation={weatherLocation} />
      <h1>Nieuwsfeed</h1>
      <Hamburger />
      <SettingsCog
        className={"settingsCog"}
        onClick={() => setIsOpen(!isOpen)}
      />
    </header>
  );
};

export default Header;
