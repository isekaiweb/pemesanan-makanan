ambilApiLIFF("1655324717-zK2NJ5e3");

function ambilApiLIFF(idLiff) {
  liff
    .init({
      liffId: idLiff,
    })
    .then(() => {
      mulaiAPP();
    })
    .catch(() => {
      alert("Id LIFF Tidak ada");
    });
}

function mulaiAPP() {
  //cek apakah sudah login
  if (!liff.isLoggedIn()) {
    liff.login();
  } else {
    liff
      .getProfile()
      .then((profile) => {
        nama.innerHTML = `Hi, ${profile.displayName}`;
        fotoProfil.src = profile.pictureUrl;
      })
      .catch((err) => {
        console.log("error", err);
      });
    removeClass(body, "d-none");
    removeClass(nama, "d-none");
    removeClass(fotoProfil, "d-none");
  }
}

function removeClass(el, cls) {
  el.classList.remove(cls);
}
