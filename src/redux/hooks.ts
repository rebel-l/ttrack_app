import type { AppDispatch, RootState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>(),
    useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
