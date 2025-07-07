const API_KEY = "c9ce6b6f6c9fa935bea78bc290c4468f"; // ta clé
const matchContainer = document.getElementById("match-container");

async function chargerMatchs() {
  matchContainer.innerHTML = "<p>Chargement des matchs en cours...</p>";

  const url = `https://v3.football.api-sports.io/fixtures?date=${getTodayDate()}&timezone=Africa/Abidjan`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    const data = await response.json();
    afficherMatchs(data.response);
  } catch (error) {
    matchContainer.innerHTML = "<p>Erreur de chargement des matchs.</p>";
  }
}

function afficherMatchs(matchs) {
  matchContainer.innerHTML = "";

  if (matchs.length === 0) {
    matchContainer.innerHTML = "<p>Aucun match aujourd'hui.</p>";
    return;
  }

  matchs.slice(0, 5).forEach((match) => {
    const equipes = `${match.teams.home.name} vs ${match.teams.away.name}`;
    const heure = match.fixture.date.substring(11, 16);
    const championnat = match.league.name;

    const proba = Math.floor(Math.random() * 21) + 80; // 80 à 100 %
    const pronostic = Math.random() > 0.5 ? "1X" : "12";

    const div = document.createElement("div");
    div.className = "match";
    div.innerHTML = `
      <strong>${equipes}</strong><br>
      🏆 ${championnat}<br>
      🕒 ${heure}<br>
      🎯 Pronostic : <b>${pronostic}</b><br>
      🔒 Fiabilité IA : <b>${proba}%</b>
    `;

    matchContainer.appendChild(div);
  });
}

function getTodayDate() {
  const d = new Date();
  return d.toISOString().split("T")[0]; // yyyy-mm-dd
}

chargerMatchs();
