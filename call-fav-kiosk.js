import xapi from "xapi";

const config = {
  target: "<target SIP address>",
};

/*********************************************************
 * Subscribe to status and events
 **********************************************************/

let listeners = [];
let timeout = null;
let fromContact = null;
let sip = null;
let startTime = null;
const serverUrl = "https://adjd-server.glitch.me/data/";

// Check if kiosk mode is available first before applying config and starting listeners
xapi.Config.UserInterface.Kiosk.Mode.get()
  .then((mode) => {
    console.log(`Kiosk Mode currently set to [${mode}]`);
    if (mode == "On") {
      startListeners();
    }
  })
  .catch((error) =>
    console.log(
      "Kiosk Mode not available on this device - this macro will not work - Error: ",
      error.message
    )
  );

// Start or Stop listeners if Kiosk mode changes
xapi.Config.UserInterface.Kiosk.Mode.on((mode) => {
  if (mode == "On") {
    startListeners();
  } else {
    stopListeners();
  }
});

function startListeners() {
  console.log("Setting up listners");
  listeners.push(
    xapi.Status.SystemUnit.State.NumberOfActiveCalls.on(processCallCount)
  );
  listeners.push(xapi.Status.Call.RemoteNumber.on(processRemoteNumber));
  listeners.push(xapi.Status.UserInterface.WebView.on(processWebViews));
  xapi.Status.SystemUnit.State.NumberOfActiveCalls.get().then((r) =>
    processCallCount(r)
  );
}

function stopListeners() {
  console.log("Stopping listners");
  const lenght = listeners.length;
  for (let i = 0; i < lenght; i++) {
    const listener = listeners.shift();
    listener();
  }
}

/*********************************************************
 * Main functions and event subscriptions
 **********************************************************/

let currentState = "Standby";

async function processWebViews(event) {
  if (!event.hasOwnProperty("URL")) return;
  const url = event.URL;
  const id = event.id;
  console.log(url);
  const hash = url.split("?")[Number("1")];
  console.log("hash", hash);
  const paramPairs = hash.split("&");

  // Create an object to store the parameters
  const params = {};

  // Iterate through parameter pairs and store them in the object
  paramPairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value); // Use decodeURIComponent to handle special characters
  });

  console.log("params", params);
  console.log("sip:", params["sip"]);
  console.log("from:", params["from"]);
  console.log("time:", params["time"]);

  sip = params["sip"];
  sip = sip.split("#")[0];
  timeout = params["time"];
  fromContact = params["from"];
  fromContact = fromContact.split("#")[0];

  // const sip=hash.split('=')[Number('0')]
  // const uri=hash.split('=')[Number('1')]
  // console.log(sip)
  // console.log(uri)

  if ("sip" in params) {
    xapi.Command.Dial({ Number: params["sip"] });
    return;
  }
}

async function processCallCount(event) {
  console.log("Number of calls: " + event);
  if (event == "1") {
    if (timeout) {
      startTime = Date.now(); // Record the start time when 'Start' button is clicked
      // timerInterval = setInterval(updateTimer, 1000);
      setTimeout(function () {
        xapi.Command.Call.Disconnect({ CallId: 0 });
        console.log("Timer is up!");
      }, timeout * 1000);
    }
  } else {
    // clearInterval(timerInterval); // Stop updating the timer when 'Stop' button is clicked
    if (startTime) {
      const endTime = Date.now(); // Get the current time when 'Stop' button is clicked
      const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
      console.log(parseInt(elapsedTime)); // Display elapsed time
      let updatedTime = timeout - parseInt(elapsedTime);
      if (updatedTime >= 0) {
        const payload = {
          time: updatedTime,
        };
        const Header = ["Content-Type: application/json"];
        return xapi.Command.HttpClient.Post(
          {
            AllowInsecureHTTPS: "True",
            Header,
            ResultBody: "PlainText",
            Url: serverUrl + fromContact,
          },
          JSON.stringify(payload)
        )
          .then((result) => {
            xapi.Config.UserInterface.Kiosk.URL.get().then((url) => {
              console.log(url);
              if (fromContact) {
                if (currentState === "Standby") {
                  currentState = "New";
                  const prehash = url.split("/form")[0];
                  const newUrl =
                    prehash +
                    "/form?email=" +
                    fromContact +
                    "#state=" +
                    currentState;
                  xapi.Config.UserInterface.Kiosk.URL.set(newUrl);
                } else {
                  currentState = "Standby";
                  const prehash = url.split("/form")[0];
                  const newUrl =
                    prehash +
                    "/form?email=" +
                    fromContact +
                    "#state=" +
                    currentState;
                  xapi.Config.UserInterface.Kiosk.URL.set(newUrl);
                }
              }
            });
          })
          .catch((e) => console.log("error in post", e));
      }
    }
  }
}

// function updateTimer() {
//     const currentTime = Date.now();
//     const elapsedTime = (currentTime - startTime) / 1000;
//     console.log(elapsedTime.toFixed(2));
// }

function processRemoteNumber(event) {
  console.log(`Remote Number[${event}]`);
  // Check if a monitoring number is present
  const match = config.queues.find((queue) => event.startsWith(queue.number));
  // Ignore calls with not matched number
  if (!match) {
    console.log("No number matched");
    return;
  }
}
