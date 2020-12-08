// ambilApiLIFF("1655324717-zK2NJ5e3");

// function ambilApiLIFF(idLiff) {
//   liff
//     .init({
//       liffId: idLiff,
//     })
//     .then(() => {
//       mulaiAPP();
//     })
//     .catch(() => {
//       alert("Id LIFF Tidak ada");
//     });
// }

// function mulaiAPP() {
//   //cek apakah sudah login
//   if (!liff.isLoggedIn()) {
//     liff.login();
//   } else {
//     liff
//       .getProfile()
//       .then((profile) => {
//         profilContainer.innerHTML += ` <img src=${profile.pictureUrl}
//                                 class="img-fluid rounded-circle"
//                                 id="img-profil"
//                                 alt="foto profil"
//                                 />`;
//         profilContainer.innerHTML += `<p id="nama-profil">Hi, ${profile.displayName}</p>`;
//       })
//       .catch((err) => {
//         console.log("error", err);
//       });
//     removeClass(body, "d-none");
//   }
// }

// function removeClass(el, cls) {
//   el.classList.remove(cls);
// }
