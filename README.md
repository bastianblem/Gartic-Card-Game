# 🎨 Emoji Detective (Arbeitstitel)

Ein interaktives, echtzeitbasiertes Multiplayer-Partyspiel für den Browser, entwickelt für feurige Spieleabende im Discord-Call. Das Spiel kombiniert kreatives Zeichnen mit taktischer Deduktion und einem kartenbasierten Assoziationsmechanismus.

Gespielt wird direkt im Browser ohne Installation. Ein Spieler hostet die Lobby, teilt den Raum-Code, und die Freunde treten sofort bei.

---

## 🎮 Das Spielkonzept

Das Spiel bricht mit dem klassischen, hektischen _"Wer tippt das Wort im Chat am schnellsten"_-Prinzip von bekannten Spielen wie Skribbl.io. Stattdessen setzt es auf eine **taktische Kombination aus Zeitdruck und Assoziation** (ähnlich wie bei Brettspielen wie _Dixit_ oder _Mysterium_).

### Der Ablauf einer Spielrunde (60 Sekunden Showdown):

1. **Die Rollenverteilung:** In jeder Runde gibt es einen **Zeichner (Artist)** und mehrere **Rater (Detectives)**.
2. **Das verdeckte Ziel:** Der Server wählt aus einem globalen Pool von 128 Emojis zufällig **24 Emojis für diese Runde** aus. Aus diesen 24 erhält der Zeichner **4 geheime Emoji-Karten** auf die Hand, die er zu einem logischen Gesamtbild kombinieren muss.
3. **Die Live-Phase (60 Sek.):**
   - Der Zeichner versucht, die Essenz seiner 4 Emojis auf einem HTML5-Canvas zum Leben zu erwecken.
   - Die Rater sehen das Gemälde _live_ entstehen. Sie haben das Grid mit den 24 Pool-Emojis vor sich und müssen die 4 exakten Karten des Zeichners herausfiltern und "einloggen".
4. **Die Auswertung:** Nach Ablauf der 60 Sekunden werden alle Karten gleichzeitig umgedreht. Es wird nicht auf Schnelligkeit abgerechnet, sondern auf **Präzision**.

### Das Punktesystem:

- **4 Treffer:** +100 Punkte (Voller Erfolg!)
- **3 Treffer:** +60 Punkte
- **2 Treffer:** +30 Punkte
- **1 Treffer:** +10 Punkte
- **0 Treffer:** 0 Punkte (Mitgeraten, aber daneben)
- **Inaktiv (Keine Karten eingeloggt):** -50 Punkte (Strafe für AFK-Spieler)

---

## 🛠️ Tech-Stack & Architektur

Das Projekt demonstriert die Umsetzung einer modernen, skalierbaren und serverlosen Echtzeit-Webapplikation.

- **Frontend:** [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API) mit [TypeScript](https://www.typescriptlang.org/) für ein typsicheres, performantes UI.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) für ein responsives, flüssig animiertes Spiele-Interface.
- **Backend & Echtzeit:** [Supabase](https://supabase.com/)
  - **Database:** PostgreSQL für das persistente Speichern von Lobbies und Spielerständen.
  - **Realtime Broadcast:** Ultra-latenzfreies Streamen der Canvas-Koordinaten im Millisekundentakt.
  - **Realtime Presence:** Live-Statusanzeige, ob Spieler im Raum aktiv sind oder bereits eingeloggt haben.
- **Hosting:** [Vercel](https://vercel.com/) für das serverlose Hosting des Frontends und der API-Validierungs-Routes.

---

## 📦 System-Architektur & Datenfluss

Um Cheating (z. B. das Auslesen der gegnerischen Karten über die Vue DevTools) unmöglich zu machen, trennt die Anwendung strikt zwischen öffentlichem und geheimem Zustand:

[ Spieler 1 (Zeichner) ] ──(Pinselstriche via Broadcast)──► [ Supabase Realtime ]
│
[ Spieler 2 (Rater) ] ◄──(Live-Canvas-Render-Stream)────────────┘

[ Spieler 2 (Rater) ] ──(Loggt 4 Karten ein per API)───► [ Nuxt Server Route (Vercel) ]
│ (Validiert & Berechnet)
▼
[ Supabase DB / End-State ]

1. **Sichere Serverless Routes:** Wenn ein Rater seine Auswahl einloggt, wird diese an eine geschützte Nuxt-Serverless-Route (`/api/room/submit-guess`) geschickt. Die geheimen 4 Karten des Zeichners verlassen bis zum Rundenende niemals geschützt die Datenbank.
2. **Echtzeit-Synchronisation:** Die Mausbewegungen und Farbwahlen des Zeichners werden direkt über das WebSocket-Protokoll von Supabase an alle verbundenen Rater gestreamt.

---

## 🚀 Geplante Features (Roadmap)

- [ ] Core-Lobby-System mit Raum-Codes und Supabase Realtime Presence
- [ ] HTML5 Canvas Komponente mit Pinsel- & Farbauswahl für den Zeichner
- [ ] Runden-Timer und serverbasierter Punkte-Kalkulator
- [ ] Schickes Game-Over-Dashboard mit animierter Rangliste
- [ ] Custom-Pakete (z. B. "Gaming-Auswahl", "Nostalgie", "Holidays") für die Emojis
