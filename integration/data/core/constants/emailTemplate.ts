/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const ESPOT_NAME = {
	UserApprovalNotification: 'UserApprovalNotification_Content',
	OrganizationApprovalNotification: 'OrganizationApprovalNotification_Content',
	OrderApprovalNotification: 'OrderApprovalNotification_Content',
	OrderAuthorized: 'OrderAuthorized_Content',
	ReleaseShipNotify: 'EmailOrderShip_Content',
	UserAccountEmailActivateNotify: 'EmailAccountActivation_Content',
	OrderCancel: 'EmailOrderCancel_Content',
	OrderChanged: 'OrderChangedNotification_Content',
	InterestItemListMessage: 'EmailWishlist_Content',
	PasswordNotifyAdmin: 'EmailPasswordReset_AdminContent',
	PasswordNotify: 'EmailPasswordReset_Content',
	PasswordResetConfirmationNotify: 'PasswordChangeConfirmationNotifyCenter_Content',
};

export const FLOW_IDENTIFIER = {
	order: 'OrderProcess',
	user: 'UserRegistrationAdd',
	organization: 'ResellerOrgEntityRegistrationAdd',
	orgAdmin: 'ResellerUserRegistrationAdd',
};

export const EMAIL_ROUTE = '/email/';
