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
    changeChild(section[0], section[1], section[2]);
    liff
      .getProfile()
      .then((profil) => {
        getDataUser(profil);
      })
      .catch((err) => {
        console.error("error", err);
      });
    cekJikaLoginDariLine();
  } else {
    changeChild(section[0], section[2], section[1]);
  }
}

function cekJikaLoginDariLine() {
  if (!liff.isInClient()) {
    document
      .querySelector(".main-page")
      .parentElement.insertAdjacentElement("afterbegin", alertB4);
  }
}

function getDataUser(profil) {
  profilContainer.children[0].src = `${profil.pictureUrl}`;
  profilContainer.children[1].textContent = `Hi, ${profile.displayName}`;
  document.querySelector(".alert-b4").insertAdjacentHTML(
    "afterbegin",
    `<p>
    <strong>Anda mengakses Dikita di ${liff.getOS()}</strong>, segera akses melalui Aplikasi LINE untuk dapat menggunakan semua fitur yang ada
        </p>`
  );
}
