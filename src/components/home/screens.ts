// The 1.7.6 (24) captures, iPhone 6.9", from the app repo's StoreCaptures176Tests
// (SCREENSHOT_MODE seed — never an athlete's own data). zh pages show the zh-Hans set; en and fr
// pages show the English set. Story order as the 1.7.6 store plates.
import todayEn from '../../assets/screens-v176/en/01-today.png';
import briefEn from '../../assets/screens-v176/en/02-brief.png';
import dayCardEn from '../../assets/screens-v176/en/03-daycard.png';
import plateEn from '../../assets/screens-v176/en/04-plate.png';
import hrvEn from '../../assets/screens-v176/en/05-hrv.png';
import fatigueEn from '../../assets/screens-v176/en/06-fatigue.png';
import loadEn from '../../assets/screens-v176/en/07-load.png';
import sleepEn from '../../assets/screens-v176/en/08-sleep.png';
import programEn from '../../assets/screens-v176/en/09-program.png';
import connectorEn from '../../assets/screens-v176/en/10-connector.png';
import todayZh from '../../assets/screens-v176/zh/01-today.png';
import briefZh from '../../assets/screens-v176/zh/02-brief.png';
import dayCardZh from '../../assets/screens-v176/zh/03-daycard.png';
import plateZh from '../../assets/screens-v176/zh/04-plate.png';
import hrvZh from '../../assets/screens-v176/zh/05-hrv.png';
import fatigueZh from '../../assets/screens-v176/zh/06-fatigue.png';
import loadZh from '../../assets/screens-v176/zh/07-load.png';
import sleepZh from '../../assets/screens-v176/zh/08-sleep.png';
import programZh from '../../assets/screens-v176/zh/09-program.png';
import connectorZh from '../../assets/screens-v176/zh/10-connector.png';

const EN = { today: todayEn, brief: briefEn, dayCard: dayCardEn, plate: plateEn, hrv: hrvEn, fatigue: fatigueEn, load: loadEn, sleep: sleepEn, program: programEn, connector: connectorEn };
const ZH = { today: todayZh, brief: briefZh, dayCard: dayCardZh, plate: plateZh, hrv: hrvZh, fatigue: fatigueZh, load: loadZh, sleep: sleepZh, program: programZh, connector: connectorZh };

export type ScreenKey = keyof typeof EN;

export function screensFor(locale: string) {
  return locale === 'zh' ? ZH : EN;
}
