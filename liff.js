window.addEventListener("load", () => {
  const idLiff = "1655324717-zK2NJ5e3";
  try {
    liff
      .init({
        liffId: idLiff,
      })
      .then(() => {
        mulaiAPP();
      })
      .catch((err) => {
        alert(err);
      });
  } catch (er) {
    alert(`Terjadi kesalahan silahkan reload halaman ${er}`);
    liff.closeWindow();
  }
});

//cek apakah sudah login jika belum maka login
function mulaiAPP() {
  if (liff.isLoggedIn()) {
    liff
      .getProfile()
      .then((profil) => {
        changeChild(section[0], section[1], section[2]);
        getDataUser(profil);
        alertb4(liff.getOS());
      })
      .catch((er) => {
        alert(`Terjadi kesalahan silahkan reload halaman ${er}`);
        liff.closeWindow()
      });
  } else {
    changeChild(section[0], section[2], section[1]);
  }
}

function alertb4(os) {
  if (liff.getLineVersion() == null) {
    document.querySelector("#bg-profil").insertAdjacentHTML(
      "beforebegin",
      `<div class="alert alert-warning alert-dismissible fade show alert-b4">
    <div class="container">
      <p>
        <strong>Kamu buka Dikita di ${os.toUpperCase()} Browser nih!</strong>,
        Yuk buka di Aplikasi LINE biar bisa mesan makananan yang kamu suka
      </p>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>`
    );
  }
}

function getDataUser(profil) {
  profilContainer.children[0].src = `${profil.pictureUrl}`;
  profilContainer.children[1].textContent = `Hi, ${profil.displayName}`;
}
