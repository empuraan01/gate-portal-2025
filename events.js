export const passTypeToEvents = {
  AAA: ["1", "2", "3", "4"],
  AA: ["1", "2", "3", "4"],
  OAA: ["1", "2", "3", "4"],
  D1: ["1"],
  D2: ["2"],
  D3: ["3"],
  D1C : ["1", "4"],
  D12 : ["1", "2"],
  D13 : ["1", "3"],
  D23 : ["2", "3"],
  C : ["4"],
  E : [],
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