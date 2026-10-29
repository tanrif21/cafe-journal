# The Café Journal

A personal project for keeping track of café visits, shared snacks, and the friends who make every gathering memorable.

**Good company. Great conversations. A friendly record of who treated whom.**

## Why I Built This

Among friends, a simple question can turn into a surprisingly lively debate: *“Wait, who paid for the last round of tea?”*

I built The Café Journal to give those conversations a little evidence—and a little humour. It keeps a shared record of who gave a treat, when it happened, and what was on the table. Whether it was a few cups of cha or an afternoon of snacks, everyone gets credit for their generosity.

It is a lighthearted way to remember our time together, celebrate the friends who treat the group, and keep the inevitable “your turn next time” jokes going.

## Features

- **Visit journal:** Record the date, café, food, drinks, collector, and notes for each visit.
- **Shared treats:** Select multiple friends as treat givers, with the cost split equally between them.
- **Friend management:** Add, remove, and restore friends while preserving their previous records.
- **Monthly reports:** Explore spending by friend and daily totals through charts and summaries.
- **Searchable history:** Find previous visits by café, food, notes, or friend.
- **Shared access:** Use a group password to access the same journal across devices.
- **Backup and transfer:** Export records as JSON and import backups without replacing visits that already have the same ID.

## Technology

| Component | Technology |
| --- | --- |
| Interface | HTML, CSS, and JavaScript |
| Server | Node.js functions on Vercel |
| Database | PostgreSQL on Neon |
| Authentication | Shared group password and signed session cookies |

