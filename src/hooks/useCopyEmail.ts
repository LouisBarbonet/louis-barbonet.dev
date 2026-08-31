import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { useLang } from '../context/LangContext';
import { CONTACT_EMAIL } from '../content/copy';

/**
 * Click handler for the "Reach Out" CTAs. Doesn't prevent the default mailto
 * navigation -- it still opens the visitor's mail client as normal -- it just
 * also copies the address to the clipboard as a bonus, with a toast to confirm.
 */
export function useCopyEmail() {
  const { showToast } = useToast();
  const { t } = useLang();

  return useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(CONTACT_EMAIL)
        .then(() => showToast(t.toast.emailCopied))
        .catch(() => {
          /* clipboard permission denied or unavailable -- mailto still works, fail silently */
        });
    }
  }, [showToast, t]);
}
