# Hypixel Daily Rewards Bot

This is a poorly made bot that a friend requested me to make so I decided to post it to Github to spare anyone the time to make it. <br>
What it does:
 - Collects daily rewards
 - Collects site rewards

# Beginner Guide

You will need node.js in order to use this script. You can download it <a href="https://nodejs.org/en/">here</a>.<br>
After you download the repository you can install the dependencies by running ``npm install`` in cmd/powershell/terminal.
After that it's as simple as running ``node index.js``.

# Installation

Rename ``config.json.example`` to ``config.json`` and edit the ``username`` and ``password`` variables to your credentials. If you have a Microsoft account change the ``auth`` variable to ``microsoft``. Leave the rest untouched.
The bot will try to connect and walk straight and to the left towards the Delivery Man. Try leaving your account on a lobby where it's hard to get stuck.

```
{
    "username": "your.email@email.com",
    "password: "your_password",
    "auth": "mojang" <--- mojang/microsoft depending on your acc
    "elements": {
        // only change if website changes
    }
    "useragent": "Default one is fine, change only if you want"
}
```

# FAQ

## Will I get banned for this?
<br>
Short answer? No. The bot is using <a href="github.com/PrismarineJS/mineflayer">mineflayer</a> which, although is overkill for this task, is very similar to a normal player and Watchdog is way too oblivious to detect anything regardless. The web part is handled by <a href="https://github.com/puppeteer/puppeteer">puppeteer</a> which, again, is overkill but very safe in terms of any antibot checks that might get added in the future.
<br><br>

## How can I make the script run everyday?
<br>

The script executes itself as soon as its run. You can use something like ``cron`` to automatically execute it everyday. 
