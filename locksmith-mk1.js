/** @param {NS} ns */
export async function main(ns) {
    const servers = scanAllServers(ns);

    for (const server of servers) {
        if (!ns.hasRootAccess(server)) {
            if (ns.fileExists("BruteSSH.exe", "home")) {
                ns.brutessh(server);
            }
            if (ns.fileExists("FTPCrack.exe", "home")) {
                ns.ftpcrack(server);
            }
            if (ns.fileExists("relaySMTP.exe", "home")) {
                ns.relaysmtp(server);
            }
            if (ns.fileExists("HTTPWorm.exe", "home")) {
                ns.httpworm(server);
            }
            if (ns.fileExists("SQLInject.exe", "home")) {
                ns.sqlinject(server);
            }

            if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
                ns.nuke(server);
                ns.tprint(`Gained root access to ${server}`);
            } else {
                ns.tprint(`Insufficient hacking skill for ${server}`);
            }
        }
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
