// Historial de visualización guardado en localStorage (funciona sin internet)
const KEY = "classicflix_history";

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addToHistory(movie) {
  const history = getHistory();
  history.push({ id: movie.id, categoria: movie.categoria, fecha: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(history));
}

// { "Comedia": 3, "Terror": 1 }
export function getCategoryCounts(history) {
  return history.reduce((acc, item) => {
    acc[item.categoria] = (acc[item.categoria] || 0) + 1;
    return acc;
  }, {});
}

// Ordena: primero las categorías más vistas; dentro de cada una, las no vistas antes
export function getRecommended(movies, history, limit = 8) {
  if (history.length === 0) return movies.slice(0, limit);

  const counts = getCategoryCounts(history);
  const watchedIds = new Set(history.map((h) => h.id));

  return [...movies]
    .sort((a, b) => {
      const byCategory = (counts[b.categoria] || 0) - (counts[a.categoria] || 0);
      if (byCategory !== 0) return byCategory;
      return Number(watchedIds.has(a.id)) - Number(watchedIds.has(b.id));
    })
    .slice(0, limit);
}

export function getTopCategory(history) {
  const counts = getCategoryCounts(history);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return entries.length ? entries[0][0] : null;
}
