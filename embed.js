function renderSite(site) {
    return Mustache.render($("#siteLink").text(), site);
}

$(document).ready(function() {
  var refer = document.referrer;
  var blob = $.getJSON("ring.json", function(data) {
      var currentSite = undefined;
      var ring = data.ring;
      var nextIdx = 0;
      var prevIdx = 0;

      for(var i = 0; i < ring.length; i++) {
        if (refer.startsWith(ring[i].url)) {
          currentSite = ring[i];
          nextIdx = i + 1;
          prevIdx = i - 1;
          break;
        }
      }

      nextIdx = nextIdx >= ring.length ? 0 : nextIdx;
      prevIdx = prevIdx < 0 ? ring.length-1 : prevIdx;
      randIdx = Math.floor(Math.random() * ring.length);
      $("#current").append(renderSite(currentSite));
      $("#next").append(renderSite(ring[nextIdx]));
      $("#previous").append(renderSite(ring[prevIdx]));
      $("#random").append(renderSite(ring[randIdx]));
  });
});
