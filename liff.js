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

function mulaiAPP() {
  //cek apakah sudah login jika belum maka login
  if (!liff.isLoggedIn()) {
    liff.login();
    changeChild(section[0], section[1]);
    console.log(section);
  } else {
    changeChild(section[1], section[2]);
    console.log(section);
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

function removeClass(el, cls) {
  el.classList.remove(cls);
}

/* <div class="container mb-4 px-4">
      <!-- bagian profil -->
      <div
        class="row container-profil position-relative justify-content-center"
      >
        <div class="row" id="bg-profil">
          <div>
            <div></div>
          </div>
        </div>
        <div class="d-flex" id="profil"></div>
      </div>

      <!-- bagian makanan -->
      <p class="row jenis">
        Makanan
        <ion-icon name="pizza-outline"></ion-icon>
      </p>
      <div class="row box-makanan mb-2">
        <div class="keterangan">
          <p class="nama-makanan">Burger Kampung Beef</p>
          <small class="deskripsi">Roti + Telur + Daging Sapi + Sayur</small>
          <p class="harga text">25.000</p>
        </div>
        <div class="visual">
          <div class="img-load"><div></div></div>
        <div class="tombol bukan-tringger-modal">
            <button class="btn btn-success tombol-tambah bukan-tringger-modal">
              Tambah
            </button>

            <button
              class="tombol-dec font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&minus;</span>
            </button>
            <span class="quantity text-dark d-none bukan-tringger-modal"></span>
            <button
              class="tombol-inc font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&plus;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="row box-makanan">
        <div class="keterangan">
          <p class="nama-makanan">Potato Chrunch</p>
          <small class="deskripsi">Kentang + Mayones + Saus</small>
          <p class="harga text">23.000</p>
        </div>
        <div class="visual">
          <div class="img-load"><div></div></div>
        <div class="tombol bukan-tringger-modal">
            <button class="btn btn-success tombol-tambah bukan-tringger-modal">
              Tambah
            </button>

            <button
              class="tombol-dec font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&minus;</span>
            </button>
            <span class="quantity text-dark d-none bukan-tringger-modal"></span>
            <button
              class="tombol-inc font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&plus;</span>
            </button>
          </div>
        </div>
      </div>

      <button
        class="btn rounded btn-info rounded-circle d-none"
        id="tombol-browser"
      >
        <ion-icon name="open-outline"></ion-icon>
      </button>

      <!-- bagian minuman -->
      <p class="row jenis">Minuman<ion-icon name="beer-outline"></ion-icon></p>
      <div class="row box-makanan mb-2">
        <div class="keterangan">
          <p class="nama-makanan">Milkshake</p>
          <small class="deskripsi">Soda + strowberry + Susu</small>
          <p class="harga text">17.900</p>
        </div>
        <div class="visual">
          <div class="img-load"><div></div></div>

        <div class="tombol bukan-tringger-modal">
            <button class="btn btn-success tombol-tambah bukan-tringger-modal">
              Tambah
            </button>

            <button
              class="tombol-dec font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&minus;</span>
            </button>
            <span class="quantity text-dark d-none bukan-tringger-modal"></span>
            <button
              class="tombol-inc font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&plus;</span>
            </button>
          </div>
          
        </div>
      </div>
      <div class="row box-makanan">
        <div class="keterangan">
          <p class="nama-makanan">Hot Chocolate</p>
          <small class="deskripsi">coklat + mocha</small>
          <p class="harga text">22.500</p>
        </div>
        <div class="visual">
          <div class="img-load"><div></div></div>
          <div class="tombol bukan-tringger-modal">
            <button class="btn btn-success tombol-tambah bukan-tringger-modal">
              Tambah
            </button>

            <button
              class="tombol-dec font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&minus;</span>
            </button>
            <span class="quantity text-dark d-none bukan-tringger-modal"></span>
            <button
              class="tombol-inc font-weight-bolder text-light rounded-circle d-none bukan-tringger-modal"
            >
              <span class="bukan-tringger-modal">&plus;</span>
            </button>
          </div>
        </div>
      </div>

      <button
        class="btn rounded btn-success d-none rounded-circle"
        id="tombol-browser"
      >
        <ion-icon name="open-outline"></ion-icon>
      </button>
    </div> 
  
   <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>

    <script
      type="module"
      src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
    ></script>

    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script src="pesan-makanan.js"></script>
    <script src="liff.js"></script>
  
  */
