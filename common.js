console.log("this is common.js");
export const doSomething = () => {
  console.log("function");
};

export const initDarkMode = () => {
  const darkModeBtn = document.querySelector(".theme-toggle");
  let isDarkMode = false;

  darkModeBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    document.body.classList.toggle("dark-theme", isDarkMode);

    const themeText = document.querySelector(".theme-text");
    themeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  });
};
