import Select from "react-select";

const options = [
  { value: "infinity", label: "Лента" },
  { value: "dayByDay", label: "По дням" },
  { value: "byWeeks", label: "По неделям" },
];

function SettingsViewMenu({ view, setView }) {
  return (
    <div className="menu">
      <span className="menu_text">Способ отображения</span>
      <Select
        styles={{
          container: (baseStyles) => ({
            ...baseStyles,
            paddingTop: 12,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            background: "gray",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            background: state.isSelected ? "#725ac1" : "gray",
          }),
        }}
        closeMenuOnSelect={false}
        defaultValue={view}
        options={options}
        onChange={(event) => setView(event)}
      />
    </div>
  );
}

export default SettingsViewMenu;
