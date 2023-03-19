export const API_SERVICES_URLS = {
  SIGN_UP: "/user/signup",
  SIGN_IN: "/user/login",
  FORGOT_PASSWORD: "/user/password/forgot",
  VERIFY_CODE: "/user/password/verify-code",
  RECOVER_PASSWORD: "/user/password/recover",
  VERIFICATION: {
    SEND_EMAIL_CODE: "/user/send-code-email",
    SEND_MOBILE_CODE: "/user/send-code-mobile",
    EMAIL: "/user/verify/email",
    MOBILE: "/user/verify/mobile",
    IDENTITY: "/user/verify/id",
    ADDRESS: "/user/verify/address",
  },
  CLIENT: {
    INVOICE_DETAILS: (id: string) => `/invoice/client/${id}`,
    COMPLETE_INVOICE: (id: string) => `/invoice/client/complete-invoice/${id}`,
    INVOICE_PREVIEW: (id: string) => `/invoice/client/preview/${id}`,
  },
  FREELANCER: {
    BANK_DETAILS: (id: string) => `/withdraw/details/${id}`,
    OFFICE_LIST: "/withdraw/office-list",
    RECIPIENTS_LIST: "/recipient/list",
    RECIPIENT_ADD_BEFORE_CODE: "/recipient/send-code",
    RECIPIENT_CREATE_AFTER_CODE: "/recipient/create",
    RECIPIENT_DELETE: (recipientId) => `/recipient/delete/${recipientId}`,
    RECIPIENT_EDIT_BEFORE_CODE: (recipientId) =>
      `/recipient/edit/${recipientId}`,
    LAST_WITHDRAW: "/withdraw/last-request",
    REQUEST_CASH: `/withdraw/request-cash`,
    // BANK_WITHDRAW: (bankid: string, )
  },
} as const;

export const COOKIES_KEYS = {
  currentUser: "currentUser",
} as const;

export const LOCAL_STORAGE_KEYS = {} as const;
