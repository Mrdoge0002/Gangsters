const app = document.getElementById("wrap");
var slider = 0;

const container = document.createElement("div");
container.setAttribute("class", "container");
const inner = document.createElement("div");
inner.setAttribute("class", "inner");

app.appendChild(container);
container.appendChild(inner);

var request = new XMLHttpRequest()
request.open("GET", "./films.json", true)
request.onload = function loadFilms() {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const slide = document.createElement("div");
      const content = document.createElement("div");
      const bgimg = document.createElement("div");
      const img = document.createElement("div");
      var str = movie.title;
      str = str.replace(/\s+/g, "-").toLowerCase();
      str = str.replace(/'/g, "-");
      slide.setAttribute("class", "slide " + str);
      content.setAttribute("class", "content");
      bgimg.setAttribute("class", "bg");
      const h1 = document.createElement("h1");
      h1.textContent = movie.title;
      const h3 = document.createElement("h3");
      h3.textContent = movie.release_date;
      h3.setAttribute("data-splitting", "chars");
      h1.setAttribute("data-splitting", "words");
      const p = document.createElement("p");
      movie.description = movie.description.substring(0, 400);
      p.textContent = `${movie.description}...`;

      inner.appendChild(slide);
      slide.appendChild(content);
      slide.appendChild(bgimg);
      bgimg.appendChild(img);
      const backg = movie.image
      img.style.backgroundImage = `url('${backg}`
      slide.appendChild(h1);
      slide.appendChild(h3);
      content.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Something is no bueno`;
    app.appendChild(errorMessage);
  }

  $(".right").click(function() {
    var total = $(".slide").length;
    if (slider < (total - 1) * 100) {
      slider = slider + 100;
      $(".slide.active")
        .next()
        .addClass("active");
      $(".slide.active")
        .first()
        .removeClass("active");
    } else {
      slider = 0;
      $(".inner .slide").removeClass("active");
      $(".inner .slide")
        .first()
        .addClass("active");
    }
    $("body")
      .get(0)
      .style.setProperty("--slide", "-" + slider + "%");
  });

  $(".left").click(function() {
    var total = $(".slide").length;
    if (slider == 0) {
      slider = (total - 1) * 100;

      $(".slide")
        .last()
        .addClass("active");
      $(".slide")
        .first()
        .removeClass("active");
    } else {
      slider = slider - 100;
      $(".slide.active")
        .prev()
        .addClass("active");
      $(".slide.active")
        .last()
        .removeClass("active");
    }
    $("body")
      .get(0)
      .style.setProperty("--slide", "-" + slider + "%");
  });
};

var smallType = [
  "in the",
  "of the",
  "my ",
  "My ",
  "the ",
  "The ",
  "Up on",
  "Was "
];

request.send();

$(".arrow").click(function() {
  $(".spritebox").toggleClass("zoomies");
});

$(document).ready(function() {
  setTimeout(function() {
    $.each(smallType, function(index, value) {
      $("h1:contains(" + value + ")").html(function(_, html) {
        var regex = new RegExp(value, "g");
        return html.replace(
          regex,
          '<span class="smallcaps">' + value + "</span>"
        );
      });
    });
    $("#wrap").addClass("loaded");
    Splitting();
  }, 500);

  setTimeout(function() {
    $(".inner .slide")
      .first()
      .addClass("active");
  }, 700);
});