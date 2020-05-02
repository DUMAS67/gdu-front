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
