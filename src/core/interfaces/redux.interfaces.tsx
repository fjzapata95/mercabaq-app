import { AuthState } from "@rootStore/reducers/auth.reducer";
import { CartState } from "@core/root-store/reducers/cart.reducer";
import { FilterState } from "@core/root-store/reducers/filter.reducer";
import { UtilState } from "@core/root-store/reducers/util.reducer";

export interface Action {
    type: string;
    payload: any;
}

export interface ReduxState {
    auth: AuthState,
    cart: CartState,
    filter: FilterState,
    util: UtilState,
}