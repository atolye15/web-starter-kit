import kss from 'kss';

import spriteStore from '../../utils/spriteStore';
import { namespaces } from '../../../configs';
import kssOptions from '../../../kss/configs';

const namespacesForKss = Object.keys(namespaces).reduce((accumulator, currentValue) => {
  accumulator.push(`${currentValue}:${namespaces[currentValue]}`);
  return accumulator;
}, []);

export default function generate() {
  return kss({
    ...kssOptions,
    svgSprite: spriteStore.getSprite(),
    namespace: [...kssOptions.namespace, ...namespacesForKss],
  });
}
