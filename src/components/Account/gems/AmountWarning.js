import { WITHDRAW_MIN } from '../../../model/balance';

export default function AmountWarning() {
  return `*Due to high demand, we require a minimum withdrawal of ${WITHDRAW_MIN} GEM tokens`;
}
