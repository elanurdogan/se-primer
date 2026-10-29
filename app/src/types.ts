export type LevelKey = 'beginner' | 'intermediate' | 'experienced';
export type RoleKey = 'backend' | 'qa' | 'pm';
export type GoalKey = 'architecture' | 'testing' | 'kvkk';

export type DecisionId = 'K1' | 'K2' | 'K3';

export type K1Choice = 'geri' | 'yama';
export type K2Choice = 'test' | 'hemen';
export type K3Choice = 'maske' | 'ham';

export type DecisionChoice = K1Choice | K2Choice | K3Choice;

export type GameState =
  | 'Karsilama'
  | 'Profil'
  | 'Brifing'
  | 'K1'
  | 'S1'
  | 'K2'
  | 'S2'
  | 'K3'
  | 'S3'
  | 'SonIyi'
  | 'SonKotu';

export interface DecisionRecord {
  id: DecisionId;
  title: string;
  choice: DecisionChoice;
  choiceLabel: string;
  summaryText: string;
  timedOut: boolean;
  isFocus: boolean;
  statusColor: 'green' | 'orange';
}

export interface TutorMessage {
  id: string;
  author: 'player' | 'tutor';
  text: string;
  timestamp?: number;
}

export interface TutorContext {
  seviye: string;
  rol: string;
  hedef: string;
  odakKarar: string;
  adim: string;
  acikKarar: string;
  verilenKararlar: Array<{
    karar: string;
    secim: string;
    zamanAsimi: boolean;
    neOldu: string;
    nedenOldu: string;
  }>;
  yansitmaIste: 'evet' | 'hayır';
}
