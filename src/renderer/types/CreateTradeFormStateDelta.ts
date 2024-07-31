import { CreateTradeFormState } from './CreateTradeFormState';

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type CreateTradeFormStateDelta = DeepPartial<CreateTradeFormState>;
