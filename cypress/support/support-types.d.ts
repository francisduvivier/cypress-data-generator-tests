import { Params, OkResponse } from '../../src/test-data-generator-api.ts';

// UUID
export type UuidParams = Params<'/Prod//uuid'>;
export type UuidParamName = keyof NonNullable<UuidParams>;
export type UuidOkReponse = OkResponse<'/Prod//uuid'>;

// UUID
export type BisParams = Params<'/Prod//bis'>;
export type BisParamName = keyof NonNullable<BisParams>;
export type BisOkReponse = OkResponse<'/Prod//bis'>;
