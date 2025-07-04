// This util is to allow using notistack outside of functional components,
// this hacky way is from a thread (https://bit.ly/3tGejhX) and could get native support by notistack in the future,
// at which point this should be removed in favor of the stable approach.
import { ProviderContext, SnackbarMessage, useSnackbar } from "notistack";

let useSnackbarRef: ProviderContext;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const util = {
  success(msg: SnackbarMessage) {
    this.toast(msg, "success");
  },
  warning(msg: SnackbarMessage) {
    this.toast(msg, "warning");
  },
  info(msg: SnackbarMessage) {
    this.toast(msg, "info");
  },
  error(msg: SnackbarMessage) {
    this.toast(msg, "error");
  },
  /**
   * Displays a snackbar notification with the specified message and variant.
   *
   * @param msg - The message to display in the snackbar.
   * @param variant - The type of snackbar to display. Allowed variants: 'default', 'error', 'success', 'warning', 'info'.
   */
  toast(
    msg: SnackbarMessage,
    variant: "default" | "error" | "success" | "warning" | "info"
  ) {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default util;
