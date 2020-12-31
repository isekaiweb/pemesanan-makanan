function setSatuan(data) {
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.querySelectorAll(".img-load").forEach((el, i) => {
  const img = document.createElement("img");
  img.classList = "img-fluid img-jenis";
  img.src = srcImageMakanan[i];
  let data = {
    box: el.parentElement.previousElementSibling.children[0].textContent,
    image: img,
  };
  dataImgModal.push(data);

  img.onload = function () {
    el.parentElement.replaceChild(img, el);
  };
});

(function loadBackground() {
  const bg = document.querySelector("#bg-profil");

  const bgImg = new Image();
  bgImg.src =
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  bgImg.onload = () => {
    convertToImage(bg);
    bg.children[0].remove();
    bg.style.backgroundImage = "url(" + bgImg.src + ")";
  };
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
  floatBtnExist = false,
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
      floatBtnExist = false;
      removeFloatBtnPesanan(timerBtnFloat);
    } else {
      floatBtnExist = true;
      tambahkanFloatBtnPesanan();
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

document.querySelectorAll(".tombol").forEach((btn) => {
  btn.innerHTML = `<button class="btn btn-success tombol-tambah">Tambah</button>
  <button class="tombol-dec d-none">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>
  </button>
  <span class="quantity text-dark d-none"></span>
  <button class="tombol-inc d-none">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </button>`;
});

window.addEventListener("load", () => {
  browserExternal(); //penambahan tombol eksternal browser
  // fungsi untuk penambahan quantity
  document.querySelectorAll(".tombol-tambah").forEach((e) =>
    e.addEventListener("click", function () {
      changeDisplay(this.parentElement.children);
      this.parentElement.children[2].textContent = 1;
      update(
        this.parentElement.parentElement.previousElementSibling.children[0]
          .textContent,
        this.parentElement.children[2].textContent
      );
    })
  );

  document.querySelectorAll(".tombol-inc").forEach((inc) => {
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
    dec.addEventListener("click", function () {
      this.nextElementSibling.textContent -= 1;
      if (this.nextElementSibling.textContent < 1) {
        changeDisplay(this.parentElement.children);
        this.nextElementSibling.textContent = "";
      }
      update(
        this.parentElement.parentElement.previousElementSibling.children[0]
          .textContent,
        this.nextElementSibling.textContent
      );
    });
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
  removeFloatBtnPesanan();
  if (detectMob()) {
    body.classList.add("overflow-hidden");
  } else {
    let yScroll = window.scrollY;
    window.onscroll = () => {
      window.scrollTo(0, yScroll);
    };
  }
}

function enableScroll() {
  tambahkanFloatBtnPesanan();
  if (detectMob()) {
    body.classList.remove("overflow-hidden");
  } else {
    window.onscroll = () => {
      return;
    };
  }
}
// fungsi open modal
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

// fungsi close modal
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
  el.onclick = (ev) => ev.stopPropagation();
});

let boxThis;
boxMakanan.forEach((box) => {
  box.addEventListener("click", function (e) {
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
  modal.children[0]
    .querySelector("#container-img-modal")
    .insertAdjacentHTML(
      "afterbegin",
      dataImgModal
        .filter((txt) => txt.box == box.children[0].children[0].textContent)
        .pop().image.outerHTML
    );
  modal.children[0].querySelector("#judul").textContent =
    box.children[0].children[0].textContent;
  modal.children[0].querySelector("#deskripsi").textContent =
    box.children[0].children[1].textContent;
  modal.children[0].querySelector("#harga").textContent =
    box.children[0].children[2].textContent;

  setTimeout(() => {
    modal.children[0].children[0].children[1].children[0].classList.remove(
      "img-jenis"
    );
  }, 400);
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

modal.children[0].querySelector("button").addEventListener("click", () => {
  const quantity = boxThis.querySelector(".quantity");
  if (quantity.textContent == "") {
    quantity.previousElementSibling.previousElementSibling.click();
  } else {
    quantity.nextElementSibling.click();
  }
});

const mainModal = modal.children[0].children[0];

// fungsi click float btn pesanan
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
        `<h2 id="grand-total">
            <span>Total Pembayaran</span>
            <span>${setSatuan(hargaMakanan + hargaMinuman)}</span>
          </h2>`;
      modal.children[0].replaceChild(bill, mainModal);
    }
    openModal();
  }, 300);

  function buatElementMakanan(m) {
    return `<p>
            <span>${m.nama}</span>
            <span>${setSatuan(m.harga)} x ${m.qyt}</span>
            <span>${setSatuan(m.harga * m.qyt)}</span>
          </p>`;
  }

  function elParentJenis(jenis, el, totalHarga) {
    return `<div>
            <h2>${jenis}</h2>
            ${el}
            <p class="sub-total">
              <span>Total Harga ${jenis}</span>
              <span>${totalHarga}</span>
            </p>
          </div>`;
  }
});

let st = 0,
  mv = 0;
modal.children[0].addEventListener("touchstart", function (start) {
  st = start.touches[0].pageY;
  this.addEventListener("touchmove", (mvs) => {
    mv = mvs.touches[0].pageY;
  });
});

modal.children[0].addEventListener("touchend", () => {
  if (st + 70 < mv) {
    st = 0;
    mv = 0;
    closeModal();
  }
});

// animasi float btn
let timer = null;
window.addEventListener(
  "scroll",
  () => {
    if (body.querySelector("#float-btn-pesanan") != null) {
      if (timer !== null) {
        containerFloatBtnPesanan.style.bottom = "-7.2em";
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        containerFloatBtnPesanan.style.bottom = "0";
      }, 500);
    }
  },
  false
);

//buat element float btn
function tambahkanFloatBtnPesanan() {
  if (body.querySelector("#float-btn-pesanan") == null && floatBtnExist) {
    document
      .querySelector("body .container")
      .insertAdjacentElement("afterend", containerFloatBtnPesanan);
    containerFloatBtnPesanan.style.bottom = "-7.2em";

    setTimeout(() => {
      if (
        document.querySelector("#tombol-browser") != null &&
        document.querySelector(".container-notif") == null
      ) {
        document.querySelector("#tombol-browser").style.bottom = "5em";
      }
      containerFloatBtnPesanan.style.bottom = "0";
    }, 500);
  }
}

// hapus element float btn
function removeFloatBtnPesanan(timeout = 500) {
  if (document.querySelector("#tombol-browser") != null) {
    document.querySelector("#tombol-browser").style.bottom = "3em";
  }
  containerFloatBtnPesanan.style.bottom = "-7.2em";
  setTimeout(() => {
    containerFloatBtnPesanan.remove();
  }, timeout);
}

document.querySelector("#icon-power").addEventListener("click", () => {
  if (!liff.isInClient() && liff.getLineVersion() == null) {
    liff.logout();
    window.location.reload();
  } else if (!liff.isInClient() && liff.getLineVersion() != null) {
    liff.logout();
    liff.closeWindow();
  } else {
    liff.closeWindow();
  }
});

// fungsi kirim pesanan
bill.children[3].addEventListener("click", () => {
  setTimeout(() => {
    imageBill();
  }, 0);
  setTimeout(() => {
    scrollY;
    disableScroll();
    if (liff.getLineVersion()) {
      setNotifikasi(alertSuccess);
    } else {
      setNotifikasi(alertFailed);
    }
    document
      .querySelector(".container-notif")
      .addEventListener("click", function (e) {
        if (
          e.target == this ||
          e.target.textContent.trim().toLowerCase() == "ok"
        ) {
          this.style.opacity = "0";
          setTimeout(() => {
            this.remove();
            enableScroll();
          }, 500);
        } else if (e.target.textContent.trim().toLowerCase() == "lanjut") {
          alert("siap");
          liif
            .sendMessages({
              type: "text",
              text: "Hello, World!",
            })
            .then(() => liff.closeWindow())
            .catch((e) => alert(`waduh ada error nih ${e}`))
            .finally(() => alert("siap juga"));
        }
      });
  }, 610);

  function setNotifikasi(notif) {
    mainPage.parentElement.insertAdjacentHTML(
      "afterbegin",
      `<div class="container-notif">
    <div class="notif">  
       ${notif.icon}
       ${notif.pesan}
       ${notif.btn}
   </div>
  </div>`
    );
  }
});

function browserExternal() {
  if (liff.getOS() != "web" && liff.getLineVersion() != null) {
    mainPage.insertAdjacentHTML(
      "beforeend",
      `<button id="tombol-browser">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <title>Open in Browser</title>
        <path
          fill-rule="evenodd"
          d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
        />
        <path
          fill-rule="evenodd"
          d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
        />
      </svg>
    </button>`
    );

    const btnExtendBrowser = document.querySelector("#tombol-browser");

    window.onload = () => {
      setTimeout(() => {
        btnExtendBrowser.style.right = "-3em";
      }, 500);
    };

    let sr = 0,
      mvr = 0;
    btnExtendBrowser.addEventListener("touchstart", function (onstart) {
      sr = onstart.touches[0].pageX;
      this.addEventListener("touchmove", (onmove) => {
        mvr = onmove.touches[0].pageX;
      });
    });

    btnExtendBrowser.addEventListener("touchend", function () {
      if (mvr == 0) {
        if (this.style.right != "0.5em") {
          this.style.right = "0.5em";
        } else {
          liff.openWindow({
            url: "https://makan-dikita.herokuapp.com/",
            external: true,
          });
        }
      } else {
        if (sr < mvr) {
          this.style.right = "-3em";
          sr = 0;
          mvr = 0;
        }
      }
    });
  }
}

function templatePesan() {}

function imageBill() {
  domtoimage.toJpeg(bill, { quality: 0.95 }).then((dataUrl) => {
    imgViewBill.src = dataUrl;
  });
}

function convertToImage(data) {
  domtoimage.toPng(data).then((dataUrl) => {
    imgPesan.src = dataUrl;
  });
}
