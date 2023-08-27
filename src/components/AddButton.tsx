import "./../styles/AddButton.css";

function AddButton({ visible, setVisible }) {
  console.log("render AddButton");
  if (visible) {
    return null;
  }

  return (
    <button className="add_button" onClick={() => setVisible(true)}>
      <svg
        className="add_button__plus"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </button>
  );
}

export default AddButton;
