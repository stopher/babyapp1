function createEvent(nameOfCustomEvent) {
  

  var event; // The custom event that will be created

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(nameOfCustomEvent, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = nameOfCustomEvent;
  }

  event.eventName = nameOfCustomEvent;

  if (document.createEvent) {
    document.dispatchEvent(event);
  } else {
    document.fireEvent("on" + event.eventType, event);
  }

}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

