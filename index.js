const mineflayer = require("mineflayer");
const config = require("./config.json");
const puppeteer = require("puppeteer");
const bot = mineflayer.createBot({
    host: "hypixel.net",
    username: config.username,
    password: config.password,
    version: "1.8.9",
    hideErrors: true,
    auth: config.auth
});
var x,z;
var delivery_man, armor_stand;
function handleMove() {
    if (Math.abs(bot.entity.position.x) >= x && Math.abs(bot.entity.position.x) <= x+1) {
        bot.setControlState("forward", false);
        bot.setControlState("right", true);
    }
    if (Math.abs(bot.entity.position.z) >= z && Math.abs(bot.entity.position.z) <= z+1) {
        bot.setControlState("right", false);
        bot.useOn(delivery_man);
        bot.useOn(armor_stand);
        bot.attack(delivery_man);
        bot.removeListener("move", handleMove);
    }
}
bot.once("spawn", () => {
    console.log("[*] Connected to server");
    armor_stand = Object.values(bot.entities).find(ent => {
        if (ent.mobType != "Armor Stand") return false;
        if (!ent.metadata.find(met => `${met}`.includes("Deliveries!"))) return false;
        return true;
    });
    delivery_man = Object.values(bot.entities).find(ent => ent.type == "player" && ent.position.x == armor_stand.position.x && ent.position.z == armor_stand.position.z);
    x = Math.abs(armor_stand.position.x);
    z = Math.abs(armor_stand.position.z);
    bot.setQuickBarSlot(3);
    bot.setControlState("forward", true);
    bot.on("move", handleMove);
});
bot.on("windowOpen", (window) => {
    if (!window.title.includes("The Delivery Man")) return;
    bot.clickWindow(31, 0, 0);
    bot.clickWindow(33, 0, 0);
    console.log("[**] Got daily rewards");
});
bot.on("kicked", (kicked) => {
    console.log(kicked);
})
var checked = false;
bot.on("message", async function (message) {
    if (!message.json.extra || message.json.extra.length < 2) return;
    if (message.json.extra[0].text != "Click the link to visit our website and claim your reward: ") return;
    if (checked) return;
    checked = true;
    var link = message.json.extra[1].text;
    const browser = await puppeteer.launch({args: ["--mute-audio"]});
    const page = await browser.newPage();
    await page.setViewport({
        width: 900 + Math.floor(Math.random() * 100),
        height: 870 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });
    await page.setUserAgent(config.useragent);
    await page.setJavaScriptEnabled(true);
    await page.goto(link, {waitUntil: "networkidle0"});
    console.log("[***] Opened browser link " + link);
    if (!config.hasPremium) {
        await page.waitForSelector(config.elements.play);
        await page.click(config.elements.play);
        console.log("[****] Waiting for video");
        await new Promise((res,rej) => setTimeout(res, 31000));
    }
    else {
        await page.waitForSelector(config.elements.skip);
        console.log("[****] Skipping video");
        await page.click(config.elements.skip);
    }
    await new Promise((res,rej) => setTimeout(res, 4000));
    for (i=1;i<4;i++)
    {
        await page.click(config.elements.card_back.replace("$i", i));
        console.log("[*****] Clicked card " + i);
    }
    await new Promise((res,rej) => setTimeout(res, 2000));
    await page.click(config.elements.first_card);
    console.log("[******] Claimed first card(I have no idea what is good I don't play this shit)");
    await new Promise((res,rej) => setTimeout(res, 5000));
    browser.close();
    bot.quit();
});
