if (features.minuteFarmer && body && input.url.includes("mark_conversions")) {
    try {
        if (body.includes("termination_event")) { 
            sendToast("🚫 Limitador de tempo bloqueado.", 1000); 
            return; 
        }

        // 👉 Adiciona tempo aleatório entre 5 e 10 minutos
        let minutes = Math.floor(Math.random() * 6) + 5;
        let seconds = minutes * 60;

        // Substitui qualquer valor de "time_watched" no body
        body = body.replace(/"time_watched":[0-9]+/, `"time_watched":${seconds}`);

        init.body = body; // aplica a modificação

    } catch (e) { 
        debug(`🚨 Error @ minuteFarm.js\n${e}`); 
    }
}
