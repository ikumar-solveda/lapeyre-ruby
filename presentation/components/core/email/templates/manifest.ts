/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { emailManifestCustom } from '@/components/email/manifestCustom';
import { ActivateTaskNotification } from '@/components/email/templates/ActivateTaskNotification';
import { ApproversNotify } from '@/components/email/templates/ApproversNotify';
import { InterestItemListMessage } from '@/components/email/templates/InterestItemListMessage';
import { MerchantOrderNotify } from '@/components/email/templates/MerchantOrderNotify';
import { OrderAuthorized } from '@/components/email/templates/OrderAuthorized';
import { OrderCancel } from '@/components/email/templates/OrderCancel';
import { OrderChanged } from '@/components/email/templates/OrderChanged';
import { OrderReceived } from '@/components/email/templates/OrderReceived';
import { OrderRejected } from '@/components/email/templates/OrderRejected';
import { PasswordNotify } from '@/components/email/templates/PasswordNotify';
import { PasswordResetConfirmationNotify } from '@/components/email/templates/PasswordResetConfirmationNotify';
import { ReadyToApproveTaskGroupNotification } from '@/components/email/templates/ReadyToApproveTaskGroupNotification';
import { RejectTaskNotification } from '@/components/email/templates/RejectTaskNotification';
import { ReleaseShipNotify } from '@/components/email/templates/ReleaseShipNotify';
import { ResellerRegistrationApprovedNotify } from '@/components/email/templates/ResellerRegistrationApprovedNotify';
import { ResellerRegistrationRejectedNotify } from '@/components/email/templates/ResellerRegistrationRejectedNotify';
import { UserAccountEmailActivateNotify } from '@/components/email/templates/UserAccountEmailActivateNotify';
import { ServerPageProps } from '@/data/types/AppRouter';
import { ComponentType } from 'react';

/**
 * With dynamic imports, NextJS seems to be treating these components (which are actually RSC) as
 *   client components -- it subsequently runs into the infamous `You cannot dot into a client
 *   module from a server component. You can only pass the imported name through.` error.
 *
 * The solution is to re-export the component without the dot-notation, i.e., as an explicit export,
 *   which defeats the purpose of dynamic loading, which subsequently implies that as RSCs, we don't
 *   need dynamic loading anyway
 */
export const contentManifest: Record<string, ComponentType<ServerPageProps>> = {
	ActivateTaskNotification,
	ApproversNotify,
	InterestItemListMessage,
	MerchantOrderNotify,
	OrderAuthorized,
	OrderCancel,
	OrderChanged,
	OrderReceived,
	OrderRejected,
	PasswordNotify,
	PasswordResetConfirmationNotify,
	ReadyToApproveTaskGroupNotification,
	RejectTaskNotification,
	ReleaseShipNotify,
	ResellerRegistrationApprovedNotify,
	ResellerRegistrationRejectedNotify,
	UserAccountEmailActivateNotify,
	...emailManifestCustom,
};
