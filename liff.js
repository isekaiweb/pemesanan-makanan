window.onload = () => {
  document.querySelector("body > .container").classList.add("d-none");
  ambilApiLIFF("1655324717-zK2NJ5e3");
};

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
    document.querySelector("body > .container").classList.remove("d-none");
  }
}
