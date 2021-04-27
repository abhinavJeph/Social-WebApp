// Function to call Noty : flash messages with animations
let callNoty = function (type, text) {
  new Noty({
    theme: "relax",
    text,
    type,
    layout: "topRight",
    timeout: 1500,
  }).show();
};
