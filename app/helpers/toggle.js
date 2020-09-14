import { helper } from '@ember/component/helper';

export function toggle([string, obj]) {
  return !obj[string];
}

export default helper(toggle);
