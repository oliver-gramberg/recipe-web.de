module.exports = (Franz) => {
  const getMessages = function getMessages() {
    
    // Get count of unread messages; must manually navigate to the "E-Mail" tab.
    let count = 0;
    // getElementsByClassName returns an empty array; don't know why: that class 
    // name is clearly present several times in the DOM. Long line split for debugging.
    let els = document.querySelectorAll('[data-unread-count]');
    count = els.length;
    let el = els[1];
    let val = el.getAttribute('data-unread-count');
    if (val != null) {
      count = parseInt(val.replace(/[^0-9.]/g, ''), 10);
    }

    // Just in case we don't end up with a number, set it back to zero (parseInt can return NaN)
    if (isNaN(count)) {
      count = 0;
    }

    // set Franz badge
    Franz.setBadge(count);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
