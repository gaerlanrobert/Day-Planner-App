// saving input to local storage //

function storeLocal(key) {
  let value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}
const newLocal = 1000;
//  creating function using Moment JS documentation using Tokens //
$(document).ready(function() {
  $("#todaysDate").text(moment().format(" Qo, h:m a, dddd, MMMM Do"));
  for (let i = 9; i < 18; i++) {
    var row = $(`<div data-time=${i} id='${i}' class="row">`);

    // column 1 //
    var col1 = $(
      '<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + "</p>"
    );

    // column 2 //

    var col2 = $(
      `<div class="col-sm-8 past"><textarea id=text${i} class="info" placeholder="input your task."></textarea>`
    );

    // column 3 //

    var col3 = $(
      `<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`
    );

    // appending rows to columns//

    row.append(col1);
    row.append(col2);
    row.append(col3);

    $(".container").append(row);

    storeLocal(i);
  }

  formatAMPM();
  // color change based on current time of day
  function colorChanger() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
      if ($(`#${i}`).data("time") == currentTime) {
        $(`#text${i}`).addClass("current");
      } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass("future");
      }
    }
  }

  // setting up function formating hours //
  function formatAMPM(localTime) {
    var ampm = localTime >= 12 ? "pm" : "am";
    localTime = localTime % 12;
    localTime = localTime ? localTime : 12;

    return localTime + ampm;
  }

  setInterval(function() {
    colorChanger();
  }, newLocal);

  // saving input to local storage with onclick of button //
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
