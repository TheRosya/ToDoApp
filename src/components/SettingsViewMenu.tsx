import Select from "react-select";

const options = [
  { value: "infinity", label: "Лента" },
  { value: "dayByDay", label: "По дням" },
  { value: "byWeeks", label: "По неделям" },
];

function SettingsViewMenu({ view, setView }) {
  console.log("render SettingViewMenu");
  return (
    <div className="menu">
      <span>Способ отображения</span>
      <Select
        closeMenuOnSelect={false}
        defaultValue={view}
        options={options}
        onChange={(event) => setView(event)}
      />
    </div>
  );
}

export default SettingsViewMenu;
