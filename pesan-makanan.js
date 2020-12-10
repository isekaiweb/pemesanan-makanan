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
  if (st + 50 < mv) {
    toggleModal();
  }
});

function toggleModal() {
  if (mainModal.parentElement.classList.contains("d-none")) {
    mainModal.parentElement.classList.toggle("d-none");
    mainModal.parentElement.parentElement.classList.toggle("d-none");
    setTimeout(() => {
      body.classList.toggle("overflow-hidden");
      mainModal.classList.toggle("modal-change-size");
    }, 0);
  } else {
    mainModal.classList.toggle("modal-change-size");
    setTimeout(() => {
      body.classList.toggle("overflow-hidden");
      mainModal.parentElement.classList.toggle("d-none");
      mainModal.parentElement.parentElement.classList.toggle("d-none");
    }, 500);
  }
}

mainModal.parentElement.parentElement.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dont-close")) toggleModal();
});

boxMakanan.forEach((box) => {
  box.addEventListener("click", function (e) {
    // animasi ketika box makanan diklik
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

    mainModal.children[0].children[1].src = this.children[1].children[0].src;
    mainModal.children[0].children[2].textContent = this.children[0].children[0].textContent;
    mainModal.children[0].children[3].textContent = this.children[0].children[1].textContent;
    mainModal.children[0].children[4].textContent = this.children[0].children[2].textContent;

    toggleModal();
  });
});
