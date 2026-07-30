(function () {
    "use strict";

    var coolAlert = document.querySelector(".coolalert");
    var acceptCools = document.querySelector(".acceptcools");

    if (!coolAlert) { return; }

    // Forçamos a exibição sempre que a página carrega
    // Removemos a verificação do localStorage.getItem aqui
    coolAlert.classList.add("show");

    acceptCools.addEventListener("click", function () {
        // O botão agora apenas fecha visualmente a barra na sessão atual
        coolAlert.classList.remove("show");

        // Opcional: Se quiser que ele salve no navegador mas apareça de novo
        // na próxima visita, podemos limpar o registro ao clicar
        // localStorage.removeItem("aviso_visto");

        window.dispatchEvent(new Event("coolAlertAccept"));
    });

})();