import { IKyb } from "./kyb";
import { ISMEUser } from "./user";

export type IBusiness = {
  kyb: IKyb & { _id: string };
  user: ISMEUser & { _id: string };
};
