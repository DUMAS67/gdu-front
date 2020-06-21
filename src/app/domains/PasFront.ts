/* Description d'une classe PasFront
qui affiche les données Plan d'Action Spécifique
(format visualisation utilisateur)
de la base de données gdu-bd*/

export class PasFront {

  constructor(
    public id: number,
    public idDuer: number,
    public danger: string,
    public risque: string,
    public action: string,
    public budget: number,
    public qui: string,
    public delai: Date,
    public etat: boolean) {

  }
}
