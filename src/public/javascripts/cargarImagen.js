document.getElementById("cargarImagen").onchange = (e)=> {
    const files = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = function(){
      const image = document.querySelector("#imagen");
      image.src = reader.result;
    }
}