// selecting the dom elements
const generateButton = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".pallete-container");

//we have added event listener to the button
generateButton.addEventListener("click", generatePallete);

paletteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log("Failed to copy text: ", err));
  } else if (e.target.classList.contains("color")) {
    const hexValue =
      e.target.nextElementSibling.querySelector(".color-hex").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"))
      )
      .catch((err) => console.log("Failed to copy text: ", err));
  }
});

function showCopySuccess(element) {
  element.classList.remove("far", "far-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePallete() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    // Generate a random hex color
    colors.push(generateRandomColor());
  }
  updatePalette(colors);
}

function generateRandomColor() {
  //generate a random hex color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePalette(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const colorHex = box.querySelector(".color-hex");
    colorDiv.style.backgroundColor = color;
    colorHex.textContent = color;
  });
}

generatePallete(); // Call the function to generate the initial palette
