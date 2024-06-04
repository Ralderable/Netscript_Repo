/** @param {NS} ns */
export async function main(ns) {
    const scriptNames = ["accountant-mk1.js", "enabler-mk1.js", "disabler-mk1.js", "accountant-mk2.js", "enabler-mk2.js", "disabler-mk2.js"];
    const servers = scanAllServers(ns);

    for (const server of servers) {
        if (server === "home") continue;

        if (ns.hasRootAccess(server)) {
            for (const script of scriptNames) {
                ns.scp(script, server);
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
