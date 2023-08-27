import "./../styles/CreateTaskForm.css";
import { useEffect, useState } from "react";
import CalendarComponent from "./Calendar";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isSameDate } from "../services/getRelativeDate";
import MyModal from "../ui/MyModal/MyModal";

interface Data {
  title: string;
  shortDescription: string;
  date: Date | null;
}

const clearData = {
  title: "",
  shortDescription: "",
  date: null,
};

const clearOption = { value: "not choosed", label: "Срок выполнения" };

function CreateTaskform({ visible, setTasks, setVisible }) {
  const options = [
    { value: "today", label: "Сегодня" },
    { value: "tomorrow", label: "Завтра" },
    { value: "afterTomorrow", label: "Послезавтра" },
    { value: "custom", label: "Другая дата" },
  ];

  const [visibleDate, setVisibleDate] = useState(false);
  const [data, setData] = useState<Data>(clearData);
  const [selectedOption, setSelectedOption] = useState(clearOption);

  useEffect(() => {
    let date = data.date;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const afterTomorrow = new Date();
    afterTomorrow.setDate(today.getDate() + 2);

    if (date === null) {
      return;
    }

    if (isSameDate(date, today)) {
      setSelectedOption(options[0]);
    } else if (isSameDate(date, tomorrow)) {
      setSelectedOption(options[1]);
    } else if (isSameDate(date, afterTomorrow)) {
      setSelectedOption(options[2]);
    } else {
      setSelectedOption(options[3]);
    }
  }, [data.date]);

  const onExit = () => {
    setVisible(false);
    setData(clearData);
    setSelectedOption(clearOption);
  };

  const CreateTask = (e) => {
    e.preventDefault();

    setTasks((prev) => {
      return [...prev, { id: prev.length + 1, ...data }];
    });
    setData((prev) => ({ ...prev, title: "", shortDescription: "" }));
  };

  return (
    <MyModal
      visible={visible}
      onSideClick={() => {
        setVisible(false);
      }}
    >
      <div className="container">
        <div className="flex flex_row">
          <input
            id="title"
            placeholder="Название задачи"
            onChange={(event) =>
              setData((prev) => ({ ...prev, title: event.target.value }))
            }
            className="input"
            value={data.title}
          />
          <button
            id="close_button"
            onClick={() => onExit()}
            className="close_button"
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} className="close_icon" />
          </button>
          <br />
        </div>
        <textarea
          id="shortDescription"
          placeholder="Описание"
          onChange={(event) => {
            setData((prev) => ({
              ...prev,
              shortDescription: event.target.value,
            }));
          }}
          className="textarea"
          rows={8}
          value={data.shortDescription}
        />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CalendarComponent
            data={data}
            setData={setData}
            selectedOption={selectedOption}
            setOption={setSelectedOption}
            visibleDate={visibleDate}
            setVisibleDate={setVisibleDate}
          />
          <button
            id="Add"
            onClick={(e) => {
              CreateTask(e);
            }}
            disabled={data.title && data.date !== null ? false : true}
            className="post_button"
            type="button"
          >
            Создать
          </button>
        </div>
      </div>
    </MyModal>
  );
}

export default CreateTaskform;
