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
    body.classList.remove("d-none");
  }
}
