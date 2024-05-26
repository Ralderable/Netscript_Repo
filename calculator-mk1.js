/** @param {NS} ns */
export async function main(ns) {
    const servers = scanAllServers(ns);
    const serverInfoList = [];

    for (const server of servers) {
        if (server === "home") continue;

        const serverInfo = {
            name: server,
            hackingLevel: ns.getHackingLevel(),
            securityLevel: ns.getServerSecurityLevel(server),
            minSecurityLevel: ns.getServerMinSecurityLevel(server),
            maxMoney: ns.getServerMaxMoney(server),
            hackTime: ns.getHackTime(server),
            growTime: ns.getGrowTime(server),
            weakenTime: ns.getWeakenTime(server),
        };

        serverInfoList.push(serverInfo);
    }

    ns.write("/data/server-info.txt", JSON.stringify(serverInfoList, null, 2), "w");
    ns.tprint("Server information successfully analyzed for all servers.");
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
