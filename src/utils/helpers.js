export const sortData = (data, sortBy) => {
  switch (sortBy) {
    case "A-Z":
      data.sort((a, b) => {
        if (a.title < b.title) return -1;
        else 0;
      });
      break;

    case "Z-A":
      data.sort((a, b) => {
        if (a.title > b.title) return -1;
        else 0;
      });
      break;

    case "byDate >":
      data.sort((a, b) => {
        if (a.published_date > b.published_date) return -1;
        else 0;
      });
      break;

    case "byDate <":
      data.sort((a, b) => {
        if (a.published_date < b.published_date) return -1;
        else 0;
      });
      break;

    default:
      break;
  }
  return data;
};
