const loading = document.querySelector(".load"),
  mainPage = document.querySelector(".main-page"),
  body = document.querySelector("body"),
  section = document.querySelectorAll("body > div"),
  openBrowser = document.querySelector("#tombol-browser"),
  profilContainer = document.querySelector("#profil > div"),
  boxMakanan = document.querySelectorAll(".box-makanan"),
  containerFloatBtnPesanan = document.createElement("div"),
  modal = document.createElement("div"),
  bill = document.createElement("div"),
  dataImgModal = [],
  srcImageMakanan = [
    "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/239584/pexels-photo-239584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ],
  alertSuccess = {
    pesan: `<p>Mantap! kamu udah berhasil ngirimin pesanan kamu, yuk tekan tombol lanjut dan
    kamu akan diarahin ke proses pembelian</p> `,
    icon: `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 16 16"
  style="color: var(--success)"
>
  <path
    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
  />
</svg> `,
    btn: `<button class="btn btn-success text-uppercase font-weight-bold">
Lanjut
</button>`,
  },
  alertFailed = {
    pesan: `<p>Maaf nih untuk melakukan pemesanan kamu harus buka Dikita melalui App LINE</p>`,
    icon: `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 16 16"
  style="color: var(--danger)"
>
  <path
    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
  />
</svg> `,
    btn: `<button class="btn btn-danger text-uppercase font-weight-bold">
ok
</button>`,
  };

containerFloatBtnPesanan.setAttribute("id", "float-btn-pesanan");
containerFloatBtnPesanan.innerHTML = `<div class="container px-2">
                                              <button class="btn-success btn">
                                                <p class="m-0">
                                          
                                                <span></span>
                                                <span></span
                                                  >
                                                </p>
                                              </button>
                                              </div>`;

modal.classList = "close-modal d-none";
modal.setAttribute("id", "container-modal");
modal.innerHTML = `<div id="field-content" class="container close-modal d-none">
                                            <div class="bg-white modal-change-size" id="main-modal">
                                            <hr class="close-modal" />
                                              <div id="container-img-modal">                       
                                              </div>
                        
                                              <div>
                                                <p id="judul"></p>
                                                <div>
                                                  <small id="deskripsi"></small>  
                                                  <p id="harga"></p>
                                                </div>
                                              </div>
                        
                                              
                                                <button class="btn btn-success close-modal">Tambah pesanan</button>
                                              
                                            </div>
                                          </div>`;

bill.classList = "bg-white modal-change-size";
bill.setAttribute("id", "bill");
bill.innerHTML = `
                                  <hr class="close-modal" />
                                  <h1 class="text-center text-uppercase text-success font-weight-bold">
                                    daftar Pesanan
                                  </h1>
                                  <div>         
                                  </div>
                                  <button class="btn btn-success my-3 close-modal">
                                    Kirim Pesanan
                                  </button>
                              `;
