containerFloatBtnPesanan.setAttribute("id", "float-btn-pesanan");
containerFloatBtnPesanan.innerHTML = `<div class="container px-2">
                      <button class="btn-success btn">
                        <p class="m-0">
                  
                        <span></span>
                        <span></span
                          >
                        </p>
                      </button>
                      </div>`;

modal.classList = "close-modal d-none";
modal.setAttribute("id", "container-modal");
modal.innerHTML = `<div id="field-content" class="container close-modal d-none">
                    <div class="bg-white modal-change-size" id="main-modal">
                    <hr class="close-modal" />
                      <div>
                        <img src="" class="img-fluid" />
                      </div>

                      <div class="main-action">
                        <p id="judul" class="main-action"></p>
                        <div class="main-action">
                          <small id="deskripsi" class="main-action"></small>  
                          <p id="harga" class="main-action"></p>
                        </div>
                      </div>

                      
                        <button class="btn btn-success close-modal">Tambah pesanan</button>
                      
                    </div>
                  </div>`;

bill.classList = "bg-white modal-change-size";
bill.setAttribute("id", "bill");
bill.innerHTML = `
          <hr class="close-modal" />
          <h1 class="text-center text-uppercase text-success font-weight-bold">
            daftar Pesanan
          </h1>
          <div class="main-action">         
          </div>
          <button class="btn btn-success my-3">
            Kirim Pesanan
          </button>
      `;

document.querySelectorAll(".img-load").forEach((el, i) => {
  const img = document.createElement("img");
  img.classList = "img-fluid img-jenis";
  img.src = srcImageMakanan[i];

  img.onload = function () {
    el.parentElement.replaceChild(img, el);
  };
});

(function loadBackground() {
  const bg = document.querySelector("#bg-profil");

  const bgImg = new Image();
  bgImg.onload = () => {
    bg.children[0].remove();
    bg.style.backgroundImage = "url(" + bgImg.src + ")";
  };
  bgImg.src =
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
})();

class DaftarMenu {
  constructor(jenis, namaMakanan, harga, quantity = 0) {
    this.jenis = jenis;
    this.nama = namaMakanan;
    this.qyt = quantity;
    this.harga = harga;
  }

  cetakHarga() {
    return this.harga * this.qyt;
  }
}

const m1 = new DaftarMenu("Makanan", "Burger Kampung Beef", 25000),
  m2 = new DaftarMenu("Makanan", "Potato Chrunch", 23000),
  m3 = new DaftarMenu("Minuman", "Milkshake", 17900),
  m4 = new DaftarMenu("Minuman", "Hot Chocolate", 22500),
  pesanan = [m1, m2, m3, m4];

const floatBtnPesanan = containerFloatBtnPesanan.children[0].children[0];
window.onload = () => {
  if (detectMob()) {
    Array.from(body.children).forEach((el) => el.classList.remove("hover"));
    floatBtnPesanan.classList.remove("hover");
  }
};
let intervalBtnFloat,
  timerBtnFloat,
  cetakJmlPesanan = () => {
    let totalHarga = 0,
      totalItem = 0;
    pesanan.forEach((menu) => {
      if (menu.cetakHarga() > 0) {
        totalHarga += parseInt(menu.cetakHarga());
        totalItem += parseInt(menu.qyt);

        floatBtnPesanan.children[0].children[0].textContent = `${totalItem} item`;
        floatBtnPesanan.children[0].children[1].textContent = `Rp ${setSatuan(
          totalHarga
        )}`;
      }
    });

    console.log(totalItem);

    if (totalItem == 1) {
      timerBtnFloat = 0;
      intervalBtnFloat = setInterval(() => {
        timerBtnFloat++;
      }, 1);
    } else {
      clearInterval(intervalBtnFloat);
      timerBtnFloat = timerBtnFloat <= 100 ? 0 : 500;
    }

    if (totalHarga == 0) {
      containerFloatBtnPesanan.style.bottom = "-7rem";
      setTimeout(() => {
        containerFloatBtnPesanan.remove();
      }, timerBtnFloat);
    } else {
      if (body.querySelector("#float-btn-pesanan") == null) {
        document
          .querySelector("body .container")
          .insertAdjacentElement("afterend", containerFloatBtnPesanan);
        containerFloatBtnPesanan.style.bottom = "-7rem";

        setTimeout(() => {
          containerFloatBtnPesanan.style.bottom = "0";
        }, 500);
      }
    }
  };

let update = (namaMakanan, qty) => {
  pesanan.forEach((menu) => {
    if (menu.nama == namaMakanan) {
      menu.qyt = qty;
    }
  });
  cetakJmlPesanan();
};

// fungsi untuk penambahan quantity
document.querySelectorAll(".tombol-tambah").forEach((e) =>
  e.addEventListener("click", function () {
    changeDisplay(this.parentElement.children);
    this.parentElement.children[2].textContent = 1;
    this.parentElement.parentElement.previousElementSibling.style.boxShadow =
      "inset 0.2em 0  #28a745";

    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.parentElement.children[2].textContent
    );
  })
);

document.querySelectorAll(".tombol-inc").forEach((inc) => {
  inc.classList.add("btn-success");
  inc.addEventListener("click", function () {
    this.previousElementSibling.textContent =
      parseInt(this.previousElementSibling.textContent) + 1;

    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.previousElementSibling.textContent
    );
  });
});
document.querySelectorAll(".tombol-dec").forEach((dec) => {
  dec.classList.add("btn-danger");
  dec.addEventListener("click", function () {
    this.nextElementSibling.textContent -= 1;
    if (this.nextElementSibling.textContent < 1) {
      changeDisplay(this.parentElement.children);
      this.nextElementSibling.textContent = "";
      this.parentElement.parentElement.previousElementSibling.style.removeProperty(
        "box-shadow"
      );
    }
    update(
      this.parentElement.parentElement.previousElementSibling.children[0]
        .textContent,
      this.nextElementSibling.textContent
    );
  });
});

function changeDisplay(children) {
  Array.from(children).forEach((e) => e.classList.toggle("d-none"));
}

//fungsi untuk mencek perangkat dibuka dimana
function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function disableScroll() {
  if (detectMob()) {
    body.classList.add("overflow-hidden");
  } else {
    let yScroll = window.scrollY;
    window.onscroll = () => {
      window.scrollTo(0, yScroll);
    };
  }
  containerFloatBtnPesanan.style.bottom = "-7rem";
}

function enableScroll() {
  if (detectMob()) {
    body.classList.remove("overflow-hidden");
  } else {
    window.onscroll = () => {
      return;
    };
  }
  containerFloatBtnPesanan.style.bottom = "0";
}

function openModal() {
  disableScroll();
  modal.children[0].classList.remove("d-none");
  modal.classList.remove("d-none");
  setTimeout(() => {
    document
      .querySelector("body .container")
      .insertAdjacentElement("afterend", modal);
  }, 100);
  setTimeout(() => {
    modal.children[0].children[0].classList.remove("modal-change-size");
  }, 160);

  setTimeout(() => {
    modal.style.background = " #302f2f48";
    modal.children[0].children[0].classList.add("close-now");
  }, 700);
}

function closeModal() {
  boxThis = undefined;
  if (modal.children[0].children[0].classList.contains("close-now")) {
    modal.style.removeProperty("background");
    modal.children[0].children[0].classList.remove("close-now");
    modal.children[0].children[0].classList.add("modal-change-size");

    setTimeout(() => {
      modal.children[0].classList.add("d-none");
      modal.classList.add("d-none");
      modal.remove();
    }, 500);

    setTimeout(() => {
      // cek modal
      if (modal.querySelector("#bill") != null) {
        modal.children[0].replaceChild(mainModal, bill);
      }
      enableScroll();
    }, 600);
  }
}

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) closeModal();
});

document.querySelectorAll(".tombol").forEach((el) => {
  el.onclik() = ev = ev.stopPropagation();
});

let boxThis;
boxMakanan.forEach((box) => {
  box.addEventListener("click", function (e) {
    // animasi ketika box makanan diklik
    let effect = document.createElement("span"),
      pos = getPosition(this);
    effect.classList.add("effect");
    effect.style.transform = `translate3d(
      ${e.pageX - pos.x - 10}px, ${e.pageY - pos.y - 10}px
    ,0)`;

    this.appendChild(effect);
    boxThis = this;
    isiModal(boxThis);
    openModal();
    setTimeout(() => {
      effect.remove();
    }, 500);
  });
});

const imgModal = [];
let timeOutModal;
// mengisi modal
function isiModal(box) {
  clearTimeout(timeOutModal);
  const src = box.children[1].children[0].src;
  if (src != undefined) {
    modal.querySelector("img").src = src;
  } else {
    timeOutModal = setTimeout(() => {
      isiModal(box);
    }, 500);
  }

  modal.querySelector("#judul").textContent =
    box.children[0].children[0].textContent;
  modal.querySelector("#deskripsi").textContent =
    box.children[0].children[1].textContent;
  modal.querySelector("#harga").textContent =
    box.children[0].children[2].textContent;
  loadDataImg(modal.querySelector("img"));
}

function loadDataImg(img) {
  const ld = document.createElement("div");
  ld.classList.add("load-img-main-modal");
  ld.innerHTML = `<div></div>`;

  img.parentElement.appendChild(ld);
  img.classList.add("d-none");

  img.onload = () => {
    ld.remove();
    img.classList.remove("d-none");
  };
}

//pangambilan posisi dari ukuran element
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

modal.querySelector("button").addEventListener("click", () => {
  const quantity = boxThis.querySelector(".quantity");
  if (quantity.textContent == "") {
    quantity.previousElementSibling.previousElementSibling.click();
  } else {
    quantity.nextElementSibling.click();
  }
});

// animasi float btn
let timer = null;
window.addEventListener(
  "scroll",
  function () {
    if (timer !== null) {
      containerFloatBtnPesanan.style.bottom = "-7rem";
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      containerFloatBtnPesanan.style.bottom =
        document.querySelector("#container-modal") != null ? "-7rem" : "0";
    }, 500);
  },
  false
);

// fungsi bagian modal
const mainModal = modal.children[0].children[0];

floatBtnPesanan.addEventListener("click", () => {
  clearTimeout(timeOutModal);
  floatBtnPesanan.style.transform = "translateY(-0.8em)";
  setTimeout(() => {
    floatBtnPesanan.style.removeProperty("transform");
    if (modal.querySelector("#bill") == null) {
      let elMakanan = "",
        hargaMakanan = 0,
        elMinuman = "",
        hargaMinuman = 0,
        makanan = "",
        minuman = "";
      pesanan.forEach((menu) => {
        if (menu.qyt > 0) {
          if (menu.jenis.toLowerCase() == "makanan") {
            hargaMakanan += menu.harga * menu.qyt;
            elMakanan += buatElementMakanan(menu);
            makanan = elParentJenis(
              menu.jenis,
              elMakanan,
              setSatuan(hargaMakanan)
            );
          } else {
            hargaMinuman += menu.harga * menu.qyt;
            elMinuman += buatElementMakanan(menu);
            minuman = elParentJenis(
              menu.jenis,
              elMinuman,
              setSatuan(hargaMinuman)
            );
          }
        }
      });

      bill.children[2].innerHTML =
        makanan +
        minuman +
        `<h2 id="grand-total" class="main-action">
            <span class="main-action">Total Pembayaran</span>
            <span class="main-action">${setSatuan(
              hargaMakanan + hargaMinuman
            )}</span>
          </h2>`;
      modal.children[0].replaceChild(bill, mainModal);
    }
    openModal();
  }, 300);
});

function buatElementMakanan(m) {
  return `<p class="main-action">
            <span class="main-action">${m.nama}</span>
            <span class="main-action">${setSatuan(m.harga)} x ${m.qyt}</span>
            <span class="main-action">${setSatuan(m.harga * m.qyt)}</span>
          </p>`;
}

function elParentJenis(jenis, el, totalHarga) {
  return `<div class="main-action">
            <h2 class="main-action">${jenis}</h2>
            ${el}
            <p class="sub-total main-action">
              <span class="main-action">Total Harga ${jenis}</span>
              <span class="main-action">${totalHarga}</span>
            </p>
          </div>`;
}

function setSatuan(data) {
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let st = 0,
  mv = 0;
modal.children[0].addEventListener("touchstart", function (start) {
  st = start.touches[0].pageY;

  this.addEventListener("touchmove", (mvs) => {
    if (!start.target.classList.contains("main-action")) {
      mv = mvs.touches[0].pageY;
    } else {
      mv = 0;
    }
  });
});

modal.children[0].addEventListener("touchend", () => {
  if (st + 50 < mv) {
    st = 0;
    mv = 0;
    timer = 200;
    close = true;
    closeModal();
  }
});
