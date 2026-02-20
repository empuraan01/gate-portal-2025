export const passTypeToEvents = {
  AAA: ["1", "2", "3", "4"],
  AA: ["1", "2", "3", "4"],
  AAG: ["1", "2", "3", "4"],
  OAA: ["1", "2", "3", "4"],
  D1: ["1","4"],
  D2: ["2"],
  D3: ["3"],
  D12 : ["1", "2","4"],
  D13 : ["1", "3","4"],
  D23 : ["2", "3"],
  E : [],
  AE : [],
  V: [],
  FACULTY: ["1", "2", "3", "4"],
  PHD : ["1", "2", "3", "4"],
  SR : ["1"]
};

const events = Object.entries(passTypeToEvents).reduce((acc, [passType, eventList]) => {
  eventList.forEach((event) => {
    acc[event] = acc[event] || [];
    acc[event].push(passType);
  });
  return acc;
}, {});

export default events;