function SettingsViewMenu ({ view, setView }) {
    console.log('render SettingViewMenu')
    return (
        <div className="menu">
            <span>Способ отображения</span>
            <select
                value = {view}
                onChange={(event) => setView(event.target.value)}>
                <option value='infinity'>Лента</option>
                <option value='dayByDay'>По дням</option>
                <option value='byWeeks'>По неделям</option>
            </select>
        </div>
    );
};

export default SettingsViewMenu;