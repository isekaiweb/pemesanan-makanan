const openBrowser = document.querySelector("#tombol-browser"),
  body = document.querySelector("body"),
  profilContainer = document.querySelector("#profil"),
  boxMakanan = document.querySelectorAll(".box-makanan");

// fungsi untuk penambahan quantity
document.querySelectorAll(".tombol-tambah").forEach((e) =>
  e.addEventListener("click", function () {
    changeDisplay(this.parentElement.children);
    this.parentElement.children[2].textContent = 1;
    this.parentElement.parentElement.previousElementSibling.style.boxShadow =
      "inset 0.2em 0  #28a745";
  })
);

document.querySelectorAll(".tombol-inc").forEach((inc) => {
  inc.classList.add("btn-success");
  inc.addEventListener("click", function () {
    this.previousElementSibling.textContent =
      parseInt(this.previousElementSibling.textContent) + 1;
  });
});
document.querySelectorAll(".tombol-dec").forEach((dec) => {
  dec.classList.add("btn-danger");
  dec.addEventListener("click", function () {
    this.nextElementSibling.textContent -= 1;
    if (this.nextElementSibling.textContent < 1) {
      changeDisplay(this.parentElement.children);
      this.parentElement.parentElement.previousElementSibling.style.removeProperty(
        "box-shadow"
      );
    }
  });
});

function changeDisplay(children) {
  Array.from(children).forEach((e) => e.classList.toggle("d-none"));
}

// animasi ketika box makanan diklik
boxMakanan.forEach((box) => {
  box.addEventListener("click", function (e) {
    let effect = document.createElement("span"),
      pos = getPosition(this);
    effect.classList.add("effect");
    effect.style.transform = `translate(
      ${e.clientX - pos.x - Math.floor(20 / 2)}px, ${
      e.clientY - pos.y - Math.floor(20 / 2)
    }px
    )`;
    if (!e.target.parentElement.classList.contains("tombol")) {
      this.appendChild(effect);
      setTimeout(() => {
        effect.remove();
      }, 800);
    }

    function getPosition(el) {
      let xPosition = 0,
        yPosition = 0;

      while (el) {
        xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
        yPosition += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
      }

      return {
        x: xPosition,
        y: yPosition,
      };
    }
  });
});

// fungsi bagian modal
const mainModal = document.querySelector("#main-modal");
let st, mv;

mainModal.addEventListener("touchstart", function (start) {
  st = start.touches[0].clientY;
  this.addEventListener("touchmove", (mvs) => {
    mv = mvs.touches[0].clientY;
  });
});

mainModal.addEventListener("touchend", () => {
  if (st + 10 < mv) {
    console.log("down");
    closeModal();
  }
});

function closeModal() {
  mainModal.classList.add("modal-change-size");
  setTimeout(() => {
    mainModal.parentElement.parentElement.style.cssText = "display:none";
  }, 500);
}
