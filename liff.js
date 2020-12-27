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
      .then((profile) => {
        profilContainer.innerHTML += ` <img src=${profile.pictureUrl}
                                class="img-fluid rounded-circle"
                                id="img-profil"
                                alt="foto profil"
                                />`;
        profilContainer.innerHTML += `<p id="nama-profil">Hi, ${profile.displayName}</p>`;
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}
