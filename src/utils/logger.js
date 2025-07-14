const logs = [];

export const logEvent = (type, payload) => {
  logs.push({ type, payload, timestamp: new Date().toISOString() });
};

export const getLogs = () => logs;
