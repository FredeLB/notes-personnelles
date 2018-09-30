import getCoords from './getCoords'

export default function animateScrollTo(targetNode) {
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  function scrollTo(to, duration) {
    var body = document.body;
    var docEl = document.documentElement;
    var start = docEl.scrollTop || body.scrollTop;
    var change = to - start;
    var currentTime = 0;
    var increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      body.scrollTop = val;
      docEl.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  if(targetNode==null) return

  var targetNodeTop = getCoords(targetNode).top;
  scrollTo(targetNodeTop, 750);
}


