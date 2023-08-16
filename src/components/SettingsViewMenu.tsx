

const SettingsViewMenu = ({ setView }) => {

    return (
        <div>
            <ul>
                <li onClick={() => setView('infinity')}>Лента</li>
                <li onClick={() => setView('dayByDay')}>По дням</li>
                <li onClick={() => setView('byWeeks')}>По неделям</li>
            </ul>
        </div>
    );
};

export default SettingsViewMenu;