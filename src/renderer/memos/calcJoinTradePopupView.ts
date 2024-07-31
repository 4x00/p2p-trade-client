import { formatCurrency } from '../utils/formatCurrency';
import { checkXmrAddress } from '../utils/checkXmrAddress';
import { JoinTradeDetails } from '../types/JoinTradeDetails';
import { JoinTradePopupView } from '../types/JoinTradePopupView';

const N = Number;
const isN = (s: string) => s !== '' && !isNaN(s as unknown as number);
type Lerp = (...args: [number, number, number, number, number]) => number;
const lerp: Lerp = (ol, oh, ov, nl, nh) => (
  (ol === oh || nl === nh)
    ? nl
    : (
        Math.max(
          Math.min(
            ((ov - ol) / (oh - ol) * (nh - nl) + nl),
            nh
          ),
          nl
        )
      )
);

type CalcJoinTradePopupView = (
  details: JoinTradeDetails,
  myXmrAddress: string,
  amount: { monero: string; other: string },
) => JoinTradePopupView;
export const calcJoinTradePopupView: CalcJoinTradePopupView = (
  (details, myXmrAddress, amount) => {
    const { monero, other } = details;
    const { currency } = other;
    const formatXmr = (v: number) => formatCurrency(v, 'xmr');
    const formatOther = (v: number) => formatCurrency(v, currency);
    const calcXmr = (v: number) => (
      formatXmr(lerp(N(other.min), N(other.max), v, N(monero.min), N(monero.max)))
    );
    const calcOther = (v: number) => (
      formatOther(lerp(N(monero.min), N(monero.max), v, N(other.min), N(other.max)))
    );
    const moneroInRange = (
      isN(amount.monero) &&
      N(monero.min) <= N(amount.monero) &&
      N(amount.monero) <= N(monero.max)
    );
    const otherInRange = (
      isN(amount.other) &&
      N(other.min) <= N(amount.other) &&
      N(amount.other) <= N(other.max)
    );

    return {
      monero: {
        disableInput: Boolean(amount.other),
        amount: (
          amount.other
            ? (otherInRange ? calcXmr(N(amount.other)) : '-')
            : amount.monero
        )
      },
      other: {
        disableInput: Boolean(amount.monero),
        amount: (
          amount.monero
            ? (moneroInRange ? (calcOther(N(amount.monero))) : '-')
            : amount.other
        ),
        currency: details.other.currency,
      },
      disableSubmit: !(
        checkXmrAddress(myXmrAddress) && (moneroInRange || otherInRange)
      ),
    };
  }
);
