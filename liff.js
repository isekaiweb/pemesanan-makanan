window.addEventListener("load", () => {
  const idLiff = "1655324717-zK2NJ5e3";
  liff
    .init({
      liffId: idLiff,
    })
    .then(() => {
      mulaiAPP();
    })
    .catch((err) => {
      console.error(err);
    });
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
      .catch((err) => {
        console.error("error", err);
      });
  } else {
    changeChild(section[0], section[2], section[1]);
  }
}

function alertb4(os) {
  if (!liff.isInClient()) {
    profilContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="alert alert-warning alert-dismissible fade show alert-b4">
    <div class="container">
      <p>
        <strong>Anda mengakses Dikita di ${os}</strong>,
        segera akses melalui Aplikasi LINE untuk dapat menggunakan semua
        fitur yang ada
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
