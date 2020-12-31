window.addEventListener("load", changeSizeCard);
window.addEventListener("resize", changeSizeCard);

document.querySelector(
  ".not-login"
).children[0].children[0].children[0].innerHTML = starElement();

function starElement() {
  let el = "";
  for (i = 0; i < 5; i++) {
    el += `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
    />
  </svg>`;
  }
  return el;
}

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
      if (newEl == section[2] && !liff.isLoggedIn()) {
        window.location.reload();
      } else {
        oldEl.remove();
        oldEl1.remove();
        newEl.removeAttribute("class");
      }
    }, 500);
  };
}

document.querySelector(".btn-masuk").addEventListener("click", () => {
  liff.login();
});

function convertToImage() {
  const data = document.querySelector(".not-login > div");
  data.children[0].children[2].innerHTML = `aplikasi yang selalu menemani setiap kamu lapar, <br />
    yuk langsung aja pesan`;
  data.children[0].children[3].classList.add("d-none");

  domtoimage
    .toPng(data)
    .then((dataUrl) => {
      // templatePesan(dataUrl);
      alert(dataUrl);
    })
    .catch((error) => {
      alert("oops, something went wrong!", error);
    })
    .finally(() => {
      data.children[0].children[2].innerHTML = `aplikasi yang selalu menemani setiap kamu lapar, <br />
        yuk masuk dulu sebelum mesan`;
      data.children[0].children[3].classList.remove("d-none");
    });
}
