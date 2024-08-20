import { CUSTOM_ERROR_MESSAGE } from '@/constants/messages';

type Detail = string | Record<string, string>[];

export const serializeResponseMessage = (detail?: Detail) => {
  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail[0]?.msg || CUSTOM_ERROR_MESSAGE;
  }

  return CUSTOM_ERROR_MESSAGE;
};
