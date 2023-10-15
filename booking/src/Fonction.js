import { addDays, subDays } from "date-fns";

export function CreactionListeDate(debut, fin) {
  let listeDate = [];
  if (CompteurNbJour(debut, fin) > 0) {
    for (let i = 0; i < CompteurNbJour(debut, fin); i++) {
      listeDate.push(addDays(debut, i).toDateString());
    }
  }
  return listeDate;
}

export function CompteurNbJour(debut, fin) {
  return Math.round((fin - debut) / 86400000);
}


