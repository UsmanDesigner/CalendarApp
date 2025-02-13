import React, { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "tailwindcss/tailwind.css";
import Modal from "../ReusableComponents/Modal";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);

const Calendar = ({ events }) => {
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNext = () => {
    setCurrentDate((prev) =>
      view === "week" ? prev.add(1, "week") : prev.add(1, "month")
    );
  };

  const handlePrev = () => {
    setCurrentDate((prev) =>
      view === "week" ? prev.subtract(1, "week") : prev.subtract(1, "month")
    );
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  // Get start of the week
  const startOfWeek = currentDate.startOf("week");
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  // Get start of the month
  const startOfMonth = currentDate.startOf("month");
  const monthDays = Array.from({ length: currentDate.daysInMonth() }, (_, i) =>
    startOfMonth.add(i, "day")
  );

  const hours = Array.from({ length: 12 }, (_, i) => i + 6); // 6 AM to 5 PM
  // Open Modal with Selected Event
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  return (
    <div className="p-6 w-full bg-white shadow-md rounded-lg overflow-auto">
      {/* Today Display */}
      <div className="text-left font-bold text-lg mb-2 text-black border-t border-b py-4">
        {dayjs().format("dddd | DD MMM YYYY")}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center border-b py-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={handleToday}
        >
          Today
        </button>
        <div className="flex items-center">
          <button
            className="px-3 py-2  font-bold  hover:bg-gray-300"
            onClick={handlePrev}
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">
            {view === "week"
              ? `${weekDays[0].format("MMM D")} - ${weekDays[6].format(
                  "MMM D, YYYY"
                )}`
              : `${currentDate.format("MMMM YYYY")}`}
          </h2>
          <button
            className="px-3 py-2  font-bold  hover:bg-gray-300"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
        <div>
          <button
            className={`ml-3 px-4 py-2 rounded-l-lg ${
              view === "week"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              view === "month"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {view === "week" ? (
        <>
          {/* Week View Header */}
          <div className="grid grid-cols-8 border relative">
            <div className="border-r p-2 text-center font-bold "></div>
            {weekDays.map((day) => (
              <div
                key={day}
                className="border-r p-2 text-center font-medium flex flex-col"
              >
                <span>{day.format("ddd")}</span>
                <span>{day.format("M/D")}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 border-t relative h-20 "
              >
                <div className="border-r p-2 text-center text-sm font-medium flex justify-center items-center">
                  {hour <= 11
                    ? `${hour} AM`
                    : `${hour === 12 ? 12 : hour - 12} PM`}
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day + hour}
                    className="border-r border-b border-2 border-white h-full relative bg-[#E3E6ED]"
                  ></div>
                ))}
              </div>
            ))}

            {/* Render Events */}
            {events.map((event, index) => {
              const eventDay = dayjs(event.date);
              const columnIndex = weekDays.findIndex((d) =>
                d.isSame(eventDay, "day")
              );
              if (columnIndex === -1) return null;

              const eventStart = dayjs(event.date)
                .hour(Number(event.startTime.split(":")[0]))
                .minute(Number(event.startTime.split(":")[1]));
              const eventEnd = dayjs(event.date)
                .hour(Number(event.endTime.split(":")[0]))
                .minute(Number(event.endTime.split(":")[1]));

              const eventDuration = eventEnd.diff(eventStart, "minutes"); // Get duration in minutes
              const eventHeight = (eventDuration / 60) * 80; // Scale height

              // Calculate top offset including minutes
              const startHourOffset = eventStart.hour() - 6; // Offset from 6 AM
              const startMinuteOffset = eventStart.minute() / 60; // Convert minutes to fraction of an hour
              const topOffset = (startHourOffset + startMinuteOffset) * 80; // Adjusted top position

              const leftOffset = (columnIndex + 1) * (100 / 8);

              return (
                <div
                  key={index}
                  className="absolute flex flex-col items-left justify-center p-2 text-sm rounded-md m-2 cursor-pointer"
                  onClick={() => handleEventClick(event)}
                  style={{
                    top: `${topOffset}px`,
                    left: `${leftOffset}%`,
                    width: `${100 / 8.7}%`,
                    height: `${eventHeight-14}px`, // Use calculated height
                    backgroundColor: "white",
                      // eventStart.hour() >= 9 && eventEnd.hour() <= 11
                      //   ? "white"
                      //   : "#1E40AF",
                    color: "black",
                      // eventStart.hour() >= 9 && eventEnd.hour() <= 11
                      //   ? "black"
                      //   : "white",
                    border: "none"
                      // eventStart.hour() >= 9 && eventEnd.hour() <= 11
                      //   ? "1px solid black"
                      //   : "none",
                  }}
                >
                  <span className="text-[12px]">{event.startTime}- {event.endTime}</span>
                  <span className="font-normal">{event.title}</span>
                  <span>{event.name}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* Month View Header */}
          <div className="grid grid-cols-7 border bg-gray-100 font-bold text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 border-r">
                {day}
              </div>
            ))}
          </div>

          {/* Month View Days */}
          <div className="grid grid-cols-7 border">
            {monthDays.map((day) => (
              <div key={day} className="p-4 border-r border-b text-center">
                {day.format("D")}
              </div>
            ))}
          </div>
        </>
      )}
    <Modal isOpen={!!selectedEvent} onClose={handleCloseModal} event={selectedEvent} />

    </div>
  );
};

export default Calendar;
