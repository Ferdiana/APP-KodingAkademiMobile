const formatDate = dateString => {
  const date = new Date(dateString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const englishDate = date.toLocaleDateString('en-US', options);
  return englishDate;
};

export default formatDate;
