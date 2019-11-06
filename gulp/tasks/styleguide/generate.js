import kss from 'kss';

import spriteStore from '../../utils/spriteStore';
import kssOptions from '../../../kss/configs';

export default function generate() {
  return kss({ ...kssOptions, svgSprite: spriteStore.getSprite() });
}
