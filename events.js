export const passTypeToEvents = {
  ANS: ["1", "2"],
  AS: [],
  NS: ["1", "2"],
  D1: ["1"],
  D2: ["2"],
  D12: ["1", "2"],
  S: [],
  F: ["1", "2"],
};

const events = Object.entries(passTypeToEvents).reduce((acc, [passType, eventList]) => {
  eventList.forEach((event) => {
    acc[event] = acc[event] || [];
    acc[event].push(passType);
  });
  return acc;
}, {});

export default events;