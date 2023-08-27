import { useMemo, useState } from "react";
import { handleEditTask } from "../services/tasksHandlers";
import MyModal from "../ui/MyModal/MyModal";
import ChoiseDate from "../components/ChoiseDate";
import { formatDate } from "../services/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import styles from "./../styles/Calendar.module.css";
import "./../styles/ShowItem.css";

function ShowItem({ setTasks, selectedTask, setSelectedTask }) {
  if (!selectedTask) {
    return null;
  }

  const [updatedTask, setUpdatedTask] = useState({ ...selectedTask });
  const [showAlert, setShowAlert] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const trueIfModified = useMemo(() => {
    return JSON.stringify(updatedTask) !== JSON.stringify(selectedTask);
  }, [updatedTask, selectedTask]);

  return (
    <div>
      <MyModal
        visible={true}
        onSideClick={() => {
          if (trueIfModified) {
            setShowAlert(true);
          } else {
            setSelectedTask(null);
          }
        }}
      >
        <div className="flex">
          <div
            className="flex flex_column container"
            style={{ alignItems: "flex-start" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              placeholder="Название задачи"
              value={updatedTask.title}
              className="input"
              onChange={(event) =>
                setUpdatedTask((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
            <textarea
              placeholder="Описание"
              rows={8}
              className="textarea"
              onChange={(event) =>
                setUpdatedTask((prev) => ({
                  ...prev,
                  shortDescription: event.target.value,
                }))
              }
              value={updatedTask.shortDescription}
            />
            <div
              className="flex"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "inherit",
              }}
            >
              <button
                className={styles.container}
                onClick={() => {
                  setShowDatePicker(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  size="1x"
                  className={styles.calendar_icon}
                />
                <span className={styles.text}>
                  {formatDate(new Date(updatedTask.date))}
                </span>
              </button>
              {trueIfModified && (
                <div
                  style={{
                    width: "inherit",
                    display: "flex",
                    justifyContent: "flex-end",
                    columnGap: 8,
                  }}
                >
                  <button
                    onClick={() => {
                      setUpdatedTask({ ...selectedTask });
                    }}
                    className="btn"
                  >
                    Отменить
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      handleEditTask(selectedTask.id, updatedTask, setTasks);
                      setSelectedTask({ ...updatedTask });
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              )}
            </div>
          </div>
          <MyModal
            visible={showDatePicker}
            onSideClick={() => {
              setShowDatePicker(false);
            }}
          >
            <ChoiseDate
              selected={updatedTask.date}
              setVisibleDate={setShowDatePicker}
              onChange={(date) => {
                setUpdatedTask((prev) => ({ ...prev, date: date }));
              }}
            />
          </MyModal>
        </div>
      </MyModal>
      <MyModal
        visible={showAlert}
        onSideClick={() => {
          setShowAlert(false);
        }}
      >
        <div className="">
          <p>Вы точно хотите уйти? Изменения не буду сохранены</p>
          <button
            onClick={() => {
              setShowAlert(false);
            }}
          >
            Отмена
          </button>
          <button
            onClick={() => {
              setSelectedTask(null);
              setShowAlert(false);
            }}
          >
            Продолжить
          </button>
        </div>
      </MyModal>
    </div>
  );
}

export default ShowItem;
