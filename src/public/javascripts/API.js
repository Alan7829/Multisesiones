const botones = document.querySelectorAll(".bt");

botones.forEach(boton => {
    boton.addEventListener("click", e => {
        e.preventDefault();
        fetch("/Usuarios/Eliminar/" + e.target.id)
            .then(
                id => id.json()
            ).then(id => location.reload())
    });
});