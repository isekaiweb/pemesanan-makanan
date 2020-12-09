const openBrowser = document.querySelector("#tombol-browser"),
  body = document.querySelector("body"),
  profilContainer = document.querySelector("#profil");

document.querySelectorAll(".tombol-tambah").forEach((e) =>
  e.addEventListener("click", function () {
    changeDisplay(this.parentElement.children);
    e.parentElement.children[2].textContent = 1;
  })
);

document.querySelectorAll(".tombol-inc").forEach((inc) => {
  inc.addEventListener("click", function () {
    this.previousElementSibling.textContent =
      parseInt(this.previousElementSibling.textContent) + 1;
  });
});
document.querySelectorAll(".tombol-dec").forEach((dec) => {
  dec.addEventListener("click", function () {
    this.nextElementSibling.textContent -= 1;
    if (this.nextElementSibling.textContent < 1) {
      changeDisplay(this.parentElement.children);
    }
  });
});

function changeDisplay(children) {
  Array.from(children).forEach((e) => e.classList.toggle("d-none"));
}
