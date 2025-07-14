export const generateShortcode = () => {
  return Math.random().toString(36).substr(2, 6);
};

export const getLocationFromIP = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return data.city + ', ' + data.country_name;
  } catch {
    return 'Unknown';
  }
};
