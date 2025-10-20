export const passTypeToEvents = {
  ANS: ["1", "2", "3", "4"],
  AN: ["1", "2", "3", "4"],
  D1: ["1"],
  D2: ["2"],
  D3: ["3"],
  AS: [],
  SN: ["1", "2", "3", "4"],
  S: [],
  FACULTY: ["1", "2", "3", "4"],
};

const events = Object.entries(passTypeToEvents).reduce((acc, [passType, eventList]) => {
  eventList.forEach((event) => {
    acc[event] = acc[event] || [];
    acc[event].push(passType);
  });
  return acc;
}, {});

export default events;