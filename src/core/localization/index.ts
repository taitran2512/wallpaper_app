import LocalizedStrings from 'react-native-localization';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { hi } from './hi';
import { pt } from './pt';

let strings = new LocalizedStrings({ en, es, pt, hi, fr, de });

export { strings };
