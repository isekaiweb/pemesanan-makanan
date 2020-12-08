const body = document.querySelector("body"),
  mainHTML = `<div class="container">
    <div
      class="row container-profil position-relative justify-content-center"
    >
      <div class="row" id="bg-profil"></div>
      <div class="d-flex p-0" id="profil"></div>
    </div>
    <p class="row jenis">Makanan</p>
    <div class="row box-makanan">
      <div class="col-lg-10 col-md-9 col-7 p-0 col-sm-8">
        <p class="nama-makanan">Burger Kampung Beef</p>
        <small class="deskripsi">Roti + Telur + Daging Sapi + Sayur</small>
        <p class="harga">25.000</p>
      </div>
      <div class="col-lg-2 col-md-3 col-5 p-0 col-sm-4">
        <img
          src="https://img-global.cpcdn.com/recipes/4bff3e772a0448ad/751x532cq70/burger-kampung-foto-resep-utama.jpg"
          alt=""
          class="img-fluid img-jenis"
        />
        <div class="tombol">
          <button class="btn btn-success rounded-circle">+</button>
          <span class="quantity">0</span>
          <button class="btn btn-danger rounded-circle">-</button>
        </div>
      </div>
    </div>

    <button
      class="btn rounded btn-secondary rounded-circle"
      id="tombol-browser"
    >
      <ion-icon name="browsers-outline"></ion-icon>
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
  <script src="liff.js"></script>`;

body.innerHTML = mainHTML;

const profilContainer = document.querySelector("#profil");
