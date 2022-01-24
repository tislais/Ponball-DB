// Returns an array of contributors for a row
export const getContributors = (row) => {
  const contributors = row.querySelectorAll('a');
  return [...contributors].map((n) => n.textContent);
};

// Returns an object with a file's text and link
export const getFiles = (file) => {
  // Exclude copyright blocks
  if (!file.textContent.includes('Availability limited by copyright')) {
    return {
      text: file.textContent,
      link: file.href,
    };
  } else {
    return null;
  }
};
