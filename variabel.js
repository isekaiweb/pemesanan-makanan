const loading = document.querySelector(".load"),
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
  alertB4 = document.createElement("div");

alertB4.classList = "alert alert-warning alert-dismissible fade show";
alertB4.setAttribute("role", "alert");
alertB4.innerHTML = `   <p class="text-center"><strong>Anda mengakses diluar aplikasi LINE</strong>,akses aplikasi Dikita
                            melalui LINE agar dapat mengunakan semua fiturnya
                        </p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>`;

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
