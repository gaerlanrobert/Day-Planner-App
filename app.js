function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}
//  Creating the rows and columns //
$(document).ready(function() {
  $("#todaysDate").text(moment().format(" Qo, h:m a, dddd, MMMM Do"));
  for (let i = 9; i < 18; i++) {
    var row = $(`<div data-time=${i} id='${i}' class="row">`);
    var col1 = $(
      '<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + "</p>"
    );
    var col2 = $(
      `<div class="col-sm-8 past"><textarea id=text${i} class="info" placeholder="input your task."></textarea>`
    );
    var col3 = $(
      `<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`
    );

    row.append(col1);
    row.append(col2);
    row.append(col3);

    $(".container").append(row);

    getLocalStorage(i);
  }
  // setting up function formating hours //
  function formatAMPM(hours) {
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
  }
  formatAMPM();

  function changeColor() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
      if ($(`#${i}`).data("time") == currentTime) {
        $(`#text${i}`).addClass("current");
      } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass("future");
      }
    }
  }

  setInterval(function() {
    changeColor();
  }, 1000);

  var saveButton = $(".saveButton");
  saveButton.on("click", function() {
    let eventId = $(this).attr("id");
    let eventText = $(this)
      .parent()
      .siblings()
      .children(".info")
      .val();
    localStorage.setItem(eventId, eventText);
  });
});
