/** @param {NS} ns */
export async function main(ns) {
    const target = ns.getHostname();
    try {
        const hackResult = await ns.hack(target);
        ns.tprint(`Funds successfully transferred to personal account: ${ns.formatNumber(hackResult, 2)}`);
    } catch (error) {
        ns.tprint(`Failed to transfer funds to personal account... ${target}: ${error}`);
    }
}