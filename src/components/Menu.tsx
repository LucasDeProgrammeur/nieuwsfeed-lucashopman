type Props = {
  open: boolean;
};

const Menu = ({ open }: Props) => {
  return (
    <nav className={open ? "navOpen" : ""}>
      <ul>
        <a href="https://www.reddit.com/live/18hnzysb1elcs" target="_blank" rel="noreferrer">
          <li>Invasie Oekraïne live feed Reddit</li>
        </a>
        <a href="https://www.buienradar.nl/" target="_blank" rel="noreferrer">
          <li>Buienradar</li>
        </a>
      </ul>
    </nav>
  );
};

export default Menu;
