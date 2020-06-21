/* Description d'une classe Duer
qui renseigne, modifie, récupère les données Evrp
(format présentation pour interface utilisateur)
de la base de données gdu-bd*/

export class DuerFront {

  constructor(
              public id: number,
              public ut: string,
              public lieu: string,
              public activite: string,
              public danger: string,
              public risque: string,
              public gravite_Ex: number,
              public frequence_Ex: number,
              public prevExistante: string,
              public gravite_Mo: number,
              public frequence_Mo: number,
              public prevMiseEnOeuvre: string,
              public pas: number
	              )
              { }
}
