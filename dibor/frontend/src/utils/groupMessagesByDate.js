import { format, isToday, isYesterday } from "date-fns";

export const groupMessagesByDate = (messages) => {
  const grouped = {};

  messages.forEach((msg) => {
    const date = new Date(msg.createdAt);
    let dateKey;

    if (isToday(date)) {
      dateKey = "Today";
    } else if (isYesterday(date)) {
      dateKey = "Yesterday";
    } else {
      dateKey = format(date, "MMMM d, yyyy");
    }

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(msg);
  });

  return grouped;
};
