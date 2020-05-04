import { UtVm } from './UtVm';
import { LieuVm } from './LieuVm';
import { ActivitesVm } from './ActivitesVm';
import { DangersVm } from './DangersVm';
import { RisquesVm } from './RisquesVm';
import { GraviteVm } from './Gravite';
import { FrequenceVm } from './FrequenceVm';
import { CriticiteVm } from './CriticiteVm';
import { PasVm } from './PasVm';

export class Duer {


  constructor(public id: number,
              public ut: UtVm,
              public lieu: LieuVm,
              public activite: ActivitesVm,
              public danger: DangersVm,
              public risque: RisquesVm,
              public gravEx: GraviteVm,
              public FreqEx: FrequenceVm,
              public CritEx: CriticiteVm,
              public prevEx: string,
              public gravMo: GraviteVm,
              public FreqMo: FrequenceVm,
              public CritMo: CriticiteVm,
              public prevMo: string,
              public pas: PasVm)
              { }
}


