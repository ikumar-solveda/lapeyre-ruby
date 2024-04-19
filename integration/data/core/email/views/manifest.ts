/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getActivateTaskNotificationTemplateLayout } from '@/data/email/views/ActivateTaskNotification';
import { getApproversNotifyTemplateLayout } from '@/data/email/views/ApproversNotify';
import { getInterestItemListMessageTemplateLayout } from '@/data/email/views/InterestItemListMessage';
import { getMerchantOrderNotifyTemplateLayout } from '@/data/email/views/MerchantOrderNotify';
import { getOrderAuthorizedTemplateLayout } from '@/data/email/views/OrderAuthorized';
import { getOrderCancelTemplateLayout } from '@/data/email/views/OrderCancel';
import { getOrderChangedTemplateLayout } from '@/data/email/views/OrderChanged';
import { getOrderReceivedTemplateLayout } from '@/data/email/views/OrderReceived';
import { getOrderRejectedTemplateLayout } from '@/data/email/views/OrderRejected';
import { getPasswordNotifyTemplateLayout } from '@/data/email/views/PasswordNotify';
import { getPasswordResetConfirmationNotifyTemplateLayout } from '@/data/email/views/PasswordResetConfirmationNotify';
import { getReadyToApproveTaskGroupNotificationTemplateLayout } from '@/data/email/views/ReadyToApproveTaskGroupNotification';
import { getRejectTaskNotificationTemplateLayout } from '@/data/email/views/RejectTaskNotification';
import { getReleaseShipNotifyTemplateLayout } from '@/data/email/views/ReleaseShipNotify';
import { getResellerRegistrationApprovedNotifyTemplateLayout } from '@/data/email/views/ResellerRegistrationApprovedNotify';
import { getResellerRegistrationRejectedNotifyTemplateLayout } from '@/data/email/views/ResellerRegistrationRejectedNotify';
import { getUserAccountEmailActivateNotifyTemplateLayout } from '@/data/email/views/UserAccountEmailActivateNotify';
import { emailTemplateLayoutManifestCustom } from '@/data/email/views/manifestCustom';

const layoutManifest = {
	ActivateTaskNotification: getActivateTaskNotificationTemplateLayout,
	ApproversNotify: getApproversNotifyTemplateLayout,
	InterestItemListMessage: getInterestItemListMessageTemplateLayout,
	MerchantOrderNotify: getMerchantOrderNotifyTemplateLayout,
	OrderAuthorized: getOrderAuthorizedTemplateLayout,
	OrderCancel: getOrderCancelTemplateLayout,
	OrderChanged: getOrderChangedTemplateLayout,
	OrderReceived: getOrderReceivedTemplateLayout,
	OrderRejected: getOrderRejectedTemplateLayout,
	PasswordNotify: getPasswordNotifyTemplateLayout,
	PasswordResetConfirmationNotify: getPasswordResetConfirmationNotifyTemplateLayout,
	ReadyToApproveTaskGroupNotification: getReadyToApproveTaskGroupNotificationTemplateLayout,
	RejectTaskNotification: getRejectTaskNotificationTemplateLayout,
	ReleaseShipNotify: getReleaseShipNotifyTemplateLayout,
	ResellerRegistrationApprovedNotify: getResellerRegistrationApprovedNotifyTemplateLayout,
	ResellerRegistrationRejectedNotify: getResellerRegistrationRejectedNotifyTemplateLayout,
	UserAccountEmailActivateNotify: getUserAccountEmailActivateNotifyTemplateLayout,
	...emailTemplateLayoutManifestCustom,
};

export const emailTemplateLayoutManifest: {
	[key: string]: (props?: any) => Record<'layoutName', string>;
} = layoutManifest;
