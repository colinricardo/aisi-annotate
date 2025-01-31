import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getAgoString = (date: string | number) => {
  let _date;
  // if the input is a number, it's assumed to be a unix timestamp
  if (typeof date === "number") {
    _date = new Date(date * 1000);
  } else {
    _date = date;
  }

  return dayjs(_date).fromNow();
};

export const isoStringToDate = (isoDate: string | number) => {
  let date;

  // if the input is a number, it's assumed to be a unix timestamp
  if (typeof isoDate === "number") {
    date = new Date(isoDate * 1000);
  } else {
    date = isoDate;
  }

  return dayjs(date, "YYYY-MM-DD").toDate();
};

export const getLaterDate = (dateA: Date, dateB: Date) => {
  return dayjs(dateA).isAfter(dateB) ? dateA : dateB;
};

export const bFollowsA = (dateA: Date, dateB: Date) => {
  return dayjs(dateB).isAfter(dateA);
};
