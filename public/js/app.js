document.getElementById("resetBtn").addEventListener("click", function(event) {
  document
    .getElementsByClassName("formContent")[0]
    .classList.add("hideDisplay");
  document
    .getElementsByClassName("errorContent")[0]
    .classList.add("hideDisplay");
});
document.getElementById("searchBtn").addEventListener("click", function(event) {
  const value = document.querySelector("#search").value;

  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(value)
  ).then(response => {
    processForData(response);
  });
});

let processForData = value => {
  if (value) {
    value.json().then(data => {
      if (data.error) {
        document
          .getElementsByClassName("formContent")[0]
          .classList.add("hideDisplay");
        document
          .getElementsByClassName("errorForm")[0]
          .classList.remove("hideDisplay");
        document.querySelector("#error").value = data.error;
        return;
      }
      console.log(data);
      document
        .getElementsByClassName("formContent")[0]
        .classList.remove("hideDisplay");
      document.querySelector("#location").textContent = data.place;
      document.querySelector(
        "#detail"
      ).textContent = `Currently the temperature is ${data.temperature}. There is ${data.precipProbability}% chances of rain. The weather is ${data.summary}`;
    });
  }
};
