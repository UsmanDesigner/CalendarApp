import dayjs from "dayjs";
export const events = [
  {
    title: "Morning Meeting",
    date: dayjs().format("YYYY-MM-DD"),
    startTime: "7:30",
    endTime: "8:40",
  },
  {
    title: "Team Standup",
    date: dayjs().add(1, "day").format("YYYY-MM-DD"),
    startTime: "9:00",
    endTime: "11:00",
    name: "James",
  },
  {
    title: "Lunch Break",
    date: dayjs().add(2, "day").format("YYYY-MM-DD"),
    startTime: "12:00",
    endTime: "14:30",
    name: "Olivia",
  },
  {
    title: "Water Demage Repair",
    date: dayjs().add(2, "day").format("YYYY-MM-DD"),
    startTime: "12:00",
    endTime: "14:30",
    name: "Olivia",
  },
  {
    title: "Both Water Damage & Plumbing",
    date: dayjs().add(5, "day").format("YYYY-MM-DD"),
    startTime: "9:00",
    endTime: "12:30",
    name: "Olivia",
  },
  {
    title: "Plumbing Repair",
    date: dayjs().add(3, "day").format("YYYY-MM-DD"),
    startTime: "1:00",
    endTime: "2:30",
    name: "Olivia",
  },
];