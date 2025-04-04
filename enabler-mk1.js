/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    try {
        const growResult = await ns.grow(target);
        ns.tprint(`Portfolio funds successfully invested: ${growResult}`);
    } catch (error) {
        ns.tprint(`Failed to successfully invest portfolio funds... ${target}: ${error}`);
    }
}
