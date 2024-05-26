/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    try {
        const weakenResult = await ns.weaken(target);
        ns.tprint(`Target system successfully compromised: ${weakenResult}`);
    } catch (error) {
        ns.tprint(`Failed to infiltrate target system... ${target}: ${error}`);
    }
}
