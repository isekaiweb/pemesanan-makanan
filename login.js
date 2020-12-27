const loading = document.querySelector(".load"),
  body = document.querySelector("body"),
  section = document.querySelectorAll("body > div");

window.addEventListener("load", changeSizeCard);
window.addEventListener("resize", changeSizeCard);

function changeSizeCard() {
  if (window.innerWidth < window.innerHeight) {
    card("100%");
  } else {
    card("30%");
  }
}

function card(size) {
  const card = document.querySelectorAll(".card");
  card.forEach((cr) => {
    cr.style.width = `${size}`;
  });
}

function buble() {
  const span = document.createElement("span"),
    size = Math.random() * 1.3;

  span.style.width = size + "em";
  span.style.height = size + "em";
  span.style.left = `${Math.random() * loading.children[0].offsetWidth}px`;
  loading.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 1000);
}

setInterval(buble, 200);

function changeChild(oldEl, oldEl1, newEl) {
  const img = new Image();
  img.src =
    "https://images.unsplash.com/photo-1550949987-440138d6550e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=889&q=80";

  img.onload = () => {
    setTimeout(() => {
      document.querySelector(
        ".not-login > div"
      ).style.cssText = `background-image: linear-gradient(#284b3c9a, #f8f9faaf, #f8f9fa),url("${img.src}")`;
      body.style.backgroundColor = "#f8f9fa";
      oldEl.remove();
      oldEl1.remove();
      newEl.classList.remove("d-none");
      clearInterval(buble);
    }, 1000);
  };
}

document.querySelector(".btn-masuk").addEventListener("click", () => {
  liff.login();
  changeChild(section[0], section[1], section[2]);
});
