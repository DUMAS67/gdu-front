/* Description d'une classe PasVm
qui récupère, modifie les données Plan d'Action Spécifique
de la base de données gdu-bd*/


export class PasVm {

  constructor(
    public id: number,
    public idDuer: number,
    public action: string,
    public budget: number,
    public qui: string,
    public delai: Date,
    public etat: boolean) {

  }
}
