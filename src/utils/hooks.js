import { useMediaQuery } from "@material-ui/core";

export const useIsDesktop = () =>
  useMediaQuery((theme) => theme.breakpoints.up(theme.breakpoints.values.sm));
