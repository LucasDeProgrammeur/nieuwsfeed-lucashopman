import * as React from 'react';
import { FunctionComponent } from 'react';

interface SettingsPageProps {
    opened: boolean,
    setOpened: any
}

const SettingsPage: FunctionComponent<SettingsPageProps> = ({opened, setOpened}) => {
    console.log(opened);
    return (
        opened ?
        <>        
        
        <div className='darkBackground'>


        </div>
            <div className="settingsMenu">
                <h3>Instellingen</h3>

                <p><em>Nieuwsbronnen:</em></p>
                <input type="checkbox" name="nu.nl" defaultChecked/>
                <label htmlFor="nu.nl">Nu.nl</label>
                <input type="checkbox" name="ad.nl" defaultChecked/>
                <label htmlFor="nu.nl">AD.nl</label>
                <input type="checkbox" name="nos.nl" defaultChecked/>
                <label htmlFor="nu.nl">NOS.nl</label>
                <input type="checkbox" name="security.nl" defaultChecked/>
                <label htmlFor="nu.nl">Security.nl</label>
                <input type="checkbox" name="ad.nl" defaultChecked/>
                <label htmlFor="nu.nl">Ad.nl</label>
                <button onClick={() => setOpened(false)}>Close</button>
            </div>
        </> : <></>
    );
}

export default SettingsPage;