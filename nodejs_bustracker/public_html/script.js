$(document).ready(function () {
  var prevSelected = null; // a variable to store the previously selected bus stop

  // get bus arrival data from API
  $.ajax({
    url: "/bustracker_list",
    type: "GET",
    cache: false,
    dataType: "json",
    data: { busRouteId: "100100118", resultType: "json" },
    success: function (data) {
      // create bus-stop
      var busStops = $("#bus-stops-wrapper");

      // Loop through the data and create a bus stop for each entry
      for (var i = 0; i < data.length; i++) {
        var busStop = $("<div>").addClass("bus-stop"); // Create a new div element with class "bus-stop"
        busStop.text(data[i].stNm); // Set the text of the bus stop to the station name
        busStop.data("arrmsg1", data[i].arrmsg1); // Store the arrmsg1 data as a jQuery data property of the bus stop element

        // When the bus stop is clicked, display the arrmsg1 data and update the active state
        busStop.click(function () {
          var arrmsg1 = $(this).data("arrmsg1"); // Get the arrmsg1 data from the bus stop element's data property
          $("#bus-stops-wrapper .bus-stop").removeClass("active"); // Remove the "active" class from all bus stops
          $(this).addClass("active").text(arrmsg1); // Add the "active" class to the clicked bus stop and set its text to the arrmsg1 data

          // Reset the state of the previously selected bus stop
          if (prevSelected !== null && prevSelected !== this) {
            $(prevSelected)
              .removeClass("active")
              .text($(prevSelected).data("stnm")); // Remove the "active" class from the previous bus stop and reset its text to the station name
          }
          prevSelected = this; // Set the current bus stop as the previously selected one
        });

        busStop.data("stnm", data[i].stNm); // Store the station name data as a jQuery data property of the bus stop element
        busStops.append(
          $("<div>").addClass("bus-stop-wrapper").append(busStop)
        ); // Create a div element with class "bus-stop-wrapper" and append the bus stop element to it, then append the wrapper to the bus stops container
      }
    },
    error: function (request, status, error) {},
  });
});
