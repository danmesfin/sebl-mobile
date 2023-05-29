const getFormattedTimeDifference = timestamp => {
  const currentTime = new Date();
  const createdTime = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
  );
  const timeDiff = currentTime - createdTime;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds + 's ago';
  } else if (minutes < 60) {
    return minutes + 'm ago';
  } else if (hours < 24) {
    return hours + 'h ago';
  } else if (days < 7) {
    return days + 'd ago';
  } else if (weeks < 4) {
    return weeks + 'w ago';
  } else if (months < 12) {
    return months + 'mo ago';
  } else {
    return years + 'yr ago';
  }
};

export default getFormattedTimeDifference;
