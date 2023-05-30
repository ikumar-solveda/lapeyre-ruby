/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { keyBy } from 'lodash';

export const NON_CREDIT_CARD_PAYMENTS = ['COD', 'BillMeLater', 'PayLater', 'PayInStore'];
export const NON_CC_PAYMENTS_BY_CODE = keyBy(NON_CREDIT_CARD_PAYMENTS);
