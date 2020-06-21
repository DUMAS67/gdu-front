export class Duer1 {

  /* Description d'une classe Duer1
qui renseigne, modifie, récupère les données Evrp
(format tableau d'identifiants) sans identifiant du Plan d'action spécifique
de la base de données gdu-bd*/


  constructor(
              public id_ut: number,
              public id_lieu: number,
              public id_activite: number,
              public id_danger: number,
              public id_risque: number,
              public id_gravEx: number,
              public id_FreqEx: number,
              public prevEx: string,
              public id_gravMo: number,
              public id_FreqMo: number,
              public prevMo: string,
              )
              { }
}
