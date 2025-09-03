const originalFetch = window.fetch;

window.fetch = async function (input, init = {}) {
    let body;

    if (input instanceof Request) {
        body = await input.clone().text();
    } else if (init.body) {
        body = init.body;
    }

    // Se for a requisição que marca minutos
    if (features.minuteFarmer && body && input.url.includes("mark_conversions")) {
        try {
            if (body.includes("termination_event")) {
                sendToast("🚫 Limitador de tempo bloqueado.", 1000);
                return;
            }

            // 🎲 Tempo aleatório entre 5 e 10 minutos (em segundos)
            const randomMinutes = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            const randomSeconds = randomMinutes * 60;

            // Substitui ou injeta o tempo dentro do body
            body = body.replace(/"timeSpent":\d+/g, `"timeSpent":${randomSeconds}`);

            // Atualiza init/body com a nova versão
            if (!(input instanceof Request)) {
                init.body = body;
            } else {
                input = new Request(input, { body });
            }

            sendToast(`⏱️ Marcando ${randomMinutes} minutos nesta questão.`, 2000);
        } catch (e) {
            debug(`🚨 Error @ minuteFarm.js\n${e}`);
        }
    }

    return originalFetch.apply(this, [input, init]);
};
