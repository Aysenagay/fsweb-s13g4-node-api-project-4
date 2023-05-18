require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Kullanıcılar dizisi
const users = [
  { kullaniciadi: "user1", sifre: "pass1" },
  { kullaniciadi: "user2", sifre: "pass2" },
];

// Kullanıcıları döndüren GET isteği
app.get("/api/kullanicilar", (req, res) => {
  res.json(users);
});

// Yeni kullanıcı oluşturan POST isteği
app.post("/api/kayitol", (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  const newUser = { kullaniciadi, sifre };
  users.push(newUser);
  res.json(newUser);
});

// Giriş yapan kullanıcıya hoşgeldin mesajı döndüren POST endpoint'i
app.post("/api/giris", (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  const user = users.find(
    (u) => u.kullaniciadi === kullaniciadi && u.sifre === sifre
  );

  if (user) {
    res.send(`Hoşgeldin, ${user.kullaniciadi}!`);
  } else {
    res.status(401).send("Geçersiz kullanıcı adı veya şifre.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
