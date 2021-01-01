window.addEventListener("load", () => {
  eventElementBtnQuantity();
  eventBtnExtendBrowser();
});

function setSatuan(data) {
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  const bgImg = new Image();
  bgImg.src =
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  bgImg.onload = () => {
    bgProfil.children[0].remove();
    bgProfil.style.backgroundImage = `url("${bgImg.src})`;
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

function eventElementBtnQuantity() {
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
}

function changeDisplay(children) {
  Array.from(children).forEach((e) => e.classList.toggle("d-none"));
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
function closeModal(e = null) {
  boxThis = undefined;

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
    if (e == null) {
      enableScroll();
    }
  }, 600);
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
  let elMakanan = "",
    hargaMakanan = 0,
    elMinuman = "",
    hargaMinuman = 0,
    makanan = "",
    minuman = "",
    isiPesan = "";

  clearTimeout(timeOutModal);
  floatBtnPesanan.style.transform = "translateY(-0.8em)";
  setTimeout(() => {
    floatBtnPesanan.style.removeProperty("transform");
    if (modal.querySelector("#bill") == null) {
      pesanan.forEach((menu) => {
        if (menu.qyt > 0) {
          isiPesan += `- ${menu.nama} ${menu.qyt}\n`;
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

  // fungsi kirim pesanan
  bill.children[3].addEventListener("click", () => {
    console.log(isiPesan);
    if (liff.getLineVersion() != null) {
      try {
        templatePesan();
      } catch (er) {
        alert(er);
      }
    } else {
      closeModal("not-null");
      containerNotif.style.opacity = "1";
      setTimeout(() => {
        mainPage.parentElement.insertAdjacentElement(
          "afterbegin",
          containerNotif
        );

        setTimeout(() => {
          containerNotif.classList.add("blur-container");
          disableScroll();
        }, 90);
      }, 700);
    }
  });

  containerNotif.addEventListener("click", function (e) {
    if (e.target == this || e.target.classList.contains("btn")) {
      enableScroll();
      this.style.opacity = "0";
      setTimeout(() => {
        this.classList.remove("blur-container");
        this.remove();
      }, 500);

      if (e.target.classList.contains("btn")) {
        liff.openWindow({
          url:
            "https://line.me/R/oaMessage/@598xsauf/?https://liff.line.me/1655324717-zK2NJ5e3",
        });
      }
    }
  });

  function templatePesan() {
    liff
      .sendMessages([
        {
          type: "text",
          text: `Hi Dikita, Saya ${[
            ...document.querySelector("#nama-profil").textContent,
          ]
            .slice(4)
            .join("")} Mau Pesan\n${isiPesan}`,
        },
      ])
      .then(() => liff.closeWindow())
      .catch((er) => alert(`ada masalah nih : ${er}`));
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
      btnExtendBrowser.style.bottom = "6em";
      containerFloatBtnPesanan.style.bottom = "0";
    }, 500);
  }
}

// hapus element float btn
function removeFloatBtnPesanan(timeout = 500) {
  btnExtendBrowser.style.bottom = "3em";

  containerFloatBtnPesanan.style.bottom = "-7.2em";
  setTimeout(() => {
    containerFloatBtnPesanan.remove();
  }, timeout);
}

document.querySelector("#icon-power").addEventListener("click", () => {
  if (!liff.isInClient()) {
    liff.logout();
    window.location.reload();
  } else {
    liff.closeWindow();
  }
});

function eventBtnExtendBrowser() {
  if (liff.getOS() != "web" && liff.getLineVersion() != null) {
    mainPage.appendChild(btnExtendBrowser);

    setTimeout(() => {
      btnExtendBrowser.style.right = "-3.5em";
    }, 2500);

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
          this.style.right = "-3.5em";
          sr = 0;
          mvr = 0;
        }
      }
    });
  }
}
