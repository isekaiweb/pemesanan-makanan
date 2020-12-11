const openBrowser = document.querySelector("#tombol-browser"),
  body = document.querySelector("body"),
  profilContainer = document.querySelector("#profil"),
  boxMakanan = document.querySelectorAll(".box-makanan");

const modal = document.createElement("div");
modal.classList = "close-modal d-none";
modal.setAttribute("id", "container-modal");
modal.innerHTML = `<div id="field-content" class="container close-modal d-none">
                    <div class="bg-white modal-change-size" id="main-modal">

                      <div class="rounded">
                        <hr class="close-modal" />
                        <img src="" class="img-fluid rounded" alt="" />
                      </div>

                      <div>
                        <p id="judul"></p>
                        <div>
                          <small id="deskripsi"></small>  
                          <p id="harga"></p>
                        </div>
                      </div>

                      <div>
                        <button class="btn btn-success close-modal">Tambah pesanan</button>
                      </div>
                      
                    </div>
                  </div>`;

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
const mainModal = modal.children[0].children[0];
let st, mv;

mainModal.addEventListener("touchstart", function (start) {
  st = start.touches[0].clientY;
  this.addEventListener("touchmove", (mvs) => {
    mv = mvs.touches[0].clientY;
  });
});

mainModal.addEventListener("touchend", () => {
  if (st + 50 < mv) {
    closeModal();
  }
});

let open = false;
function openModal() {
  mainModal.parentElement.classList.remove("d-none");
  mainModal.parentElement.parentElement.classList.remove("d-none");

  setTimeout(() => {
    body.appendChild(modal);
  }, 100);

  setTimeout(() => {
    mainModal.classList.remove("modal-change-size");
    open = true;
  }, 160);
}

function closeModal() {
  if (
    mainModal.clientHeight ==
    Math.floor(mainModal.parentElement.clientHeight * 0.9)
  ) {
    mainModal.classList.add("modal-change-size");
    setTimeout(() => {
      body.classList.remove("overflow-hidden");
      mainModal.parentElement.classList.add("d-none");
      mainModal.parentElement.parentElement.classList.add("d-none");
      body.removeChild(modal);
    }, 500);
  }
}

mainModal.parentElement.parentElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) closeModal();
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
    mainModal.children[1].children[0].textContent = this.children[0].children[0].textContent;
    mainModal.children[1].children[1].children[0].textContent = this.children[0].children[1].textContent;
    mainModal.children[1].children[1].children[1].textContent = this.children[0].children[2].textContent;

    if (!e.target.parentElement.classList.contains("tombol")) {
      openModal();
    }
  });
});
