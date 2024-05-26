/** @param {NS} ns */
export async function main(ns) {
    const scriptNames = ["accountant-mk2.js", "enabler-mk2.js", "disabler-mk2.js"];
    const servers = scanAllServers(ns);

    while (true) {
        for (const server of servers) {
            if (server === "home") continue;

            if (ns.hasRootAccess(server)) {
                const serverData = ns.getServer(server);
                decideAndRunScript(ns, server, serverData);
            }
        }
        await ns.sleep(60000);
    }
}

function scanAllServers(ns, host = "home", found = new Set(["home"])) {
    for (const server of ns.scan(host)) {
        if (!found.has(server)) {
            found.add(server);
            scanAllServers(ns, server, found);
        }
    }
    return [...found];
}

function decideAndRunScript(ns, server, serverData) {
    const moneyThreshold = serverData.moneyMax * 0.75;
    const securityThreshold = serverData.minDifficulty + 5;

    if (serverData.hackDifficulty > securityThreshold) {
        runScript(ns, server, "disabler-mk2.js");
    } else if (serverData.moneyAvailable < moneyThreshold) {
        runScript(ns, server, "enabler-mk2.js");
    } else {
        runScript(ns, server, "accountant-mk2.js");
    }
}

function runScript(ns, server, script) {
    const maxRam = ns.getServerMaxRam(server);
    const usedRam = ns.getServerUsedRam(server);
    const scriptRam = ns.getScriptRam(script);
    const availableRam = maxRam - usedRam;

    const threads = Math.floor(availableRam / scriptRam);

    if (threads > 0) {
        ns.exec(script, server, threads);
        ns.tprint(`Running ${script} on ${server} with ${threads} threads`);
    }
}
