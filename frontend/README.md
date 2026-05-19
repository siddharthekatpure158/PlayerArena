# 🏟️ PlayerArena

> **Book. Play. Train. — All in one place.**

PlayerArena is a full-stack sports community platform built for players in India to find and book sports turfs, discover open games to join, host their own matches, and locate nearby training centres — all without phone calls, WhatsApp groups, or guesswork.

---

## 📸 Preview

| Homepage | Open Games | Create Game |
|---|---|---|
| Hero + Live Games | Filter, Search & Join | Set Sport, Venue & Players |

---

## 🎯 The Problem

Finding sport in India today is still broken:

- 📞 Booking a turf means calling multiple numbers hoping someone picks up
- 💬 Finding a pickup game means posting in WhatsApp groups and waiting hours
- ❓ You never know how many spots are left, what it costs, or who is hosting
- 🗺️ There is no single place connecting players, venue owners, and training centres

**PlayerArena fixes all of this.**

---

## ✅ Features

### 📅 Book a Turf
Browse sports venues filtered by sport type and location. View real-time slot availability, pricing, and ratings. Confirm your booking instantly — no calls needed.

### 🤝 Join a Game
Discover live open matches near you across Football, Cricket, Basketball, Badminton, Tennis, and Volleyball. Every game card shows:
- Venue name and host
- Date and time
- Per-head fee
- Live player count and spots remaining
- Fill bar showing % capacity

Join with one tap. Button locks once you have joined or the game is full.

### 🎮 Create a Game
Host your own match in seconds. Set the sport, date, time, venue, player limit and per-head fee. Your game goes live immediately and other players can find and join it.

### 🏋️ Find Training Centres
Browse nearby gyms, football academies, badminton clubs, and combat sports centres. Filter by sport type and see what is available close to you.

---

## 📸 Screenshots

<img src="screenshots/Screenshot 2026-05-20 020130.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020143.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020154.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020201.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020211.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020229.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020300.png" width="800" />
<img src="screenshots/Screenshot 2026-05-20 020321.png" width="800" />

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Java Spring Boot |
| Database | MySQL |
| ORM | Spring Data JPA / Hibernate |
| Fonts | DM Sans, Barlow Condensed |
| Styling | Component-scoped inline CSS |

---

## ⚙️ How It Works

```
User opens PlayerArena
        ↓
Homepage fetches top 3 live games  →  GET /game
        ↓
User clicks "Join this game"
        ↓
Frontend calls  →  PUT /game/join/{id}
        ↓
Backend checks if currentplayers < totalplayers
        ↓
If OK   →  increments currentplayers, saves to DB, returns updated game
If Full →  throws RuntimeException  →  frontend shows alert
        ↓
Player count updates live on screen, button shows ✓ Already Joined
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/game` | Fetch all active games |
| `POST` | `/game` | Create a new game |
| `PUT` | `/game/join/{id}` | Join a game by ID — increments currentplayers |

### Sample Game Object

```json
{
  "id": 1,
  "game": "Football",
  "venuename": "GreenPark Arena",
  "hostname": "Rahul S",
  "location": "Wakad, Pune",
  "time": "2025-04-25T19:00:00",
  "totalplayers": 10,
  "currentplayers": 7,
  "price": 120
}
```

---

## 🗂️ Project Structure

```
playerarena/
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── HomePage.jsx          # Landing page — hero, features, live games, sport tiles
│       │   ├── Getgames.jsx          # Full game listings with search, filter and join flow
│       │   └── Creategame.jsx        # Create game form
│       ├── components/
│       │   └── GameCards.jsx         # Live game preview cards used on homepage (top 3)
│       └── App.jsx                   # Route definitions
│
└── backend/
    └── src/main/java/com/playerarena/
        ├── controller/
        │   └── GameController.java   # REST endpoints — GET, POST, PUT
        ├── service/
        │   └── GameService.java      # Business logic — join validation, player count
        ├── model/
        │   └── Game.java             # Entity — id, game, venuename, hostname,
        │                             #          location, time, totalplayers,
        │                             #          currentplayers, price
        └── repository/
            └── GameRepository.java   # Spring Data JPA — DB access
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven
- MySQL 8+

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/playerarena.git
cd playerarena
```

---

### 2. Setup the Database

```sql
CREATE DATABASE playerarena;
```

---

### 3. Configure the Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/playerarena
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081
```

---

### 4. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend starts on → `http://localhost:8081`

---

### 5. Run the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend starts on → `http://localhost:3000`

---

## 🎨 UI Highlights

- **Sport color system** — each sport has its own icon, color, background, border and tag
- **Featured card** — first result is highlighted with a colored border and FEATURED badge
- **Fill bar** — visual progress bar shifts green → amber → red as spots fill up
- **Spot badge** — shows exact spots left, turns red when full
- **Shimmer skeleton** — smooth loading animation while API fetches data
- **Hover lift** — cards elevate on hover with a shadow transition
- **Joined badge** — green ✓ JOINED overlay on cards you have already joined
- **Responsive grid** — auto-fit CSS grid adapts from 1 column on mobile to 3+ on desktop

---

## 🔮 Planned Features

- [ ] User authentication — login, profile, booking history
- [ ] UPI / Razorpay payment integration for per-head fee collection
- [ ] Map view — see open games and turfs plotted on a live map
- [ ] Push notifications — get alerted when a game needs one more player
- [ ] In-app chat — WhatsApp-style group chat for each game lobby
- [ ] Ratings and reviews — rate venues and hosts after playing
- [ ] Admin dashboard — manage turfs, games, and users



## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ to solve a real problem — making it effortless for players across India to find sport, fill teams, and get on the field.

---

> *PlayerArena — because finding a game shouldn't be harder than playing one.* 🏃‍♂️
