# Redis Hosts

This page contains a list of Minecraft server hosts and whether they offer Redis, either as standard or on request.

Most of my plugins support Redis, or in the case of HuskSync, _require_ it. If you're not sure what Redis is, it's a type of in-memory data store with caching and messaging capabilities. I use it for efficient cross-server data handling and communication.

Unfortunately, Redis being slightly more unusual than your standard MySQL database means that not every host offers it, although many do (Pterodactyl hosts in particular _should_ offer it since a requirement of the panel software is Redis anyway).

If your host doesn't offer it, you can always buy a Redis server separately (e.g. from DigitalOcean). It's really cheap to do so and it's better than nothing, though this will come with the drawback of increased latency due to the physical separation of your Minecraft server box and Redis server box.

## List of hosts

| Host           | Site                              | Redis | Notes                                                                               |
|----------------|-----------------------------------|-------|-------------------------------------------------------------------------------------|
| Bloom Host     | https://bloom.host                | ✅     | Available through their "Split servers" feature at the cost of some of your RAM     |
| Falix Nodes    | https://falixnodes.net/           | ✅     | Available separately as a paid service.                                             |
| GGServers      | https://ggservers.com             | 🚫    | Asked me if I meant the "Rediscovered mod" when I enquired their support chat (lol) |
| MCProHosting   | https://mcprohosting.com          | 🚫    | Not currently, but they're "looking into adding" \[Redis\] "in the future"          |
| Shockbyte      | https://shockbyte.com             | 🚫    | To quote their support assistant; "Unfortunately, we only MySQL \[sic\]."           |
| Aternos        | https://aternos.org/              | 🚫    | Not offered                                                                         |
| Minehut        | https://minehut.com/              | 🚫    | Not offered                                                                         |
| Meloncube      | https://meloncube.net             | 🚫    | Not offered                                                                         |
| Nodecraft      | https://nodecraft.com             | 🚫    | "Hey there! No, we do not"                                                          |
| PebbleHost     | https://pebblehost.com/           | 🚫    | "No, we do not offer redis natively, sorry about that."                             |
| Apex Minecraft | https://apexminecrafthosting.com/ | ❓     | Their [FAQ](https://apexminecrafthosting.com/faq/) only specifies MySQL             |

**Note:** I do not endorse and am not affiliated with any of these services. Visit external sites at your own risk.

Information accurate as of 21/06/2021. I tried to gather some of the more popular hosts, though didn't bother if I had to make an account or go through a long-winded support ticket or email process. If you know of any other hosts that offer Redis, please let me know, and I'll update the list, or submit a [pull request here](https://github.com/WiIIiam278/William278.net).