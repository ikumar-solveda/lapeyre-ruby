/**
 * User's globalization context.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextGlobalization {
	/**
	 * The user preferred language identifier.
	 * @format int64
	 */
	preferredLanguageId: number;
	/** The user currency. */
	currency: string;
	/** The user preferred currency. */
	preferredCurrency: string;
	/**
	 * The user language identifier.
	 * @format int64
	 */
	languageId: number;
}

/**
 * User's catalog.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextCatalog {
	/** The user preferred currency. */
	masterCatalog: boolean;
	/**
	 * The user's catalog identifier.
	 * @format int64
	 */
	catalogId: number;
}

export interface ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier {
	/** The valid identifier. */
	valid: boolean;
}

/**
 * User's preview information.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextPreview {
	/**
	 * The initial time difference when preview started.
	 * @format int64
	 */
	initialtimeDiff?: number;
	/** User's preview properties information. */
	previewProperties?: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextPreviewPreviewProperties;
	/** Is the preview session time static. */
	static?: boolean;
	/** The preview timestamp. */
	timestamp?: string;
}

export interface ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity {
	personalizationID: string;
	resourceName: string;
	WCToken: string;
	userId: string;
	WCTrustedToken: string;
}

export interface ComIbmCommerceRestMemberHandlerLoginIdentityHandlerOAuthUserIdentity {
	personalizationID: string;
	resourceName: string;
	WCToken: string;
	userId: string;
	WCTrustedToken: string;
}

export interface ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken {
	resourceName: string;
	previewToken: string;
}

export interface ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest {
	resourceName: string;
	previewToken: string;
}

/**
 * User's preview properties information.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextPreviewPreviewProperties {
	/** The inventory preview mode. */
	previewInventory?: string;
	/** The preview host name and port. */
	previewHost?: string;
	/** The store preview URI. */
	previewPath?: string;
	/** The preview REST URI. */
	previewRestURI?: string;
}

export interface ComIbmCommerceRestMemberHandlerGuestIdentityHandlerUserIdentity {
	personalizationID: string;
	resourceName: string;
	WCToken: string;
	userId: string;
	WCTrustedToken: string;
}

export interface ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters {
	logonId: string;
	logonPassword: string;
}

/**
 * The personalization identifier.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerPersonalizationIdentifier {
	/** The personalization identifier. */
	personalizationID: string;
	resourceName: string;
}

/**
 * User's basic information.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo {
	/**
	 * The user's channel identifier.
	 * @format int64
	 */
	channelId: number;
	/**
	 * The user's store identifier.
	 * @format int64
	 */
	storeId: number;
	registerType: string;
	/**
	 * The user's caller identifier.
	 * @format int64
	 */
	callerId: number;
	/**
	 * The user identifier this session is acting upon.
	 * @format int64
	 */
	runAsId: number;
}

/**
 * User context.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext {
	/** User's basic information. */
	basicInfo: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextBasicInfo;
	/** User's entitlement information. */
	entitlement: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextEntitlement;
	/** Is the user partially authenticated. */
	isPartiallyAuthenticated: boolean;
	/** User's catalog. */
	catalog: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextCatalog;
	bcsversion?: {
		lastUpdateTime?: string | null;
	};
	audit?: {
		personalizationId?: string | null;
	};
	resourceName?: string;
	/** User's globalization context. */
	globalization: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextGlobalization;
	/** User's workspace information. */
	workspace?: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextWorkspace;
	/** User's preview information. */
	preview?: ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextPreview;
}

/**
 * Information required to authenticate a user.
 * @example {"logonId":"jsmith","logonPassword":"passw0rd!23","logonPasswordNew":"change4Ever!","logonPasswordVerify":"change4Ever!"}
 */
export interface ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm {
	/** The logon password. */
	logonPassword: string;
	/** The logon id. */
	logonId: string;
}

export interface ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm {
	authorizationProvider: string;
}

/**
 * Information required to authenticate a user.
 * @example {"application/json":{"logonId":"wcsadmin","logonPassword":"wcsadmin"}}
 */
export interface ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm {
	/** The logon password. */
	logonPassword: string;
	/** The logon id. */
	logonId: string;
}

/**
 * Information needed to creating guest identity.
 * @example {"privacyNoticeVersion":"1.0","marketingTrackingConsent":"1"}
 */
export interface ComIbmCommerceRestMemberHandlerGuestIdentityHandlerGuestIdentityForm {
	/** The version of the privacy notice. For example '1.0'. */
	privacyNoticeVersion?: string;
	/** The marketing tracking consent. 0 means opt-out, 1 means opt-in. */
	marketingTrackingConsent?: string;
}

export interface ComHclCommerceRestMemberHandlerSwitchOrganization {
	activeOrgId: string;
}

export interface ComHclCommerceRestMemberHandlerSwitchContractRequest {
	contractId: string;
}

export interface ComHclCommerceRestMemberHandlerSwitchContractResponse {
	contractId: string[];
	viewTaskName: string;
}

export interface ComHclCommerceRestMemberHandlerSwitchOrganizationResponse {
	viewTaskName: string;
}

/**
 * User's entitlement information.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextEntitlement {
	/** The user's trading agreement identifiers. */
	currentTradingAgreementIds?: number[] | null;
	/** The user's session trading agreement identifiers. */
	sessionTradingAgreementIds?: number[] | null;
	/**
	 * The user's active organization identifier.
	 * @format int64
	 */
	activeOrganizationId: number | null;
	/**
	 * The user's hosting contract identifier.
	 * @format int64
	 */
	hostingContractId?: number;
	/** The user's eligible trading agreement identifiers. */
	eligibleTradingAgreementIds?: number[] | null;
}

/**
 * User's workspace information.
 */
export interface ComIbmCommerceRestMemberHandlerUserContextHandlerUserContextWorkspace {
	/** The user's active task name. */
	task?: string;
	/** The user's active task group name. */
	taskGroup?: string;
	/** The user's active workspace name. */
	workspaceName?: string;
}

/**
 * Empty model. Used as default value when no model is specified.
 */
export type Empty = object;

export interface ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerUserIdentity {
	userId?: string;
	WCToken?: string;
	WCTrustedToken?: string;
	personalizationID?: string;
}

export interface ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerLTPAIdentityForm {
	LTPAToken: string;
}

export interface ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummary {
	resultList?: ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultList[];
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserDataUserDataField[];
}

/**
 * Description of order extended attribute.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerCheckoutRequestOrderExtendAttributeBodyDescription {
	/** Attribute name. */
	attributeName: string;
	/** Attribute type. */
	attributeType?: string;
	/** Attribute value. */
	attributeValue: string;
}

export interface CartCartUpdateItemOrderItemUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

/**
 * Order update shipping information.
 * @example {"orderId":"3033134","shipAsComplete":"true","orderItem":[{"addressId":"-1000","physicalStoreId":10039,"shipInstructions":"true","orderItemId":"10001","shipModeId":"10501"}],"resourceName":"cart","shipModeId":"10501","addressId":"-1000","x_calculationUsage":"string"}
 */
export interface ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription {
	/** Option to ship the order as complete. Valid values include "true" and "false". */
	shipAsComplete?: string;
	/** A list of order items. */
	orderItem: ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescriptionOrderItemBodyDescription[];
	/** Order identifier */
	orderId?: string;
	/** Shipping mode identifier. */
	shipModeId?: string;
	/** Address identifier. */
	addressId?: string;
	/** Calculation usage codes. */
	x_calculationUsage: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifier {
	calculationCodeIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifier;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionAdjustment {
	userData?: CartRewardOptionAdjustmentUserData;
	code?: string;
	description?: CartRewardOptionAdjustmentDescription;
	displayLevel?: string;
	calculationCodeID?: CartRewardOptionAdjustmentCalculationCodeID;
	amount?: CartRewardOptionAdjustmentAmount;
	promotionType?: string;
	usage?: string;
	isPromotionCodeRequired?: boolean;
}

export interface CartCreateorder {
	outOrderId?: string;
	redirecturl?: string;
	viewTaskName?: string;
	Basic?: string;
}

export interface CartSelf {
	totalShippingCharge: string;
	resourceId: string;
	orgUniqueID: string;
	orgDistinguishedName: string;
	orderId: string;
	lastUpdateDate: string;
	channel: ComIbmCommerceOrderFacadeDatatypesChannelType;
	orderStatus: string;
	x_isPurchaseOrderNumberRequired: string;
	totalShippingChargeCurrency: string;
	grandTotalCurrency: string;
	buyerId: string;
	buyerDistinguishedName: string;
	orderDescription?: string;
	recordSetCount: string;
	assignedCouponsUrl: string;
	x_isPersonalAddressesAllowedForShipping: string;
	storeNameIdentifier: string;
	usablePaymentInfoUrl: string;
	precheckoutUrl: string;
	totalProductPriceCurrency: string;
	totalProductPrice: string;
	locked: string;
	recordSetComplete: string;
	totalAdjustmentCurrency: string;
	totalSalesTaxCurrency: string;
	totalSalesTax: string;
	grandTotal: string;
	orderItem: CartSelfOrderItem;
	storeUniqueID: string;
	recordSetStartNumber: string;
	resourceName: string;
	recordSetTotal: string;
	shipAsComplete: string;
	x_trackingIds: string;
	shippingInfoUrl: string;
	checkoutUrl: string;
	totalShippingTax: string;
	assignedPromotionCodesUrl: string;
	usableShippingInfoUrl: string;
	totalShippingTaxCurrency: string;
	prepareIndicator: string;
	totalAdjustment: string;
	paymentInstructionUrl: string;
}

export interface CartSelfOrderItem {
	personTitle: string;
	country: string;
	zipCode: string;
	unitUom: string;
	shippingChargeCurrency: string;
	lastUpdateDate: string;
	postalCode: string;
	phone2: string;
	language: string;
	phone2Publish: string;
	phone1Publish: string;
	salesTax: string;
	addressId: string;
	phone1: string;
	correlationGroup: string;
	email2: string;
	email1: string;
	fax2: string;
	state: string;
	fax1: string;
	shippingCharge: string;
	orderItemPrice: string;
	shipModeLanguage: string;
	unitPrice: string;
	shipModeCode: string;
	productId: string;
	shipModeDescription: string;
	nickName: string;
	fulfillmentCenterName: string;
	firstName: string;
	totalAdjustment: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	orderItemInventoryStatus: string;
	lastName: string;
	city: string;
	expectedShipDate: string;
	description: string;
	xitem_isPersonalAddressesAllowedForShipping: string;
	shippingTax: string;
	orderItemStatus: string;
	offerID: string;
	currency: string;
	createDate: string;
	salesTaxCurrency: string;
	quantity: string;
	orderItemId: string;
	fulfillmentCenterId: string;
	shipModeId: string;
	isExpedited: string;
	addressLine: string[];
	orderItemFulfillmentStatus: string;
	shippingTaxCurrency: string;
	stateOrProvinceName: string;
	carrier: string;
	UOM: string;
	freeGift: string;
	unitQuantity: string;
	contractId: string;
	middleName: string;
	partNumber: string;
	productUrl: string;
}

/**
 * Description of the addOrderItem input body.
 * @example {"application/json":{"orderId":".","orderItem":[{"productId":"10706","quantity":"1"}],"x_calculateOrder":"0","x_inventoryValidation":"true"}}
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription {
	/** order extended attribute */
	orderExtendAttribute?: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderExtendAttributeBodyDescription[];
	/** The order ID */
	orderId?: string;
	/** list of order items */
	orderItem: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescription[];
	/** Specifies whether OrderCalculateCmd will be called to calculate the charges for the order. 0 = do not call OrderCalculateCmd, 1 = call OrderCalculateCmd. */
	x_calculateOrder?: string;
	/** The identifier for the type of calculation to be performed on the order. */
	x_calculationUsage?: string;
	/** Specifies whether inventory status should be validated for adding to cart. */
	x_inventoryValidation?: string;
}

/**
 * Description of order extended attribute.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderExtendAttributeBodyDescription {
	/** attribute name */
	attributeName: string;
	/** attribute type */
	attributeType?: string;
	/** attribute value */
	attributeValue: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierTypeExternalIdentifier;
}

/**
 * Body of request input for calculateOrder.
 * @example {"application/json":{"URL":["http://localhost/webapp/wcs/stores/servlet/en/aurora?calculationUsageId=-1"],"calculationUsageId":[-2],"continue":["1"],"createIfEmpty":["1"],"deleteCartCookie":["true"],"deleteIfEmpty":["*"],"fromOrderId":["*"],"orderId":["14029","14029"],"page":[""],"toOrderId":["."],"updatePrices":["0"]}}
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest {
	/** Order identifier. */
	orderId?: string;
	/** Gives predefined codes for calculation of discounts (-1), shipping (-2), sales tax (-3), shipping tax (-4), coupons (-5), surcharge (-6) and shipping adjustment (-7). */
	calculationUsageId: string;
	/** Specifies whether the command should perform the price calculation subtasks. Set to enable the price tasks (Y), or to disable price tasks (N). */
	doPrice?: string;
	/** Flag to indicate whether the price of order item is refreshed in this command. if the flag is "1", price is updated. others will not. */
	updatePrices?: string;
	/** Specifies the names of name-value pairs to pass to a JSP file. The value of each added name-value pair is the reference number of the order to display. If the name is not provided, the default name <code>orderId</code> is used. This parameter can be repeated. */
	outOrderName?: string;
	/** Specifies whether the command should perform the free gift handling logic. Set to enable free gift handling, or not to handle free gifts when not required for order recalculation (N). The default value is (Y). */
	doFreeGift?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecification {
	giftSetSpecification?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecification;
	userData?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationUserData;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerCreateOrderRequest {
	/** The reference number of a destination order. */
	outOrderName?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentType {
	catalogEntryIdentifier?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifier;
	userData?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUserData;
	orderItemComponentIdentifier?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeOrderItemComponentIdentifier;
	configurationID?: string;
	required?: boolean;
	unitPrice?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPrice;
	quantity?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeQuantity;
}

export type ComIbmCommercePaymentPunchoutCommandsPunchoutPaymentCallBackCmd = object;

export interface CartCartUpdateItemOrderItemOrderItemExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierType {
	calculationCodeIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifier | null;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesParentInfoTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesParentInfoTypeUserDataUserDataField[];
}

export interface CartOrderAmountTotalTaxByTaxCategory {
	currency?: string;
	/** @format double */
	value?: string;
	taxCategoryCode?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerRewardChoiceUpdateRequest {
	/** The id of the order to which the reward option record is associated with. */
	orderId: string;
	/** The ID of the reward option record to update with reward choice information. */
	rewardOptionId: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesTaxByTaxCategoryType {
	taxCategoryCode?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionType {
	status?: string;
	lastUpdate?: string;
	requestAmount?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeRequestAmount;
	requestTime?: string;
	trackingID?: string;
	paymentProtocolData?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypePaymentProtocolData[];
	referenceNumber?: string;
	transactionExtensionData?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeTransactionExtensionData[];
	paymentInstructionID?: string;
	merchantOrderNumber?: string;
	responseCode?: string;
	financialTransactionIdentifier?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeFinancialTransactionIdentifier;
	reasonCode?: string;
	userData?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeUserData;
	avsCode?: string;
	expirationTime?: string;
	transactionType?: string;
}

export interface CartRewardOptionCalculationCodeID {
	calculationCodeExternalIdentifier?: CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

/**
 * Description of orderitem extended attribute.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescriptionOrderItemExtendAttributeBodyDescription {
	/** Attribute name. */
	attributeName: string;
	/** Attribute type. */
	attributeType?: string;
	/** Attribute value. */
	attributeValue: string;
}

export interface CartCartItemPromotionCode {
	associatedPromotion?: CartCartItemPromotionCodeAssociatedPromotion[];
	code?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartUsablePaymentInfo {
	resourceId?: string;
	resourceName?: string;
	orderEditor?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	orderId?: string;
	quoteID?: string;
	couponCode?: ComIbmCommerceOrderFacadeDatatypesCouponCodeType[];
	cSRComments?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsType[];
	externalOrderID?: string;
	usablePaymentInformation?: CartUsablePaymentInformation[];
	comments?: string;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	lastUpdateDate?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	shipAsComplete?: string;
	buyerPONumber?: string;
	customerOrderNumber?: string;
	placedDate?: string;
	bLockInfo?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType;
	orderVersion?: string;
	promotionCode?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeType[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
}

export interface CartOrderIdentifier {
	customerOrderNumber?: string;
	orderId?: string;
	externalOrderID?: string;
}

export interface CartUsableShippingChargePolicy {
	storeId?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	type: string;
	name: string;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderRequest {
	/** Specifies an order using the order reference number or one of the Order abbreviations. If the parameter is omitted, all the pending orders is set to current. If a specified pending order no longer exists, it is not set to current. */
	orderId?: string;
	/** The reference number of a destination order. */
	outOrderName?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderResponse {
	orderId?: string[];
	viewTaskName?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesParentInfoTypeParentOrderItemIdentifier {
	uniqueID?: string;
	externalOrderItemID?: string;
}

export interface CartRewardOptionRewardSpecification {
	giftSetSpecification?: CartRewardOptionRewardSpecificationGiftSetSpecification;
	userData?: CartRewardOptionRewardSpecificationUserData;
}

export interface CartOrderItemShippingInfo {
	shippingAddress?: CartShippingAddress;
	requestedShipDate?: string;
	shippingChargeType: string;
	shipInstruction?: string;
	shipTieCode?: string;
	shippingChargePolicyID?: string;
	shippingCarrierAccountNumber?: string;
	isExpedited?: string;
	shipCarrAccntNum?: string;
	userDataField?: CartOrderItemShippingInfoUserDataField[];
	shippingMode?: CartShippingMode;
	physicalStoreId?: string;
	physicalStoreExternalId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierTypeStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartOrderItemAmount {
	/** @format double */
	unitQuantity?: string;
	salesTaxCurrency?: string;
	shippingTaxCurrency?: string;
	/** @format double */
	shippingCharge?: string;
	/** @format double */
	unitPrice?: string;
	/** @format double */
	shippingTax?: string;
	taxByTaxCategory?: ComIbmCommerceFoundationCommonDatatypesTaxByTaxCategoryType[];
	adjustment?: CartAdjustment[];
	unitUom?: string;
	currency?: string;
	totalAdjustment?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	userDataField?: CartOrderItemAmountUserDataField[];
	alternativeCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType[];
	priceOverride?: string;
	genericTotal?: ComIbmCommerceFoundationCommonDatatypesGenericTotalType[];
	freeGift?: string;
	shippingChargeCurrency?: string;
	/** @format double */
	orderItemPrice?: string;
	/** @format double */
	salesTax?: string;
}

export interface CartUsableShippingInfoOrderItemUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartUsableShippingAddress {
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	nickName: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	addressId?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerCancelOrder {
	viewTaskName?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesChannelTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReason {
	reasonCode?: string;
	valid?: boolean;
	description?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonDescription;
	userData?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonUserData;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentUserDataUserDataField[];
}

/**
 * Description of item attributes.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescriptionItemAttributesBodyDescription {
	/** Attribute name. */
	attrName: string;
	/** Attribute value. */
	attrValue: string;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer {
	/** Order identifier. */
	orderId: string;
	resourceName?: string;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerDelete {
	/** Order identifier. */
	orderId: object;
	resourceName?: string;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock {
	/** Order identifier. */
	orderId?: object;
	resourceName?: string;
	orderVersion: number;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerUnlockonbehalf {
	/** Order identifier. */
	orderId?: object;
	resourceName?: string;
	orderVersion?: string;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerRequest {
	/** Order identifier. */
	orderId: string;
}

/**
 * Structure containing an order identifier.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerResponse {
	/** Order identifier. */
	orderId: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeUserDataUserDataField[];
}

export interface CartCancelCSROrder {
	SubmitFinishMessage?: string;
	viewTaskName?: string;
}

export interface CartRenewOrderItems {
	orderId: string[];
	viewTaskName?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderResponse {
	orderId: string[];
	viewTaskName?: string;
}

export interface CartUsablePaymentInformation {
	xumet_policyId?: string;
	xumet_attrPageName?: string;
	paymentTermConditionId?: string;
	description?: string;
	language?: string;
	protocolData?: CartUsablePaymentInformationProtocolData[];
	usableBillingAddress?: CartUsablePaymentInformationUsableBillingAddress[];
	paymentMethodName?: string;
	userDataField?: CartUsablePaymentInformationUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentDescription {
	value?: string;
	language?: string;
}

export interface CartPaymentInstructionPaymentInstructionProtocolData {
	name: string;
	value?: string;
}

export interface CartPaymentInstructionUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesGenericTotalType {
	name?: string;
}

export interface CartOrderAmount {
	/** @format double */
	grandTotal?: string;
	adjustment?: CartAdjustment[];
	/** @format double */
	totalShippingTax?: string;
	totalSalesTaxCurrency?: string;
	totalShippingTaxCurrency?: string;
	/** @format double */
	totalProductPrice?: string;
	totalTaxByTaxCategory?: CartOrderAmountTotalTaxByTaxCategory[];
	totalProductPriceCurrency?: string;
	grandTotalCurrency?: string;
	/** @format double */
	totalAdjustment?: string;
	totalShippingChargeCurrency?: string;
	/** @format double */
	totalSalesTax?: string;
	totalAdjustmentCurrency?: string;
	userDataField?: CartOrderAmountUserDataField[];
	genericTotal?: ComIbmCommerceFoundationCommonDatatypesGenericTotalType[];
	/** @format double */
	totalShippingCharge?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierTypeStoreIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummary {
	resultList?: ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummaryResultList[];
}

export interface CartShippingMode {
	description?: string;
	language?: string;
	storeId?: string;
	shipModeLanguage?: string;
	trackingURL?: string;
	carrier?: string;
	shipModeDescription?: string;
	shipModeId?: string;
	shipModeCode?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItem {
	catalogEntryIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifier;
	quantity?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemQuantity;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifier {
	calculationCodeIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifier;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonUserDataUserDataField[];
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecification {
	maximumQuantity: CartRewardOptionRewardSpecificationGiftSetSpecificationMaximumQuantity;
	giftItem?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItem[];
}

export interface CartUsableShippingModeUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionRewardSpecificationUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartAdjustmentUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifier {
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifierStoreIdentifier;
	/** @format int32 */
	version?: number;
	name: string;
	/** @format int32 */
	revision?: number;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifier {
	calculationCodeExternalIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType {
	externalQuoteID?: string;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesChannelType {
	userData?: ComIbmCommerceOrderFacadeDatatypesChannelTypeUserData;
	channelIdentifer?: ComIbmCommerceOrderFacadeDatatypesChannelTypeChannelIdentifer;
	description?: ComIbmCommerceOrderFacadeDatatypesChannelTypeDescription;
}

export interface ComIbmCommerceEdpBeansEDPSensitiveDataMaskHelperDataBeanIBMSensitiveDataMaskByPlainString {
	resultList: {
		plainLength?: number;
		maskChar?: string;
		maskedString?: string;
	}[];
}

export interface CartPaymentInstructionProtocolData {
	name: string;
	value?: string;
}

export interface CartRewardOptionGiftSetGiftItem {
	catalogEntryIdentifier?: CartRewardOptionGiftSetGiftItemCatalogEntryIdentifier;
	quantity?: CartRewardOptionGiftSetGiftItemQuantity;
}

export interface CartUsableShippingInfoOrderItem {
	orderItemId?: string;
	externalOrderItemID?: string;
	usableShippingAddress?: CartUsableShippingAddress[];
	configurationID?: string;
	offerID?: string;
	comments?: string;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	lastUpdateDate?: string;
	createDate?: string;
	usableShippingMode?: CartUsableShippingMode[];
	userDataField?: CartUsableShippingInfoOrderItemUserDataField[];
	correlationGroup?: string;
	usableShippingChargePolicy?: CartUsableShippingChargePolicy[];
	UOM?: string;
	/** @format double */
	quantity?: string;
}

/**
 * Description of orderItem.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescription {
	/** The order item comment. */
	comment?: string;
	/** The name of the fulfillment center where the order item should be fulfilled. */
	fulfillmentCenterName?: string;
	/** Quantity. */
	quantity: string;
	/** The fulfillment center ID where the order item should be fulfilled. */
	fulfillmentCenterId?: string;
	/** Order item extended attribute. */
	orderItemExtendAttribute?: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescriptionOrderItemExtendAttributeBodyDescription[];
	/** Item attributes. */
	itemAttributes?: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescriptionOrderItemBodyDescriptionItemAttributesBodyDescription[];
	/** The reference number that identifies the external part number of the catalog. */
	partNumber?: string;
	/** Product ID. */
	productId?: string;
	/** The unit of measure of the order item. */
	UOM?: string;
	/** The contract ID of the contract on which the order item addition is based. */
	contractId?: string;
	/** Shipping mode identifier. */
	shipModeId?: string;
}

export interface ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBeanUniqueShippingAddresses {
	dataBeanKeyAddressId?: string;
	organizationNameURL?: string;
	stateURL?: string;
	fax1URL?: string;
	email2?: string;
	email1?: string;
	middleNameURL?: string;
	countryDisplayName?: string;
	middleName?: string;
	addressIdURL?: string;
	officeAddress?: string;
	phone1TypeURL?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	zipCode?: string;
	mobilePhone1?: string;
	primaryURL?: string;
	organizationName?: string;
	billingCode?: string;
	addressField2URL?: string;
	storeIdURL?: string;
	addressId?: string;
	fax2URL?: string;
	statusURL?: string;
	billingCodeType?: string;
	email1URL?: string;
	stateProvDisplayName?: string;
	lastCreateURL?: string;
	state?: string;
	phone1Type?: string;
	phone2Type?: string;
	phone2?: string;
	businessTitle?: string;
	phone1?: string;
	firstNameURL?: string;
	createdTimestamp?: string;
	nickNameURL?: string;
	organizationUnitName?: string;
	billingCodeURL?: string;
	country?: string;
	storeDirectory?: string | null;
	countryURL?: string;
	cityURL?: string;
	organizationUnitNameURL?: string;
	primary?: string;
	publishPhone1URL?: string;
	city?: string;
	lastCreate?: string;
	addressField1?: string;
	phone2URL?: string;
	addressField3?: string;
	addressField2?: string;
	fax2?: string;
	fax1?: string;
	address1URL?: string;
	nickName?: string;
	urlURL?: string;
	officeAddressURL?: string;
	phone1URL?: string;
	email2URL?: string;
	mobilePhone1Country?: string;
	mobilePhone1URL?: string;
	addressTypeURL?: string;
	firstName?: string;
	lastName?: string;
	createdTime?: string;
	addressType?: string;
	address2URL?: string;
	personTitle?: string;
	lastNameURL?: string;
	phone2TypeURL?: string;
	address3URL?: string;
	businessTitleURL?: string;
	zipCodeURL?: string;
	addressField3URL?: string;
	billingCodeTypeURL?: string;
	packageSuppressionURL?: string;
	addressField1URL?: string;
	publishPhone1?: string;
	publishPhone2?: string;
	bestCallingTimeURL?: string;
	packageSuppression?: string;
	personTitleURL?: string;
	bestCallingTime?: string;
	isSelfAddress?: boolean;
	mobilePhone1CountryURL?: string;
	memberId?: string;
	status?: string;
	publishPhone2URL?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierTypeStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierTypeStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeComments {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItem {
	catalogEntryIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier;
	quantity?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemQuantity;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerDeleteOrderItemRequest {
	/** The order ID. */
	orderId?: string;
	/** The identifier for the type of calculation to perform on the order. */
	calculationUsage?: string;
	/** The order item identifier. */
	orderItemId: string;
	/** Specifies whether OrderCalculateCmd is called to calculate the charges for the order. 0 = do not call OrderCalculateCmd, 1 = call OrderCalculateCmd. */
	calculateOrder?: string;
	/** The catalog entry ID of the item to delete from the order. */
	catEntryId?: string;
	/** Specifies the name-value pairs to add to the redirection URL. The values of the added name-value pairs are the reference numbers of the input orders. */
	outOrderName?: string;
	/** A list of order items that is to check by the CheckInventory task command. */
	check?: string;
}

export interface CartRewardOptionRewardChoiceUserData {
	userDataField?: CartRewardOptionRewardChoiceUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPriceAlternativeCurrencyPrice {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface CartShippingInfoOrderItemUserDataField {
	value?: string;
	key: string;
}

export interface CartShippingAddressAttributes {
	attrKey: string;
	attrValue?: string;
}

export interface CartRewardOptionAdjustmentUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescription {
	userData?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescriptionUserData;
	shortDescription?: string;
	language?: string;
	longDescription?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType {
	distinguishedName?: string;
	uniqueID?: string;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface CartPaymentInstructionPaymentInstruction {
	addressType?: string;
	addressLine?: string[];
	piId?: string;
	refundAllowed?: string;
	personTitle?: string;
	minAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	primary?: string;
	payMethodId: string;
	xpaym_tokenization?: string;
	xpaym_policyId?: string;
	paymentRule?: string;
	piDescription?: string;
	email2: string;
	/** @format double */
	piAmount?: string;
	maxAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	city?: string;
	piCurrency?: string;
	/** @format int64 */
	sequenceNumber?: string;
	piStatus?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	/** @format int64 */
	priority?: string;
	protocolData?: CartPaymentInstructionPaymentInstructionProtocolData[];
	xpaym_punchoutPayment?: string;
	state?: string;
	fax2: string;
	fax1: string;
	postalCode?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	email1: string;
	internalOfficeAddress?: string;
	billing_address_id?: string;
	paymentTermConditionId?: string;
	phone2Type?: string;
	nickName: string;
	phone2: string;
	businessTitle?: string;
	phone1: string;
	zipCode?: string;
	bestCallingTime?: string;
	mobilePhone1Country?: string;
	piLanguage?: string;
	phone2Publish?: string;
	mobilePhone1?: string;
	phone1Type?: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	organizationUnitName?: string;
	organizationName?: string;
	language?: string;
	firstName?: string;
	lastName?: string;
	geographicalShippingCode?: string;
	stateOrProvinceName?: string;
	phone1Publish?: string;
	attributes?: CartPaymentInstructionPaymentInstructionAttributes[];
	country?: string;
	userDataField?: CartPaymentInstructionPaymentInstructionUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlock {
	resovled?: boolean;
	userData?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockUserData;
	blockReason?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReason;
	timeBlocked?: string;
	comments?: string;
}

/**
 * Description of orderItem.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerShippingModesUsableShippingMode {
	/** User data. */
	userData?: string;
	field1?: string | null;
	/** Shiping mode description. */
	description?: string | null;
	/** Shipping mode tracking URL. */
	trackingURL?: string;
	/** Shipping mode carrier. */
	carrier?: string;
	/** Shipping mode code. */
	shipModeCode: string;
	/** Shipping mode identifier. */
	shipModeId: string;
	shipModeDescription?: string;
	field2?: string | null;
}

export interface CartOrderShippingInfoUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export type ComIbmCommerceOrderFacadeDatatypesChannelTypeUserData = {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesChannelTypeUserDataUserDataField[];
} | null;

export interface CartRewardOptionAdjustmentUserData {
	userDataField?: CartRewardOptionAdjustmentUserDataUserDataField[];
}

export interface CartOrderItemShippingInfoUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierTypeExternalIdentifier;
}

export interface ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultListShipChargesByShipMode {
	shipModeDesc?: string;
	shippingChargeTypes?: ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultListShipChargesByShipModeShippingChargeTypes[];
	carrierAccountNumber?: string | null;
	/** @format int32 */
	numberOfShipChargeTypes?: number;
	shipModeId?: string;
}

export interface CartRewardOptionDescription {
	value?: string;
	language?: string;
}

export interface CartRewardOptionGiftSet {
	giftItem?: CartRewardOptionGiftSetGiftItem[];
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypePaymentProtocolData {
	name: string;
	value?: string;
}

/**
 * Order item update shipping information.
 */
export interface ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescriptionOrderItemBodyDescription {
	/** Physical mode identifier. */
	physicalStoreId?: string;
	/** Shipping mode identifier. */
	shipModeId?: string;
	/** Shipping instructions. */
	shipInstructions?: string;
	/** Address identifier. */
	addressId?: string;
	/** Order item identifier. */
	orderItemId: string;
}

/**
 * Order item update shipping information.
 */
export interface PaymentInstructionDeleteall {
	resourceName?: string;
	orderId?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderItemMoveRequest {
	/** List of OrderItems whose allocations should be released. */
	outReverse?: string;
	/** The orders from which OrderItems is moved. */
	fromOrderId?: string;
	/** The valid value of this parameter is 1 or 0. The default value is 0. If the parameter createIfEmpty is specified to 1 and there is no transferred order items, a new empty order is created when either the toOrderId parameter is ** or the toOrderId parameter is .**. but there is no current pending order. The symbol "**" means to create new pending order; the symbol ".**." means to create new pending order if there are no pending orders currently. */
	createIfEmpty?: string;
	/** List of OrderItems whose allocations should be released. */
	inReverse?: string;
	/** The reference number of an output order. */
	outOrderName?: string;
	/** List of the OrderItems that should be merged with other OrderItems in the same order and with the same correlationGroup attribute, if possible. */
	outRemerge?: string;
	/** List of OrderItems that should be allocated from existing inventory. */
	outAllocate?: string;
	/** List of OrderItems that should be allocated from existing inventory. */
	inAllocate?: string;
	/** The input OrderItems to move. */
	fromOrderItemId?: string;
	/** The destination order for the output OrderItems. */
	toOrderId?: string;
	/** Whether the auto added order items is moved. */
	moveAutoAddedOrderItems?: string;
	/** List of OrderItems that should be checked on inventory. */
	inCheck?: string;
	/** List of OrderItems that should be merged with other OrderItems in the same order if possible, regardless of their correlationGroup attributes. */
	outMerge?: string;
	/** List of OrderItems that should be merged with other OrderItems in the same order if possible, regardless of their correlationGroup attributes. */
	inMerge?: string;
	/** Whether the inventory action is performed. */
	doInventory?: string;
	/** Whether orders should be deleted if no OrderItems remain when the OrderItems are moved. */
	deleteIfEmpty?: string;
	/** List of OrderItems that should be allocated from expected inventory. */
	outBackorder?: string;
	/** Whether the promotion code is merged into the target order. */
	moveOrderPromotionCode?: string;
	/** The reference number of an input order. */
	inOrderName?: string;
	/** Whether the price information for all of the order items is refreshed. */
	refreshContractAndOffer?: string;
	/** The reference number of an output OrderItem. */
	outOrderItemName?: string;
	/** List of OrderItems that should be allocated from expected inventory. */
	inBackorder?: string;
	/** List of OrderItems that should be checked on inventory. */
	outCheck?: string;
	/** List of OrderItems that should be merged with other OrderItems in the same order and with the same correlationGroup attribute, if possible. */
	inRemerge?: string;
	redirecturl?: string;
	orderId?: string[];
	viewTaskName?: string;
	url?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesParentInfoType {
	userData?: ComIbmCommerceOrderFacadeDatatypesParentInfoTypeUserData;
	relationTypeCode?: string;
	parentOrderIdentifier?: ComIbmCommerceOrderFacadeDatatypesParentInfoTypeParentOrderIdentifier;
	parentOrderItemIdentifier?: ComIbmCommerceOrderFacadeDatatypesParentInfoTypeParentOrderItemIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecification {
	maximumQuantity: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationMaximumQuantity;
	giftItem?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItem[];
}

export interface CartRewardOptionAdjustmentAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface CartRewardOption {
	code?: string;
	adjustmentLanguage?: string;
	/** @format double */
	adjustmentAmount?: string;
	calculationCodeID?: CartRewardOptionCalculationCodeID;
	adjustment?: CartRewardOptionAdjustment;
	giftSet?: CartRewardOptionGiftSet;
	rewardSpecGiftItem?: CartRewardOptionRewardSpecGiftItem[];
	adjustmentCode?: string;
	adjustmentDescription?: string;
	adjustmentUsage?: string;
	rewardChoice?: CartRewardOptionRewardChoice;
	adjustmentCurrency?: string;
	usage?: string;
	userData?: CartRewardOptionUserData;
	description?: CartRewardOptionDescription;
	rewardOptionIdentifier: CartRewardOptionRewardOptionIdentifier;
	rewardOptionExternalId?: string;
	promotionType?: string;
	isPromotionCodeRequired?: boolean;
	giftSetSpecification?: CartRewardOptionGiftSetSpecification;
	adjustmentDisplayLevel?: string;
	displayLevel?: string;
	amount?: CartRewardOptionAmount;
	rewardSpecification?: CartRewardOptionRewardSpecification;
	rewardChoiceGiftItem?: CartRewardOptionRewardChoiceGiftItem[];
	/** @format double */
	rewardSpecMaxQuantity?: string;
	rewardOptionId?: string;
	rewardSpecMaxQuantityUom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface CartCart {
	orderItem?: CartCartItem[];
	cSRComments?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsType[];
	parentInfo?: ComIbmCommerceOrderFacadeDatatypesParentInfoType;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	orderVersion?: string;
	quoteID?: string;
	bLockInfo?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType;
	orgDistinguishedName?: string;
	paymentInstruction?: CartPaymentInstruction[];
	orderIdentifier?: CartOrderIdentifier;
	comments?: string;
	placedDate?: string;
	storeUniqueID?: string;
	buyerId?: string;
	userDataField?: CartCartItemUserDataField[];
	promotionCode?: CartCartItemPromotionCode[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	resourceId?: string;
	resourceName?: string;
	orderId?: string;
	shipAsComplete?: string;
	rewardOption?: CartRewardOption[];
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	buyerPONumber?: string;
	orderAmount?: CartOrderAmount;
	orgUniqueID?: string;
	orderEditor?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	orderDescription?: string;
	couponCode?: CartCouponCode[];
	orderExtendAttribute?: CartCartItemOrderExtendAttribute[];
	paymentStatus?: string;
	storeNameIdentifier?: string;
	lastUpdateDate?: string;
	buyerDistinguishedName?: string;
	financialTransaction?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionType[];
	storeOwnerID?: string;
	totalShippingCharge?: string;
	orderStatus?: string;
	x_isPurchaseOrderNumberRequired?: string;
	totalShippingChargeCurrency?: string;
	grandTotalCurrency?: string;
	recordSetCount?: string;
	assignedCouponsUrl?: string;
	x_isPersonalAddressesAllowedForShipping?: string;
	usablePaymentInfoUrl?: string;
	precheckoutUrl?: string;
	totalProductPriceCurrency?: string;
	totalProductPrice?: string;
	locked?: string;
	recordSetComplete?: string;
	totalAdjustmentCurrency?: string;
	totalSalesTaxCurrency?: string;
	totalSalesTax?: string;
	grandTotal?: string;
	recordSetTotal?: string;
	x_trackingIds?: string;
	shippingInfoUrl?: string;
	checkoutUrl?: string;
	totalShippingTax?: string;
	assignedPromotionCodesUrl?: string;
	usableShippingInfoUrl?: string;
	totalShippingTaxCurrency?: string;
	prepareIndicator?: string;
	totalAdjustment?: string;
	paymentInstructionUrl?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType {
	orderBlock?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlock[];
	userData?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeUserData;
}

export interface CartRewardOptionUserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Description of orderItem.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderItemBodyDescription {
	/** The order item ID. */
	orderItemId?: string;
	/** The contract ID of the contract on which the order item addition is based. */
	contractId?: string;
	/** Order item extended attribute. */
	orderItemExtendAttribute?: ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderItemBodyDescriptionOrderItemExtendAttributeBodyDescription[];
	/** The reference number that identifies the external part number of the catalog. */
	partNumber?: string;
	/** Quantity. */
	quantity: string;
	/** Product ID. */
	productId?: string;
}

export interface CartRewardOptionRewardChoiceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartPaymentInstructionPaymentInstructionAttributes {
	attrKey: string;
	attrValue?: string;
}

export interface CartRewardOptionRewardOptionIdentifier {
	uniqueID?: string;
	externalIdentifier?: string;
}

export interface CartCartItem {
	timeReleased?: string;
	orderItemFulfillmentStatus?: string;
	externalOrderItemID?: string;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	orderItemInventoryStatus?: string;
	comments?: string;
	orderItemExtendAttribute?: CartCartItemOrderItemExtendAttribute[];
	fulfillmentCenterDescription?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	UOM?: string;
	fulfillmentCenterName?: string;
	orderItemShippingInfo?: CartOrderItemShippingInfo;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	availableDate?: string;
	createDate?: string;
	timeShipped?: string;
	offerID?: string;
	fulfillmentCenterId?: string;
	userDataField?: CartCartItemUserDataField[];
	productId?: string;
	expectedShipDate?: string;
	itemAttributes?: CartCartItemItemAttributes[];
	ownerID?: string;
	correlationGroup?: string;
	contractId?: string;
	orderItemStatus?: string;
	orderItemId?: string;
	configurationID?: string;
	orderItemAmount?: CartOrderItemAmount;
	lastUpdateDate?: string;
	orderItemComponent?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentType[];
	partNumber: string;
	/** @format double */
	quantity?: string;
	usableShippingChargePolicy?: CartUsableShippingChargePolicy[];
	fulfillmentCenterOwnerId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeID {
	calculationCodeExternalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface CartCartUpdate {
	Order?: CartCartUpdateItem[];
	resourceName?: string;
}

export interface CartUsableShippingMode {
	description?: string;
	language?: string;
	storeId?: string;
	trackingURL?: string;
	carrier?: string;
	shipModeCode?: string;
	shippingChargeCurrency?: string;
	shipModeId?: string;
	shippingCharge?: string;
	userDataField?: CartUsableShippingModeUserDataField[];
}

export interface UsableShippingMode {
	usableShippingMode?: CartUsableShippingMode;
	resourceId?: string;
	orderId?: string;
	resourceName?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonUserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Request body input for shopping cart submission for checkout.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerCheckoutRequest {
	/** Order identifier. */
	orderId: string;
	/** Specifies whether the customer is notified when the order is successfully submitted for processing. 1=Yes, 0=No (Default). */
	notifyOrderSubmitted?: string;
	/** Send SMS notifications to the target phone number. */
	SMS?: string;
	/** Order extended attribute. */
	orderExtendAttribute?: ComIbmCommerceRestOrderHandlerCartHandlerCheckoutRequestOrderExtendAttributeBodyDescription[];
	/** Whether the store is notified when the order processing is complete. E-mail notifications are only sent when Digital Commerce is configured with Digital Commerce Payments. 1=Yes ,0=No. */
	notifyMerchant?: string;
	/** Whether the customer is notified when the order processing is complete. E-mail notifications are only sent when Digital Commerce is configured with Digital Commerce Payments. 1=Yes, 0=No. */
	notifyShopper?: string;
	/** Send order e-mail notifications to the target recipient. */
	notify_EMailSender_recipient?: string;
	/** The purchase order ID. */
	purchaseorder_id?: string;
}

export type ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBeanBillingAddressDataBean =
	{
		dataBeanKeyAddressId?: string;
		organizationNameURL?: string;
		stateURL?: string;
		fax1URL?: string;
		email2?: string;
		email1?: string;
		middleNameURL?: string;
		countryDisplayName?: string;
		middleName?: string;
		addressIdURL?: string;
		officeAddress?: string;
		phone1TypeURL?: string;
		address1?: string;
		address2?: string;
		address3?: string;
		zipCode?: string;
		mobilePhone1?: string;
		primaryURL?: string;
		organizationName?: string;
		billingCode?: string;
		addressField2URL?: string;
		storeIdURL?: string;
		addressId?: string;
		fax2URL?: string;
		statusURL?: string;
		billingCodeType?: string;
		email1URL?: string;
		stateProvDisplayName?: string;
		lastCreateURL?: string;
		state?: string;
		phone1Type?: string;
		phone2Type?: string;
		phone2?: string;
		businessTitle?: string;
		phone1?: string;
		firstNameURL?: string;
		createdTimestamp?: string;
		nickNameURL?: string;
		organizationUnitName?: string;
		billingCodeURL?: string;
		country?: string;
		storeDirectory?: string;
		countryURL?: string;
		cityURL?: string;
		organizationUnitNameURL?: string;
		primary?: string;
		publishPhone1URL?: string;
		city?: string;
		lastCreate?: string;
		addressField1?: string;
		phone2URL?: string;
		addressField3?: string;
		addressField2?: string;
		fax2?: string;
		fax1?: string;
		address1URL?: string;
		nickName?: string;
		urlURL?: string;
		officeAddressURL?: string;
		phone1URL?: string;
		email2URL?: string;
		mobilePhone1Country?: string;
		mobilePhone1URL?: string;
		addressTypeURL?: string;
		firstName?: string;
		lastName?: string;
		createdTime?: string;
		addressType?: string;
		address2URL?: string;
		personTitle?: string;
		lastNameURL?: string;
		phone2TypeURL?: string;
		address3URL?: string;
		businessTitleURL?: string;
		zipCodeURL?: string;
		addressField3URL?: string;
		billingCodeTypeURL?: string;
		packageSuppressionURL?: string;
		addressField1URL?: string;
		publishPhone1?: string;
		publishPhone2?: string;
		bestCallingTimeURL?: string;
		packageSuppression?: string;
		personTitleURL?: string;
		bestCallingTime?: string;
		isSelfAddress?: boolean;
		mobilePhone1CountryURL?: string;
		memberId?: string;
		status?: string;
		publishPhone2URL?: string;
	} | null;

export interface ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListBillingAddresses {
	dataBeanKeyAddressId?: string;
	organizationNameURL?: string;
	stateURL?: string;
	fax1URL?: string;
	email2?: string;
	email1?: string;
	middleNameURL?: string;
	countryDisplayName?: string;
	middleName?: string;
	addressIdURL?: string;
	officeAddress?: string;
	phone1TypeURL?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	zipCode?: string;
	mobilePhone1?: string;
	primaryURL?: string;
	organizationName?: string;
	billingCode?: string;
	addressField2URL?: string;
	storeIdURL?: string;
	addressId?: string;
	fax2URL?: string;
	statusURL?: string;
	billingCodeType?: string;
	email1URL?: string;
	stateProvDisplayName?: string;
	lastCreateURL?: string;
	state?: string;
	phone1Type?: string;
	phone2Type?: string;
	phone2?: string;
	businessTitle?: string;
	phone1?: string;
	firstNameURL?: string;
	createdTimestamp?: string;
	nickNameURL?: string;
	organizationUnitName?: string;
	billingCodeURL?: string;
	country?: string;
	storeDirectory?: string | null;
	countryURL?: string;
	cityURL?: string;
	organizationUnitNameURL?: string;
	primary?: string;
	publishPhone1URL?: string;
	city?: string;
	lastCreate?: string;
	addressField1?: string;
	phone2URL?: string;
	addressField3?: string;
	addressField2?: string;
	fax2?: string;
	fax1?: string;
	address1URL?: string;
	nickName?: string;
	urlURL?: string;
	officeAddressURL?: string;
	phone1URL?: string;
	email2URL?: string;
	mobilePhone1Country?: string;
	mobilePhone1URL?: string;
	addressTypeURL?: string;
	firstName?: string;
	lastName?: string;
	createdTime?: string;
	addressType?: string;
	address2URL?: string;
	personTitle?: string;
	lastNameURL?: string;
	phone2TypeURL?: string;
	address3URL?: string;
	businessTitleURL?: string;
	zipCodeURL?: string;
	addressField3URL?: string;
	billingCodeTypeURL?: string;
	packageSuppressionURL?: string;
	addressField1URL?: string;
	publishPhone1?: string;
	publishPhone2?: string;
	bestCallingTimeURL?: string;
	packageSuppression?: string;
	personTitleURL?: string;
	bestCallingTime?: string;
	isSelfAddress?: boolean;
	mobilePhone1CountryURL?: string;
	memberId?: string;
	status?: string;
	publishPhone2URL?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummaryResultList {
	dataBeanKeyBuyerPurchaseOrderId?: string;
	purchaseOrderNumber?: string;
	/** @format int32 */
	state?: number;
	buyerPurchaseOrderTypeId?: string;
	currency?: string;
	amount?: string;
	/** @format int64 */
	buyerPurchaseOrderId?: number;
	/** @format int64 */
	accountId?: number;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleRequest {
	/** Order identifier. */
	orderId: string;
	/** The number of seconds between successive executions of this order. */
	interval?: string;
	/** Host name responsible for processing an order. */
	host?: string;
	/** The amount of time, in seconds, before order processing is retried, in case of order processing failure. This parameter must be paired with the attempts parameter. */
	delay?: string;
	/** The time at which the first execution of this order should occur in the format YYYY:MM:DD:hh:mm:ss. Only hh:mm:ss is mandatory. */
	start: string;
	/** The number of times the scheduler tries processing this order if order processing fails. */
	attempts?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleResponse {
	redirecturl?: string;
	viewTaskName?: string;
}

export interface CartPaymentInstructionPaymentInstructionUserDataField {
	value?: string;
	key: string;
}

/**
 * Description of orderItem.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainerOrderItemBodyDescription {
	/** The order item. */
	orderItemId?: string;
}

export interface CartCalculate {
	orderId: string[];
	viewTaskName: string;
}

export interface CartPaymentInstruction {
	orderId?: string;
	userDataField?: CartPaymentInstructionUserDataField[];
	paymentInstruction: CartPaymentInstructionPaymentInstruction[];
	resourceId: string;
	x_isPersonalAddressesAllowedForShipping?: string;
	x_isPurchaseOrderNumberRequired?: string;
	resourceName?: string;
	paymentStatus?: string;
	x_trackingIds?: string;
	financialTransaction?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionType[];
}

export interface CartOrderShippingInfo {
	userDataField?: CartOrderShippingInfoUserDataField[];
	requestedShipDate?: string;
	shipModeId?: string;
	addressId?: string;
	pysicalStoreId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockUserDataUserDataField[];
}

export interface CartCartItemPromotionCodeAssociatedPromotion {
	description?: string;
	promotionId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardOptionIdentifier {
	uniqueID?: string;
	externalIdentifier?: string;
}

export interface CartRewardOptionRewardChoiceGiftItem {
	/** @format double */
	quantity?: string;
	uom?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType;
	productId?: string;
}

export interface CartRewardOptionGiftSetSpecificationMaximumQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeType {
	status?: string;
	userData?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeUserData;
	code?: string;
	couponId?: string;
	expirationDateTime?: string;
	description?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescription[];
	effectiveDateTime?: string;
	promotionIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifier;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItem {
	catalogEntryIdentifier?: CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifier;
	quantity?: CartRewardOptionRewardChoiceGiftSetGiftItemQuantity;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReasonDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPriceQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface CartUsablePaymentInformationUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultList {
	shipChargesByShipMode?: ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultListShipChargesByShipMode[];
	isShipChargesExist?: boolean;
	/** @format int32 */
	numberOfShipModes?: number;
}

export interface CartCouponCode {
	status?: string;
	code?: string;
	couponId?: string;
	expirationDateTime?: string;
	effectiveDateTime?: string;
	promotion?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierType;
	userDataField?: CartCouponCodeUserDataField[];
	description?: ComIbmCommerceOrderFacadeDatatypesCouponDescriptionType[];
}

export interface CartCartItemOrderExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPersonIdentifierTypeExternalIdentifier {
	identifier?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoice {
	userData?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceUserData;
	giftSet?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSet;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifier {
	calculationCodeExternalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeCalculationCodeIdentifierCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultList {
	orderDataBean?: ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBean;
	isPersonalAddressAllowForBilling?: boolean;
	billingAddresses?: ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListBillingAddresses[];
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustment {
	userData?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentUserData;
	code?: string;
	description?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentDescription;
	displayLevel?: string;
	calculationCodeID?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeID;
	amount?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentAmount;
	promotionType?: string;
	usage?: string;
	isPromotionCodeRequired?: boolean;
}

export interface CartUsablePaymentInformationUsableBillingAddress {
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	nickName: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	addressId?: string;
}

export interface CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface CartCartItemUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionGiftSetSpecificationGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailedResultList {
	PAttributeId?: string;
	name?: string;
	/** @format int64 */
	referenceNumber?: number;
	encryptFlag?: string;
	/** @format int32 */
	sequence?: number | null;
	accessBeanName?: string;
	attrTypeId?: string;
}

export interface CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartRewardOptionUserData {
	userDataField?: CartRewardOptionUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesChannelTypeChannelIdentifer {
	channelName?: string;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface CartCartUpdateItemUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeUserDataUserDataField[];
}

export interface CartCartItemItemAttributes {
	attrName: string;
	attrValue?: string;
}

export interface ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailedResultListPaymentPolicyInfoUsableWithoutTA {
	policyName?: string;
	attrPageName?: string;
	longDescription?: string;
	policyType?: string;
	policyId?: string;
	shortDescription?: string;
}

/**
 * Shipping mode list.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerShippingModes {
	resourceId?: string;
	resourceName?: string;
	/** List of order items. */
	usableShippingMode: ComIbmCommerceRestOrderHandlerCartHandlerShippingModesUsableShippingMode[];
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartUsablePaymentInformationProtocolData {
	name: string;
	value?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CartOrderAmountUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailed {
	resultList?: ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailedResultList[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSet {
	giftItem?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItem[];
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotion {
	description?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionDescription;
	promotionIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifier;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerAddConfigurationToCartRequest {
	/** The identifier of the address to which the products and items are shipped. */
	comment?: string;
	/** The reference number of the shipping mode to use for the product or item. */
	addressId?: string;
	/** The identifier of a catalog entry to use to create a new OrderItem. */
	catEntryId?: string;
	/** A list of OrderItems that should be checked by the CheckInventoryAvailability task command. */
	check?: string;
	/** The unit of measure for quantity. */
	UOM?: string;
	/** The configuration XML of the dynamic kit to add. */
	ConfigXML: string;
	/** Specifies whether inventory status should be validated for adding to cart. */
	inventoryValidation?: string;
	/** The identifier of the fulfillment center that this item belongs to. */
	fulfillmentCenterId?: string;
	/** The identifier associated with a particular shipping service. */
	shipModeId?: string;
	/** The identifier of the contract associated with the order. */
	contractId?: string;
	/** A comment to include with the created or updated order items. */
	physicalStoreId?: string;
	/** A list of OrderItems that should be allocated from existing inventory. */
	allocate?: string;
	/** Specifies whether the command should perform the price calculation subtasks. Set to enable the price tasks (Y), or to disable price tasks (N). */
	doPrice?: string;
	/** Specifies whether the command should perform the inventory calculation subtasks. Set to either do the price tasks (Y), or not (N). Turning off these tasks might result in better performance, but customers might not get the most current inventory level, when changes occur. */
	doInventory?: string;
	/** The identifier for the type of calculation to perform on the order. */
	calculationUsage?: string;
	/** A list of OrderItems whose allocations should be released (that is, de-allocated from existing or expected inventory as appropriate). */
	reverse?: string;
	/** A list of the OrderItems that should be merged with other OrderItems in the same order and with the same correlationGroup attribute, if possible. OrderItems are not merged unless their InventoryStatus is "NALC", or they are specified by one or more of the allocate, backorder, and reverse parameters. */
	remerge?: string;
	/** Specifies whether OrderCalculateCmd is called to calculate the charges for the order. 0 = do not call OrderCalculateCmd, 1 = call OrderCalculateCmd. */
	calculateOrder?: string;
	/** A list of OrderItems that should be merged with other OrderItems in the same order if possible, regardless of their correlationGroup attributes. */
	merge?: string;
	/** A list of OrderItems that should be allocated from expected inventory if they are not allocated from existing inventory. */
	backorder?: string;
	/** The part number of catalog entry. */
	partNumber?: string;
	/** The quantity of the item to add to the order. */
	quantity?: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerUpdateConfigurationInCartRequest {
	/** The new configuration XML of the dynamic kit. */
	ConfigXML: string;
	/** The ID of the order item to update. */
	orderItemId: string;
}

export interface ComIbmCommerceRestOrderHandlerCartHandlerCartResponse {
	orderId?: string[];
	orderItemId?: string[];
	resourceName?: string;
}

/**
 * @example {"URL":"https://localhost/wcs/resources/store/10801/cart/copy_order","copyOrderItemId":"*","description":"","fromOrderId":-13579,"requesttype":"ajax","toOrderId":"**"}
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest {
	/** A comment to include with the item when order items are added to or updated in the destination order. */
	comment?: string;
	/** The date which the destination order should be shipped. */
	requestedShipDate?: string;
	/** The reference number of the address to which the order items are shipped. */
	addressId?: string;
	/** Specifies zero or more source orders from which order items is copied. */
	fromOrderId?: string;
	/** The catalog entry ID of the order item. */
	catEntryId?: string;
	/** List of offer IDs to chose from when creating a new order item. */
	offerId?: string;
	/** The currency of the order items. */
	currency?: string;
	/** (Deprecated) This is supported for compatibility with earlier versions. With payment rule, ORDPAYINFO is not used, while using payment plugin controller and payment plugins. Sets the payment name-value pairs of the destination order. */
	pay_paymentname?: string;
	/** Specifies which order items should be copied from the source orders specified by fromOrderId and added to the destination order specified by toOrderId. */
	copyOrderItemId?: string;
	/** Specifies the order to create or modify. */
	toOrderId?: string;
	/** List of order items that is to check by the CheckInventory task command. */
	check?: string;
	/** The unit of measure for the quantity. */
	UOM?: string;
	/** Whether to prepare the order by calling the PrepareOrder command. */
	prepare?: string;
	/** Sets the field2 value of the destination order. If not specified, the corresponding field value of the "orderInfoFrom" order is used, if there is one. */
	field2?: string;
	/** Sets the field3 value of the destination order. If not specified, the corresponding field value of the "orderInfoFrom" order is used, if there is one. */
	field3?: string;
	/** Sets the field1 value of the destination order. If not specified, the corresponding field value of the "orderInfoFrom" order is used, if there is one. */
	field1?: string;
	/** Whether to copy public promotion codes applied to the order. */
	copyOrderPromotionCode?: string;
	/** Whether inventory status should be validated for adding to cart. */
	inventoryValidation?: string;
	/** Specifies order items in the destination order to update. It is updated using information from other parameters in the enumeration group specified by i, but not from the source orders for that enumeration group and not from catEntryId and partNumber. Note that the catalog entry ID of an order item cannot be updated. */
	updateOrderItemId?: string;
	/** Whether to keep eligible contracts. */
	keepOrdItemValidContract?: string;
	/** List of order items that is to allocate from existing inventory. */
	allocate?: string;
	/** The reference number associated with a particular shipping service. */
	shipModeId?: string;
	/** Whether to copy unique promotion codes applied to the order. */
	copyOrderUniquePromotionCode?: string;
	/** The reference number of an order from which to copy order-level information. */
	orderInfoFrom?: string;
	/** The billing address ID of the destination order. */
	billingAddressId?: string;
	/** The price of the order items. */
	price?: string;
	/** The reference number of an order from which to obtain payment information. If more than one order is specified, only the most recently updated of those orders applies. */
	payInfoFrom?: string;
	/** The status of the destination order. */
	status?: string;
	/** Specifies if the created or modified order can be partially shipped. If the value is Y, the order is shipped when all order items are available. If the value is N, the order can be partially shipped when some of the order items are available. */
	shipAsComplete?: string;
	/** The order comment. */
	orderComment?: string;
	/** The description of the destination order. */
	description?: string;
	/** Whether to copy auto-added order items. */
	copyAutoAddedOrderItems?: string;
	/** Whether to use the default shipping mode held in the order profile: if the value is 1, the default shipping mode is copied from the order profile to all the order items of the order specified in toOrderId. */
	shippingModeFromOrderProfile?: string;
	/** If the order item represents a configured Dynamic Kit, this is the configuration ID. */
	configurationId?: string;
	/** Whether the orderblock objects is copied. */
	blockInfoCopy?: string;
	/** The display sequence of the destination order. */
	displaySeq?: string;
	/** The member ID of the part owner, used with partNumber. */
	partOwnerId?: string;
	/** Whether to copy order payment information. */
	copyOrdPayInfo?: string;
	/** The group to which this order item is related. */
	correlationGroup?: string;
	/** The contract reference number associated with the order. */
	contractId?: string;
	/** List of order items to release the allocation for. */
	reverse?: string;
	/** List of the order items to merge with other order items in the same order and with the same correlationGroup attribute, if possible. */
	remerge?: string;
	/** The reference number of a destination order. */
	outOrderName?: string;
	/** The reference number of a destination order item. */
	outOrderItemName?: string;
	/** Whether the PO number of source order is copied to the destination order. */
	isPONumberCopied?: string;
	/** Whether to refresh the price information for all order items. */
	refreshContractAndOffer?: string;
	/** The reference number of a member, used to resolve special order abbreviations when they appear in fromOrderId. */
	memberId?: string;
	/** List of order items that is to merge with other order items in the same order if possible, regardless of their correlationGroup attributes. */
	merge?: string;
	/** Whether the payment methods is copied. */
	sensitiveInfoCopy?: string;
	/** Controls whether the order copy continues when one or more of the order items cannot be copied. A value of 0 terminates and rolls back execution if an order item cannot be created or updated in the target order. A value of 1 ignores the create or update operation for that order item and continues execution. The default value is 0. */
	continue?: string;
	/** Whether to use the default shipping address held in the order profile: if the value is 1, the default shipping address is copied from the order profile to all the order items of the order specified in toOrderId. */
	shippingAddressFromOrderProfile?: string;
	/** List of order items that is to allocate from expected inventory. */
	backorder?: string;
	/** Part number to resolve to a catalog entry. It overrides catEntryId. */
	partNumber?: string;
	/** The term and condition ID of the destination order. */
	tcId?: string;
	/** The quantity of the order item. */
	quantity?: string;
	orderId?: string[];
	viewTaskName?: string;
	/** @format int32 */
	newOrderItemsCount?: number;
}

export interface CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesStoreIdentifierTypeExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartPaymentInstruction {
	paymentTermConditionId?: string;
	paymentRule?: string;
	/** @format int64 */
	sequenceNumber?: string;
	piId?: string;
	piStatus?: string;
	protocolData?: CartPaymentInstructionProtocolData[];
	minAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	refundAllowed?: string;
	piCurrency?: string;
	/** @format int64 */
	priority?: string;
	payMethodId?: string;
	billingAddress?: CartBillingAddress;
	piDescription?: string;
	userDataField?: CartPaymentInstructionUserDataField[];
	piLanguage?: string;
	/** @format double */
	piAmount?: string;
	maxAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
}

export interface ComIbmCommerceFoundationCommonDatatypesDescriptionType {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponDescriptionTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipMode {
	resultList?: ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultList[];
	resourceName?: string;
}

export interface CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipModeResultListShipChargesByShipModeShippingChargeTypes {
	policyName?: string;
	internalPolicyId?: string | null;
	policyDescription?: string | null;
	selected?: boolean;
	policyId?: string;
	carrAccntNumber?: string | null;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPrice {
	price?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPricePrice;
	quantity?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPriceQuantity;
	alternativeCurrencyPrice?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPriceAlternativeCurrencyPrice[];
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeFinancialTransactionIdentifier {
	uniqueID?: string;
	externalIdentifier?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartUsableShippingInfo {
	resourceId?: string;
	orderEditor?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	orderId?: string;
	quoteID?: string;
	usableShippingAddress?: CartUsableShippingInfoUsableShippingAddress[];
	usableShippingMode?: CartUsableShippingMode[];
	couponCode?: ComIbmCommerceOrderFacadeDatatypesCouponCodeType[];
	cSRComments?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsType[];
	rewardOption?: ComIbmCommerceOrderFacadeDatatypesRewardOptionType[];
	externalOrderID?: string;
	comments?: string;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	lastUpdateDate?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	shipAsComplete?: string;
	buyerPONumber?: string;
	customerOrderNumber?: string;
	placedDate?: string;
	bLockInfo?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType;
	orderItem?: CartUsableShippingInfoOrderItem[];
	orderVersion?: string;
	promotionCode?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeType[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	resourceName?: string;
}

export interface CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailedResultList {
	/** @format int32 */
	secondaryRC?: number;
	paymentPolicyInfoUsableWithoutTA?: ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailedResultListPaymentPolicyInfoUsableWithoutTA[];
	message?: string;
	/** @format int32 */
	primaryRC?: number;
}

export interface CartBillingAddressAttributes {
	attrKey: string;
	attrValue?: string;
}

export interface CartRewardOptionGiftSetGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponDescriptionType {
	userData?: ComIbmCommerceOrderFacadeDatatypesCouponDescriptionTypeUserData;
	shortDescription?: string;
	language?: string;
	longDescription?: string;
}

/**
 * Description of orderitem extended attribute.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderItemBodyDescriptionOrderItemExtendAttributeBodyDescription {
	/** The attribute name. */
	attributeName: string;
	/** The attribute type. */
	attributeType?: string;
	/** The attribute value. */
	attributeValue: string;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface CartCartUpdateItem {
	orderId?: string;
	shipAsComplete?: string;
	orderComment?: string;
	orderItem?: CartCartUpdateItemOrderItem[];
	orderDescription?: string;
	orderExtendAttribute?: CartCartUpdateItemOrderExtendAttribute[];
	userDataField?: CartCartUpdateItemUserDataField[];
}

export interface CartCartUpdateItemShippinginfo {
	orderId?: string;
	shipAsComplete?: string;
	orderComment?: string;
	orderItem?: CartCartUpdateItemOrderItem[];
	orderDescription?: string;
	orderExtendAttribute?: CartCartUpdateItemOrderExtendAttribute[];
	userDataField?: CartCartUpdateItemUserDataField[];
	resourceName?: string;
}

export interface CartCartUpdateItemOrderExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface CartShippingInfo {
	recordSetCount?: string;
	resourceId?: string;
	orderId?: string;
	shipAsComplete?: string;
	orderItem?: {
		personTitle?: string;
		lastName?: string;
		country?: string;
		zipCode?: string;
		xitem_field2?: string;
		city?: string;
		postalCode?: string;
		phone2?: string;
		description?: string;
		language?: string;
		phone2Publish?: string;
		phone1Publish?: string;
		xitem_isPersonalAddressesAllowedForShipping?: string;
		addressId?: string;
		phone1?: string;
		email2?: string;
		email1?: string;
		physicalStoreId?: string;
		fax2?: string;
		state?: string;
		fax1?: string;
		shipModeLanguage?: string;
		shipModeCode?: string;
		shipModeDescription?: string;
		orderItemId?: string;
		nickName?: string;
		shipModeId?: string;
		isExpedited?: string;
		addressLine?: string[];
		stateOrProvinceName?: string;
		firstName?: string;
		physicalStoreExternalId?: string;
		middleName?: string;
	}[];
	x_isPersonalAddressesAllowedForShipping?: string;
	recordSetStartNumber?: string;
	x_isPurchaseOrderNumberRequired?: string;
	resourceName?: string;
	recordSetTotal?: string;
	x_trackingIds?: string;
	recordSetComplete?: string;
}

export interface CartRewardOptionAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CartShippingAddress {
	addressType?: string;
	addressLine?: string[];
	addressId?: string;
	personTitle?: string;
	primary?: string;
	email2: string;
	email1: string;
	city?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	state?: string;
	internalOfficeAddress?: string;
	fax2: string;
	fax1: string;
	postalCode?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	phone1Type?: string;
	nickName: string;
	phone2Type?: string;
	phone2: string;
	businessTitle?: string;
	phone1: string;
	zipCode?: string;
	bestCallingTime?: string;
	mobilePhone1Country: string;
	phone2Publish?: string;
	mobilePhone1: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	organizationUnitName?: string;
	organizationName?: string;
	language?: string;
	firstName?: string;
	lastName?: string;
	geographicalShippingCode?: string;
	stateOrProvinceName?: string;
	phone1Publish?: string;
	attributes?: CartShippingAddressAttributes[];
	country?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartCartUpdateItemOrderItemItemAttributes {
	attrName: string;
	attrValue?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface CartPaymentInstructionUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface CartRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartRewardOptionGiftSetGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCode {
	reasonCode?: string;
	description?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeDescription;
	userData?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeUserData;
}

export interface CartCartItemOrderItemExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifier {
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierExternalIdentifierStoreIdentifier;
	/** @format int32 */
	version?: number;
	name: string;
	/** @format int32 */
	revision?: number;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCodeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifier {
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierTypeExternalIdentifierStoreIdentifier | null;
	/** @format int32 */
	version?: number;
	name: string;
	/** @format int32 */
	revision?: number;
}

export interface JavaUtilMapEntry {
	value?: string;
	key: string;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeTransactionExtensionData {
	name: string;
	value?: string;
}

export interface CartOrderStatus {
	xstat_?: JavaUtilMapEntry[];
	locked?: string;
	prepareIndicator?: string;
	buyerApprovalStatus?: string;
	editable?: string;
	orderStatus?: string;
	blocked?: string;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

/**
 * Payment instruction.
 */
export interface ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionListPaymentInstruction {
	/** Payment instruction ID. */
	piId: string;
}

export interface CartRewardOptionGiftSetSpecification {
	maximumQuantity: CartRewardOptionGiftSetSpecificationMaximumQuantity;
	giftItem?: CartRewardOptionGiftSetSpecificationGiftItem[];
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeRequestAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface CartRewardOptionAdjustmentDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesChannelTypeDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifier {
	calculationCodeExternalIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescriptionUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypeDescriptionUserDataUserDataField[];
}

export interface CartShippingInfoUserDataField {
	value?: string;
	key: string;
}

export interface CartAdjustment {
	code?: string;
	description?: string;
	language?: string;
	displayLevel?: string;
	currency?: string;
	/** @format double */
	amount?: string;
	usage?: string;
	userDataField?: CartAdjustmentUserDataField[];
	descriptionLanguage?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionType {
	rewardChoice?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoice;
	userData?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeUserData;
	rewardSpecification?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecification;
	rewardOptionIdentifier: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardOptionIdentifier;
	adjustment?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustment;
}

/**
 * Description of order extended attribute.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderExtendAttributeBodyDescription {
	/** attribute name */
	attributeName: string;
	/** attribute type */
	attributeType?: string;
	/** attribute value */
	attributeValue: string;
}

/**
 * Description of the updateOrderItem input body.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription {
	/** order extended attribute */
	orderExtendAttribute?: ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderExtendAttributeBodyDescription[];
	/** The order ID. */
	orderId?: string;
	/** The identifier for the type of calculation to perform on the order. */
	x_calculationUsage?: string;
	/** Specifies whether OrderCalculateCmd is called to calculate the charges for the order. 0 = do not call OrderCalculateCmd, 1 = call OrderCalculateCmd. */
	x_calculateOrder?: string;
	/** List of order items. */
	orderItem: ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescriptionOrderItemBodyDescription[];
	/** Specifies whether inventory status should be validated for adding to cart. */
	x_inventoryValidation?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUnitPricePrice {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponDescriptionTypeUserData {
	userDataField?: ComIbmCommerceOrderFacadeDatatypesCouponDescriptionTypeUserDataUserDataField[];
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationMaximumQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface CartDeletePaymentInstruction {
	orderId?: string;
	resourceName?: string;
}

/**
 * Payment instruction list.
 */
export interface ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList {
	/** Order identifier. */
	orderId: string;
	/** List of payment instructions. */
	paymentInstruction: ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionListPaymentInstruction[];
	resourceName: string;
}

export interface CartRewardOptionRewardChoice {
	userData?: CartRewardOptionRewardChoiceUserData;
	giftSet?: CartRewardOptionRewardChoiceGiftSet;
}

export interface CartUsableShippingInfoUsableShippingAddress {
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	nickName: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	addressId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifierExternalIdentifier {
	identifier?: string;
}

export interface CartBillingAddress {
	addressType?: string;
	addressLine?: string[];
	personTitle?: string;
	primary?: string;
	email2: string;
	email1: string;
	city?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	state?: string;
	internalOfficeAddress?: string;
	fax2: string;
	fax1: string;
	postalCode?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	phone1Type?: string;
	nickName: string;
	billing_address_id?: string;
	phone2Type?: string;
	phone2: string;
	businessTitle?: string;
	phone1: string;
	zipCode?: string;
	bestCallingTime?: string;
	mobilePhone1Country: string;
	phone2Publish?: string;
	mobilePhone1: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	organizationUnitName?: string;
	organizationName?: string;
	language?: string;
	firstName?: string;
	lastName?: string;
	geographicalShippingCode?: string;
	stateOrProvinceName?: string;
	phone1Publish?: string;
	attributes?: CartBillingAddressAttributes[];
	country?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType {
	adjustmentUsage: string;
	userData?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeUserData;
	adjustmentValue?: string;
	comments?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementTypeComments;
	adjustmentCategory: string;
}

export interface CartRewardOptionGiftSetSpecificationGiftItem {
	catalogEntryIdentifier?: CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifier;
	quantity?: CartRewardOptionGiftSetSpecificationGiftItemQuantity;
}

export interface CartRewardOptionRewardSpecificationUserData {
	userDataField?: CartRewardOptionRewardSpecificationUserDataUserDataField[];
}

export interface CartOrderItemAmountUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CartRewardOptionAdjustmentCalculationCodeID {
	calculationCodeExternalIdentifier?: CartRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesParentInfoTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesFinancialTransactionTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReason {
	reasonCode?: string;
	userData?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonUserData;
	description?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoTypeOrderBlockBlockReasonDescription;
	reansonType?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeAdjustmentUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesRewardOptionTypeRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItem {
	catalogEntryIdentifier?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier;
	quantity?: CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemQuantity;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationMaximumQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeOrderItemComponentIdentifier {
	uniqueID?: string;
}

export interface CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: CartRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface CartCartUpdateItemOrderItem {
	comment?: string;
	fulfillmentCenterName?: string;
	orderItemId?: string;
	/** @format double */
	quantity?: string;
	fulfillmentCenterId?: string;
	orderItemExtendAttribute?: CartCartUpdateItemOrderItemOrderItemExtendAttribute[];
	itemAttributes?: CartCartUpdateItemOrderItemItemAttributes[];
	partNumber: string;
	productId?: string;
	userDataField?: CartCartUpdateItemOrderItemUserDataField[];
	UOM?: string;
	contractId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotionPromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier;
}

/**
 * Structure containing an order ID and order item ID.
 */
export interface ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer {
	/** Order identifier. */
	orderId: string;
	/** List of order items. */
	orderItem: ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainerOrderItemBodyDescription[];
	resourceName?: string;
}

export interface ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailed {
	resultList?: ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailedResultList[];
}

export interface ComIbmCommerceOrderFacadeDatatypesCSRCommentsType {
	cSRIdentifier?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeCSRIdentifier;
	comment?: string;
	userData?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeUserData;
	changeReasonCode?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsTypeChangeReasonCode;
	orderVersion?: string;
	creationDate?: string;
}

export interface CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CartRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesPromotionCodeType {
	userData?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeUserData;
	associatedPromotion?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeAssociatedPromotion[];
	code?: string;
	reason?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeTypeReason;
}

export interface CartRewardOptionRewardSpecGiftItem {
	/** @format double */
	value?: string;
	uom?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType;
	productId?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceOrderFacadeDatatypesCouponCodeTypePromotionIdentifierCalculationCodeIdentifierCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceOrderFacadeDatatypesOrderItemComponentTypeQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceOrderFacadeDatatypesParentInfoTypeParentOrderIdentifier {
	customerOrderNumber?: string;
	externalOrderID?: string;
	uniqueID?: string;
}

export interface CartRewardOptionRewardChoiceGiftSet {
	giftItem?: CartRewardOptionRewardChoiceGiftSetGiftItem[];
}

export interface CartCartItemUserDataField {
	value?: string;
	key: string;
}

export interface CartRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CartShippingInfoOrderItem {
	userDataField?: CartShippingInfoOrderItemUserDataField[];
	orderItemId?: string;
	orderItemShippingInfo?: CartOrderItemShippingInfo;
}

export interface CartCouponCodeUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBean {
	totalOrderItemsPrice?: string;
	/** @format double */
	totalProductPrice?: number;
	/** @format date */
	actualShipDate?: string | null;
	/** @format int64 */
	addressId?: number | null;
	/** @format double */
	totalShippingTax?: number;
	/** @format int32 */
	totalSize?: number;
	type?: string;
	uniqueShippingAddresses?: ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBeanUniqueShippingAddresses[];
	/** @format double */
	surchargeAdjustmentTotal?: number;
	/** @format double */
	totalTax?: number;
	totalAdjustment?: string;
	billingAddressDataBean?: ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummaryResultListOrderDataBeanBillingAddressDataBean;
	/** @format int32 */
	totalPages?: number;
	/** @format int32 */
	transferStatus?: number;
	/** @format int32 */
	buschnId?: number;
	/** @format double */
	totalProductPriceBySumUp?: number;
	/** @format double */
	totalShippingCharge?: number;
}

export interface CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CartRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

/**
 * Body of a request to apply a promotion code to a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeBody {
	/** The promotion code. */
	promoCode: string;
}

/**
 * Body of a response to apply a coupon to a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse {
	/** Order identifier. */
	orderId: string;
	/** Coupon identifier. */
	couponId: string;
}

/**
 * Body of a request to apply a coupon to a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody {
	/** Coupon identifier. */
	couponId: string;
}

/**
 * Body of a response to remove a promotion code from a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerRemovePromotionCodeResponse {
	/** The order identifier. */
	orderId: string;
}

export interface CartAssignedPromotionCode {
	resourceId?: string;
	orderId?: string;
	quoteID?: string;
	externalOrderID?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	buyerPONumber?: string;
	customerOrderNumber?: string;
	promotionCode?: CartAssignedPromotionCode[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	resourceName?: string;
}

/**
 * Body of a response to apply a promotion code to a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedPromotionCodeHandlerApplyPromotionCodeResponse {
	/** The order identifier. */
	orderId: string;
	/** The promotion code. */
	promoCode: string;
}

export interface CartAssignedCoupon {
	resourceId?: string;
	orderId?: string;
	quoteID?: string;
	couponCode?: CartAssignedCoupon[];
	externalOrderID?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	buyerPONumber?: string;
	customerOrderNumber?: string;
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	resourceName?: string;
}

/**
 * Body of a response to remove a coupon from a shopping cart.
 */
export interface ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse {
	/** Order identifier. */
	orderId: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetUserData {
	userDataField?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfoUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfoUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier {
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumb {
	/** @format int32 */
	recordSetCount?: number;
	resourceId?: string;
	resourceName?: string;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resultList?: CategoryIBMAdminDetailsBreadcrumbItem[];
	/** @format int32 */
	recordSetTotal?: number;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetAttribute {
	attributeDescription: CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescription[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceIdentifier {
	uniqueID?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference {
	catalogGroupIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier;
	displayName: string;
	catalogIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifier;
	navigationPath?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemDescription {
	keyword?: string;
	language?: string;
	fullImage?: string;
	longDescription?: string;
	breadcrumb?: string[];
	override?: CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride[];
	attributes?: CategoryIBMAdminDetailsBreadcrumbItemDescriptionAttributes[];
	shortDescription?: string;
	thumbnail?: string;
	name?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescription {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceUserData {
	userDataField?: CatalogIBMAdminDetailsItemAttachmentReferenceUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemDescription {
	shortDescription?: string;
	name?: string;
	thumbnail?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAsset {
	mimeType?: string;
	attachmentAssetIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier;
	rootDirectory?: string;
	language?: string[];
	directoryPath?: string;
	storeIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetStoreIdentifier;
	localAsset?: boolean;
	userData?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetUserData;
	attachmentAssetPath: string;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItem {
	parentCatalogEntryID?: string;
	description?: CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemDescription[];
	owningStoreDirectory?: string;
	uniqueID?: string;
	parentCatalogEntryPartNumber: string;
	attributes?: CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemAttributes[];
	partNumber: string;
	type?: string;
	userDataField?: CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemUserDataField[];
}

export interface CatalogIBMAdminDetailsItemDescriptionOverride {
	name?: string;
	keyword?: string;
	fullImage?: string;
	longDescription?: string;
	descriptionOverrideIdentifier?: CatalogIBMAdminDetailsItemDescriptionOverrideDescriptionOverrideIdentifier;
	attributes?: CatalogIBMAdminDetailsItemDescriptionOverrideAttributes[];
	shortDescription?: string;
	thumbnail?: string;
}

export interface CatalogEntryIBMAdminStandardOfferPrice {
	/** @format int32 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resourceName?: string;
	resourceId?: string;
	/** @format int32 */
	recordSetStartNumber?: number;
	resultList?: CatalogEntryIBMAdminStandardOfferPriceItem[];
	/** @format int32 */
	recordSetTotal?: number;
}

export interface CategoryviewCategoryDetails {
	recordSetStartNumber?: string;
	SuggestionView?: CategoryviewCategoryDetailsSuggestionView[];
	recordSetComplete?: string;
	FacetView?: CategoryviewCategoryDetailsFacetView[];
	recordSetCount?: string;
	indexStatus?: string;
	resourceName?: string;
	resourceId?: string;
	report?: string;
	WebContentView?: CategoryviewCategoryDetailsWebContentView[];
	userDataField?: CategoryviewCategoryDetailsUserDataField[];
	recordSetTotal?: string;
	BreadCrumbTrailEntryView?: CategoryviewCategoryDetailsBreadCrumbTrailEntryView[];
	CatalogGroupView?: CategoryviewCategoryDetailsCatalogGroupView[];
	finalQuery?: string;
	MetaData?: CategoryviewCategoryDetailsMetaData[];
}

export interface CategoryviewCategorySummary {
	recordSetStartNumber?: string;
	SuggestionView?: CategoryviewCategorySummarySuggestionView[];
	recordSetComplete?: string;
	FacetView?: CategoryviewCategorySummaryFacetView[];
	recordSetCount?: string;
	indexStatus?: string;
	report?: string;
	WebContentView?: CategoryviewCategorySummaryWebContentView[];
	recordSetTotal?: string;
	resourceId?: string;
	resourceName?: string;
	BreadCrumbTrailEntryView?: CategoryviewCategorySummaryBreadCrumbTrailEntryView[];
	CatalogGroupView?: CategoryviewCategorySummaryCatalogGroupView[];
	userDataField?: CategoryviewCategorySummaryUserDataField[];
	finalQuery?: string;
	MetaData?: CategoryviewCategorySummaryMetaData[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesParentStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeywordUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeywordUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttribute {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceIdentifier {
	uniqueID?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifier {
	uniqueID?: string;
	externalIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItem {
	catalogGroupIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifier;
	taxonomyAttribute?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttribute;
	parentCatalogGroupIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifier;
	description?: CategoryIBMAdminDetailsBreadcrumbItemDescription[];
	owningStoreDirectory?: string;
	topCatalogGroup?: boolean;
	/** @format double */
	displaySequence?: number;
	categoryIdentifier: string;
	breadcrumbLocation?: CategoryIBMAdminDetailsBreadcrumbItemBreadcrumbLocation[];
	rule?: CategoryIBMAdminDetailsBreadcrumbItemRule;
	facet?: CategoryIBMAdminDetailsBreadcrumbItemFacet[];
	sEOProperties?: CategoryIBMAdminDetailsBreadcrumbItemSEOProperties[];
	attachmentReference?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReference[];
	/** @format int32 */
	dynamicCatalogGroup?: number;
	navigationRelationship?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationship[];
	attributes?: CategoryIBMAdminDetailsBreadcrumbItemAttributes[];
	sEOURL?: CategoryIBMAdminDetailsBreadcrumbItemSEOURL[];
	categoryId?: string;
	association?: CategoryIBMAdminDetailsBreadcrumbItemAssociation[];
	navigationPath?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOProperties {
	resolved?: boolean;
	userData?: CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesUserData;
	language?: string;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	parentStoreIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesParentStoreIdentifier;
	pageGroup?: string;
	objectIdentifier?: string;
	sEOPageDefID?: string;
	title?: string;
	metaDescription?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescriptionUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacet {
	attribute: CategoryIBMAdminDetailsBreadcrumbItemFacetAttribute;
	facetIdentifier: CategoryIBMAdminDetailsBreadcrumbItemFacetFacetIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleNVP {
	value?: string;
	key: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescription {
	userData?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemDescriptionAttributes {
	value?: string;
	key: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage {
	displaySequence?: string;
	attachmentUsageDescription?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription;
	image?: string;
	usageName: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleElementUserData {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverride {
	name?: string;
	keyword?: string;
	fullImage?: string;
	longDescription?: string;
	descriptionOverrideIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideDescriptionOverrideIdentifier;
	attributes?: CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideAttributes[];
	shortDescription?: string;
	thumbnail?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionExtendedData {
	value?: string;
	key: string;
}

export interface CatalogIBMAdminDetailsItemDescription {
	keyword?: string;
	language?: string;
	fullImage?: string;
	longDescription?: string;
	breadcrumb?: string[];
	override?: CatalogIBMAdminDetailsItemDescriptionOverride[];
	attributes?: CatalogIBMAdminDetailsItemDescriptionAttributes[];
	shortDescription?: string;
	thumbnail?: string;
	name?: string;
}

export interface CatalogIBMAdminDetails {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: CatalogIBMAdminDetailsItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRule {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemRuleUserData[];
	nVP?: CategoryIBMAdminDetailsBreadcrumbItemRuleNVP[];
	uniqueID?: string;
	element?: CategoryIBMAdminDetailsBreadcrumbItemRuleElement[];
}

export interface ComIbmCommerceCatalogFacadeDatatypesValueType {
	identifier?: string;
	value?: string;
	storeID?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

export type CategoryIBMAdminDetailsBreadcrumbItemAssociationAssociatedObject = object;

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemDescriptionOverrideDescriptionOverrideIdentifier {
	uniqueID?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemAttributes {
	comparable?: boolean;
	description?: string;
	searchable?: boolean;
	dataType?: string;
	displayable?: boolean;
	value?: ComIbmCommerceCatalogFacadeDatatypesValueType;
	values?: CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemAttributesValues[];
	uniqueID?: string;
	extendedValue?: JavaUtilMapEntry[];
	usage?: string;
	name?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAsset {
	mimeType?: string;
	attachmentAssetIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier;
	rootDirectory?: string;
	language?: string[];
	directoryPath?: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetStoreIdentifier;
	localAsset?: boolean;
	userData?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetUserData;
	attachmentAssetPath: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemRuleUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescription {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttribute {
	attribute?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttribute[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeyword {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeywordUserData;
	keyword?: string;
	language?: string;
	generatedMobileKeyword?: string;
	uRLPrefix?: string;
	mobileURLPrefix?: string;
	previewURL?: string;
	mobileKeyword?: string;
	generatedKeyword?: string;
	previewMobileURL?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemAttributesValues {
	identifier?: string;
	values: string;
	extendedValue?: JavaUtilMapEntry[];
}

export interface CategoryviewCategoryDetailsSuggestionViewEntry {
	image?: string;
	name?: string;
	value?: string;
}

export interface CategoryviewCategoryDetailsCatalogGroupViewUserDataField {
	value?: string;
	key?: string;
}

export interface CategoryviewCategoryDetailsCatalogGroupViewMetaData {
	metaKey?: string;
	metaData?: string;
}

export interface CategoryviewCategoryDetailsWebContentViewUserDataField {
	value?: string;
	key?: string;
}

export interface CategoryviewCategoryDetailsFacetViewEntry {
	count?: string;
	image?: string;
	entryValue?: string;
	label?: string;
}

export interface CategoryviewCategoryDetailsWebContentViewMetaData {
	metaData?: string;
}

export interface CategoryviewCategorySummarySuggestionViewEntry {
	image?: string;
	name?: string;
	value?: string;
	userDataField?: string;
}

export interface CategoryviewCategorySummaryFacetViewEntry {
	image?: string;
	count?: string;
	entryValue?: string;
	label?: string;
}

export interface CategoryviewCategorySummaryWebContentViewUserDataField {
	value?: string;
	key?: string;
}

export interface CategoryviewCategorySummaryWebContentViewMetaData {
	metaData?: string;
}

export interface CatalogEntryIBMAdminStandardOfferPriceItemDescription {
	shortDescription?: string;
	name?: string;
	thumbnail?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemDescriptionOverrideDescriptionOverrideIdentifier {
	uniqueID?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifier {
	attributeDictionaryIdentifier: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifier;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemTaxonomyAttributeAttributeExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeywordUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CatalogIBMAdminDetailsItemAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescriptionUserData {
	userDataField?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationship {
	attributes?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipAttributes[];
	/** @format double */
	displaySequence?: number;
	catalogGroupReference?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReference;
	type?: string;
	catalogEntryReference?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReference;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemParentCatalogGroupIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLParentStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleElement {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemRuleElementUserData[];
	type?: string;
	uniqueID?: string;
	nVP?: CategoryIBMAdminDetailsBreadcrumbItemRuleElementNVP[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURL {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLUserData;
	parentStoreIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLParentStoreIdentifier;
	tokenValue?: string;
	uRLKeywordID?: string;
	uRLKeyword?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLURLKeyword[];
	usage?: string;
	siteMapInfo?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfo;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescriptionUserData {
	userDataField?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescriptionUserDataUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier {
	uniqueID?: string;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItemUserDataField {
	value?: string;
	key: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReference {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceUserData;
	attachmentIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentIdentifier;
	attachmentReferenceIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceIdentifier;
	displaySequence?: string;
	attachmentReferenceDescription?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentReferenceDescription[];
	attachmentAsset?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentAsset[];
	attachmentDescription?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescription[];
	attachmentUsage?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsage;
}

export interface CatalogIBMAdminDetailsItem {
	description?: CatalogIBMAdminDetailsItemDescription[];
	default?: boolean;
	primary?: boolean;
	catalogId?: string;
	attachmentReference?: CatalogIBMAdminDetailsItemAttachmentReference[];
	attributes?: CatalogIBMAdminDetailsItemAttributes[];
	catalogIdentifier: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOPropertiesParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociation {
	catalogGroupReference?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReference;
	name?: string;
	catalogEntryReference?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference;
	associationCodeType?: string;
	/** @format double */
	displaySequence?: number;
	associatedObject?: CategoryIBMAdminDetailsBreadcrumbItemAssociationAssociatedObject;
	uniqueID?: string;
	externalSource?: boolean;
	attributes?: CategoryIBMAdminDetailsBreadcrumbItemAssociationAttributes[];
	associatedObjectGroup?: Empty[];
	semantic?: string;
	/** @format double */
	quantity?: number;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescription {
	userData?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CatalogEntryIBMAdminStandardOfferPriceItemUserDataField {
	value?: string;
	key: string;
}

export interface CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttribute {
	/** @format int32 */
	recordSetCount?: number;
	resourceId?: string;
	resourceName?: string;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resultList?: CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttributeItem[];
	/** @format int32 */
	recordSetTotal?: number;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReference {
	catalogEntryIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetFacetIdentifier {
	identifier?: string;
	uniqueID?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReference {
	catalogEntryIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReference {
	userData?: CatalogIBMAdminDetailsItemAttachmentReferenceUserData;
	attachmentIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentIdentifier;
	attachmentReferenceIdentifier?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceIdentifier;
	displaySequence?: string;
	attachmentReferenceDescription?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescription[];
	attachmentAsset?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAsset[];
	attachmentDescription?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentDescription[];
	attachmentUsage?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsage;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescription {
	userData?: CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionUserData;
	name?: string;
	description?: string;
	language?: string;
	extendedData?: CategoryIBMAdminDetailsBreadcrumbItemFacetAttributeAttributeDescriptionExtendedData[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLUserDataUserDataField[];
}

export interface CategoryviewCategoryDetailsSuggestionView {
	Entry?: CategoryviewCategoryDetailsSuggestionViewEntry[];
	identifier?: string;
	label?: string;
}

export interface CategoryviewCategoryDetailsFacetView {
	entry?: CategoryviewCategoryDetailsFacetViewEntry[];
	name?: string;
	value?: string;
}

export interface CategoryviewCategoryDetailsWebContentView {
	url?: string;
	userDataField?: CategoryviewCategoryDetailsWebContentViewUserDataField[];
	name?: string;
	uniqueID?: string;
	MetaData?: CategoryviewCategoryDetailsWebContentViewMetaData[];
}

export interface CategoryviewCategoryDetailsUserDataField {
	value?: string;
	key?: string;
}

export interface CategoryviewCategoryDetailsBreadCrumbTrailEntryView {
	type?: string;
	value?: string;
	label?: string;
}

export interface CategoryviewCategoryDetailsCatalogGroupView {
	name?: string;
	resourceId?: string;
	shortDescription?: string;
	productsURL?: string;
	fullImage?: string;
	fullImageAltDescription?: string;
	metaKeyword?: string;
	parentCatalogGroupID?: string | string[];
	longDescription?: string;
	uniqueID?: string;
	userDataField?: CategoryviewCategoryDetailsCatalogGroupViewUserDataField[];
	title?: string;
	fullPath?: string;
	identifier?: string;
	metaDescription?: string;
	thumbnail?: string;
	MetaData?: CategoryviewCategoryDetailsCatalogGroupViewMetaData[];
}

export interface CategoryviewCategoryDetailsMetaData {
	metaKey?: string;
	metaData?: string;
}

export interface CategoryviewCategorySummarySuggestionView {
	Entry?: CategoryviewCategorySummarySuggestionViewEntry[];
	identifier?: string;
	label?: string;
}

export interface CategoryviewCategorySummaryFacetView {
	entry?: CategoryviewCategorySummaryFacetViewEntry[];
	name?: string;
	value?: string;
}

export interface CategoryviewCategorySummaryWebContentView {
	url?: string;
	userDataField?: CategoryviewCategorySummaryWebContentViewUserDataField[];
	name?: string;
	uniqueID?: string;
	MetaData?: CategoryviewCategorySummaryWebContentViewMetaData[];
}

export interface CategoryviewCategorySummaryUserDataField {
	value?: string;
	key?: string;
}

export interface CategoryviewCategorySummaryBreadCrumbTrailEntryView {
	type?: string;
	value?: string;
	label?: string;
}

export interface CategoryviewCategorySummaryCatalogGroupView {
	name?: string;
	parentCatalogGroupID?: string | string[];
	resourceId?: string;
	productsURL?: string;
	uniqueID?: string;
	identifier?: string;
	shortDescription?: string;
	thumbnail?: string;
}

export interface CategoryviewCategorySummaryMetaData {
	metaKey?: string;
	metaData?: string;
}

export interface CatalogEntryIBMAdminStandardOfferPriceItem {
	description?: CatalogEntryIBMAdminStandardOfferPriceItemDescription[];
	owningStoreDirectory?: string;
	price?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	uniqueID?: string;
	partNumber: string;
	type?: string;
	userDataField?: CatalogEntryIBMAdminStandardOfferPriceItemUserDataField[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsage {
	displaySequence?: string;
	attachmentUsageDescription?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription;
	image?: string;
	usageName: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemBreadcrumbLocation {
	catalogGroupUniqueID: string[];
}

export interface CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfo {
	/** @format double */
	priority?: number;
	userData?: CategoryIBMAdminDetailsBreadcrumbItemSEOURLSiteMapInfoUserData;
	/** @format double */
	mobilePriority?: number;
	changeFrequency?: string;
	mobileChangeFrequency?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescription {
	userData?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemRuleElementNVP {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescriptionUserData {
	userDataField?: CategoryIBMAdminDetailsBreadcrumbItemAttachmentReferenceAttachmentDescriptionUserDataUserDataField[];
}

export interface CatalogIBMAdminDetailsItemDescriptionOverrideAttributes {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReference {
	catalogGroupIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogGroupIdentifier;
	displayName: string;
	catalogIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemAssociationCatalogGroupReferenceCatalogIdentifier;
	navigationPath?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: CategoryIBMAdminDetailsBreadcrumbItemNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData {
	userDataField?: CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField[];
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier {
	uniqueID?: string;
}

export interface CatalogIBMAdminDetailsItemAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportResponse {
	/** Export ID returned from the catalog export. It can be used in the catalog download REST API. */
	exportId: string;
}

/**
 * @example {"langId":"-1","catalogId":"10502","exportMode":"delta","CSVColumnList":"name"}
 */
export interface ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportRequest {
	/** The ID of the language for the description to be exported. The default is the store default language if it is not specified. */
	langId?: string;
	/** The ID of the catalog to be exported. The default is the store master catalog if it is not specified. */
	catalogId?: string;
	/** Export mode can be full or delta. The default is full if it is not specified. */
	exportMode?: string;
	/** A list of CSV columns to be exported. The default is to export all columns configured if it is not specified. */
	CSVColumnList?: string;
}

export interface WidgetDefinitionDescription {
	userDataField?: WidgetDefinitionDescriptionUserDataField[];
	displayName?: string;
	description?: string;
	langId?: string;
}

export interface LayoutLayoutItemLayoutProperty {
	name?: string;
	layoutPropertyId?: string;
	value?: string;
	/** @format double */
	sequenceOrder?: number;
	userDataField?: LayoutLayoutItemLayoutPropertyUserDataField[];
	properties?: string;
}

export interface LayoutLayoutItemWidgetSlotIdentifier {
	name?: string;
	uniqueID?: string;
}

export interface WidgetDefinitionIBMStoreSummary {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: WidgetDefinitionIBMStoreSummaryItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface LayoutLayoutItemWidget {
	widgetDefId?: string;
	widgetProperty?: LayoutLayoutItemWidgetWidgetProperty[];
	slotType?: string;
	slotName?: string;
	widgetName?: string;
	widgetDefExternalId?: string;
	slotId?: string;
	childSlot?: LayoutLayoutItemWidgetChildSlot[];
	widgetId?: string;
	extendedData?: LayoutLayoutItemWidgetExtendedData[];
	/** @format double */
	widgetSequence?: number;
	userDataField?: LayoutLayoutItemWidgetUserDataField[];
	widgetDefStoreId?: string;
	slotIdentifier?: LayoutLayoutItemWidgetSlotIdentifier;
	parentWidgetName?: string;
	internalSlotId?: string;
	parentWidgetId?: string;
}

export interface WidgetDefinitionIBMAdminSummaryItemUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemUserDataField {
	value?: string;
	key: string;
}

export interface PageDesignSlot {
	internalSlotId?: string;
}

export interface WidgetDefinitionIBMAdminSummaryItem {
	widgetObjectName?: string;
	widgetProperty?: WidgetDefinitionWidgetProperty[];
	widgetDefinitionId?: string;
	vendor?: string;
	description?: WidgetDefinitionDescription[];
	widgetType?: string;
	storeId?: string;
	state?: string;
	definitionXml?: string;
	path?: string;
	userDataField?: WidgetDefinitionIBMAdminSummaryItemUserDataField[];
	identifier?: string;
	configurableSlot?: WidgetDefinitionConfigurableSlot[];
}

export interface PageCatalogGroupView {
	title?: string;
	fullImageAltDescription?: string;
	categoryIdentifier?: string;
	metaKeyword?: string;
	userDataField?: PageCatalogGroupViewUserDataField[];
	metaDescription?: string;
	categoryId?: string;
}

export interface LayoutLayoutItemPageLocation {
	propagateToSubLevels?: boolean;
	pageId?: string;
	startDate?: string;
	storeId?: string;
	/** @format int32 */
	groupNumber?: number;
	pageGroup?: string;
	/** @format int64 */
	priority?: number;
	activityId?: string;
	applyToSubPage?: string;
	searchTerm?: string;
	endDate?: string;
	userDataField?: LayoutLayoutItemPageLocationUserDataField[];
}

export interface PageCatalogGroupViewUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemLayoutPropertyUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemWidgetExtendedDataAttributes {
	attribute?: LayoutLayoutItemWidgetExtendedDataAttributesAttribute[];
	language?: string;
}

export interface PageDesignIBMStoreDetailsItemUserDataField {
	value?: string;
	key: string;
}

export interface PageIBMStoreDetails {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resourceName?: string;
	resourceId?: string;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: PageIBMStoreDetailsItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface PageIBMStoreDetailsItem {
	pageId?: string;
	nameEditable?: boolean;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	title?: string;
	pageGroup?: string;
	deletable?: boolean;
	urlConfigurable?: boolean;
	userDataField?: PageIBMStoreDetailsItemUserDataField[];
	metaDescription?: string;
	name?: string;
}

export interface WidgetDefinitionIBMAdminSummary {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: WidgetDefinitionIBMAdminSummaryItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface LayoutLayoutItemWidgetUserDataField {
	value?: string;
	key: string;
}

export interface WidgetDefinitionDescriptionUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayout {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: LayoutLayoutItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface LayoutCreatenew {
	template: boolean;
	default: boolean;
	widget: LayoutLayoutItemWidget[];
	templateName: string;
	name: string;
	deviceClass: string;
	state: string;
	templateId: string;
	priority: number;
	storeId: string;
	managingTool: string;
}

export interface LayoutCreatenewResponse {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			widgetId: string;
			childSlot: {
				slotId: string;
			}[];
		}[];
		templateName: string;
		name: string;
		deviceClass: string;
		state: string;
		pageLayoutId: string;
		templateId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutAddwidget {
	widget: {
		xSlotPosition_xLocation: string;
		parentWidgetId: string;
		widgetSequence: number;
		widgetName: string;
		internalSlotId: string;
		slotType: string;
		widgetDefId: string;
		parentWidgetName: string;
		widgetId: string;
		widgetDefExternalId: string;
		slotName: string;
		xSlotPosition_height: string;
		widgetProperty: {
			sequence: number;
			name: string;
			value: string;
		}[];
		slotId: string;
		widgetDefStoreId: string;
		xSlotPosition_yLocation: string;
		xSlotPosition_width: string;
	}[];
}

export interface LayoutAddwidgetResponse {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			parentWidgetId: string;
			widgetId: string;
		}[];
		name: string;
		pageLayoutId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutUpdatewidget {
	widget: {
		parentWidgetId: string;
		widgetSequence: number;
		widgetName: string;
		widgetDefId: string;
		parentWidgetName: string;
		widgetId: string;
		widgetProperty: {
			sequence: number;
			name: string;
			value: string;
		}[];
		widgetDefStoreId: string;
		widgetDefExternalId: string;
	}[];
}

export interface LayoutUpdatewidgetResponse {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			parentWidgetId: string;
			widgetId: string;
		}[];
		name: string;
		pageLayoutId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutUpdatewidgetExtendeddata {
	extendedData: {
		sequence: number;
		dataType: string;
		storeId: string;
		uniqueId: string;
		attributes: {
			attribute: {
				value: string;
				key: string;
			}[];
			language: string;
		}[];
		userDataField: {
			value: string;
			key: string;
		}[];
	}[];
}

export interface LayoutUpdatewidgetExtendeddataResponse {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			widgetId: string;
			extendedData: {
				uniqueId: string;
			}[];
		}[];
		name: string;
		pageLayoutId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutDeleteWidget {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			widgetId: string;
		}[];
		name: string;
		pageLayoutId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutDeleteLayout {
	resourceName: string;
	resultList: {
		template: boolean;
		name: string;
		pageLayoutId: string;
		storeId: string;
		managingTool: string;
	}[];
}

export interface LayoutLayoutpropertiesRequestBody {
	startDate: string;
	managingTool: string;
	endDate: string;
	templateStoreId: string;
	deviceClass: string;
	layoutGroup: string;
	adminDescription: string;
	layoutStaticLocationId: string;
	templateName: string;
	priority: number;
	state: string;
	template: boolean;
	userDataField: {
		value: string;
		key: string;
	}[];
	widget: {
		widgetDefId: string;
		widgetProperty: {
			storeId: string;
			name: string;
			value: string;
			sequence: number;
		}[];
		slotType: string;
		slotName: string;
		widgetName: string;
		widgetDefExternalId: string;
		slotId: string;
		childSlot: {
			slotIdentifier: {
				name: string;
				uniqueID: string;
			};
			slotType: string;
			slotId: string;
			internalSlotId: string;
			slotName: string;
		}[];
		widgetId: string;
		extendedData: {
			sequence: number;
			dataType: string;
			storeId: string;
			uniqueId: string;
			attributes: {
				attribute: {
					value: string;
					key: string;
				}[];
				language: string;
			}[];
			userDataField: {
				value: string;
				key: string;
			}[];
		}[];
		widgetSequence: number;
		userDataField: {
			value: string;
			key: string;
		}[];
		widgetDefStoreId: string;
		slotIdentifier: {
			name: string;
			uniqueID: string;
		};
		parentWidgetName: string;
		internalSlotId: string;
		parentWidgetId: string;
	}[];
	isDefaultLocation: boolean;
	storeId: string;
	pageLayoutId: string;
	locationOwnerID: string;
	name: string;
	default: boolean;
	layoutProperty: {
		name: string;
		layoutPropertyId: string;
		value: string;
		sequenceOrder: number;
		userDataField: {
			value: string;
			key: string;
		}[];
		properties: string;
	}[];
	locationName: string;
	templateId: string;
	pageLocation: {
		propagateToSubLevels: boolean;
		pageId: string;
		startDate: string;
		storeId: string;
		groupNumber: number;
		pageGroup: string;
		priority: number;
		activityId: string;
		applyToSubPage: string;
		searchTerm: string;
		endDate: string;
		userDataField: {
			value: string;
			key: string;
		}[];
	}[];
	locationSequence: number;
}

export interface LayoutLayoutpropertiesResponseBody {
	resourceName: string;
	resultList: {
		template: boolean;
		widget: {
			parentWidgetId: string;
			widgetId: string;
			childSlot: {
				slotId: string;
			}[];
			extendedData: {
				uniqueId: string;
			}[];
		}[];
		layoutGroup: string;
		templateId: string;
		storeId: string;
		managingTool: string;
		layoutProperty: {
			layoutPropertyId: string;
		}[];
		pageLocation: {
			activityId: string;
		}[];
		templateName: string;
		name: string;
		deviceClass: string;
		state: string;
		pageLayoutId: string;
		templateStoreId: string;
	}[];
}

export interface LayoutLayoutItemPageLocationUserDataField {
	value?: string;
	key: string;
}

export interface PageDesignWidgetUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemWidgetExtendedDataUserDataField {
	value?: string;
	key: string;
}

export interface WidgetDefinitionConfigurableSlot {
	slotType?: string;
	positionProperty?: WidgetDefinitionConfigurableSlotPositionProperty[];
	internalSlotId?: string;
}

export interface LayoutLayoutItemWidgetChildSlot {
	slotIdentifier?: LayoutLayoutItemWidgetChildSlotSlotIdentifier;
	slotType?: string;
	slotId?: string;
	internalSlotId?: string;
	slotName?: string;
}

export interface LayoutLayoutItem {
	startDate?: string;
	managingTool?: string;
	endDate?: string;
	templateStoreId?: string;
	deviceClass?: string;
	layoutGroup?: string;
	adminDescription?: string;
	layoutStaticLocationId?: string;
	templateName?: string;
	/** @format int64 */
	priority?: number;
	state?: string;
	template?: boolean;
	userDataField?: LayoutLayoutItemUserDataField[];
	widget?: LayoutLayoutItemWidget[];
	isDefaultLocation?: boolean;
	storeId?: string;
	pageLayoutId?: string;
	locationOwnerID?: string;
	name?: string;
	default?: boolean;
	layoutProperty?: LayoutLayoutItemLayoutProperty[];
	locationName?: string;
	templateId?: string;
	pageLocation?: LayoutLayoutItemPageLocation[];
	/** @format double */
	locationSequence?: number;
}

export interface PageDesignIBMStoreDetailsItem {
	layoutId?: string;
	widget?: PageDesignWidget;
	pageGroup?: string;
	objectIdentifier?: string;
	deviceClass?: string;
	userDataField?: PageDesignIBMStoreDetailsItemUserDataField[];
	layoutName?: string;
	previewReport?: string[];
}

export interface WidgetDefinitionIBMStoreSummaryItem {
	widgetObjectName?: string;
	widgetProperty?: WidgetDefinitionWidgetProperty[];
	widgetDefinitionId?: string;
	vendor?: string;
	widgetType?: string;
	storeId?: string;
	state?: string;
	definitionXml?: string;
	path?: string;
	userDataField?: WidgetDefinitionIBMStoreSummaryItemUserDataField[];
	identifier?: string;
}

export interface WidgetDefinitionConfigurableSlotPositionProperty {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemWidgetExtendedDataAttributesAttribute {
	value?: string;
	key: string;
}

export interface WidgetDefinitionWidgetPropertyUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemWidgetChildSlotSlotIdentifier {
	name?: string;
	uniqueID?: string;
}

export interface PageIBMStoreDetailsItemUserDataField {
	value?: string;
	key: string;
}

export interface WidgetDefinitionIBMStoreSummaryItemUserDataField {
	value?: string;
	key: string;
}

export interface LayoutLayoutItemWidgetWidgetProperty {
	storeId?: string;
	name?: string;
	value?: string;
	/** @format double */
	sequence?: number;
}

export interface LayoutLayoutItemWidgetExtendedData {
	/** @format double */
	sequence?: number;
	dataType?: string;
	storeId?: string;
	uniqueId?: string;
	attributes?: LayoutLayoutItemWidgetExtendedDataAttributes[];
	userDataField?: LayoutLayoutItemWidgetExtendedDataUserDataField[];
}

export interface PageDesignWidgetPropertyUserDataField {
	value?: string;
	key: string;
}

export interface WidgetDefinitionWidgetProperty {
	/** @format double */
	sequenceOrder?: number;
	userDataField?: WidgetDefinitionWidgetPropertyUserDataField[];
	storeId?: string;
	name?: string;
	value?: string;
}

export interface PageIBMStoreDetailsSEO {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resourceName?: string;
	resourceId?: string;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: PageCatalogGroupView[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface PageDesignWidgetProperty {
	/** @format double */
	sequenceOrder?: number;
	userDataField?: PageDesignWidgetPropertyUserDataField[];
	storeId?: string;
	name?: string;
	value?: string;
}

export interface PageDesignWidget {
	slot?: PageDesignSlot;
	widgetDefinitionIdentifier?: string;
	widgetDefinitionId?: string;
	widgetId?: string;
	childWidget?: PageDesignWidget[];
	widgetProperty?: PageDesignWidgetProperty[];
	widgetDefinitionStoreId?: string;
	/** @format double */
	widgetSequence?: number;
	userDataField?: PageDesignWidgetUserDataField[];
	name?: string;
}

export interface PageDesignIBMStoreDetails {
	resultList?: PageDesignIBMStoreDetailsItem[];
}

export interface ComIbmCommerceFoundationCommonDatatypesUserDataTypeUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary {
	associatedPromotions?: ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummaryAssociatedPromotions[];
}

export interface ComIbmCommerceWalletFacadeDatatypesCouponDescriptionTypeUserData {
	userDataField?: ComIbmCommerceWalletFacadeDatatypesCouponDescriptionTypeUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesUserDataType {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesUserDataTypeUserDataField[];
}

export interface ComIbmCommercePromotionFacadeDatatypesPromotionScheduleType {
	dailyStartTime?: string;
	dailyEndTime?: string;
	endDate?: string;
	weekDays?: ('sunday' | 'monday' | 'tuesday' | 'Wednesday' | 'thursday' | 'friday' | 'saturday')[];
	startDate?: string;
}

export interface CouponCouponItem {
	status?: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesUserDataType;
	couponId?: string;
	resourceId?: string;
	couponCode?: string;
	expirationDateTime?: string;
	couponDescription?: ComIbmCommerceWalletFacadeDatatypesCouponDescriptionType[];
	effectiveDateTime?: string;
	promotion?: ComIbmCommerceFoundationCommonDatatypesPromotionIdentifierType;
	order?: ComIbmCommerceFoundationCommonDatatypesOrderIdentifierType;
}

export interface PromotionPromotionItem {
	status?: string;
	storeId?: string;
	Description?: PromotionPromotionItemDescription[];
	schedule?: ComIbmCommercePromotionFacadeDatatypesPromotionScheduleType;
	promotionName: string;
	administrativeName?: string;
	promotionType?: string;
	resourceId?: string;
	promotionId?: string;
}

export interface ComIbmCommerceWalletFacadeDatatypesCouponDescriptionType {
	userData?: ComIbmCommerceWalletFacadeDatatypesCouponDescriptionTypeUserData | null;
	shortDescription?: string | null;
	language?: string;
	longDescription?: string | null;
}

export interface ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummaryAssociatedPromotionsDescription {
	shortDescription?: string;
	langId?: string;
	longDescription?: string;
}

export interface PromotionPromotionItemDescription {
	shortDescription?: string;
	longDescription?: string;
}

export interface PromotionPromotion {
	resourceId?: string;
	resourceName?: string;
	/** @format int32 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	Promotion?: PromotionPromotionItem[];
	/** @format int32 */
	recordSetStartNumber?: number;
	/** @format int32 */
	recordSetTotal?: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesOrderIdentifierType {
	customerOrderNumber?: string;
	externalOrderID?: string;
	uniqueID?: string;
}

export interface ComIbmCommerceWalletFacadeDatatypesCouponDescriptionTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface CouponCoupon {
	Coupon?: CouponCouponItem[];
	recordSetComplete?: boolean;
	resourceId?: string;
	resourceName?: string;
	/** @format int32 */
	recordSetStartNumber?: number;
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
}

export interface ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummaryAssociatedPromotions {
	startDate?: string;
	code?: string;
	endDate?: string;
	description?: ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummaryAssociatedPromotionsDescription;
	associatePromotionId?: string;
}

export interface ComIbmCommerceMarketingCommandsIssueCouponControllerCmd {
	userIdentifier?: string;
	viewTaskName?: string;
}

export interface CouponsCoupons {
	resourceName?: string;
}

export interface ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportRequest {
	/** A list of order status to be included in the export. This is the status of the order, not the status of the individual order item within the order. The default is null which does not consider the order status. */
	status?: string;
	/** The number of days to set back for the time placed of the order. 0 means exporting all the orders for today, 1 means exporting all the orders starting from yesterday, 2 means 2 days ago until now. */
	timePlacedInDays?: string;
}

export interface ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportResponse {
	/** Export ID returned from the order export. It can be used in the order download REST API. */
	exportId: string;
}

export interface ExtendedloggerBehavior {
	status?: string;
	customFields?: string;
	action?: string[];
}

export interface EspotActivityIdentifier {
	activityExternalIdentifier?: EspotActivityExternalIdentifier;
	activityIdentifierID?: string;
}

export interface EspotCatalogGroupTaxonomyAttribute {
	attribute?: EspotCatalogGroupTaxonomyAttributeAttribute[];
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier {
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotTestElement {
	experimentResultTestElementId: string;
	experimentResultTestElementName?: string;
}

export interface EspotCatalogGroupAttributes {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOProperties {
	resolved?: boolean;
	userData?: EspotCatalogGroupSEOPropertiesUserData;
	language?: string;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	parentStoreIdentifier?: EspotCatalogGroupSEOPropertiesParentStoreIdentifier;
	pageGroup?: string;
	objectIdentifier?: string;
	sEOPageDefID?: string;
	title?: string;
	metaDescription?: string;
}

export interface EspotCatalogGroupSEOPropertiesUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupRuleNVP {
	value?: string;
	key: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeUserDataUserDataField[];
}

export interface EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface EspotAttachmentAttachmentReferenceDescriptionUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotMarketingContent {
	contentUrl?: string;
	marketingContentIdentifier?: EspotMarketingContentIdentifier;
	contentFormatName?: string;
	marketingContentImageMap?: EspotMarketingContentImageMap[];
	MarketingContentDescription?: EspotMarketingContentMarketingContentDescription[];
	marketingContentDescription?: EspotMarketingContentDescription[];
	contentInputOption?: 'Area' | 'Source';
	contentMimeType?: string;
	attachment?: EspotAttachment;
	contentFormatId?: string;
	userDataField?: EspotMarketingContentUserDataField[];
	contentClickAction?: 'None' | 'Single' | 'Multiple';
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeExtendedValue {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

/**
 * Structure containing image map definition for marketing content.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainerMarketingContentImageMapContainer {
	/** HTML definition of the image map. This element is used when users want to define the whole image map directly using HTML. */
	source?: string;
	/** Name of the image map. */
	name?: string;
	/** Clickable area in the image map. */
	area?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainerMarketingContentImageMapContainerAreaTypeContainer[];
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupFacetAttributeAttributeDescriptionUserData {
	userDataField?: EspotCatalogGroupFacetAttributeAttributeDescriptionUserDataUserDataField[];
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogEntryDescription {
	keyword?: string;
	language?: string;
	fullImage?: string;
	longDescription?: string;
	attributes?: JavaUtilMapEntry[];
	productName?: string;
	shortDescription?: string;
	thumbnail?: string;
}

export interface EspotMarketingContentMarketingContentDescriptionUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupFacet {
	attribute: EspotCatalogGroupFacetAttribute;
	facetIdentifier: EspotCatalogGroupFacetFacetIdentifier;
}

export interface EspotCatalogGroupSEOURLSiteMapInfo {
	/** @format double */
	priority?: number;
	userData?: EspotCatalogGroupSEOURLSiteMapInfoUserData;
	/** @format double */
	mobilePriority?: number;
	changeFrequency?: string;
	mobileChangeFrequency?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAsset {
	mimeType?: string;
	attachmentAssetIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier;
	rootDirectory?: string;
	language?: string[];
	directoryPath?: string;
	storeIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentAssetStoreIdentifier;
	localAsset?: boolean;
	userData?: EspotCatalogGroupAttachmentReferenceAttachmentAssetUserData;
	attachmentAssetPath: string;
}

export interface EspotCatalogEntryAttributes {
	searchable?: string;
	attributeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierType;
	attributeType?: string;
	extendedValue?: JavaUtilMapEntry[];
	description?: string;
	displayable?: string;
	groupPath?: string;
	allowedValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueType[];
	usage?: string;
	userDataField?: EspotCatalogEntryAttributesUserDataField[];
	comparable?: string;
	attributeValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeValueType;
	floatValue?: ComIbmCommerceCatalogFacadeDatatypesFloatValueType;
	stringValue: string;
	name?: string;
	language?: string;
	/** @format double */
	displaySequence?: string;
	value?: ComIbmCommerceCatalogFacadeDatatypesValueType;
	attributeDataType?: string;
	values?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueType[];
	parentAttributeGroup?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierType;
	extendedData?: JavaUtilMapEntry[];
	integerValue?: ComIbmCommerceCatalogFacadeDatatypesIntegerValueType;
}

export interface EspotCatalogGroupAssociationCatalogEntryReference {
	catalogEntryIdentifier?: EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotStandardPrice {
	standardPriceContractID?: ComIbmCommerceFoundationCommonDatatypesContractIdentifierType;
	standardPriceStartDate?: string;
	/** @format double */
	standardPricePrecedence?: string;
	standardPriceQualifier?: string;
	standardUnitPrice?: EspotStandardUnitPrice;
	/** @format double */
	standardPriceMaxQuantity?: string;
	standardPriceEndDate?: string;
	userDataField?: EspotStandardPriceUserDataField[];
	standardPriceLastUpdate?: string;
	standardPriceDescription?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	standardPriceQuantityUnit?: string;
	/** @format double */
	standardPriceMinQuantity?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceAlternativeCurrencyPrice {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotContractPriceUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

export interface EspotAttachmentReferenceDescription {
	attachmentName?: string;
	attachmentLanguage?: string;
	attachmentLongDescription?: string;
	attachmentShortDescription?: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

/**
 * Structure containing optional properties related to marketing content to display.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerPropertiesContainer {
	/** Property key. */
	baseMarketingKey?: string;
	/** Property value. */
	baseMarketingValue?: string;
}

export interface EspotCatalogEntryAttributesUserDataField {
	value?: string;
	key: string;
}

export interface EspotMarketingContentExternalIdentifier {
	contentName?: string;
	contentStoreExternalId?: ComIbmCommerceFoundationCommonDatatypesStoreExternalIdentifierType;
	contentStoreId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeContractIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeContractIdentifierExternalIdentifier;
}

/**
 * Structure containing the marketing title to display in the e-marketing spot.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainer {
	/** Name of the type of the marketing content. */
	contentFormatName?: string;
	/** Image map definition for the image with clickable areas. */
	marketingContentImageMap?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainerMarketingContentImageMapContainer[];
	/** Unique ID for the marketing content. */
	marketingSpotDataTitleId?: string;
	/** Not used. */
	MarketingContentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer2[];
	/** Unique ID of the marketing content. */
	contentId?: string;
	/** Type of data displayed in the marketing content. */
	marketingSpotDataTitleDataType?: string;
	/** Name of the marketing content. */
	marketingSpotDataTitleName?: string;
	/** Description of the marketing content. */
	marketingContentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer[];
	/** The unique identifier of the activity that returned the data to be displayed in the e-marketing spot. */
	marketingSpotDataTitleActivityID?: string;
	/** Number of click actions of the marketing content. : "None", "Single"(URL) or "Multiple"(Image Map). */
	contentClickAction?: string;
	/** Name of the marketing content. */
	contentName?: string;
	/** Unique ID of the type of the marketing content. */
	contentFormatId?: string;
	/** Identifier of the store associated with the marketing content. */
	contentStoreId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeUserDataUserDataField[];
}

/**
 * Structure containing the clickable area of an image map.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainerMarketingContentImageMapContainerAreaTypeContainer {
	/** Title of the area. */
	title?: string;
	/** Click action to be invoked when the area is clicked. */
	url?: string;
	/** Sequence of the area. */
	displaySequence?: string;
	/** Coordinates of the area. */
	coordinates?: string;
	/** Shape of the area. Three types of shape are supported: "rect" (Rectangle), "circle" (Circle) and "poly" (Polygon). */
	shape?: string;
	/** Unique ID of the image map area. */
	uniqueID?: string;
	/** Alternate text for the area. */
	alternateText?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier;
}

/**
 * Segment membership check.
 */
export interface ComIbmCommerceRestMarketingHandlerSegmentHandlerSegmentMemberCheck {
	/** Is the specified customer in the specified segment. */
	isInCustomerSegment: boolean;
	resourceName?: string;
}

/**
 * Not used
 */
export type ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer2 =
	object;

export interface EspotMarketingSpotDataTitle {
	experimentResult?: EspotExperimentResult[];
	marketingContent: EspotMarketingContent;
	marketingSpotDataTitleDataType: string;
	marketingSpotDataTitleName: string;
	marketingSpotDataTitleId: string;
	marketingSpotDataTitleActivityID?: string;
}

export interface EspotCatalogGroupParentCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}

export interface EspotMarketingContentDescription {
	marketingText?: string;
	contentLocation?: string;
	language?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotExperimentResult {
	controlElement?: string;
	experiment?: EspotExperiment;
	testElement?: EspotTestElement;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesStoreExternalIdentifierType {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupExternalContentReferenceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifier {
	attributeDictionaryIdentifier: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifier;
	storeIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeywordUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeywordUserDataUserDataField[];
}

export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReference {
	catalogEntryIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfo {
	/** @format double */
	priority?: number;
	userData?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfoUserData;
	/** @format double */
	mobilePriority?: number;
	changeFrequency?: string;
	mobileChangeFrequency?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice {
	price?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePricePrice;
	quantity?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceQuantity;
	alternativeCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceAlternativeCurrencyPrice[];
}

/**
 * Structure containing the allowed values for the attribute.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttributesContainerAttributeAllowedValueContainer {
	/** Type definition for an IntegerValue attribute. */
	integerValue?: string;
	/** Type definition for a FloatValue attribute. */
	floatValue?: string;
	/** Abstract attribute value for customer extension. */
	attributeValue?: string;
	/** Type definition for an StringValue attribute. */
	stringValue?: string;
	/** Name-value pairs for defining additional attribute values such as images and or attachments. Can also be used for customer extension. */
	extendedValue?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerNVPAttributesContainer[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifier;
}

export interface EspotContractPrice {
	lastUpdate?: string;
	endDate?: string;
	description?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	/** @format double */
	precedence?: string;
	quantityUnit?: string;
	contractIdentifier?: EspotContractIdentifier;
	/** @format double */
	maximumQuantity?: string;
	/** @format double */
	minimumQuantity?: string;
	contractUnitPrice?: EspotContractUnitPrice;
	startDate?: string;
	userDataField?: EspotContractPriceUserDataField[];
	qualifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierType {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotBaseMarketingSpotActivityDataProperties {
	baseMarketingKey: string;
	baseMarketingValue?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePriceQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescription {
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeyword {
	userData?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeywordUserData;
	keyword?: string;
	language?: string;
	generatedMobileKeyword?: string;
	uRLPrefix?: string;
	mobileURLPrefix?: string;
	previewURL?: string;
	mobileKeyword?: string;
	generatedKeyword?: string;
	previewMobileURL?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesFloatValueType {
	/** @format float */
	value: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceIdentifier {
	uniqueID?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeAttributes {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeDescription {
	value?: string;
	language?: string;
}

export interface EspotActivityExternalIdentifier {
	activityIdentifierName?: string;
	activityIdentifierStoreId?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescription {
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesType {
	userData?: ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesTypeUserData;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReference {
	catalogGroupIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifier;
	displayName: string;
	catalogIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifier;
	navigationPath?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOURLURLKeywordUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotAttachmentAttachmentReferenceDescription {
	userDataField?: EspotAttachmentAttachmentReferenceDescriptionUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfoUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfoUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsage {
	displaySequence?: string;
	attachmentUsageDescription?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescription;
	image?: string;
	usageName: string;
}

export interface EspotDefaultContentDisplaySequence {
	displaySequence?: string;
	resultId?: string;
	resultFormat?: string;
}

export interface EspotCatalogGroupNavigationRelationshipAttributes {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOPropertiesType {
	resolved?: boolean;
	userData?: ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeUserData;
	language?: string;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	parentStoreIdentifier?: ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeParentStoreIdentifier;
	pageGroup?: string;
	objectIdentifier?: string;
	sEOPageDefID?: string;
	title?: string;
	metaDescription?: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}

export interface EspotCatalogGroupRuleElement {
	userData?: EspotCatalogGroupRuleElementUserData[];
	type?: string;
	uniqueID?: string;
	nVP?: EspotCatalogGroupRuleElementNVP[];
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeParentStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeywordUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescription {
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export type EspotCatalogGroupAssociationAssociatedObject = object;

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeContractIdentifierExternalIdentifier {
	/** @format int32 */
	majorVersionNumber?: number;
	origin: string;
	/** @format int32 */
	minorVersionNumber?: number;
	name: string;
	ownerID: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier {
	storeIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface EspotCatalogGroupFacetAttributeAttributeDescription {
	name?: string;
	userData?: EspotCatalogGroupFacetAttributeAttributeDescriptionUserData;
	description?: string;
	language?: string;
	extendedData?: EspotCatalogGroupFacetAttributeAttributeDescriptionExtendedData[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier {
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface ComIbmCommerceMarketingFacadeDatatypesAreaTypeUserData {
	userDataField?: ComIbmCommerceMarketingFacadeDatatypesAreaTypeUserDataUserDataField[];
}

export interface ComIbmCommerceMarketingFacadeDatatypesAreaTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotAttachment {
	attachmentReferenceId?: string;
	attachmentIdentifier?: EspotAttachmentIdentifier;
	AttachmentDescription?: EspotAttachmentAttachmentDescription[];
	attachmentReferenceDescription?: EspotAttachmentReferenceDescription[];
	AttachmentReferenceDescription?: EspotAttachmentAttachmentReferenceDescription[];
	attachmentAsset?: EspotAttachmentAsset[];
	attachmentDisplaySequence?: string;
	userDataField?: EspotAttachmentUserDataField[];
	attachmentDescription?: EspotAttachmentDescription[];
	attachmentUsage?: EspotAttachmentUsage;
}

export type ComIbmCommerceMarketingcenterEventsRuntimeClickMonitorCommand = object;

export interface EspotExperiment {
	experimentResultName?: string;
	experimentResultId: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentDescription {
	userData?: EspotCatalogGroupAttachmentReferenceAttachmentDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

/**
 * Structure containing name-value pair attributes.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerNVPAttributesContainer {
	/** Value. */
	value?: string;
	/** Key name. */
	key?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceType {
	lastUpdate?: string;
	endDate?: string;
	description?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeDescription;
	/** @format double */
	precedence?: number;
	quantityUnit?: string;
	contractIdentifier?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeContractIdentifier;
	price?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePrice;
	/** @format double */
	maximumQuantity?: number;
	/** @format double */
	minimumQuantity?: number;
	userData?: ComIbmCommerceFoundationCommonDatatypesOfferPriceTypeUserData;
	startDate?: string;
	qualifier?: string;
}

export interface EspotCatalogGroupSEOURLParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupSEOURLURLKeyword {
	userData?: EspotCatalogGroupSEOURLURLKeywordUserData;
	keyword?: string;
	language?: string;
	generatedMobileKeyword?: string;
	uRLPrefix?: string;
	mobileURLPrefix?: string;
	previewURL?: string;
	mobileKeyword?: string;
	generatedKeyword?: string;
	previewMobileURL?: string;
}

export interface SpotSpotItem {
	spotName?: string;
	description?: string;
	spotId?: string;
	userDataField?: SpotSpotItemUserDataField[];
	type?: string;
	/** @format int64 */
	uiDisplayable?: number;
}

export interface EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

/**
 * Marketing event trigger. Note : all parameters specified beyond the schema are sent to the marketing event.
 * @example {"eMarketingSpotId":null,"experimentResultTestElementId":null,"baseMarketingSpotActivityID":"10065","baseMarketingSpotDataType":"MarketingContent","categoryId":10502,"activityId":null,"personalizationID":"1416846174646-19","experimentResultId":null,"searchTerm":null,"DM_ReqCmd":"ProductDisplay","productId":12703}
 */
export interface ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger {
	/** Marketing spot identifier. */
	eMarketingSpotId: string;
	/** Experiment result test element identifier. */
	experimentResultTestElementId: string;
	/** Base marketing spot activity identifier. */
	baseMarketingSpotActivityID: string;
	/** Marketing spot data type. Example : "MarketingContent". */
	baseMarketingSpotDataType: string;
	/** Category identifier. */
	categoryId?: string;
	/** Activity identifier. */
	activityId: string;
	/** Personalization identifier. */
	personalizationID: string;
	/** Experiment result identifier. */
	experimentResultId: string;
	/** Search term. Stored in a comma-separated list of search strings. */
	searchTerm?: string;
	/** Requested command. */
	DM_ReqCmd?: string;
	/** Product identifier. */
	productId?: string;
}

/**
 * Marketing event trigger. Note : all parameters specified beyond the schema are sent to the marketing event.
 * @example {"DM_ReqCmd":"","CategoryId":"","evtype":"CpgnClick","expDataType":"CatalogGroupId","expDataUniqueID":"10516","intv_id":"10038","mpe_id":"10011","productId":""}
 */
export interface ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo {
	DM_ReqCmd: string;
	CategoryId: string;
	evtype: string;
	expDataType: string;
	expDataUniqueID: string;
	intv_id: string;
	mpe_id: string;
	productId: string;
}

/**
 * Marketing tracking consent parameters.
 * @example {"marketingTrackingConsent":1}
 */
export interface ComIbmCommerceRestMarketingHandlerEventHandlerMarketingTrackingConsent {
	/** Marketing tracking consent, value can be 0 or 1. */
	marketingTrackingConsent: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContractIdentifierTypeExternalIdentifier {
	/** @format int32 */
	majorVersionNumber?: number;
	origin: string;
	/** @format int32 */
	minorVersionNumber?: number;
	name: string;
	ownerID: string;
}

export interface EspotCatalogGroupRuleUserData {
	userDataField?: EspotCatalogGroupRuleUserDataUserDataField[];
}

export interface EspotCatalogGroupRuleUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReference {
	catalogGroupIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier;
	displayName: string;
	catalogIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifier;
	navigationPath?: string;
}

export interface EspotCatalogEntryIdentifier {
	catalogEntryExternalIdentifier?: EspotCatalogEntryExternalIdentifier;
	productId?: string;
}

export interface EspotCatalogGroupExternalContentReferenceExternalContentAsset {
	mimeType?: string;
	userData?: EspotCatalogGroupExternalContentReferenceExternalContentAssetUserData;
	assetPath: string;
	name: string;
	assetFullPath?: string;
	externalContentIdentifier: string;
}

/**
 * Structure containing the filtered result.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerFilteredResultContainer {
	/** The unique identifier of the filtered result. */
	filteredResultId?: string;
	/** The format of the filtered result. */
	filteredResultFormat?: string;
}

export interface EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationType {
	catalogGroupReference?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReference;
	name?: string;
	catalogEntryReference?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReference;
	associationCodeType?: string;
	/** @format double */
	displaySequence?: number;
	associatedObject?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeAssociatedObject;
	uniqueID?: string;
	externalSource?: boolean;
	attributes?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeAttributes[];
	semantic?: string;
	/** @format double */
	quantity?: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierType {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifier;
}

export interface EspotCatalogGroupFacetAttributeAttributeDescriptionExtendedData {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescriptionUserData {
	userDataField?: EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifier {
	attributeDictionaryIdentifier: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifier;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierStoreIdentifier;
	identifier: string;
}

/**
 * Structure containing a list price.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerListPriceContainer {
	/** Unit price in other currencies. */
	listPriceAltCurrencyPrice?: string;
	/** Currency of the standard price. */
	listPriceCurrency?: string;
	/** The standard price. */
	listPrice?: string;
	/** Quantity of a unit. */
	listPriceQuantity?: string;
}

export interface EspotCatalogGroup {
	catalogGroupIdentifier?: EspotCatalogGroupIdentifier;
	taxonomyAttribute?: EspotCatalogGroupTaxonomyAttribute;
	description?: EspotCatalogGroupDescription[];
	externalContentReference?: EspotCatalogGroupExternalContentReference[];
	owningStoreDirectory?: string;
	topCatalogGroup?: boolean;
	/** @format double */
	displaySequence?: number;
	parentCatalogGroupIdentifier?: EspotCatalogGroupParentCatalogGroupIdentifier;
	breadcrumbLocation?: EspotCatalogGroupBreadcrumbLocation[];
	parentCatalogGroupId?: string;
	rule?: EspotCatalogGroupRule;
	facet?: EspotCatalogGroupFacet[];
	sEOProperties?: EspotCatalogGroupSEOProperties[];
	attachmentReference?: EspotCatalogGroupAttachmentReference[];
	/** @format int32 */
	dynamicCatalogGroup?: number;
	navigationRelationship?: EspotCatalogGroupNavigationRelationship[];
	attributes?: EspotCatalogGroupAttributes[];
	sEOURL?: EspotCatalogGroupSEOURL[];
	association?: EspotCatalogGroupAssociation[];
	navigationPath?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescription {
	userData?: EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface EspotCatalogGroupBreadcrumbLocation {
	catalogGroupUniqueID: string[];
}

export interface EspotEspotItemFilteredResult {
	filteredResultId?: string;
	filteredResultFormat?: string;
}

export interface EspotCatalogGroupRuleElementNVP {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOURLUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentReferenceIdentifier {
	uniqueID?: string;
}

export interface EspotCatalogGroupSEOURLParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupSEOURLParentStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupExternalIdentifier {
	ownerID?: string;
	categoryIdentifier: string;
	categoryGroupId: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupRuleElementUserData {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface EspotStandardUnitPrice {
	standardPriceQuantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
	/** @format double */
	standardPrice?: string;
	standardPriceAltCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType[];
	standardPriceCurrency?: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface EspotCatalogGroupSEOPropertiesUserData {
	userDataField?: EspotCatalogGroupSEOPropertiesUserDataUserDataField[];
}

export interface EspotCatalogGroupRule {
	userData?: EspotCatalogGroupRuleUserData[];
	nVP?: EspotCatalogGroupRuleNVP[];
	uniqueID?: string;
	element?: EspotCatalogGroupRuleElement[];
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifier;
}

/**
 * Structure containing marketing content description.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer {
	/** Marketing text of a marketing content. */
	marketingText?: string;
	/** Location of a marketing content. */
	contentLocation?: string;
	/** Supported languages of a marketing content. */
	language?: string;
}

export interface SegmentSegmentsItem {
	usage?: string[];
	displayName?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	description?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	id?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupExternalContentReferenceExternalContentAssetUserData {
	userDataField?: EspotCatalogGroupExternalContentReferenceExternalContentAssetUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifier {
	attributeDictionaryIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifier;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierStoreIdentifier;
	identifier: string;
}

export interface EspotAttachmentAttachmentDescription {
	userDataField?: EspotAttachmentAttachmentDescriptionUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionTypeUserDataUserDataField[];
}

export interface EspotListPrice {
	listPriceAltCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType[];
	listPriceCurrency?: string;
	/** @format double */
	listPrice?: string;
	listPriceQuantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupIdentifier {
	catalogGroupExternalIdentifier?: EspotCatalogGroupExternalIdentifier;
	categoryId?: string;
}

export interface EspotStandardPriceUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceMarketingFacadeDatatypesAreaType {
	userData?: ComIbmCommerceMarketingFacadeDatatypesAreaTypeUserData;
	target?: string;
	title?: string;
	url?: string;
	/** @format double */
	displaySequence?: number;
	coordinates?: string;
	shape?: 'rect' | 'circle' | 'poly';
	uniqueID?: string;
	alternateText?: string;
}

export interface EspotCatalogGroupAssociation {
	catalogGroupReference?: EspotCatalogGroupAssociationCatalogGroupReference;
	name?: string;
	catalogEntryReference?: EspotCatalogGroupAssociationCatalogEntryReference;
	associationCodeType?: string;
	/** @format double */
	displaySequence?: number;
	associatedObject?: EspotCatalogGroupAssociationAssociatedObject;
	uniqueID?: string;
	externalSource?: boolean;
	attributes?: EspotCatalogGroupAssociationAttributes[];
	semantic?: string;
	/** @format double */
	quantity?: number;
}

export interface EspotMarketingSpotIdentifier {
	marketingSpotExternalIdentifier?: EspotMarketingSpotExternalIdentifier;
	marketingSpotIdentifier?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupFacetFacetIdentifier {
	identifier?: string;
	uniqueID?: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReference {
	catalogEntryIdentifier?: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

/**
 * The data to display in the e-marketing spot. This contains the data and the information about the activity that returned this data.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer {
	/** Unique identifier for the attachment reference. */
	attachmentReferenceId?: string;
	/** Name of the attachment usage. */
	attachmentUsageName?: string;
	/** Quantity of a unit. */
	standardPriceQuantity?: string;
	/** Currency of the standard price. */
	standardPriceCurrency?: string;
	/** Precedence of contract. */
	standardPricePrecedence?: string;
	/** Name of the marketing content. */
	contentName?: string;
	/** Unit price in other currencies. */
	standardPriceAltCurrencyPrice?: string;
	/** Name of the type of the marketing content. */
	contentFormatName?: string;
	/** A uniquely identifying number that identifies the standard price. */
	standardPriceQualifier?: string;
	/** The standard price. */
	standardPrice?: string;
	/** Minimum quantity. */
	standardPriceMinQuantity?: string;
	/** Owner of the attachment target. */
	attachementOwnerId?: string;
	/** Start date. */
	standardPriceStartDate?: string;
	/** Unit of measure for minimumQuantity and maximumQuantity. */
	standardPriceQuantityUnit?: string;
	/** The display template for the catalog group. */
	xcatg_displayTemplate?: string;
	/** Attribute indicating whether catalog group is a top-level catalog group. */
	topCatalogGroup?: string;
	/** Date of last update. */
	standardPriceLastUpdate?: string;
	/** Description of an attachment. */
	attachmentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer[];
	/** External identifying name for the attachment target. */
	attachementExternalId?: string;
	/** External store identifier for the catalog entry/catalog group. */
	storeIdentifier?: string;
	/** Not used. */
	MarketingContentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer2[];
	/** Type definition for a navigational relationship */
	navigationRelationship?: string;
	/** Structure containing a list price. */
	listPrice?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerListPriceContainer;
	/** Description of the standard price. */
	standardPriceDescription?: string;
	/** The input options for the marketing content image map. Two options are support: "Area" means the image map is defined by individual area. "Source" means the image map is defined by HTML source code. */
	contentInputOption?: string;
	/** Description of the marketing content. */
	marketingContentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerMarketingContentDescriptionContainer[];
	/** Not used */
	AttachmentReferenceDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer2[];
	/** Number of click actions of the marketing content. : "None", "Single"(URL) or "Multiple"(Image Map). */
	contentClickAction?: string;
	/** Image path of the attachment relation usage. */
	attachmentImage?: string;
	/** Catalog entry type code. */
	catalogEntryTypeCode?: string;
	/** Unique identifier for the category. */
	categoryId?: string;
	/** Definition of an attachment asset. */
	attachmentAsset?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer[];
	/** Unique ID of the product. */
	productId?: string;
	/** Click action to be invoked when marketing content on the page is clicked. */
	contentUrl?: string;
	/** Contract identifier the standard price is associated with. */
	standardPriceContractID?: string;
	/** Unique identifier for the data displayed in the e-marketing spot. */
	baseMarketingSpotActivityID?: string;
	/** Catalog group identifier. */
	categoryIdentifier?: string;
	/** Language or locale specific description of an attachment. */
	attachmentUsageDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer[];
	/** Description of the catalog entry/category. */
	description?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerDescriptionContainer[];
	/** External identifier of the store that owns the attachment. */
	attachementStoreExternalId?: string;
	/** MIME type of the marketing content. */
	contentMimeType?: string;
	/** Priority of the activity that returned the	data to be displayed in the e-marketing spot. */
	activityPriority?: string;
	/** Unique identifier for the activity. */
	activityIdentifierID?: string;
	/** Identifier for the attachment */
	attachementId?: string;
	/** Parent catalog group identifier. Null for top-level catalog groups. */
	parentCatalogGroupId?: string;
	/** SEO URL associated with the catalog entry / catalog group. */
	sEOURL?: string;
	/** Description of the relationship between the business object and the attachment. */
	attachmentReferenceDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer[];
	/** The root directory for the catalog group. */
	xcatg_rootDirectory?: string;
	/** Owner organization of the catalog entry/catalog group. */
	ownerId?: string;
	/** Taxonomy attributes for the catalog group. */
	taxonomyAttribute?: string;
	/** Sequence of the attachment relation usage. */
	attachmentDisplaySequence?: string;
	/** Unique ID of the type of the marketing content. */
	contentFormatId?: string;
	/** Name of the campaign that returned the data to be displayed in the e-marketing spot */
	baseMarketingSpotCampaignName?: string;
	/** Properties related to marketing content. */
	properties?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerPropertiesContainer[];
	/** Association to other objects. */
	association?: string;
	/** Identifier of the store associated with the marketing content. */
	contentStoreId?: string;
	/** Type of the activity that returned the data to be displayed in the e-marketing spot. */
	activityFormat?: string;
	/** Type of the data displayed in the e-marketing spot. */
	baseMarketingSpotDataType?: string;
	/** SEO properties associated with the catalog entry / catalog group. */
	sEOProperties?: string;
	/** End date. */
	standardPriceEndDate?: string;
	/** Unique ID of the marketing content. */
	contentId?: string;
	/** Sequence of display of catalog entry. */
	displaySequence?: string;
	/** Name of the activity. */
	activityIdentifierName?: string;
	/** Identifier of the store that owns the attachment. */
	attachementStoreId?: string;
	/** Maximum quantity. */
	standardPriceMaxQuantity?: string;
	/** Part number or SKU for the product. */
	productPartNumber?: string;
	/** Not used */
	AttachmentDescription?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer2[];
	attributes?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttributesContainer[];
	/** Name of the data displayed in the e-marketing spot. */
	baseMarketingSpotActivityName?: string;
	/** Catalog group identifier. */
	categoryGroupId?: string;
	/** Unique external identifier of the store associated with the marketing content. */
	contentStoreExternalId?: string;
	/** The contract price object. */
	contractPrice?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerContractPriceContainer[];
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescription {
	userData?: EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface EspotMarketingContentIdentifier {
	contentId?: string;
	marketingContentExternalIdentifier?: EspotMarketingContentExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueType {
	userData?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeUserData;
	storeID?: string;
	attributeValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeAttributeValue;
	language?: string;
	default?: boolean;
	/** @format double */
	displaySequence?: number;
	floatValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeFloatValue;
	value: string;
	extendedValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeExtendedValue[];
	stringValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeStringValue;
	identifier?: string;
	integerValue?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeIntegerValue;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeUserData {
	userDataField?: ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeUserDataUserDataField[];
}

/**
 * Structure containing multiple search terms.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerSearchTermsContainer {
	resourceId?: string;
	/** Encoded list of all the search terms. */
	searchTerms: string;
	resourceName?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesIntegerValueType {
	/** @format int32 */
	value: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescriptionUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescriptionUserDataUserDataField[];
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupSEOURLSiteMapInfoUserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Structure containing the attachment asset.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttachmentAssetContainer {
	/** Language ID for the language-specific fields in this input file. */
	attachmentAssetLanguage?: string[];
	/** Attribute to indicate whether this attachment is a local attachment. */
	attachmentLocalAsset?: string;
	/** MIME type of the attachment asset. */
	attachmentAssetMimeType?: string;
	/** Root directory for the attachment asset. */
	attachmentAssetRootDirectory?: string;
	/** Directory path to the attachment asset. */
	attachmentAssetDirectoryPath?: string;
	/** Identifier of the attachment asset. */
	attachmentAssetId?: string;
	/** External identifier of the store that owns the attachment asset. */
	attachmentAssetStoreExternalId?: string;
	/** Identifier of the store that owns the attachment asset. */
	attachmentAssetStoreId?: string;
	/** Relative path of the attachment asset. */
	attachmentAssetPath?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogIdentifierExternalIdentifier;
}

export type ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeAttributeValue = object;

export interface EspotCatalogGroupAttachmentReferenceUserData {
	userDataField?: EspotCatalogGroupAttachmentReferenceUserDataUserDataField[];
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAssetAttachmentAssetIdentifier {
	uniqueID?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupAttachmentReference {
	userData?: EspotCatalogGroupAttachmentReferenceUserData;
	attachmentIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentIdentifier;
	attachmentReferenceIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentReferenceIdentifier;
	displaySequence?: string;
	attachmentReferenceDescription?: EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescription[];
	attachmentAsset?: EspotCatalogGroupAttachmentReferenceAttachmentAsset[];
	attachmentDescription?: EspotCatalogGroupAttachmentReferenceAttachmentDescription[];
	attachmentUsage?: EspotCatalogGroupAttachmentReferenceAttachmentUsage;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesTypeUserData {
	userDataField?: ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesTypeUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesContractIdentifierType {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesContractIdentifierTypeExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescriptionUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField[];
}

export interface EspotAttachmentUsage {
	attachmentDisplaySequence?: string;
	attachmentUsageName: string;
	attachmentUsageDescription?: ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionType;
	attachmentImage?: string;
}

export interface EspotMarketingContentUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttribute {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifier;
}

export interface EspotContractExternalIdentifier {
	/** @format int32 */
	majorVersionNumber?: string;
	origin: string;
	/** @format int32 */
	minorVersionNumber?: string;
	name: string;
	ownerID: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentDescriptionUserData {
	userDataField?: EspotCatalogGroupAttachmentReferenceAttachmentDescriptionUserDataUserDataField[];
}

export interface EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotMarketingSpotExternalIdentifier {
	eSpotStoreId?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	eSpotName?: string;
}

export interface SpotSpot {
	resourceId?: string;
	/** @format int32 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	MarketingSpot?: SpotSpotItem[];
	/** @format int32 */
	recordSetTotal?: number;
	resourceName?: string;
}

export type ComIbmCommerceCatalogFacadeDatatypesAttributeValueType = object;

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentType {
	attributes?: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeAttributes[];
	/** @format double */
	displaySequence?: number;
	/** @format double */
	quantity?: number;
	kitComponentCodeType?: string;
	catalogEntryReference: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReference;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReference {
	catalogEntryIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogEntryReferenceCatalogEntryIdentifier;
	displayName?: string;
	catalogEntryTypeCode?: string;
	navigationPath?: string;
}

export interface EspotCatalogGroupAssociationAttributes {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOURLSiteMapInfoUserData {
	userDataField?: EspotCatalogGroupSEOURLSiteMapInfoUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotEspotItem {
	/** @format int64 */
	nextTimeLimit?: string;
	marketingSpotIdentifier?: EspotMarketingSpotIdentifier;
	baseMarketingSpotActivityData?: EspotBaseMarketingSpotActivityData[];
	filteredResult?: EspotEspotItemFilteredResult[];
	defaultContentDisplaySequence?: EspotDefaultContentDisplaySequence[];
	marketingSpotDataTitle?: EspotMarketingSpotDataTitle[];
	behavior?: string;
	previewReport?: string[];
}

export interface EspotCatalogGroupExternalContentReferenceUserData {
	userDataField?: EspotCatalogGroupExternalContentReferenceUserDataUserDataField[];
}

export interface EspotAttachmentAttachmentDescriptionUserDataField {
	value?: string;
	key: string;
}

/**
 * Not used
 */
export type ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer2 =
	object;

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeFloatValue {
	/** @format float */
	value: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifier {
	ownerID?: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifierStoreIdentifier;
	groupIdentifier: string;
}

export interface EspotAttachmentAsset {
	attachmentAssetLanguage?: string[];
	attachmentLocalAsset?: string;
	attachmentAssetMimeType?: string;
	attachmentAssetRootDirectory?: string;
	attachmentAssetDirectoryPath?: string;
	userDataField?: EspotAttachmentAssetUserDataField[];
	attachmentAssetId?: string;
	attachmentAssetStoreExternalId?: ComIbmCommerceFoundationCommonDatatypesStoreExternalIdentifierType;
	attachmentAssetStoreId?: string;
	attachmentAssetPath: string;
}

/**
 * Structure containing an contract price.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerContractPriceContainer {
	/** Major version. */
	majorVersionNumber?: string;
	/** Date of last update. */
	lastUpdate?: string;
	/** End date. */
	endDate?: string;
	/** Description of the offer price. */
	description?: string;
	/** Precedence of contract. */
	precedence?: string;
	/** Unit of measure for minimumQuantity and maximumQuantity. */
	quantityUnit?: string;
	/** Minor version. */
	minorVersionNumber?: string;
	/** Start date. */
	startDate?: string;
	/** A uniquely identifying number that identifies the contract price. */
	qualifier?: string;
	/** Contact name. */
	name?: string;
	/** Currency of the offer price. */
	currency?: string;
	/** Maximum quantity. */
	maximumQuantity?: string;
	/** Minimum quantity. */
	minimumQuantity?: string;
	/** Unit price in other currencies. */
	alternativeCurrencyPrice?: string;
	/** Owner of the contract. */
	ownerID?: string;
	/** Quantity of a unit. */
	quantity?: string;
	/** The contract price. */
	contractPrice?: string;
	/** Origin of the contract. */
	origin?: string;
	/** Contract identifier the offer price is associated with. */
	contractID?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetStoreIdentifierExternalIdentifier;
}

export type ComIbmCommerceCatalogFacadeDatatypesCatalogEntryNavigationRelationshipType = object;

export interface EspotCatalogEntryUserDataField {
	value?: string;
	key: string;
}

export interface EspotMarketingContentMarketingContentDescription {
	userDataField?: EspotMarketingContentMarketingContentDescriptionUserDataField[];
}

export interface EspotAttachmentUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserData {
	userDataField?: EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField[];
}

/**
 * Structure containing an e-marketing spot.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer {
	resourceId?: string;
	/** Data to display in the e-marketing spot. */
	MarketingSpotData: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer[];
	resourceName?: string;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentReferenceDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOPropertiesParentStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLTypeParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeParentStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupDescription {
	categoryName?: string;
	language?: string;
	fullImage?: string;
	longDescription?: string;
	keyword?: string;
	attributes?: JavaUtilMapEntry[];
	shortDescription?: string;
	thumbnail?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeGroupIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier;
}

export interface SpotSpotItemUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAttachmentReferenceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotBaseMarketingSpotActivityData {
	activityFormat?: string;
	activityIdentifier?: EspotActivityIdentifier;
	baseMarketingSpotActivityID: string;
	baseMarketingSpotDataType: string;
	experimentResult?: EspotExperimentResult[];
	marketingContent: EspotMarketingContent;
	/** @format int64 */
	activityPriority?: string;
	userDataField?: EspotBaseMarketingSpotActivityDataUserDataField[];
	baseMarketingSpotActivityName: string;
	baseMarketingSpotCampaignName?: string;
	properties?: EspotBaseMarketingSpotActivityDataProperties[];
	catalogGroup: EspotCatalogGroup;
	catalogEntry: EspotCatalogEntry;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeAttributes {
	value?: string;
	key: string;
}

/**
 * Structure containing attachment description.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerAttachmentDescriptionContainer {
	/** Language-dependent name of the attachment. */
	attachmentName?: string;
	/** Supported languages of an attachment asset. */
	attachmentLanguage?: string;
	/** Long description of the attachment. */
	attachmentLongDescription?: string;
	/** Short description of the attachment. */
	attachmentShortDescription?: string;
}

/**
 * Structure containing the catalog entry/category description.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerDescriptionContainer {
	/** Name of the category. */
	categoryName?: string;
	/** Language type. */
	language?: string;
	/** Full image of the catalog entity. */
	fullImage?: string;
	/** Long description of the catalog entity. */
	longDescription?: string;
	/** Search keywords for the catalog entity. */
	keyword?: string;
	/** Set of name-value pair attributes. */
	attributes?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerNVPAttributesContainer[];
	/** Name of the catalog entry. */
	productName?: string;
	/** Short description of the catalog entity. */
	shortDescription?: string;
}

export interface EspotCatalogGroupSEOPropertiesParentStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupSEOPropertiesParentStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsageAttachmentUsageDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Structure containing attributes.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttributesContainer {
	/** If attribute can be used for comparison. */
	comparable?: string;
	/** Type definition for a FloatValue attribute. */
	floatValue?: string;
	/** Name-value pairs for defining additional attribute values such as images and or attachments. Can also be used for customer extension. */
	extendedValue?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerNVPAttributesContainer[];
	/** Abstract attribute value for customer extension. */
	attributeValue?: string;
	/** Optional language for the attribute. */
	language?: string;
	/** Group path of the attribute, listing all ancestor groups of this attribute. */
	groupPath?: string;
	/** Display sequence of a displayable attribute. */
	displaySequence?: string;
	/** Extended data. */
	extendedData?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerNVPAttributesContainer[];
	/** If the attribute is a reference to an attribute from the attribute dictionary. */
	attributeIdentifier?: string;
	/** If attribute is displayable in storefront. */
	displayable?: string;
	/** Attribute data type. */
	attributeDataType?: string;
	/** All values for the attribute */
	values?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttributesContainerAttributeAllowedValueContainer[];
	/** Attribute type */
	attributeType?: string;
	/** Allowed values for the attribute. */
	allowedValue?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainerAttributesContainerAttributeAllowedValueContainer[];
	/** Use for the attribute. */
	usage?: string;
	/** Type definition for an StringValue attribute. */
	stringValue?: string;
	/** If attribute can be used for search. */
	searchable?: string;
	/** Parent attribute group for this attribute. */
	parentAttributeGroup?: string;
	/** Attribute name. */
	name?: string;
	/** Type definition for an IntegerValue attribute. */
	integerValue?: string;
	/** Attribute description. */
	description?: string;
}

export interface EspotBaseMarketingSpotActivityDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifier {
	ownerID?: string;
	identifier: string;
	storeIdentifier?: ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogIdentifierExternalIdentifierStoreIdentifier;
}

export interface EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupFacetAttributeAttributeDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOURLType {
	userData?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeUserData;
	parentStoreIdentifier?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeParentStoreIdentifier;
	tokenValue?: string;
	uRLKeywordID?: string;
	uRLKeyword?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeURLKeyword[];
	usage?: string;
	siteMapInfo?: ComIbmCommerceFoundationCommonDatatypesSEOURLTypeSiteMapInfo;
}

export interface EspotCatalogGroupSEOURLURLKeywordUserData {
	userDataField?: EspotCatalogGroupSEOURLURLKeywordUserDataUserDataField[];
}

export interface EspotCatalogEntry {
	catalogEntryIdentifier?: EspotCatalogEntryIdentifier;
	standardPrice?: EspotStandardPrice;
	description?: EspotCatalogEntryDescription[];
	navigationRelationship?: ComIbmCommerceCatalogFacadeDatatypesCatalogEntryNavigationRelationshipType[];
	contractPrice?: EspotContractPrice[];
	/** @format double */
	displaySequence?: string;
	parentCatalogGroupIdentifier?: ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierType;
	kitComponent?: ComIbmCommerceCatalogFacadeDatatypesKitComponentType[];
	sEOURL?: ComIbmCommerceFoundationCommonDatatypesSEOURLType[];
	listPrice?: EspotListPrice;
	sEOProperties?: ComIbmCommerceFoundationCommonDatatypesSEOPropertiesType[];
	attachmentReference?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceType[];
	floorPrice?: ComIbmCommerceFoundationCommonDatatypesOfferPriceType;
	fulfillmentProperties?: ComIbmCommerceCatalogFacadeDatatypesCatalogEntryFulfillmentPropertiesType;
	attributes?: EspotCatalogEntryAttributes[];
	userDataField?: EspotCatalogEntryUserDataField[];
	catalogEntryTypeCode?: string;
	association?: ComIbmCommerceCatalogFacadeDatatypesAssociationType[];
	navigationPath?: string;
}

export interface EspotCatalogGroupParentCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAssetUserData {
	userDataField?: EspotCatalogGroupAttachmentReferenceAttachmentAssetUserDataUserDataField[];
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotAttachmentExternalIdentifier {
	attachementOwnerId?: string;
	attachementStoreId?: string;
	attachementStoreExternalId?: ComIbmCommerceFoundationCommonDatatypesStoreExternalIdentifierType;
	attachementExternalId: string;
}

export interface EspotCatalogGroupAssociationCatalogGroupReference {
	catalogGroupIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogGroupIdentifier;
	displayName: string;
	catalogIdentifier?: EspotCatalogGroupAssociationCatalogGroupReferenceCatalogIdentifier;
	navigationPath?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionType {
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentDescriptionTypeUserData;
	shortDescription?: string;
	name?: string;
	language?: string;
	longDescription?: string;
}

export interface EspotAttachmentDescription {
	attachmentName?: string;
	attachmentLanguage?: string;
	attachmentLongDescription?: string;
	attachmentShortDescription?: string;
}

export type ComIbmCommerceCatalogFacadeDatatypesAssociationTypeAssociatedObject = object;

export interface ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttributeIdentifierTypeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotAttachmentAssetUserDataField {
	value?: string;
	key: string;
}

export interface EspotContractUnitPrice {
	currency?: string;
	quantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
	/** @format double */
	contractPrice?: string;
	alternativeCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType[];
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAttachmentReferenceAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescriptionUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescriptionUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeUserDataUserDataField[];
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAsset {
	mimeType?: string;
	attachmentAssetIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetAttachmentAssetIdentifier;
	rootDirectory?: string;
	language?: string[];
	directoryPath?: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetStoreIdentifier;
	localAsset?: boolean;
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetUserData;
	attachmentAssetPath: string;
}

export interface EspotMarketingContentImageMapUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupSEOURL {
	userData?: EspotCatalogGroupSEOURLUserData;
	parentStoreIdentifier?: EspotCatalogGroupSEOURLParentStoreIdentifier;
	tokenValue?: string;
	uRLKeywordID?: string;
	uRLKeyword?: EspotCatalogGroupSEOURLURLKeyword[];
	usage?: string;
	siteMapInfo?: EspotCatalogGroupSEOURLSiteMapInfo;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeIntegerValue {
	/** @format int32 */
	value: number;
}

export interface EspotCatalogGroupSEOURLUserData {
	userDataField?: EspotCatalogGroupSEOURLUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceType {
	userData?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeUserData;
	attachmentIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifier;
	attachmentReferenceIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceIdentifier;
	displaySequence?: string;
	attachmentReferenceDescription?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescription[];
	attachmentAsset?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAsset[];
	attachmentDescription?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentDescription[];
	attachmentUsage?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentUsage;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentReferenceDescriptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierType {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesCatalogGroupIdentifierTypeExternalIdentifier;
}

export interface SegmentSegments {
	resourceId?: string;
	/** @format int32 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	MemberGroup?: SegmentSegmentsItem[];
	/** @format int32 */
	recordSetTotal?: number;
}

export interface EspotCatalogGroupNavigationRelationship {
	attributes?: EspotCatalogGroupNavigationRelationshipAttributes[];
	/** @format double */
	displaySequence?: number;
	catalogGroupReference?: EspotCatalogGroupNavigationRelationshipCatalogGroupReference;
	type?: string;
	catalogEntryReference?: EspotCatalogGroupNavigationRelationshipCatalogEntryReference;
}

export interface EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupNavigationRelationshipCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifier;
}

export interface EspotCatalogGroupExternalContentReferenceExternalContentAssetUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupTaxonomyAttributeAttributeExternalIdentifierAttributeDictionaryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeStringValue {
	value: string;
}

export interface EspotCatalogEntryExternalIdentifier {
	ownerID?: string;
	productPartNumber: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentAssetUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceCatalogFacadeDatatypesAssociationTypeCatalogGroupReferenceCatalogGroupIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface EspotEspot {
	resourceId?: string;
	MarketingSpotData?: EspotEspotItem[];
	resourceName?: string;
}

/**
 * Structure containing the default content sequence values.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerDefaultContentDisplaySequenceContainer {
	/** Sequence value of the default content. */
	displaySequence?: string;
	/** Unique identifier of the result. */
	resultId?: string;
	/** Type of the result.  Valid values include MarketingContent, CatalogGroup, CatalogEntry. */
	resultFormat?: string;
}

export interface EspotAttachmentIdentifier {
	attachementId?: string;
	attachmentExternalIdentifier?: EspotAttachmentExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesOfferPriceTypePricePrice {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface EspotCatalogGroupAttachmentReferenceAttachmentUsage {
	displaySequence?: string;
	attachmentUsageDescription?: EspotCatalogGroupAttachmentReferenceAttachmentUsageAttachmentUsageDescription;
	image?: string;
	usageName: string;
}

export interface EspotContractIdentifier {
	contractExternalIdentifier?: EspotContractExternalIdentifier;
	contractID?: string;
}

/**
 * Data to display in the e-marketing spot.
 */
export interface ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainer {
	/** The store identifier. */
	eSpotStoreId?: string;
	/** The number of seconds from now to the earliest start date or end date of activities scheduled to the e-Marketing Spot. */
	nextTimeLimit?: string;
	/** The unique identifier of the e-marketing spot. */
	marketingSpotIdentifier: string;
	/** Base e-marketing spot activity data. */
	baseMarketingSpotActivityData?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer[];
	/** Result that was filtered from display in the e-Marketing Spot. */
	filteredResult?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerFilteredResultContainer[];
	/** Sequence values of the default content to display in the e-marketing spot. */
	defaultContentDisplaySequence?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerDefaultContentDisplaySequenceContainer[];
	/** Marketing title to display in the e-marketing spot. */
	marketingSpotDataTitle?: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerMarketingSpotDataTitleContainer[];
	/** The e-marketing Spot name. */
	eSpotName?: string;
	/** The current caching behavior of the e-marketing spot. */
	behavior?: string;
	/** Information about the activity evaluation. */
	previewReport?: string[];
}

export interface EspotCatalogGroupFacetAttribute {
	attributeDescription: EspotCatalogGroupFacetAttributeAttributeDescription[];
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesAttachmentReferenceTypeAttachmentAssetAttachmentAssetIdentifier {
	uniqueID?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesQuantityType {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface EspotCatalogGroupExternalContentReference {
	userData?: EspotCatalogGroupExternalContentReferenceUserData;
	externalContentDescription?: string;
	language?: string;
	lastUpdateTime?: string;
	externalContentAsset?: EspotCatalogGroupExternalContentReferenceExternalContentAsset[];
	uniqueID?: string;
	externalContentIdentifier: string;
	externalContentType?: string;
	name: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSEOPropertiesTypeUserDataUserDataField[];
}

export interface ComIbmCommerceCatalogFacadeDatatypesAttributeAllowedValueTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: EspotCatalogGroupAssociationCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface EspotMarketingContentImageMap {
	source?: string;
	userDataField?: EspotMarketingContentImageMapUserDataField[];
	name?: string;
	area?: ComIbmCommerceMarketingFacadeDatatypesAreaType[];
}

export interface ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceCatalogFacadeDatatypesKitComponentTypeCatalogEntryReferenceCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary {
	/** List of marketing tracking data for the storefront user */
	behaviorList?: ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummaryBehaviorList[];
}

export interface ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummaryBehaviorList {
	/** The data value */
	data?: string;
	/** The time which the behavior was recorded */
	time?: string;
	/** The name of the marketing element template */
	elementTemplateName?: string;
}

export interface ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse {
	response?: ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponseMessage;
}

export interface ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponseMessage {
	/** The response message */
	message?: string;
}

export interface BehaviorRulesBehaviorRules {
	/** The resourceName */
	resourceName?: string;
}

export interface Seller {
	/** The unique numeric ID for identifying the organization. */
	id?: string;
	/** [9.1.12+] The unique name for identifying the organization. */
	organizationName?: string;
	/** The display name for specified language. */
	name?: string;
	/** The short description for specified language. */
	description?: string;
	/**
	 * Status of the marketplace seller organization. Available values: <br> * 1 - The organization is in Active state.<br> * 2 - The organization is in Deactivated state.<br> * 3 - The organization is in Suspended state.<br> * 4 - The organization is in Terminated state.
	 * @format int32
	 */
	status?: 1 | 2 | 3 | 4;
	/**
	 * Online Status of the marketplace seller organization. Available values: <br> * 1 - The organization is in Online state.<br> * 0 - The organization is in Offline state.
	 * @format int32
	 */
	onlineStatus?: 0 | 1;
}

export interface SellerCollection {
	count?: number;
	/** The list of items. */
	items?: Seller[];
}

export interface ComIbmCommerceRestApiHandlerApiHandlerResourceLinkList {
	swaggerVersion?: string;
	apiVersion?: string;
	apis?: ComIbmCommerceRestApiHandlerApiHandlerResouceLink[];
}

export interface ContentUrlResponse {
	resultList?: {
		resolvedMimeSubtype?: string;
		resolvedURL?: string;
		resolvedRenderType?: string | null;
		resolvedMimeType?: string;
	}[];
}

export interface ComIbmCommerceRestApiHandlerApiHandlerResouceLink {
	path?: string;
	description?: string;
}

export interface DataImportStatusResponse {
	status?: {
		finishTime?: string;
		lastUpdate?: string;
		progress?: string;
		jobStatusId?: string;
		startTime?: string;
		message?: string;
		jobType?: string;
		properties?: string;
		status?: string;
	};
}

export interface ApiHandlerSwaggerResourceList {
	apiVersion?: string;
	swaggerVersion?: string;
	apis?: SwaggerResourceList[];
}

export interface SwaggerResourceList {
	path?: string;
	description?: string;
	pathAnnotationEnding?: string;
}

export interface ApiHandlerResourceList {
	appVersion?: string;
	components?: APIComponents[];
}

export interface APIComponents {
	name?: string;
	description?: string;
	resources?: APIComponentResourceList[];
}

export interface APIComponentResourceList {
	path?: string;
	name?: string;
}

export interface ContractsResponse {
	contracts?: Record<string, string>;
}

export interface ContractResponse {
	resultList?: {
		owner?: number;
		comments?: string | null;
		TCs?: TCs[];
		storeXMLDefinition?: Record<string, string>;
		origin?: number;
		usage?: number;
		timeDeployed?: string;
		markForDelete?: number;
		storeXMLString?: string | null;
		majorVersion?: number;
		referredTradingAgreementId?: number | null;
		familyId?: number;
		accountId?: number;
		contractLevelParticipants?: ContractLevelParticipants[];
		timeActivated?: string;
		referenceNumber?: number;
		timeApproved?: string | null;
		timeUpdated?: string;
		name?: string;
		ownerReferenceNumber?: number;
		timeCreated?: string;
		dataBeanKeyReferenceNumber?: string;
		state?: number;
		minorVersion?: number;
	}[];
}

export interface TCs {
	tcSubType?: string;
	entireCatalogAdjustment?: string | null;
	changeableFlag?: number;
	inclusionProductSets?: string | null;
	productSetId?: string | null;
	policies?: TCsPolicies[];
	priceListId?: string | null;
	mandatoryFlag?: number;
	exclusionProductSets?: string | null;
	percentagePriceListIds?: string | null;
	referenceNumber?: number;
	timeUpdated?: string;
	tradingId?: number;
	tcSequence?: number;
	timeCreated?: string;
	XMLString?: string;
	entireCatalogSelected?: string;
	priceListIds?: string | null;
	participants?: TCsparticipants[];
}

export interface ContractLevelParticipants {
	participantId?: number;
	roleId?: number;
	timeUpdated?: string;
	tradingId?: number;
	information?: string | null;
	timeCreated?: string;
	tcId?: number | null;
	memberId?: number;
}

export interface AccesscontrolByUserIdAndViewId {
	isAllowed: boolean;
}

export interface ActivityResponse {
	emailActivityName?: string;
	emailPromotionId?: number;
	campaignName?: string;
	emailTemplateName?: string;
}

export interface Activityurls {
	resultList: object[];
}

export interface TCsPolicies {
	owner?: number;
	policyId?: number;
	endDate?: string | null;
	policyName?: string;
	storeEntityId?: number;
	type?: string;
	properties?: string | null;
	startDate?: string | null;
}

export type TCsparticipants = Record<string, string>;

export interface ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary {
	recordSetCount?: number;
	recordSetCompleteIndicator?: boolean;
	recordSetStartNumber?: number;
	resultList?: ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultList[];
	recordSetTotal?: number;
}

export interface ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultList {
	comment?: string | null;
	lastUpdate?: string;
	description?: string;
	organizationId?: string;
	userRegistration?: ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultListUserRegistration[];
	storeId?: string;
	memberId?: string;
	orderId?: string;
	status?: string;
	orderItemCount?: number;
}

export interface ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummaryResultListUserRegistration {
	middleName?: string;
	lastName?: string;
	firstName?: string;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitResponse {
	orderId?: string[];
	contractId?: string[];
}

export interface ComIbmCommerceRestStoreHandlerStoreHandlerRemoteConfig {
	webNonSSLPort?: string;
	webContextPath?: string;
	previewContextPath?: string;
	resourceName?: string;
	webSSLPort?: string;
	webAlias?: string;
	webHostName?: string;
}

export interface ValidateMerchantRequest {
	validationURL?: string;
	paymentSystem?: string;
	paymentConfigGroup?: string;
}

export interface ComIbmCommerceToolsContractBeansDisplayCustomizationTCDataBeanIBMStoreDetails {
	resultList?: {
		languageId?: number;
		hasDisplayText?: boolean;
		storeId?: number;
		userId?: number;
		hasDisplayLogo?: boolean;
		displayText?: string[];
		accountId?: number | null;
		attachmentURL?: string[];
	}[];
}

export interface ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetails {
	resultList?: {
		termConditionId?: string;
		XMLString?: string;
		timeCreated?: string;
		policies?: TCsPolicies[];
		changeableFlag?: number;
		tcSequence?: number;
		mandatoryFlag?: number;
		participants?: ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetailsParticipants[];
		tcSubType?: string;
		timeUpdated?: string;
		tradingId?: string;
	}[];
}

export interface ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetailsParticipants {
	termConditionId?: number;
	participantId?: number;
	timeCreated?: string;
	information?: string;
	roleId?: number;
	memberId?: number;
	timeUpdated?: string;
	tradingId?: number;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest {
	status?: number;
	name?: boolean;
	catEntryId?: number;
	requisitionListId?: string;
	configurationXML?: number;
	partNumber?: boolean;
	type?: number;
	quantity: string;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest {
	status?: string;
	billtoAddressId?: string;
	viewTaskName?: string;
	name?: string;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest {
	offerId?: string[];
	contractId?: string[];
}

export interface ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobResponse {
	/** @format int64 */
	jobId?: number;
}

export interface ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobRequest {
	command?: string;
	query?: string;
	startTime?: string;
	interval?: number;
	applicationType?: string;
	host?: string;
	retryAttempts?: number;
	retryDelay?: number;
}

export interface ComIbmCommerceSchedulerBeansJobDataBeanIBMAdminSummary {
	storeId?: number;
	interfaceName?: string | null;
	sequence?: number;
	interval?: number;
	userId?: number;
	retryDelay?: number;
	/** @format int64 */
	jobId?: number;
	priority?: number;
	retryAttempts?: number;
	host?: string | null;
	command?: string;
	applicationType?: string | null;
	startTime?: string;
	active?: string;
	query?: string | null;
}

export interface ComIbmCommerceApprovalBeansApprovalGroupTypeListBeanIBMStoreSummary {
	resultList?: ComIbmCommerceApprovalBeansApprovalGroupTypeListBeanIBMStoreSummaryResultList[];
}

export interface ComIbmCommerceApprovalBeansApprovalGroupTypeListBeanIBMStoreSummaryResultList {
	memberGroupTypeId?: string;
	properties?: string;
	description?: string;
	name?: string;
}

export interface ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummary {
	resultList?: ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummaryResultList[];
}

export interface ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummaryResultList {
	reasonCode?: string | null;
	lastUpdate?: string;
	progressMessage?: string | null;
	preferredStartTime?: string;
	sequence?: number;
	state?: string;
	/** @format int64 */
	jobId?: number;
	queue?: string;
	jobInstanceId?: number;
	attemptsLeft?: number;
	error?: string | null;
	report?: string | null;
	progress?: string | null;
	actualStartTime?: string;
	endTime?: string;
	failedJobInstanceId?: number;
	result?: string;
}

export interface ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusResponse {
	resultmsg?: string;
}

export interface ComIbmCommerceApprovalBeansApprovalStatusDataBeanIBMStoreSummary {
	resultList?: {
		approvalStatusId?: string;
		approverGroupId?: string;
		/** @format date */
		submitTime?: string;
		flowTypeId?: string;
		stateId?: string;
		comment?: string;
		submitterId?: string;
		flowId?: string;
		/** @format date */
		approveTime?: string;
		status?: string;
		approverId?: string;
		entityId?: string;
	}[];
}

export interface ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummary {
	/** @format int32 */
	recordSetCount?: number;
	recordSetCompleteIndicator?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resultList?: ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList[];
	/** @format int32 */
	recordSetTotal?: number;
}

export interface ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList {
	recordSetCount?: number;
	recordSetStartNumber?: number;
	recordSetTotal?: number;
	resultList?: {
		approvalStatusId?: string;
		approverGroupId?: string;
		/** @format date */
		submitTime?: string;
		flowTypeId?: string;
		stateId?: string;
		comment?: string;
		submitterId?: string;
		flowId?: string;
		/** @format date */
		approveTime?: string;
		status?: string;
		approverId?: string;
		entityId?: string;
	}[];
	recordSetCompleteIndicator?: boolean;
}

export interface ComIbmCommerceRestConfigFeatureHandlerFeatureResponse {
	resultList?: ComIbmCommerceRestConfigFeatureHandlerFeatureResponseResultList[];
}

export interface ComIbmCommerceRestConfigFeatureHandlerFeatureResponseResultList {
	version?: string;
	enabled?: string;
	name?: string;
}

export interface FileUploadJobIBMStoreSummary {
	recordSetCount?: number;
	resourceId?: string;
	resourceName?: string;
	recordSetComplete?: boolean;
	recordSetStartNumber?: number;
	resultList?: FileUploadJobIBMStoreSummaryItem[];
	recordSetTotal?: number;
}

export interface FileUploadJobIBMStoreSummaryItem {
	processFile: {
		processInfo: string;
		startTime: string;
		endTime: string;
		userName: string;
		properties: {
			name: string;
			value: string;
		}[];
		status: string;
	}[];
	fileUploadJobId: string;
	uploadFile: {
		fileInfo: {
			fileName: string;
			fileSize: number;
			fileEncoding: string;
			filePath: string;
		};
		userName: string;
		uploadTime: string;
		properties: {
			name: string;
			value: string;
		}[];
	};
	uploadType: string;
	storeId: string;
}

export interface RequisitionListRequisitionList {
	requisitionListId?: string;
	viewTaskName?: string;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest {
	requisitionListId?: string[];
	newOrderItemId_0?: string;
	orderItemId_0?: string;
	orderId?: string[];
	orderItemId?: string[];
	viewTaskName?: string;
}

export interface ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListDeleteResponse {
	requisitionListId?: string;
	viewTaskName?: string;
}

/**
 * Description of the merchant validation input body.
 */
export interface ComIbmCommerceRestOrderHandlerMerchantHandlerMerchantValidationBodyDescription {
	/** Payment configuraiton group. */
	paymentConfigGroup: string;
	/** Payment system . */
	paymentSystem: string;
	/** Validation url. */
	validationURL: string;
}

export interface OrderOrderSummaryItemAdjustmentUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType {
	registrantAddress?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddress;
	relation?: string;
	personIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypePersonIdentifier;
	registrantID?: string;
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeUserData;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface OrderOrderDetailRewardOptionRewardSpecification {
	giftSetSpecification?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecification;
	userData?: OrderOrderDetailRewardOptionRewardSpecificationUserData;
}

export interface OrderOrderDetailTotalTaxByTaxCategory {
	currency?: string;
	/** @format double */
	value?: string;
	taxCategoryCode?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1UserData;
	value: string;
}

export interface OrderOrderDetail {
	resourceId?: string;
	resourceName?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	/** @format double */
	grandTotal?: string;
	requestedShipDate?: string;
	orderItem?: OrderOrderDetailOrderItem[];
	addressId?: string;
	pysicalStoreId?: string;
	cSRComments?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsType[];
	parentInfo?: ComIbmCommerceOrderFacadeDatatypesParentInfoType;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	/** @format double */
	totalAdjustment?: string;
	orderStatus?: string;
	totalShippingChargeCurrency?: string;
	quoteID?: string;
	bLockInfo?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType;
	genericTotal?: ComIbmCommerceFoundationCommonDatatypesGenericTotalType[];
	blocked?: string;
	recordSetComplete?: string;
	adjustment?: OrderOrderDetailAdjustment[];
	paymentInstruction?: OrderOrderDetailPaymentInstruction[];
	orderDescription?: string;
	/** @format double */
	totalShippingTax?: string;
	prepareIndicator?: string;
	totalShippingTaxCurrency?: string;
	comments?: string;
	grandTotalCurrency?: string;
	shipModeId?: string;
	totalSalesTaxCurrency?: string;
	storeUniqueID?: string;
	buyerId?: string;
	userDataField?: OrderOrderDetailUserDataField[];
	orgDistinguishedName?: string;
	promotionCode?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeType[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	orderId?: string;
	shipAsComplete?: string;
	xstat_?: JavaUtilMapEntry[];
	rewardOption?: OrderOrderDetailRewardOption[];
	/** @format int32 */
	recordSetCount?: string;
	x_isPurchaseOrderNumberRequired?: string;
	x_isPersonalAddressesAllowedForShipping?: string;
	x_trackingIds?: string | null;
	buyerApprovalStatus?: string;
	orderTypeCode?: string;
	externalOrderID?: string;
	editable?: string;
	/** @format double */
	totalSalesTax?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	buyerPONumber?: string;
	totalProductPriceCurrency?: string;
	placedDate?: string;
	customerOrderNumber?: string;
	totalAdjustmentCurrency?: string;
	/** @format double */
	totalShippingCharge?: string;
	orderVersion?: string;
	/** @format double */
	totalProductPrice?: string;
	locked?: string;
	couponCode?: ComIbmCommerceOrderFacadeDatatypesCouponCodeType[];
	totalTaxByTaxCategory?: OrderOrderDetailTotalTaxByTaxCategory[];
	paymentStatus?: string;
	orgUniqueID?: string;
	orderExtendAttribute?: OrderOrderDetailOrderExtendAttribute[];
	storeNameIdentifier?: string;
	lastUpdateDate?: string;
	buyerDistinguishedName?: string;
	financialTransaction?: ComIbmCommerceOrderFacadeDatatypesFinancialTransactionType[];
	orderEditor?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	storeOwnerID?: string;
	/** @format int32 */
	recordSetTotal?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2UserData;
	value: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1UserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Description of the post input body to process the wish list.
 * @example {"announcement":[{"senderEmailAddress":"abc@gmail.com","message":"string","emailRecipient":[{"recipientEmail":"john@example.com","addressingMethod":"string","recipientName":"john"}],"senderName":"wishlist"}]}
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription {
	/** The email announcements made about the gift list by the registrants to friends and family. */
	announcement?: ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescription[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddress {
	city?: string;
	addressLine?: string[];
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddressUserData;
	country?: string;
	primary?: boolean;
	stateOrProvinceName?: string;
	type?: string;
	postalCode?: string;
	internalOfficeAddress?: string;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsServiceRepDetails {
	logonId?: string;
	address?: ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsServiceRepDetailsAddress;
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItem {
	catalogEntryIdentifier?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifier;
	quantity?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemQuantity;
}

/**
 * Description of the post input body to update the wishlist or item.
 * @example {"item":[{"partNumber":"CDE021_210101","quantityRequested":"2","location":"online","productId":"12653"}],"descriptionName":"updatedGiftList descriptionName","description":"updatedGiftList description","giftCardAccepted":"false","accessSpecifier":"Private"}
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescription {
	/** Wish list item to add or updated. */
	item?: ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescriptionWishlistItemBodyDescription[];
	/** Wish list description name. */
	descriptionName?: string;
	/** Wish list description. */
	description?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

/**
 * Announcement body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescription {
	/** The e-mail address of the sender. */
	senderEmailAddress: string;
	/** The custom message sent by the sender in the e-mail. */
	message?: string;
	/** The recipients of the e-mail. */
	emailRecipient?: ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescriptionEmailRecipient[];
	/** The name of the sender. */
	senderName: string;
}

export interface WishlistWishlistItemItem {
	/** @format double */
	quantityRequested?: string;
	itemLastUpdate?: string;
	attribute?: WishlistWishlistItemItemAttribute[];
	giftListItemID?: string;
	quantityRequestedUom?: string;
	itemCreatedTime?: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	productOwnerID?: string;
	location?: string;
	quantityBoughtUom?: string;
	/** @format double */
	quantityBought?: string;
	partNumber: string;
	userDataField?: WishlistWishlistItemItemUserDataField[];
	productId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse {
	/** Wish list item to add or update. */
	item?: ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponseItem[];
	/** Wish list unique identifier. */
	uniqueID: string;
	/** Wish list descriptionName */
	descriptionName?: string;
	/** Wish list resource name */
	resourceName: string;
}

export interface OrderOrderDetailRewardOptionRewardSpecGiftItem {
	/** @format double */
	value?: string;
	uom?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType;
	productId?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

/**
 * Information required to add CSR comment.
 */
export interface ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentForm {
	/** The comment field. */
	commentField: string;
	/** The email address. */
	emailAddress?: string;
	/** The flag to indicate to send email or not. */
	sendEmail?: boolean;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsOrderItemIdentifier {
	uniqueID?: string;
	externalOrderItemID?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1UserDataUserDataField[];
}

export interface ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsCommentDetails {
	comment?: string;
	lastupdate?: string;
	orcommentId?: string;
	serviceRepresentativeId?: string;
}

export interface WishlistWishlistItem {
	externalIdentifier?: string;
	storeName?: string;
	manageAccessPassword?: string;
	coRegistrant?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType[];
	uniqueID?: string;
	registrant?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType;
	announcement?: WishlistWishlistItemAnnouncement[];
	postEventAddress?: ComIbmCommerceFoundationCommonDatatypesContactInfoType;
	event?: string;
	state?: string;
	location?: string;
	userDataField?: WishlistWishlistItemUserDataField[];
	registryAccessKey?: string;
	lastUpdate?: string;
	description?: string;
	storeId?: string;
	purchaseRecord?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordType[];
	guestMessage?: string;
	accessSpecifier: string;
	optForEmail?: string;
	giftCardAccepted?: string;
	preEventAddress?: ComIbmCommerceFoundationCommonDatatypesContactInfoType;
	guestAccessKey?: string;
	item?: WishlistWishlistItemItem[];
	descriptionName?: string;
	createdTime?: string;
	storeOwnerID?: string;
	registry?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummary {
	recordSetCompleteIndicator?: boolean;
	/** @format int32 */
	pageSize?: number;
	/** @format int32 */
	recordSetCount?: number;
	orderComments?: ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderComments[];
	/** @format int32 */
	pageNumber?: number;
	/** @format int32 */
	recordSetTotal?: number;
}

/**
 * wish list item body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponseItem {
	/** wish list item ID. */
	giftListItemID: string;
}

export interface WishlistWishlist {
	/** @format int32 */
	recordSetCount?: string;
	recordSetComplete?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	GiftList?: WishlistWishlistItem[];
	resourceName?: string;
	resourceId?: string;
	/** @format int32 */
	recordSetTotal?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionGiftSet {
	giftItem?: OrderOrderDetailRewardOptionGiftSetGiftItem[];
}

export interface OrderOrderDetailRewardOptionAdjustmentUserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionCalculationCodeID {
	calculationCodeExternalIdentifier?: OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1UserData;
	value: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2UserData;
	value: string;
}

export interface OrderOrderDetailRewardOptionAdjustment {
	userData?: OrderOrderDetailRewardOptionAdjustmentUserData;
	code?: string;
	description?: OrderOrderDetailRewardOptionAdjustmentDescription;
	displayLevel?: string;
	calculationCodeID?: OrderOrderDetailRewardOptionAdjustmentCalculationCodeID;
	amount?: OrderOrderDetailRewardOptionAdjustmentAmount;
	promotionType?: string;
	usage?: string;
	isPromotionCodeRequired?: boolean;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1UserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1 {
	country: string;
	value: string;
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1UserData;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecification {
	maximumQuantity: OrderOrderDetailRewardOptionGiftSetSpecificationMaximumQuantity;
	giftItem?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItem[];
}

export interface OrderOrderDetailRewardOptionRewardChoiceUserData {
	userDataField?: OrderOrderDetailRewardOptionRewardChoiceUserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationMaximumQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierOrganizationIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierPersonIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressUserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export type ComIbmCommerceOrderExternalCommandsProcessExternalOrderCmd = object;

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2UserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOption {
	code?: string;
	adjustmentLanguage?: string;
	/** @format double */
	adjustmentAmount?: string;
	calculationCodeID?: OrderOrderDetailRewardOptionCalculationCodeID;
	adjustment?: OrderOrderDetailRewardOptionAdjustment;
	giftSet?: OrderOrderDetailRewardOptionGiftSet;
	rewardSpecGiftItem?: OrderOrderDetailRewardOptionRewardSpecGiftItem[];
	adjustmentCode?: string;
	adjustmentDescription?: string;
	adjustmentUsage?: string;
	rewardChoice?: OrderOrderDetailRewardOptionRewardChoice;
	adjustmentCurrency?: string;
	usage?: string;
	userData?: OrderOrderDetailRewardOptionUserData;
	description?: OrderOrderDetailRewardOptionDescription;
	rewardOptionIdentifier: OrderOrderDetailRewardOptionRewardOptionIdentifier;
	rewardOptionExternalId?: string;
	promotionType?: string;
	isPromotionCodeRequired?: boolean;
	giftSetSpecification?: OrderOrderDetailRewardOptionGiftSetSpecification;
	adjustmentDisplayLevel?: string;
	displayLevel?: string;
	amount?: OrderOrderDetailRewardOptionAmount;
	rewardSpecification?: OrderOrderDetailRewardOptionRewardSpecification;
	rewardChoiceGiftItem?: OrderOrderDetailRewardOptionRewardChoiceGiftItem[];
	/** @format double */
	rewardSpecMaxQuantity?: string;
	rewardOptionId?: string;
	rewardSpecMaxQuantityUom?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2UserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressUserDataUserDataField[];
}

/**
 * Wish list item body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescriptionWishlistItemBodyDescription {
	/** Wish list item quantity requested. */
	quantityRequested?: string;
	/** Wish list item ID. */
	giftListItemID: string;
	/** Wish list item product partNumber. */
	partNumber?: string;
	/** Wish list item product ID. */
	productId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier {
	identifier?: string;
}

export interface InventoryavailabilityInventoryavailability {
	resourceId: string;
	resourceName: string;
	InventoryAvailability?: InventoryavailabilityInventoryavailabilityItem[];
}

export interface InventoryavailabilityInventoryavailabilityByorderid {
	overallInventoryAvailability?: InventoryavailabilityInventoryavailabilityByorderid[];
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export type ComIbmCommerceOrderCommandsSSFSOrderCopyCmd = object;

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAttributes {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypeUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypeUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1UserDataUserDataField[];
}

export interface OrderOrderSummaryItem {
	resourceId?: string;
	x_isPurchaseOrderNumberRequired?: string;
	x_isPersonalAddressesAllowedForShipping?: string;
	x_trackingIds?: string | null;
	/** @format double */
	grandTotal?: string;
	quoteID?: string;
	cSRComments?: ComIbmCommerceOrderFacadeDatatypesCSRCommentsType[];
	parentInfo?: ComIbmCommerceOrderFacadeDatatypesParentInfoType;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	orderVersion?: string;
	/** @format double */
	totalAdjustment?: string;
	orderStatus?: string;
	totalShippingChargeCurrency?: string;
	bLockInfo?: ComIbmCommerceOrderFacadeDatatypesOrderBLockInfoType;
	genericTotal?: ComIbmCommerceFoundationCommonDatatypesGenericTotalType[];
	blocked?: string;
	adjustment?: OrderOrderSummaryItemAdjustment[];
	orderDescription?: string;
	/** @format double */
	totalShippingTax?: string;
	prepareIndicator?: string;
	totalShippingTaxCurrency?: string;
	comments?: string;
	grandTotalCurrency?: string;
	totalSalesTaxCurrency?: string;
	storeUniqueID?: string;
	buyerId?: string;
	userDataField?: OrderOrderSummaryItemUserDataField[];
	orgDistinguishedName?: string;
	promotionCode?: ComIbmCommerceOrderFacadeDatatypesPromotionCodeType[];
	channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
	orderId?: string;
	shipAsComplete?: string;
	xstat_?: JavaUtilMapEntry[];
	buyerApprovalStatus?: string;
	orderTypeCode?: string;
	externalOrderID?: string;
	editable?: string;
	quoteIdentifier?: ComIbmCommerceFoundationCommonDatatypesQuoteIdentifierType;
	buyerPONumber?: string;
	totalProductPriceCurrency?: string;
	placedDate?: string;
	customerOrderNumber?: string;
	totalAdjustmentCurrency?: string;
	/** @format double */
	totalShippingCharge?: string;
	orderEditor?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	/** @format double */
	totalProductPrice?: string;
	locked?: string;
	totalTaxByTaxCategory?: OrderOrderSummaryItemTotalTaxByTaxCategory[];
	couponCode?: ComIbmCommerceOrderFacadeDatatypesCouponCodeType[];
	orderExtendAttribute?: OrderOrderSummaryItemOrderExtendAttribute[];
	orgUniqueID?: string;
	storeNameIdentifier?: string;
	lastUpdateDate?: string;
	buyerDistinguishedName?: string;
	/** @format double */
	totalSalesTax?: string;
	storeOwnerID?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2UserDataUserDataField[];
}

export interface OrderOrderDetailOrderItemOrderItemExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface OrderOrderDetailPaymentInstructionAttributes {
	attrKey: string;
	attrValue?: string;
}

export interface OrderOrderDetailOrderItemUsableShippingChargePolicy {
	storeId?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	type: string;
	name: string;
	uniqueID?: string;
}

export interface OrderOrderDetailRewardOptionUserData {
	userDataField?: OrderOrderDetailRewardOptionUserDataUserDataField[];
}

export interface OrderOrderDetailPaymentInstruction {
	addressType?: string;
	addressLine?: string[];
	piId?: string;
	refundAllowed?: string;
	personTitle?: string;
	minAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	primary?: string;
	payMethodId?: string;
	paymentRule?: string;
	piDescription?: string;
	email2: string;
	xpaym_tokenization?: string | null;
	xpaym_policyId?: string;
	xpaym_punchoutPayment?: string | null;
	/** @format double */
	piAmount?: string;
	maxAmount?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	city?: string;
	piCurrency?: string;
	/** @format int32 */
	sequenceNumber?: string;
	piStatus?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	/** @format int32 */
	priority?: string;
	protocolData?: OrderOrderDetailPaymentInstructionProtocolData[];
	state?: string;
	fax2: string;
	fax1: string;
	postalCode?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	email1: string;
	internalOfficeAddress?: string;
	billing_address_id?: string;
	paymentTermConditionId?: string;
	phone2Type?: string;
	nickName: string;
	phone2: string;
	businessTitle?: string;
	phone1: string;
	zipCode?: string;
	bestCallingTime?: string;
	mobilePhone1Country?: string;
	piLanguage?: string;
	phone2Publish?: string;
	mobilePhone1?: string;
	phone1Type?: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	organizationUnitName?: string;
	organizationName?: string;
	language?: string;
	firstName?: string;
	lastName?: string;
	geographicalShippingCode?: string;
	stateOrProvinceName?: string;
	phone1Publish?: string;
	attributes?: OrderOrderDetailPaymentInstructionAttributes[];
	country?: string;
	userDataField?: OrderOrderDetailPaymentInstructionUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBought {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifier;
}

export interface OrderOrderSummaryItemUserDataField {
	value?: string;
	key: string;
}

export interface WishlistWishlistItemAnnouncementEmailRecipient {
	recipientEmail: string;
	addressingMethod: string;
	recipientName: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypePersonIdentifierExternalIdentifier {
	identifier?: string;
}

export interface OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface OrderOrderDetailOrderItemAdjustment {
	code?: string;
	description?: string;
	language?: string;
	currency?: string;
	/** @format double */
	amount?: string;
	usage?: string;
	userDataField?: OrderOrderDetailOrderItemAdjustmentUserDataField[];
}

export interface OrderOrderDetailRewardOptionRewardSpecificationUserData {
	userDataField?: OrderOrderDetailRewardOptionRewardSpecificationUserDataUserDataField[];
}

export interface WishlistWishlistItemItemUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailOrderItem {
	addressLine?: string[];
	externalOrderItemID?: string;
	xitem_isPersonalAddressesAllowedForShipping?: string;
	orderItemInventoryStatus?: string;
	alternativeCurrencyPrice?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType[];
	adjustment?: OrderOrderDetailOrderItemAdjustment[];
	email2: string;
	shippingChargeCurrency?: string;
	email1: string;
	fulfillmentCenterName?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	createDate?: string;
	/** @format double */
	salesTax?: string;
	physicalStoreExternalId?: string;
	zipCode?: string;
	mobilePhone1?: string;
	itemAttributes?: OrderOrderDetailOrderItemItemAttributes[];
	shipCarrAccntNum?: string;
	/** @format double */
	unitPrice?: string;
	contractId?: string;
	/** @format double */
	unitQuantity?: string;
	organizationName?: string;
	geographicalShippingCode?: string;
	stateOrProvinceName?: string;
	lastUpdateDate?: string;
	shipModeDescription?: string;
	addressId?: string;
	/** @format double */
	shippingCharge?: string;
	shipModeLanguage?: string;
	totalAdjustment?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	orderItemExtendAttribute?: OrderOrderDetailOrderItemOrderItemExtendAttribute[];
	UOM?: string;
	genericTotal?: ComIbmCommerceFoundationCommonDatatypesGenericTotalType[];
	shippingChargeType?: string;
	comments?: string;
	state?: string;
	fulfillmentCenterId?: string;
	shipModeId?: string;
	userDataField?: OrderOrderDetailOrderItemUserDataField[];
	phone1Type?: string;
	internalOfficeAddress?: string;
	shippingTaxCurrency?: string;
	phone2Type?: string;
	phone2: string;
	businessTitle?: string;
	storeId?: string;
	shippingChargePolicyID?: string;
	phone1: string;
	/** @format double */
	orderItemPrice?: string;
	language?: string;
	country?: string;
	carrier?: string;
	shippingCarrierAccountNumber?: string;
	attributes?: OrderOrderDetailOrderItemAttributes[];
	partNumber: string;
	timeReleased?: string;
	primary?: string;
	unitUom?: string;
	requestedShipDate?: string;
	fulfillmentCenterOwnerId?: string;
	priceOverride?: string;
	city?: string;
	availableDate?: string;
	shipModeCode?: string;
	fax2: string;
	fax1: string;
	taxByTaxCategory?: ComIbmCommerceFoundationCommonDatatypesTaxByTaxCategoryType[];
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	nickName: string;
	isExpedited?: string;
	expectedShipDate?: string;
	shipInstruction?: string;
	mobilePhone1Country?: string;
	orderItemStatus?: string;
	firstName?: string;
	freeGift?: string;
	organizationUnitName?: string;
	storeIdentifier?: ComIbmCommerceFoundationCommonDatatypesStoreIdentifierType;
	phone1Publish?: string;
	addressType?: string;
	orderItemFulfillmentStatus?: string;
	personTitle?: string;
	adjustmentRequirement?: ComIbmCommerceOrderFacadeDatatypesAdjustmentRequirementType[];
	currency?: string;
	fulfillmentCenterDescription?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	salesTaxCurrency?: string;
	usableShippingChargePolicy?: OrderOrderDetailOrderItemUsableShippingChargePolicy[];
	timeShipped?: string;
	offerID?: string;
	shipTieCode?: string;
	postalCode?: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	/** @format double */
	shippingTax?: string;
	physicalStoreId?: string;
	productId?: string;
	lastName?: string;
	trackingURL?: string;
	bestCallingTime?: string;
	phone2Publish?: string;
	correlationGroup?: string;
	orderItemId?: string;
	configurationID?: string;
	orderItemComponent?: ComIbmCommerceOrderFacadeDatatypesOrderItemComponentType[];
	ownerID?: string;
	/** @format double */
	quantity?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2UserDataUserDataField[];
}

export interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary {
	recordSetCompleteIndicator?: boolean;
	pageSize?: string;
	/** @format int32 */
	recordSetCount?: number;
	resultList?: ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultList[];
	/** @format int32 */
	pageNumber?: number;
	/** @format int32 */
	recordSetTotal?: number;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1UserData;
	value: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1UserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1UserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1 {
	country: string;
	value: string;
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1UserData;
}

export interface OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

export interface OrderOrderDetailPaymentInstructionProtocolData {
	name: string;
	value?: string;
}

export interface OrderOrderDetailOrderItemAdjustmentUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddressUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddressUserDataUserDataField[];
}

export interface OrderOrderDetailOrderItemUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionAdjustmentAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddressUserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Wish list item body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponseItem {
	/** Wish list item ID. */
	giftListItemID: string;
}

/**
 * Wish list item body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListDeleteResponseItem {
	/** Wish list item ID. */
	giftListItemID?: string;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultListFormattedDataBean {
	/** @format double */
	grandTotal?: number;
}

export interface OrderOrderSummaryItemAdjustment {
	code?: string;
	description?: string;
	displayLevel?: string;
	currency?: string;
	/** @format double */
	amount?: string;
	usage?: string;
	userDataField?: OrderOrderSummaryItemAdjustmentUserDataField[];
	descriptionLanguage?: string;
	xadju_calUsageId?: string | null;
}

/**
 * The recipients of the e-mail.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescriptionEmailRecipient {
	/** E-mail address of the recipient. */
	recipientEmail: string;
	/** The method in which the recipient is addressed in the e-mail, for example, they are directly addressed (TO), they are copied on the mail (CC), and so on. */
	addressingMethod: string;
	/** The name of the sender. */
	recipientName: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailAdjustment {
	code?: string;
	description?: string;
	displayLevel?: string;
	xadju_calUsageId?: string | null;
	currency?: string;
	/** @format double */
	amount?: string;
	usage?: string;
	userDataField?: OrderOrderDetailAdjustmentUserDataField[];
	descriptionLanguage?: string;
}

export interface InventoryavailabilityInventoryavailabilityItemUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface JavaUtilMapEntry {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifier {
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierOrganizationIdentifier;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierPersonIdentifier;
	contactInfoNickName: string;
}

export interface OrderOrderSummaryItemOrderExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionAdjustmentDescription {
	value?: string;
	language?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface OrderOrderDetailUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItem {
	catalogEntryIdentifier?: OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifier;
	quantity?: OrderOrderDetailRewardOptionGiftSetGiftItemQuantity;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier {
	identifier?: string;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderComments {
	commentDetails?: ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsCommentDetails;
	serviceRepDetails?: ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsServiceRepDetails;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

/**
 * Wish list delete response.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerDeleteWishListResponse {
	/** Wish list item to add or update. */
	item?: ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListDeleteResponseItem[];
	/** Wish list unique identifier. */
	uniqueID: string;
	/** Wish list description name. */
	descriptionName?: string;
	/** Wish list resource name. */
	resourceName: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifier {
	organizationIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierOrganizationIdentifier;
	personIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierPersonIdentifier;
	contactInfoNickName: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItem {
	catalogEntryIdentifier?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier;
	quantity?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemQuantity;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecification {
	maximumQuantity: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationMaximumQuantity;
	giftItem?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItem[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAttributes {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaseRecordIdentifier {
	uniqueID?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAttributes {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBoughtExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1UserData;
	value: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2UserData;
	value: string;
}

export interface OrderOrderDetailOrderItemAttributes {
	attrKey: string;
	attrValue?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSet {
	giftItem?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItem[];
}

export interface OrderOrderDetailPaymentInstructionUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddressUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2UserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItemQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1UserDataUserDataField[];
}

export interface OrderOrderSummaryItemTotalTaxByTaxCategory {
	currency?: string;
	/** @format double */
	value?: string;
	taxCategoryCode?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddress {
	city?: string;
	addressLine?: string[];
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddressUserData;
	country?: string;
	primary?: boolean;
	stateOrProvinceName?: string;
	type?: string;
	postalCode?: string;
	internalOfficeAddress?: string;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationUserDataUserDataField {
	value?: string;
	key: string;
}

export interface InventoryavailabilityInventoryavailabilityItem {
	physicalStoreName?: string;
	onlineStoreName?: string;
	availabilityDateTime?: string;
	onlineStoreId?: string;
	unitOfMeasure?: string;
	/** @format double */
	availableQuantity?: string;
	inventoryStatus?: string;
	userDataField?: InventoryavailabilityInventoryavailabilityItemUserDataField[];
	physicalStoreId?: string;
	x_customField1?: string | null;
	x_customField2?: string | null;
	x_customField3?: string | null;
	productId?: string;
}

export interface InventoryavailabilityInventoryavailabilityByorderid {
	physicalStoreId?: string;
	overallInventoryStatus?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItem {
	catalogEntryIdentifier?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifier;
	quantity?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemQuantity;
}

export interface OrderOrderDetailRewardOptionRewardChoice {
	userData?: OrderOrderDetailRewardOptionRewardChoiceUserData;
	giftSet?: OrderOrderDetailRewardOptionRewardChoiceGiftSet;
}

/**
 * Description of the post input body to create a wish list or item.
 * @example {"item":[{"partNumber":"CDE021_210101","quantityRequested":"1","location":"online","productId":"12653"}],"descriptionName":"GiftList descriptionName","description":"GiftList description","giftCardAccepted":"false","accessSpecifier":"Private"}
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerCreateBodyParameterDescription {
	/** Wish list items to add. */
	item?: ComIbmCommerceRestWishlistHandlerWishlistHandlerCreateBodyParameterDescriptionWishlistItemBodyDescription[];
	/** Wish list gift card accepted. */
	giftCardAccepted?: string;
	/** Wish list description name. */
	descriptionName?: string;
	/** Wish list access specifier. */
	accessSpecifier?: string;
	/** Wish list description. */
	description?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoType {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeUserData;
	organizationName?: string;
	fax1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1;
	language?: string;
	geographicalTaxCode?: string;
	mobilePhone1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1;
	geographicalShippingCode?: string;
	bestCallingTime?: string;
	contactInfoIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifier;
	fax2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax2;
	contactName?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactName;
	emailAddress2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2;
	address?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAddress;
	emailAddress1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1;
	attributes?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeAttributes[];
	telephone1?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1;
	organizationUnitName?: string;
	telephone2?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierOrganizationIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftItem {
	/** @format double */
	quantity?: string;
	uom?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType;
	productId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactName {
	middleName?: string;
	businessTitle?: string;
	personTitle?: string;
	firstName?: string;
	lastName?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypePersonIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypePersonIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddress {
	city?: string;
	addressLine?: string[];
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddressUserData;
	country?: string;
	primary?: boolean;
	stateOrProvinceName?: string;
	type?: string;
	postalCode?: string;
	internalOfficeAddress?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier {
	identifier?: string;
}

export interface OrderOrderDetailRewardOptionRewardChoiceUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionAdjustmentCalculationCodeID {
	calculationCodeExternalIdentifier?: OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifier;
	uniqueID?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1UserDataUserDataField[];
}

export interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultList {
	orderId?: string;
	status?: string;
	orderTime?: string | null;
	formattedDataBean?: ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultListFormattedDataBean;
	checkLock?: boolean;
	uniqueShippingAddresses?: ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultListUniqueShippingAddresses[];
	lockedLogonId?: string | null;
	memberId?: string;
	currency?: string;
	isLocked?: boolean;
	/** @format int32 */
	editorId?: number | null;
	blocked?: boolean;
}

export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponse {
	/** Wish list item to add or update. */
	item?: ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListResponseItem[];
	/** The store identifier. */
	storeId: string;
	/** Wish list unique identifier. */
	uniqueID: string;
	/** Wish list descriptionName */
	descriptionName?: string;
	/** Wish list resource name */
	resourceName: string;
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier {
	ownerID?: string;
	partNumber: string;
	storeIdentifier?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeFax1UserDataUserDataField {
	value?: string;
	key: string;
}

/**
 * Wish list item body.
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerCreateBodyParameterDescriptionWishlistItemBodyDescription {
	/** Wish list item quantity requested. */
	quantityRequested?: string;
	/** Wish list item product partNumber. */
	partNumber?: string;
	/** Wish list item location. */
	location: string;
	/** Wish list item product ID. */
	productId: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddressUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetails {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsUserData;
	itemShippedToRegistrant?: boolean;
	itemBought: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsItemBought;
	orderItemIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsOrderItemIdentifier;
	transactionID?: string;
	quantity: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetailsQuantity;
}

export interface OrderOrderDetailRewardOptionAdjustmentUserData {
	userDataField?: OrderOrderDetailRewardOptionAdjustmentUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddressUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddressUserDataUserDataField[];
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifier {
	organizationIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierOrganizationIdentifier;
	personIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifierPersonIdentifier;
	contactInfoNickName: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1UserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1UserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionAdjustmentCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddress {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressUserData;
	organizationName?: string;
	fax1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1;
	language?: string;
	geographicalTaxCode?: string;
	mobilePhone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressMobilePhone1;
	geographicalShippingCode?: string;
	bestCallingTime?: string;
	contactInfoIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifier;
	fax2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2;
	contactName?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactName;
	emailAddress2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2;
	address?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAddress;
	emailAddress1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1;
	attributes?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressAttributes[];
	telephone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1;
	organizationUnitName?: string;
	telephone2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone2;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface OrderOrderDetailOrderItemItemAttributes {
	attrName: string;
	attrValue?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress2UserData;
	value: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1 {
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeEmailAddress1UserData;
	value: string;
}

export interface OrderOrderDetailRewardOptionUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactName {
	middleName?: string;
	businessTitle?: string;
	personTitle?: string;
	firstName?: string;
	lastName?: string;
}

export interface OrderOrderDetailOrderExtendAttribute {
	attributeName: string;
	attributeType?: string;
	attributeValue: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifier;
}

export interface OrderOrderDetailRewardOptionDescription {
	value?: string;
	language?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordType {
	status?: string;
	lastUpdate?: string;
	purchaserAddress?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress;
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypeUserData;
	purchasedItemDetails?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchasedItemDetails;
	purchaseDate: string;
	giftListItemID?: string;
	purchaseRecordIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaseRecordIdentifier;
	messageForRegistrant?: string;
	dateCreated?: string;
	location: string;
	registrantMemo?: string;
	noteSent: boolean;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1UserDataUserDataField[];
}

export interface WishlistWishlistItemAnnouncement {
	userData?: WishlistWishlistItemAnnouncementUserData;
	emailRecipient: WishlistWishlistItemAnnouncementEmailRecipient[];
	senderEmailAddress: string;
	giftListAnnouncementID?: string;
	sentDate?: string;
	message: string;
	senderName: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressContactInfoIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactName {
	middleName?: string;
	businessTitle?: string;
	personTitle?: string;
	firstName?: string;
	lastName?: string;
}

export interface WishlistWishlistItemItemAttribute {
	name: string;
	value?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2UserData;
	value: string;
}

export interface WishlistWishlistItemUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddress {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressUserData;
	organizationName?: string;
	fax1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax1;
	language?: string;
	geographicalTaxCode?: string;
	mobilePhone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressMobilePhone1;
	geographicalShippingCode?: string;
	bestCallingTime?: string;
	contactInfoIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifier;
	fax2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressFax2;
	contactName?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactName;
	emailAddress2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress2;
	address?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddress;
	emailAddress1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressEmailAddress1;
	attributes?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAttributes[];
	telephone1?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone1;
	organizationUnitName?: string;
	telephone2?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressTelephone2;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1UserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressFax1UserDataUserDataField[];
}

/**
 * Add CSR comment response.
 */
export interface ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentResponseForm {
	/** The submit finish message. */
	SubmitFinishMessage: string;
	/** The order comment id. */
	orCommentId: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierPersonIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier;
}

export interface OrderOrderDetailRewardOptionRewardOptionIdentifier {
	uniqueID?: string;
	externalIdentifier?: string;
}

export interface OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionGiftSetGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone1UserDataUserDataField {
	value?: string;
	key: string;
}

export interface OrderOrderSummary {
	/** @format int32 */
	recordSetCount?: string;
	recordSetComplete?: string;
	resourceId?: string;
	resourceName?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	Order?: OrderOrderSummaryItem[];
	/** @format int32 */
	recordSetTotal?: string;
}

export interface OrderOrderDetails {
	Order: {
		orderTypeCode?: string;
		totalShippingCharge?: string;
		resourceId?: string;
		orgUniqueID?: string;
		orgDistinguishedName?: string;
		orderId?: string;
		lastUpdateDate?: string;
		channel?: ComIbmCommerceOrderFacadeDatatypesChannelType;
		orderStatus?: string;
		x_isPurchaseOrderNumberRequired?: string;
		totalShippingChargeCurrency?: string;
		buyerId?: string;
		grandTotalCurrency?: string;
		buyerDistinguishedName?: string;
		x_isPersonalAddressesAllowedForShipping?: string;
		storeNameIdentifier?: string;
		totalProductPriceCurrency?: string;
		totalProductPrice?: string;
		locked?: string;
		placedDate?: string;
		totalAdjustmentCurrency?: string;
		totalSalesTaxCurrency?: string;
		totalSalesTax?: string;
		grandTotal?: string;
		storeUniqueID?: string;
		shipAsComplete?: string;
		x_trackingIds?: string;
		totalShippingTax?: string;
		prepareIndicator?: string;
		totalShippingTaxCurrency?: string;
		adjustment?: OrderOrderDetailAdjustment[];
		totalAdjustment?: string;
	}[];
	recordSetCount: string;
	resourceId: string;
	recordSetStartNumber: string;
	resourceName: string;
	recordSetTotal: string;
	recordSetComplete: string;
}

export interface OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionRewardSpecificationGiftSetSpecificationGiftItemCatalogEntryIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummaryResultListUniqueShippingAddresses {
	addressType?: string;
	addressId?: string;
	personTitle?: string;
	primary?: string;
	email2?: string;
	phone1Type?: string;
	city?: string;
	countryDisplayName?: string;
	middleName?: string;
	state?: string;
	fax1?: string;
	email1?: string;
	nickName?: string;
	status?: string;
	phone1?: string;
	phone2Type?: string;
	publishPhone1?: string;
	publishPhone2?: string;
	phone2?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	zipCode?: string;
	mobilePhone1?: string;
	isSelfAddress?: boolean;
	firstName?: string;
	lastName?: string;
	country?: string;
	stateProvDisplayName?: string;
}

export interface OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifier {
	calculationUsageID?: string;
	code?: string;
	storeIdentifier?: OrderOrderDetailRewardOptionCalculationCodeIDCalculationCodeExternalIdentifierStoreIdentifier;
}

export interface OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifier {
	uniqueID?: string;
	externalIdentifier?: OrderOrderDetailRewardOptionRewardChoiceGiftSetGiftItemCatalogEntryIdentifierExternalIdentifier;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierPersonIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeContactInfoIdentifierExternalIdentifierPersonIdentifierExternalIdentifier;
}

export interface WishlistWishlistItemAnnouncementUserData {
	userDataField?: WishlistWishlistItemAnnouncementUserDataUserDataField[];
}

export interface OrderOrderDetailAdjustmentUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress2UserData;
	value: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressEmailAddress1UserData;
	value: string;
}

export interface ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummaryOrderCommentsServiceRepDetailsAddress {
	middleName?: string | null;
	lastName?: string;
	memberId?: string;
	firstName?: string | null;
}

export interface OrderOrderDetailRewardOptionGiftSetSpecificationMaximumQuantity {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressContactInfoIdentifierExternalIdentifierOrganizationIdentifier {
	distinguishedName?: string;
	uniqueID?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeTelephone2UserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddressUserData {
	userDataField?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordTypePurchaserAddressAddressUserDataUserDataField[];
}

export interface OrderOrderDetailRewardOptionAmount {
	currency?: string;
	/** @format double */
	value?: number;
}

export interface ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1 {
	country: string;
	value: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesContactInfoTypeMobilePhone1UserData;
}

export interface WishlistWishlistItemAnnouncementUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1 {
	userData?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantTypeRegistrantAddressTelephone1UserData;
	type?: string;
	value: string;
	publish?: boolean;
}

/**
 * The response container
 */
export interface OrderOrderHistoryResponse {
	response?: OrderOrderHistoryResponseMessage;
}

export interface OrderOrderHistoryResponseMessage {
	/** The response message */
	message?: string;
}

/**
 * A collection of tax.
 */
export interface DisplayTaxCollection {
	/**
	 * The total number of items.
	 * @format int64
	 */
	count?: number;
	/** The items. */
	items?: DisplayTax[];
}

/**
 * Tax.
 */
export interface DisplayTax {
	taxRate?: DisplayTaxRateAmount;
	taxAmount?: DisplayTaxRateAmount;
	/** The catalog entry ID */
	catalogEntryId?: string;
}

export type DisplayTaxRateAmount = Record<string, number>;

export interface PricePriceItemUserDataField {
	value?: string;
	key: string;
}

export interface DisplayPriceIBMStoreDisplayPriceItem {
	partNumber: string;
	priceRuleId?: string;
	priceRuleName?: string;
	catalogEntryId?: string;
	unitPrice?: DisplayPriceIBMStoreDisplayPriceItemUnitPrice[];
	userDataField?: DisplayPriceIBMStoreDisplayPriceItemUserDataField[];
}

export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequests {
	query?: {
		name?: string;
		products?: {
			quantities?: {
				uom?: string;
				quantity?: number;
			}[];
			partNumber?: string;
		}[];
	};
}

/**
 * Price request.
 */
export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequest {
	/** Query information. */
	query: ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuery;
}

export interface PricePrice {
	resourceId?: string;
	EntitledPrice?: PricePriceItem[];
	resourceName?: string;
}

export interface PricePrices {
	resourceId?: string;
	EntitledPrice?: PricePriceItems[];
	resourceName?: string;
}

export interface PricePriceItemUnitPrice {
	price?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	quantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
}

export interface PricePriceItem {
	partNumber: string;
	contractId?: string;
	UnitPrice?: PricePriceItemUnitPrice[];
	productId?: string;
}

export interface PricePriceItems {
	partNumber: string;
	contractId?: string;
	productId?: string;
	UnitPrice?: object;
}

export interface ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails {
	numberUsage?: string | null;
	currencyCode?: string;
	storeId?: string;
	langId?: string;
	currencySymbol?: string;
	decimalPlaces?: string;
}

export interface StoreCurrencyFormatDescriptionResponse {
	resultList: ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails[];
}

export interface PricePriceItemRangePrice {
	currency?: string;
	maximumQuantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
	minimumQuantity: ComIbmCommerceFoundationCommonDatatypesQuantityType;
	priceInRange: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
}

export interface DisplayPriceIBMStoreDisplayPrice {
	resourceId?: string;
	resourceName?: string;
	resultList?: DisplayPriceIBMStoreDisplayPriceItem[];
}

/**
 * Query information.
 */
export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuery {
	/** The dates on which to query prices on all the products unless overridden at the product level. */
	dates?: string[];
	/** The products to query. */
	products: ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct[];
	/** The price query name. Valid names are 'byProductID' which requires product IDs to be given for each product and 'byPartNumber' which requires part numbers to be given for each product. */
	name: 'byProductID' | 'byPartNumber';
	/** The contract identifiers to use for all the products unless overridden at the product level. An exception will be thrown if an invalid contract identifier is specified. If left empty, the store default contract will be used. */
	contractIds?: string[];
}

export interface DisplayPriceIBMStoreDisplayPriceItemUnitPrice {
	price?: ComIbmCommerceFoundationCommonDatatypesMonetaryAmountType;
	quantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
}

export interface DisplayPriceIBMStoreDisplayPriceItemUserDataField {
	value?: string;
	key: string;
}

/**
 * Product information.
 */
export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestProduct {
	/** The dates on which to query the product prices. */
	dates?: string[];
	/** The currencies to use on specific products. If not currency is specified, the store default shall be used. */
	currencies?: string[];
	/** The contract identifiers to use on specific products. An exception will be thrown if an invalid contract identifier is specified. If left empty, the store default contract will be used. */
	contractIds?: string[];
	/** The quantities for which to query the price. If no quantities are specified, a default quantity of 1.0 and unit of measure of 'C62' will be used. */
	quantities?: ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuantity[];
	/** The product part number to query. Required if the query is set to : byPartNumber. */
	partNumber?: string;
	/** The product identifier to query. Required if the query is set to : byProductID. */
	productId?: string;
}

/**
 * Quantity information.
 */
export interface ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequestQuantity {
	/** The unit of measure applicable to the quantity. */
	uom: string;
	/**
	 * The quantity to query.
	 * @format double
	 */
	quantity: number;
}

export interface ComIbmCommerceCatalogCommandsSearchDisplayCmd {
	viewTaskName: string;
	storeId: string;
}

export interface ConfigurationConfiguration {
	resourceId?: string;
	resourceName?: string;
	resultList?: ConfigurationConfigurationItem[];
}

export interface StoreOnlineStoreSupportedLanguagesType {
	defaultLanguageId?: string;
	supportedLanguages?: string[];
}

export interface ConfigurationConfigurationAttributeType {
	additionalValue?: ConfigurationConfigurationValueType[];
	primaryValue: ConfigurationConfigurationValueType;
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifier;
}

export interface StoreStore {
	resourceId?: string;
	/** @format int32 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resultList?: StoreStoreItem[];
	/** @format int32 */
	recordSetTotal?: number;
}

/**
 * Store information.
 */
export interface ComIbmCommerceRestStoreHandlerStoreHandlerStoreInformation {
	resourceName?: string;
	/** Store geonode api url. */
	geonodeUrl: string;
	/** Store person api url. */
	personUrl: string;
	/** Store name. */
	storeName: string;
	/** Store locator api url. */
	storeLocatorUrl: string;
	/** Store order api url. */
	orderUrl: string;
	/** Store e-spots api url. */
	espotUrl: string;
	/** Store top categories api url. */
	topcategoriesUrl: string;
	/** Store inventory api url. */
	inventoryavailabilityUrl: string;
	/** Store product api url. */
	productUrl: string;
	/** Store wish list api url. */
	wishlistUrl: string;
	/** Store identifier. */
	storeId: string;
	/** Store directory name. */
	directory: string;
	/** Store guest identity api url. */
	guestidentityUrl: string;
	/** Store login api url. */
	loginidentityUrl: string;
	/** Store shopping cart api url. */
	shoppingcartUrl: string;
}

export type StoreOnlineStoreUserDataType = Record<string, string>;

export interface StoreOnlineStoreRelatedStoresType {
	relationshipSequence?: string;
	relationshipType?: string;
	relatedStoreId?: string;
	state?: string;
}

export interface StoreOnlineStoreSupportedCurrenciesType {
	supportedCurrencies?: string[];
	defaultCurrency?: string;
}

export interface StoreOnlineStoreDescriptionType {
	displayName?: string;
	description?: string;
	languageId?: string;
}

export type ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifierExternalIdentifier =
	{
		ownerID?: string;
		nameIdentifier?: string;
	} | null;

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserData {
	userDataField?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserDataUserDataField[];
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType {
	storeIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifier | null;
	catalogIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifier | null;
	uniqueID?: string | null;
	userData?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserData | null;
}

export interface StoreOnlineStoreContactInfoType {
	telephone2?: string;
	languageId?: string;
	telephone1: string;
	contactPersonBusinessTitle?: string;
	emailAddress1: string;
	fax2?: string;
	fax1: string;
	emailAddress2?: string;
	contactInfoIdentifier?: StoreContactInfoIdentifierType;
	address?: StoreAddressType;
}

export type ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifier =
	{
		ownerID?: string;
		identifier: string;
		storeIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifierStoreIdentifier;
	} | null;

export interface StoreOnlineStoreUserDataTypeUserDataField {
	value?: string;
	key: string;
}

export interface StoreAddressType {
	city?: string;
	zipOrPostalCode?: string;
	addressLine?: (string | null)[];
	stateOrProvinceName?: string;
	country?: string;
}

export interface StoreContactInfoIdentifierType {
	contactInfoId?: string;
	contactPersonId?: string;
	contactPersonNickName: string;
}

export interface ComIbmCommerceInfrastructureBeansIntegrationConfigurationDataBean {
	security?: {
		aesFilesEnabled?: boolean;
		aesDbEnabled?: boolean;
		hashAlgorithmPriorities?: string | null;
		multiHashEnabled?: boolean;
		ciHostname?: string;
	};
	session?: {
		referrerCookieAge?: number;
		allowMultiLogon?: boolean;
		cookie?: {
			path?: string;
			domain?: string;
		};
		loginTimeout?: {
			enable?: boolean;
			buffer?: number;
			timeout?: number;
		};
		persistentSession?: {
			delayNewGuestPersistentSessionEnabled?: boolean;
			personalizationIdLogoffRefreshEnabled?: boolean;
			cookieExpiryOffset?: number;
			enable?: boolean;
			cookieExpiryTime?: number;
			personalizationIdEnabled?: boolean;
			guestUserMigrationEnabled?: boolean;
		};
		keepSessionAliveEnabled?: boolean;
	};
}

export interface StoreStoreItem {
	userData?: StoreOnlineStoreUserDataType;
	contactInfo?: StoreOnlineStoreContactInfoType[];
	description?: StoreOnlineStoreDescriptionType[];
	relatedStores?: StoreOnlineStoreRelatedStoresType[];
	storeId?: string;
	locationInfo?: StoreOnlineStoreContactInfoType[];
	defaultCatalog?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogType[];
	state?: string;
	supportedCurrencies?: StoreOnlineStoreSupportedCurrenciesType;
	ownerId?: string;
	storeType?: string;
	identifier?: string;
	supportedLanguages?: StoreOnlineStoreSupportedLanguagesType;
}

export interface ConfigurationConfigurationValueType {
	name: string;
	value: string | null;
}

export interface ConfigurationConfigurationItemUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifierStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier;
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifier {
	uniqueID?: string;
	externalIdentifier?: ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeStoreIdentifierExternalIdentifier;
}

export interface ConfigurationConfigurationItem {
	configurationId: string;
	configurationAttribute?: ConfigurationConfigurationAttributeType[];
	description?: ComIbmCommerceFoundationCommonDatatypesDescriptionType;
	userDataField?: ConfigurationConfigurationItemUserDataField[];
}

export interface ComIbmCommerceInfrastructureFacadeDatatypesDefaultCatalogTypeCatalogIdentifierExternalIdentifierStoreIdentifierExternalIdentifier {
	ownerID?: string;
	nameIdentifier?: string;
}

export interface StoreStoreList {
	resultList?: StoreStoreListListItem[];
}

export interface StoreStoreListListItem {
	storeDescription?: StoreStoreListListItemStoreDescription;
	identifier?: string;
	storeType?: string;
	storeId?: string;
}

export interface StoreStoreListListItemStoreDescription {
	displayName?: string;
	description?: string;
}

export interface StoreFeaturesList {
	resultList?: string[];
}

export interface FlowFlow {
	identifier?: string;
}

export interface SubstitutionparametersSubstitutionparameters {
	resourceId?: string;
	resourceName?: string;
	resultList?: {
		implementationClass?: string;
		description?: string;
		parameterName?: string;
		storeId?: number;
	}[];
}

export interface TokenusageTokenusage {
	resourceId?: string;
	resourceName?: string;
	resultList?: {
		storeentId?: number;
		isStatic?: number;
		typeId?: number;
		type?: string;
		primaryToken?: string;
	}[];
}

export interface TokenToken {
	resourceId?: string;
	resourceName?: string;
	resultList?: {
		tokenName?: string;
		urlKeywordName?: string;
		tokenValue?: string;
		urlKeywordId?: number;
		status?: number;
	}[];
}

export interface UrlkeywordUrlkeyword {
	resourceId?: string;
	resourceName?: string;
	resultList?: {
		tokenName?: string;
		urlKeywords?: {
			storeentId?: number;
			keywordId?: number;
			mobileUrlKeyword?: string;
			languageId?: number;
			urlKeyword?: string;
			status?: number;
		}[];
		tokenValue?: string;
	}[];
}

export interface RedirectruleRedirectrule {
	resourceId?: string;
	resourceName?: string;
	resultList?: object[];
}

export interface StoreStoreIdentifierResponse {
	resultList: StoreStoreIdentifierItem[];
}

export interface StoreStoreIdentifierItem {
	inventorySystem?: number;
	defaultCurrency?: string;
	storeName?: string;
	defaultLanguageId?: string;
	storeId?: string;
	defaultCatalogId?: string;
}

export interface StoreDatabeanResponse {
	relatedStores: StoreOnlineStoreRelatedStoresType[] | null;
	storeLevel: string | null;
	storeType: string;
	jspStoreDirFilePath: string;
	filePath: string;
	jspStoreDir: string;
	persistentSession: number;
	directory: string;
	jspPath: string;
	masterCatalog: {
		catalogId: string;
	};
	storeEntityDescription: {
		displayName: string;
		contactAddressId: string;
	};
	supportedLanguages: StoreDatabeanSupportedLanguages[];
	status: number;
}

export interface StoreDatabeanSupportedLanguages {
	languageId: string;
	localeName: string;
	nativeDescriptionString: string;
	descriptionString: string;
}

export interface ComIbmCommerceInfrastructureBeansIntegrationConfigurationSessionKey {
	security?: {
		encryptedSessionKey?: string;
	};
}

export interface ComIbmCommerceOrderCalculationCalculationRuleCombineCmd {
	resultList?: {
		taskName?: string;
	}[];
}

export interface StorelocatorStorelocatorItemAttribute {
	displayValue?: string;
	displayName?: string;
	name?: string;
	value?: string;
}

export interface StorelocatorStorelocatorItemUserDataField {
	value?: string;
	key: string;
}

export interface StorelocatorStorelocator {
	resourceId?: string;
	/** @format int32 */
	recordSetCount?: string;
	recordSetComplete?: string;
	/** @format int32 */
	recordSetTotal?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	resourceName?: string;
	PhysicalStore?: StorelocatorStorelocatorItem[];
}

export interface ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary {
	countryCodeStates?:
		| ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountryCodeStates[]
		| null;
	countries?: ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountries[];
}

export interface ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountries {
	code: string;
	displayName?: string;
	callingCode?: string;
	states?: ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountryCodeStates[];
}

export interface ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummaryCountryCodeStates {
	code: string;
	displayName?: string;
}

export interface GeonodeGeonodeItemUserDataField {
	value?: string;
	key: string;
}

export interface GeonodeGeonodes {
	resourceId?: string;
	Description?: {
		shortDescription?: string;
	}[];
	type?: string;
	name?: string;
	recordSetComplete?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	/** @format int32 */
	recordSetCount?: string;
	/** @format int32 */
	recordSetTotal?: string;
	resourceName?: string;
	uniqueID?: string;
}

export interface GeonodeGeonode {
	resourceId?: string;
	GeoNode?: GeonodeGeonodeItem[];
	recordSetComplete?: string;
	/** @format int32 */
	recordSetStartNumber?: string;
	/** @format int32 */
	recordSetCount?: string;
	/** @format int32 */
	recordSetTotal?: string;
	resourceName?: string;
}

export interface ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName {
	stateDisplayName?: string | null;
	countryDisplayName?: string | null;
}

export interface GeonodeGeonodeItem {
	type?: string;
	Description?: GeonodeGeonodeItemDescription[];
	uniqueID?: string;
	name?: string;
}

export interface GeonodeGeonodeItemDescription {
	shortDescription?: string;
}

export interface StorelocatorStorelocatorItem {
	/** @format double */
	distance?: string;
	Description?: StorelocatorStorelocatorItemDescription[];
	storeName?: string;
	Attribute?: StorelocatorStorelocatorItemAttribute[];
	/** @format double */
	longitude?: string;
	postalCode?: string;
	stateOrProvinceName?: string;
	uniqueID?: string;
	telephone1: string;
	/** @format double */
	latitude?: string;
	country?: string;
	city?: string;
	addressLine?: string[];
}

export interface StorelocatorStorelocatorItemDescription {
	displayStoreName?: string;
}

export interface ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse {
	orderId: string[];
	resourceName: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoDuration {
	/** @format double */
	value?: number;
	uom?: string;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfo = {
	duration?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoDuration;
	/** @format int64 */
	totalOccurrences?: number;
	endDate?: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoUserData;
} | null;

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface SubscriptionIBMStoreDetailsItem {
	subscriptionIdentifier?: SubscriptionSubscriptionIdentifier;
	state?: string;
	subscriptionInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoType;
	purchaseDetails?: SubscriptionPurchaseDetails;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentSchedule {
	endInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfo;
	startInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfo;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleUserData;
	frequencyInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfo;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfoUserData =
	{
		userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfoUserDataUserDataField[];
	} | null;

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoTotalCost {
	currency?: string;
	/** @format double */
	value?: number;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoDuration =
	{
		/** @format double */
		value?: number;
		uom?: string;
	} | null;

export interface SubscriptionIBMStoreSummaryItem {
	subscriptionIdentifier?: SubscriptionSubscriptionIdentifier;
	state?: string;
	subscriptionInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoType;
	purchaseDetails?: SubscriptionPurchaseDetails;
}

export interface SubscriptionSubscriptionIdentifier {
	subscriptionId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoFrequency {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoUserDataUserDataField[];
}

export interface SubscriptionIBMStoreDetails {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resourceId?: string;
	resourceName?: string;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: SubscriptionIBMStoreDetailsItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export interface SubscriptionParentOrderIdentifier {
	customerOrderNumber?: string;
	parentOrderId?: string;
	externalOrderId?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfoUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfoUserDataUserDataField[];
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfo {
	duration?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoDuration;
	/** @format int64 */
	totalOccurrences?: number | null;
	endDate?: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoUserData;
}

export interface SubscriptionParentOrderItemIdentifier {
	parentOrderItemId?: string;
}

export interface SubscriptionIBMStoreSummary {
	/** @format int64 */
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resourceId?: string;
	resourceName?: string;
	/** @format int64 */
	recordSetStartNumber?: number;
	resultList?: SubscriptionIBMStoreSummaryItem[];
	/** @format int64 */
	recordSetTotal?: number;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleUserData =
	{
		userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleUserDataUserDataField[];
	} | null;

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription {
	startDate?: string;
	endDate?: string;
	fulfillmentInterval?: string;
	fulfillmentIntervalUOM?: string;
	storeId?: string;
	catalogId?: string;
	orderId?: string;
	purchaseorder_id?: string;
	requesttype?: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleUserDataUserDataField {
	value?: string;
	key: string;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoUserData =
	{
		userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoUserDataUserDataField[];
	} | null;

export interface SubscriptionPurchaseDetails {
	userData?: ComIbmCommerceFoundationCommonDatatypesUserDataType;
	subscribedItem?: SubscriptionSubscribedItem;
	parentOrderIdentifier?: SubscriptionParentOrderIdentifier;
	parentOrderItemIdentifier?: SubscriptionParentOrderItemIdentifier;
	quantity?: ComIbmCommerceFoundationCommonDatatypesQuantityType;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleUserDataUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoAmountPaid = {
	currency?: string;
	/** @format double */
	value?: number;
} | null;

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfo =
	{
		nextOccurence?: string;
		/** @format int64 */
		completedOccurrences?: number | null;
		frequency?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoFrequency;
		/** @format int64 */
		remainingOccurrences?: number | null;
		userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoUserData;
	};

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfo {
	totalCost?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoTotalCost;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoUserData | null;
	amountPaid?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoAmountPaid | null;
	amountToCharge?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoAmountToCharge | null;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoFrequency {
	/** @format double */
	value?: number;
	uom?: string;
}

export interface ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription {
	subscriptionType: string[];
	state: string[];
	subscriptionId: string[];
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfoAmountToCharge = {
	currency?: string;
	/** @format double */
	value?: number;
} | null;

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfo = {
	startDate?: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleStartInfoUserData;
} | null;

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfo {
	nextOccurence?: string;
	/** @format int64 */
	completedOccurrences?: number | null;
	frequency?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoFrequency;
	/** @format int64 */
	remainingOccurrences?: number | null;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfoUserData;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfo {
	startDate?: string;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfoUserData;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoUserData {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleEndInfoUserDataUserDataField[];
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeUserData = {
	userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeUserDataUserDataField[];
} | null;

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentSchedule {
	endInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfo;
	startInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleStartInfo;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleUserData;
	frequencyInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleFrequencyInfo;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoType {
	paymentInfo?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentInfo;
	paymentSchedule?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentSchedule;
	fulfillmentSchedule?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentSchedule;
	userData?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeUserData | null;
}

export interface ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoUserDataUserDataField {
	value?: string;
	key: string;
}

export interface SubscriptionSubscribedItem {
	subscribedItemId?: string;
	externalIdentifier?: ComIbmCommerceFoundationCommonDatatypesPartNumberIdentifierType;
}

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoUserData =
	{
		userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypeFulfillmentScheduleEndInfoUserDataUserDataField[];
	} | null;

export type ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoUserData =
	{
		userDataField?: ComIbmCommerceFoundationCommonDatatypesSubscriptionInfoTypePaymentScheduleFrequencyInfoUserDataUserDataField[];
	} | null;

export interface ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetailsParentRolesWithDetails {
	roleId?: string;
	displayName?: string;
	description?: string;
	name?: string;
}

export interface OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier {
	country?: string;
	lastName?: string;
	zipCode?: string;
	address3?: string;
	mobilePhone1?: string;
	organizationName?: string;
	address2?: string;
	city?: string;
	address1?: string;
	addressType?: string;
	nickName?: string;
	phone2?: string;
	addressId?: string;
	phone1?: string;
	email2?: string;
	firstName?: string;
	email1?: string;
	middleName?: string;
	state?: string;
	stateProvDisplayName?: string;
	countryDisplayName?: string;
}

export interface OraganizationAdministratorAddressBook {
	country?: string;
	lastName?: string;
	zipCode?: string;
	address3?: string;
	mobilePhone1?: string;
	organizationName?: string;
	address2?: string;
	city?: string;
	address1?: string;
	addressType?: string;
	nickName?: string;
	phone2?: string;
	addressId?: string;
	phone1?: string;
	email2?: string;
	firstName?: string;
	email1?: string;
	middleName?: string;
	state?: string;
	stateProvDisplayName?: string;
	countryDisplayName?: string;
}

/**
 * Request of OrgEntityUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest {
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** Customizable field. */
	addressField2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** Type of address, valid values are configurable by using a properties file: S (shipto), B (billto), and SB (both shipto and billto). A single address may be of different types. If a properties file cannot be found, a default of SB is used. */
	addressType?: string;
	/** The first name of the administrator. */
	administratorFirstName?: string;
	/** The last name of the administrator. */
	administratorLastName?: string;
	/** The middle name of the administrator. */
	administratorMiddleName?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either 'r' (for replace) or 'd' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. 'JobFunction_10001_r_1' : 'ProductManager' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores.  */
	attributeName_storeId_action_sequence?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** Describes the kind of business performed by an organization or organizational unit. */
	businessCategory?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** A description of the registrant. */
	description?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** Registered organization identifier; may be null for an organizational unit. */
	legalId?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** Customizable field. */
	orgEntityField1?: string;
	/** Customizable field. */
	orgEntityField2?: string;
	/** Customizable field. */
	orgEntityField3?: string;
	/** The ID for this organization or organizational unit. */
	orgEntityId: string;
	/** The name of the organization or organizational unit. */
	orgEntityName?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
}

export type ComIbmCommerceMemberFacadeServerCommandsUserRegistrationEmailActivateResendCmd = object;

/**
 * Response of registering an organization entity and a buyer.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier {
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The buyer identifier. */
	userId: string;
	viewTaskName?: string;
}

/**
 * Description of approval status record update response.
 */
export interface ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusResponse {
	redirecturl?: string;
	resultmsg?: string;
	/** Update approval status message. Possible values include 'approvalsFailed' for a failed approval and 'approvalsOK' for a successful approval. */
	viewTaskName?: string;
}

export interface PersonPersonReceiveEmailPreference {
	storeID?: string;
	value: string;
}

export interface PersonPersonReceiveSMSPreference {
	storeID?: string;
	value: string;
}

export interface PersonPersonUserDataField {
	key: string;
	value?: string;
}

export interface PersonPersonContextAttributeAttributeValue {
	storeId?: string;
	value: string[];
}

/**
 * Request of ResetPasswordAdministratorCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerResetPasswordAdministratorRequest {
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** The administrator password. */
	administratorPassword?: string;
	/** The logonId of shopper to reset the password for. */
	logonId: string;
}

export interface ComIbmCommerceEmarketingBeansEmailUserReceiveDataBeanIBMOptOutAll {
	userReceiveSMS?: boolean;
	userReceive?: boolean;
}

/**
 * User identifier.
 */
export interface PersonAdministratorToPerfromActionOnUser {
	/** The user identifier. */
	userId: string;
	viewTaskName?: string;
	addressId?: string;
}

export interface PersonAdministratorToPerfromActionOnUserDelete {
	response?: {
		message?: string;
		status?: string;
	};
}

/**
 * Request of UserRegistrationAdminUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest {
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** Customizable field. */
	addressField2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** The purpose of the address. Valid values are: S - shipto, B - billto, SB - shipto and billto (The default value.). */
	addressType?: string;
	/** The registrant's age. */
	age?: string;
	/** A special ID assigned by the registrant's business organization or organizational unit to this particular registrant.. */
	alternateId?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either 'r' (for replace) or 'd' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. 'JobFunction_10001_r_1' : 'ProductManager' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores.  */
	attributeName_storeId_action_sequence?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** Answer to the challenge question. */
	challengeAnswer?: string;
	/** Challenge question for verbal confirmation of the customer's identity. */
	challengeQuestion?: string;
	/** The number of children the registrant has. */
	children?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The company name of the organization that the registrant represents, obtained when filling in demographic information. */
	companyName?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** Date of birth. The format is yyyy-mm-dd, for example: 1980-01-01. */
	dateOfBirth?: string;
	/** The department identifier for the registrant. */
	departmentNumber?: string;
	/** A description of the registrant. */
	description?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's ID with his or her employer. */
	employeeId?: string;
	/** The registrant's status as an employee (for example, regular, permanent, contractor, or part time). */
	employeeType?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** The registrant's gender. */
	gender?: string;
	/** The registrant's hobbies. */
	hobbies?: string;
	/** The number of people in the registrant's household; the default is 1. */
	household?: string;
	/** The registrant's annual income. */
	income?: string;
	/** The currency in which the registrant's income is paid. */
	incomeCurrency?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** The registrant's logon ID. If you are using LDAP, changing a user's logonID is not supported because it would require deleting and recreating the user in LDAP. This process would cause all non-WebSphere Commerce user attributes, such as the password, to be lost. If you are not using LDAP, changing the user's logon ID is not recommended, because the promotion subsystem stores the logon ID of the creator of the promotion in the XMLPARAM column of the PX_PROMOTION table. Note: When the UserRegistrationUpdate command is used to change the logonID, the command will automatically update the USERS.DN database column. Do not assume that ADDRESS.NICKNAME will also change. Instead, the following finder should be used to get the single self address of a user: AddressAccessBean.findSelfAddressByMember(Long memberID). */
	logonId?: string;
	/** The registrant's password. In database mode, the password is encrypted before it is saved in the database. In LDAP mode, the password is only stored on the LDAP server. */
	logonPassword?: string;
	/** Required if the logonPassword is used: The registrant's password, entered a second time. */
	logonPasswordVerify?: string;
	/** The name of the registrant's manager. */
	manager?: string;
	/** The registrant's marital status. */
	maritalStatus?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The registrant's mobile phone number used for SMS, for example, 4161235555. */
	mobilePhone1?: string;
	/** The country code used for the registrant's mobile phone number, for example, CA for Canada. */
	mobilePhone1Country?: string;
	/** The internal address (for example, mail stop). */
	officeAddress?: string;
	/** Whether the registrant has previously placed an order. This value is supplied by the registrant. */
	orderBefore?: string;
	/** The identifier of the registrant's company. */
	organizationId?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** The identifier of the registrant's organizational unit. */
	organizationUnitId?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** URL or path to a photo of the registrant. */
	photo?: string;
	/** The account policy for this user. */
	policyAccountId?: string;
	/** The preferred phone for the registrant (stored in the ADDRESS table), for example: P1=phone 1 P2=phone 2. */
	preferredCommunication?: string[];
	/** The registrant's preferred currency for transactions. */
	preferredCurrency?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** The registrant's preferred language. */
	preferredLanguage?: string;
	/** The registrant's preferred unit of measure. */
	preferredMeasure?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** Determines whether the registrant wants to receive marketing e-mail activities for the current store (or all stores if no stores have been visited during the session): true - The user wants to receive marketing e-mail activities; false - The user does not want to receive e-mail activities (the default). */
	receiveEmail?: string;
	/** Specifies whether the registrant wants to receive marketing SMS messages for the current store (or all stores if no stores have been visited during the session). Valid values are true or false (default). */
	receiveSMS?: string;
	/** Indicates whether the user wants to receive order notification SMS text messages. Valid values are true or false (default). */
	receiveSMSNotification?: string;
	/** The name of the registrant's secretary or administrative assistant. */
	secretary?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** The time zone in which the registrant does business (report as GMT +/- hours). */
	timeZone?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** Customizable field. */
	userField1?: string;
	/** Customizable field. */
	userField2?: string;
	/** Customizable field. */
	userField3?: string;
	/** The user the administrator will update. */
	userId?: string;
	/** Customizable field. */
	userProfileField1?: string;
	/** Customizable field. */
	userProfileField2?: string;
	/** The user account status. A status of 1 indicates the account is enabled, and a status of 0 indicates the account is disabled. */
	userStatus?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField1?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField2?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField3?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField4?: string;
	/** Customizable field for demographic information; a field of 254 characters. */
	x_demographicField5?: string;
	/** Customizable field for demographic information; an integer field. */
	x_demographicField6?: string;
	/** Customizable field for demographic information; a field var char, length 6. */
	x_demographicField7?: string;
	/** A string used to identify the user for taxation purposes. */
	x_taxPayerId?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
}

export interface PersonCheckoutProfile {
	resourceId?: string;
	CheckoutProfile?: {
		shipping_email1?: string;
		shipping_addressLine?: string[];
		shipping_addressId?: string;
		shipping_state?: string;
		shipping_modeId?: string;
		billing_lastName?: string;
		shipping_city?: string;
		shipping_addressType?: string;
		shipping_lastName?: string;
		shipping_zipCode?: string;
		billing_addressType?: string;
		billing_addressLine?: string[];
		billing_state?: string;
		shipping_nickName?: string;
		xchkout_ProfileName?: string;
		billing_primary?: string;
		billing_addressId?: string;
		shipping_firstName?: string;
		billing_country?: string;
		billing_firstName?: string;
		shipping_primary?: string;
		billing_email1?: string;
		billing_city?: string;
		protocolData?: {
			name?: string;
			value?: string;
		}[];
		billing_zipCode?: string;
		billing_nickName?: string;
		shipping_country?: string;
	}[];
	resourceName?: string;
	userId?: string;
}

export interface PersonCheckoutProfileUpdate {
	profileName?: string;
	shipping_email1?: string;
	shipping_addressLine?: string[];
	shipping_addressId?: string;
	shipping_state?: string;
	shipping_modeId?: string;
	billing_lastName?: string;
	shipping_city?: string;
	shipping_addressType?: string;
	shipping_lastName?: string;
	shipping_zipCode?: string;
	billing_addressType?: string;
	billing_addressLine?: string[];
	billing_state?: string;
	shipping_nickName?: string;
	billing_primary?: string;
	billing_addressId?: string;
	shipping_firstName?: string;
	billing_country?: string;
	billing_firstName?: string;
	shipping_primary?: string;
	billing_email1?: string;
	billing_city?: string;
	protocolData?: {
		name?: string;
		value?: string;
	}[];
	billing_zipCode?: string;
	billing_nickName?: string;
	shipping_country?: string;
	userId?: string;
}

export interface PersonCheckoutProfileUpdateById {
	profileName?: string;
	shipping_nickName?: string;
	shipping_firstName?: string;
	shipping_lastName?: string;
	shipping_email1?: string;
	shipping_phone1?: string;
	shipping_addressLine?: string[];
	shipping_city?: string;
	shipping_state?: string;
	shipping_zipCode?: string;
	shipping_country?: string;
	shipping_modeId?: string;
	shipping_addressType?: string;
	billing_nickName?: string;
	billing_firstName?: string;
	billing_lastName?: string;
	billing_email1?: string;
	billing_phone1?: string;
	billing_addressLine?: string[];
	billing_city?: string;
	billing_state?: string;
	billing_zipCode?: string;
	billing_country?: string;
	billing_addressType?: string;
	pay_payment_method?: string;
	pay_cc_brand?: string;
	pay_account?: string;
	pay_expire_month?: string;
	pay_expire_year?: string;
	userId?: string;
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups {
	/** The URL to call when the command completes successfully. */
	URL: string;
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The ApprovalGroup identifier for a specific organization. */
	segmentId: string;
}

export interface PersonAdministratorsToFindUserInformationByUserIdentifier {
	manager?: string;
	mobilePhone1?: string;
	mobilePhone1Country?: string;
	parentMemberId?: string;
	phone2?: string;
	dn?: string;
	employeeId?: string;
	logonPassword?: string;
	parentOrgName?: string;
	userId: string;
	phone1?: string;
	email2?: string;
	email1?: string;
	employeeType?: string;
	secretary?: string;
	logonId: string;
	departmentNumber?: string;
	registrationUpdate?: string;
	fax2?: string;
	registration?: string;
	fax1?: string;
	lastSession?: string;
	logonPasswordVerify?: string;
}

export interface PersonPerformActionByAdministrator {
	viewTaskName: string;
}

/**
 * User identifier.
 */
export interface ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier {
	resourceName?: string;
	addressId?: string;
	/** The user identifier. */
	userId?: string;
}

export interface ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails {
	parentRolesWithDetails?: ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetailsParentRolesWithDetails[];
	displayName?: string;
	memberId?: string;
	organizationId: string;
	contactInfo?: OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier[];
	organizationDisplayName?: string;
	organizationName: string;
	businessCategory?: string | null;
	description?: string | null;
	state?: string;
	addressBook?: OraganizationAdministratorAddressBook[];
	status?: number;
}

/**
 * Body of MemberGroupMemberUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser {
	/** MemberGroup Identifiers to explicitly add the user too . */
	addAsExplicitInclusionToMemberGroupId?: string;
	/** MemberGroup Identifiers to explicitly exclude the user from. */
	addAsExplicitExclusionToMemberGroupId?: string;
	/** MemberGroup Identifiers to remove the user from. */
	removeFromMemberGroupId?: string;
}

export type ComIbmCommerceSecurityCommandsResetPasswordAdministratorCmd = object;

export interface ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList {
	ownerId?: string;
	description?: string | null;
	name?: string;
	properties?: string;
	memberGroupTypeId?: string;
	/** @format int64 */
	memberGroupId?: number;
}

/**
 * response of MemberGroupMemberUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUserResponse {
	/** The current store identifier. */
	storeId?: string;
	/** MemberGroup Identifiers to explicitly exclude the user from. */
	addAsExplicitExclusionToMemberGroupId?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** MemberGroup Identifiers to explicitly add the user to. */
	addAsExplicitInclusionToMemberGroupId?: string;
	/** The user identifier. */
	userId?: string;
	/** The catalog identifier. */
	catalogId?: string;
	/** The request type for example, ajax. */
	requesttype?: string;
	/** MemberGroup Identifiers to remove the user from. */
	removeFromMemberGroupId?: string;
}

export interface PersonPersonAttributes {
	bProfileAttrKey?: string;
	bProfileAttrValue?: string;
	contactInfoAttrKey?: string;
	contactInfoAttrValue?: string;
	pProfileAttrKey?: string;
	pProfileAttrValue?: string;
}

export interface PersonPersonContextAttribute {
	attributeName: string;
	attributeValue: PersonPersonContextAttributeAttributeValue[];
}

export interface ComIbmCommerceMemberFacadeDatatypesIncomeAmountType {
	currency?: string;
	/** @format int32 */
	value?: number;
}

/**
 * Request of UserRegistrationAdminAdd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest {
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** Customizable field. */
	addressField2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** The purpose of the address. Valid values are: S - shipto, B - billto, SB - shipto and billto (The default value.). */
	addressType?: string;
	/** The registrant's age. */
	age?: string;
	/** A special ID assigned by the registrant's business organization or organizational unit to this particular registrant.. */
	alternateId?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either 'r' (for replace) or 'd' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. 'JobFunction_10001_r_1' : 'ProductManager' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores.  */
	attributeName_storeId_action_sequence?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** Answer to the challenge question. */
	challengeAnswer?: string;
	/** Challenge question for verbal confirmation of the customer's identity. */
	challengeQuestion?: string;
	/** The number of children the registrant has. */
	children?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The company name of the organization that the registrant represents, obtained when filling in demographic information. */
	companyName?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** Date of birth. The format is yyyy-mm-dd, for example: 1980-01-01. */
	dateOfBirth?: string;
	/** The department identifier for the registrant. */
	departmentNumber?: string;
	/** A description of the registrant. */
	description?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's ID with his or her employer. */
	employeeId?: string;
	/** The registrant's status as an employee (for example, regular, permanent, contractor, or part time). */
	employeeType?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** The registrant's gender. */
	gender?: string;
	/** The registrant's hobbies. */
	hobbies?: string;
	/** The number of people in the registrant's household; the default is 1. */
	household?: string;
	/** The registrant's annual income. */
	income?: string;
	/** The currency in which the registrant's income is paid. */
	incomeCurrency?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** The registrant's logon ID. If you are using LDAP, changing a user's logonID is not supported because it would require deleting and recreating the user in LDAP. This process would cause all non-WebSphere Commerce user attributes, such as the password, to be lost. If you are not using LDAP, changing the user's logon ID is not recommended, because the promotion subsystem stores the logon ID of the creator of the promotion in the XMLPARAM column of the PX_PROMOTION table. Note: When the UserRegistrationUpdate command is used to change the logonID, the command will automatically update the USERS.DN database column. Do not assume that ADDRESS.NICKNAME will also change. Instead, the following finder should be used to get the single self address of a user: AddressAccessBean.findSelfAddressByMember(Long memberID). */
	logonId: string;
	/** The registrant's password. In database mode, the password is encrypted before it is saved in the database. In LDAP mode, the password is only stored on the LDAP server. */
	logonPassword: string;
	/** Required if the logonPassword is used: The registrant's password, entered a second time. */
	logonPasswordVerify?: string;
	/** The name of the registrant's manager. */
	manager?: string;
	/** The registrant's marital status. */
	maritalStatus?: string;
	/** The marketing tracking consent. 0 means opt-out, 1 means opt-in. */
	marketingTrackingConsent?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The registrant's mobile phone number used for SMS, for example, 4161235555. */
	mobilePhone1?: string;
	/** The country code used for the registrant's mobile phone number, for example, CA for Canada. */
	mobilePhone1Country?: string;
	/** The internal address (for example, mail stop). */
	officeAddress?: string;
	/** Whether the registrant has previously placed an order. This value is supplied by the registrant. */
	orderBefore?: string;
	/** The fully qualified DN of the organization to register under. Required for B2B user registration.  */
	organizationDistinguishedName?: string;
	/** The identifier of the registrant's company. */
	organizationId?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** The identifier of the registrant's organizational unit. */
	organizationUnitId?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** The parent member identifier of the user. */
	parentMemberId?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** URL or path to a photo of the registrant. */
	photo?: string;
	/** The account policy for this user. */
	policyAccountId?: string;
	/** The preferred phone for the registrant (stored in the ADDRESS table), for example: P1=phone 1 P2=phone 2. */
	preferredCommunication?: string[];
	/** The registrant's preferred currency for transactions. */
	preferredCurrency?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** The registrant's preferred language. */
	preferredLanguage?: string;
	/** The registrant's preferred unit of measure. */
	preferredMeasure?: string;
	/** The version of the privacy notice. For example '1.0'. */
	privacyNoticeVersion?: string;
	/** The user's profile type. If profileType is not specified, by default, the profileType is set to 'C' and a consumer user will be created; A business user can be by setting profileType to 'B'. */
	profileType?: 'B' | 'C';
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** Determines whether the registrant wants to receive marketing e-mail activities for the current store (or all stores if no stores have been visited during the session): true - The user wants to receive marketing e-mail activities; false - The user does not want to receive e-mail activities (the default). */
	receiveEmail?: string;
	/** Specifies whether the registrant wants to receive marketing SMS messages for the current store (or all stores if no stores have been visited during the session). Valid values are true or false (default). */
	receiveSMS?: string;
	/** Indicates whether the user wants to receive order notification SMS text messages. Valid values are true or false (default). */
	receiveSMSNotification?: string;
	/** The name of the registrant's secretary or administrative assistant. */
	secretary?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** The time zone in which the registrant does business (report as GMT +/- hours). */
	timeZone?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** Customizable field. */
	userField1?: string;
	/** Customizable field. */
	userField2?: string;
	/** Customizable field. */
	userField3?: string;
	/** Customizable field. */
	userProfileField1?: string;
	/** Customizable field. */
	userProfileField2?: string;
	/** The user account status. A status of 1 indicates the account is enabled, and a status of 0 indicates the account is disabled. */
	userStatus?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField1?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField2?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField3?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField4?: string;
	/** Customizable field for demographic information; a field of 254 characters. */
	x_demographicField5?: string;
	/** Customizable field for demographic information; an integer field. */
	x_demographicField6?: string;
	/** Customizable field for demographic information; a field var char, length 6. */
	x_demographicField7?: string;
	/** A string used to identify the user for taxation purposes. */
	x_taxPayerId?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
}

export interface PersonContact {
	resourceId: string;
	resourceName: string;
	userId: string;
	addressId?: string;
	contact: PersonSingleContact[];
}

/**
 * Request of BuyerRegistrationAddCmd.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest {
	/** The name of the new buyer organization to register. */
	org_orgEntityName: string[];
	/** The logonId for the buyer organization's initial administrator. */
	usr_logonId: string[];
	/** The logonId for the password of buyer organization's initial administrator's. */
	usr_logonPassword: string[];
	/** The logonId for the password of buyer organization's initial administrator's entered a second time. */
	usr_logonPasswordVerify: string[];
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroupsResponse {
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The ApprovalGroup identifier for a specific organization. */
	segmentId: string;
	/** The URL to call when the command completes successfully. */
	URL: string;
	/** The current store identifier. */
	storeId?: string;
	/** The catalog identifier. */
	catalogId?: string;
	/** The request type for example, ajax. */
	requesttype?: string;
}

/**
 * User identification container.
 */
export interface ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerUserIdContainer {
	/** User identification. */
	userId: string;
	resourceName?: string;
}

/**
 * Checkout out profile identification container.
 */
export interface ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer {
	/** Check out profile identification. */
	checkoutProfileId: string;
}

export interface PersonPerson {
	accountStatus?: 'Enabled' | 'Disabled';
	addressId?: string;
	addressLine?: string[];
	addressType?: string;
	attributes?: PersonPersonAttributes[];
	bestCallingTime?: string;
	businessTitle?: string;
	challengeQuestion?: string;
	resourceId?: string;
	resourceName?: string;
	checkoutProfileUrl?: string;
	contactUrl?: string;
	city?: string;
	companyName?: string;
	contact?: PersonSingleContact[];
	contextAttribute?: PersonPersonContextAttribute[];
	country?: string;
	dateOfBirth?: string;
	departmentNumber?: string;
	description?: string;
	displayName?: string;
	distinguishedName?: string;
	email1?: string;
	email2?: string;
	employeeID?: string;
	employeeType?: string;
	fax1?: string;
	fax2?: string;
	firstName?: string;
	gender?: 'Male' | 'Female' | 'Unspecified';
	geographicalShippingCode?: string;
	geographicalTaxCode?: string;
	hobbies?: string;
	/** @format int32 */
	householdSize?: string;
	income?: ComIbmCommerceMemberFacadeDatatypesIncomeAmountType;
	internalOfficeAddress?: string;
	language?: string;
	lastName?: string;
	lastUpdate?: string;
	logonId?: string;
	manager?: string;
	maritalStatus?: string;
	middleName?: string;
	mobilePhone1?: string;
	mobilePhone1Country?: string;
	nickName?: string;
	/** @format int32 */
	numberOfChildren?: string;
	organizationDistinguishedName?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	organizationName?: string;
	organizationUnitName?: string;
	orgizationId?: string;
	passwordExpired?: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	personTitle?: string;
	phone1?: string;
	phone1Publish?: string;
	phone1Type?: string;
	phone2?: string;
	phone2Publish?: string;
	phone2Type?: string;
	photoURI?: string;
	preferredCommunication?: string;
	preferredCurrency?: string;
	preferredDelivery?: string;
	preferredLanguage?: string;
	primary?: string;
	profileType?: 'C' | 'B';
	receiveEmailPreference?: PersonPersonReceiveEmailPreference[];
	receiveSMSNotification?: string;
	receiveSMSPreference?: PersonPersonReceiveSMSPreference[];
	registrationApprovalStatus?: string;
	registrationDateTime?: string;
	registrationStatus?: 'Guest' | 'RegisteredPerson';
	/** The name of the registrant's secretary or administrative assistant. */
	secretary?: string;
	state?: string;
	userDataField?: PersonPersonUserDataField[];
	userId?: string;
	zipCode?: string;
}

/**
 * Request of UserRegistrationUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest {
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** Customizable field. */
	addressField2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** The purpose of the address. Valid values are: S - shipto, B - billto, SB - shipto and billto (The default value.). */
	addressType?: string;
	/** The registrant's age. */
	age?: string;
	/** A special ID assigned by the registrant's business organization or organizational unit to this particular registrant.. */
	alternateId?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either 'r' (for replace) or 'd' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. 'JobFunction_10001_r_1' : 'ProductManager' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores.  */
	attributeName_storeId_action_sequence?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** Answer to the challenge question. */
	challengeAnswer?: string;
	/** Challenge question for verbal confirmation of the customer's identity. */
	challengeQuestion?: string;
	/** The number of children the registrant has. */
	children?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The company name of the organization that the registrant represents, obtained when filling in demographic information. */
	companyName?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** Date of birth. The format is yyyy-mm-dd, for example: 1980-01-01. */
	dateOfBirth?: string;
	/** The department identifier for the registrant. */
	departmentNumber?: string;
	/** A description of the registrant. */
	description?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's ID with his or her employer. */
	employeeId?: string;
	/** The registrant's status as an employee (for example, regular, permanent, contractor, or part time). */
	employeeType?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** The registrant's gender. */
	gender?: string;
	/** The registrant's hobbies. */
	hobbies?: string;
	/** The number of people in the registrant's household; the default is 1. */
	household?: string;
	/** The registrant's annual income. */
	income?: string;
	/** The currency in which the registrant's income is paid. */
	incomeCurrency?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** The registrant's logon ID. If you are using LDAP, changing a user's logonID is not supported because it would require deleting and recreating the user in LDAP. This process would cause all non-WebSphere Commerce user attributes, such as the password, to be lost. If you are not using LDAP, changing the user's logon ID is not recommended, because the promotion subsystem stores the logon ID of the creator of the promotion in the XMLPARAM column of the PX_PROMOTION table. Note: When the UserRegistrationUpdate command is used to change the logonID, the command will automatically update the USERS.DN database column. Do not assume that ADDRESS.NICKNAME will also change. Instead, the following finder should be used to get the single self address of a user: AddressAccessBean.findSelfAddressByMember(Long memberID). */
	logonId?: string;
	/** The registrant's password. During password reset, this value also acts as the new password. In database mode, the password is encrypted before it is saved in the database. In LDAP mode, the password is only stored on the LDAP server. */
	logonPassword?: string;
	/**
	 * Required if the logonPassword is used: The registrant's password, entered a second time.
	 * @deprecated
	 */
	logonPasswordVerify?: string;
	/** The name of the registrant's manager. */
	manager?: string;
	/** The registrant's marital status. */
	maritalStatus?: string;
	/** The marketing tracking consent. 0 means opt-out, 1 means opt-in. */
	marketingTrackingConsent?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The registrant's mobile phone number used for SMS, for example, 4161235555. */
	mobilePhone1?: string;
	/** The country code used for the registrant's mobile phone number, for example, CA for Canada. */
	mobilePhone1Country?: string;
	/** The internal address (for example, mail stop). */
	officeAddress?: string;
	/** Whether the registrant has previously placed an order. This value is supplied by the registrant. */
	orderBefore?: string;
	/** The identifier of the registrant's company. */
	organizationId?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** The identifier of the registrant's organizational unit. */
	organizationUnitId?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** URL or path to a photo of the registrant. */
	photo?: string;
	/** The preferred phone for the registrant (stored in the ADDRESS table), for example: P1=phone 1 P2=phone 2. */
	preferredCommunication?: string[];
	/** The registrant's preferred currency for transactions. */
	preferredCurrency?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** The registrant's preferred language. */
	preferredLanguage?: string;
	/** The registrant's preferred unit of measure. */
	preferredMeasure?: string;
	/** The version of the privacy notice. For example '1.0'. */
	privacyNoticeVersion?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** Determines whether the registrant wants to receive marketing e-mail activities for the current store (or all stores if no stores have been visited during the session): true - The user wants to receive marketing e-mail activities; false - The user does not want to receive e-mail activities (the default). */
	receiveEmail?: string;
	/** Specifies whether the registrant wants to receive marketing SMS messages for the current store (or all stores if no stores have been visited during the session). Valid values are true or false (default). */
	receiveSMS?: string;
	/** Indicates whether the user wants to receive order notification SMS text messages. Valid values are true or false (default). */
	receiveSMSNotification?: string;
	/** During password reset, this value must be set to 'true'. */
	resetPassword?: string;
	/** The name of the registrant's secretary or administrative assistant. */
	secretary?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** The time zone in which the registrant does business (report as GMT +/- hours). */
	timeZone?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** Customizable field. */
	userField1?: string;
	/** Customizable field. */
	userField2?: string;
	/** Customizable field. */
	userField3?: string;
	/** Customizable field. */
	userProfileField1?: string;
	/** Customizable field. */
	userProfileField2?: string;
	/** During password reset, the registrant must enter the old password. */
	xcred_logonPasswordOld?: string;
	/** During password reset, the registrant must enter the new password a second time. */
	xcred_logonPasswordVerify?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField1?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField2?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField3?: string;
	/** Customizable field for demographic information; this is single-character field. */
	x_demographicField4?: string;
	/** Customizable field for demographic information; a field of 254 characters. */
	x_demographicField5?: string;
	/** Customizable field for demographic information; an integer field. */
	x_demographicField6?: string;
	/** Customizable field for demographic information; a field var char, length 6. */
	x_demographicField7?: string;
	/** A string used to identify the user for taxation purposes. */
	x_taxPayerId?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
}

export interface PersonSingleContact {
	addressType?: string;
	addressLine?: string[];
	addressId?: string;
	personTitle?: string;
	primary?: string;
	email2?: string;
	email1?: string;
	city?: string;
	middleName?: string;
	geographicalTaxCode?: string;
	state?: string;
	internalOfficeAddress?: string;
	fax2?: string;
	fax1?: string;
	organizationIdentifier?: ComIbmCommerceFoundationCommonDatatypesOrganizationIdentifierType;
	phone1Type?: string;
	nickName?: string;
	phone2Type?: string;
	phone2?: string;
	businessTitle?: string;
	phone1?: string;
	zipCode?: string;
	bestCallingTime?: string;
	mobilePhone1Country?: string;
	phone2Publish?: string;
	mobilePhone1?: string;
	personIdentifier?: ComIbmCommerceFoundationCommonDatatypesPersonIdentifierType;
	organizationUnitName?: string;
	organizationName?: string;
	language?: string;
	firstName?: string;
	lastName?: string;
	resourceId?: string;
	resourceName?: string;
	geographicalShippingCode?: string;
	phone1Publish?: string;
	attributes?: JavaUtilMapEntry[];
	country?: string;
	userDataField?: PersonSingleContactUserDataField[];
}

export interface PersonDeleteContact {
	resourceName?: string;
	addressId?: string[];
}

export interface PersonUpdateCurrencyAndLanguagePreferenceCmd {
	redirecturl?: string;
	viewTaskName?: string;
}

/**
 * Description of the post input body to update an approval status record.
 */
export interface ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusParameterDescription {
	/** Comment text for status change. */
	comments?: string;
	/** Approval status. Valid values are 1 for approve and 2 for reject. */
	aprv_act: '1' | '2';
}

export interface ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummaryEntitledOrganizations {
	distinguishedName?: string;
	/** @format int64 */
	organizationId?: number;
	displayName?: string;
	/** @format int64 */
	memberId?: number;
	organizationName?: string;
}

export type ComIbmCommerceUserBeansMemberRoleAssignDataBeanIBMRolesOfUserInOrgsICanAdminOrgIdRoleDataBeans =
	object;

export interface ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary {
	/** @format int32 */
	recordSetCount?: number;
	recordSetCompleteIndicator?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resultList?: ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList[];
	/** @format int32 */
	recordSetTotal?: number;
}

/**
 * Delete context attribute response.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerDeleteContextAttribute {
	/** The user identifier list. */
	userId: string[];
	/** The address identifier list. */
	addressId: string[];
}

/**
 * Request of OrgEntityAddCmd.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest {
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** Customizable field. */
	addressField2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** Type of address, valid values are configurable by using a properties file: S (shipto), B (billto), and SB (both shipto and billto). A single address may be of different types. If a properties file cannot be found, a default of SB is used. */
	addressType?: string;
	/** The first name of the administrator. */
	administratorFirstName?: string;
	/** The last name of the administrator. */
	administratorLastName?: string;
	/** The middle name of the administrator. */
	administratorMiddleName?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either 'r' (for replace) or 'd' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. 'JobFunction_10001_r_1' : 'ProductManager' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores.  */
	attributeName_storeId_action_sequence?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** Describes the kind of business performed by an organization or organizational unit. */
	businessCategory?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** A description of the registrant. */
	description?: string;
	/** DN of the organization or organizational unit, for LDAP use. */
	distinguishedName: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** Registered organization identifier; may be null for an organizational unit. */
	legalId?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** Customizable field. */
	orgEntityField1?: string;
	/** Customizable field. */
	orgEntityField2?: string;
	/** Customizable field. */
	orgEntityField3?: string;
	/** The name of the organization or organizational unit. Leading and trailing spaces is trimmed. When the system is configured with LDAP, the following characters are not allowed when the orgEntityName is used to construct the distinguished name: 1. The # character occurring at the beginning of orgEntityName. 2. Any of the following characters: = , + " \ < > ;. */
	orgEntityName: string;
	/** The type of the organizational entity being added. O - Organization; OU - Organizational Unit. */
	orgEntityType: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** Required if orgEntityType equals 'OU': The member ID of the parent organizational entity where the new organizational entity is added. For an organization (orgEntityType=O), this parameter is not mandatory; it defaults to Root Organization. */
	parentMemberId: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
}

/**
 * Response of UserRegistrationAdminAddCmd.
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse {
	/** The user unique identifier. */
	userId: string;
	/** The logon ID of the user. */
	logonId?: string;
	/** The address identifier of the user. */
	addressId: string;
	personalizationID: string;
	resourceName: string;
	WCToken: string;
	WCTrustedToken?: string;
}

/**
 * Address identifier.
 */
export interface ComIbmCommerceRestMemberHandlerPersonContactHandlerAddressIdentifier {
	/** The address identifier. */
	addressId: string;
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity {
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The address identifier of the organization entity. */
	addressId: string;
}

export interface ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary {
	entitledOrganizations?: ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummaryEntitledOrganizations[];
	accountCheck?: boolean;
}

export interface PersonSingleContactUserDataField {
	value?: string;
	key: string;
}

export interface ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails {
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	pageNumber?: number;
	userDataBeans?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans[] | null;
	pageSize?: string;
	/** @format int32 */
	recordSetTotal?: number;
	recordSetCompleteIndicator?: boolean;
}

export type ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans = {
	businessProfile?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansBusinessProfile;
	demographics?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansDemographics;
	displayName?: string | null;
	distinguishedName?: string;
	firstName?: string;
	lastName?: string;
	logonId?: string;
	memberAttributeValues?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansMemberAttributeValues[];
	memberId?: string;
	parentMemberId?: string;
	personalizationId?: string | null;
	preferredCurrency?: string | null;
	preferredLanguageId?: string;
	profileType?: string;
	registerType?: string;
	roles?: number[];
	state?: string;
	userId?: string;
	userProfile?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansUserProfile;
	userRegistry?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansUserRegistry;
};

export type ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansUserProfile = {
	preferredCommunication?: string | null;
	preferredMeasure?: string | null;
	displayName?: string | null;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	description?: string;
	preferredDelivery?: string | null;
	receiveSMSNotification?: string;
};

export type ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansBusinessProfile =
	{
		organizationId?: string;
		employeeType?: string;
		departmentNumber?: string;
		employeeId?: string | null;
		organizationUnitId?: string;
		requistionerId?: string;
	};

export interface ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansUserRegistry {
	logonId?: string;
	policyAccountId?: string;
	status?: string;
}

export type ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansDemographics = {
	income?: string;
	numberOfChildren?: string;
	numberOfHouseholds?: string;
	gender?: string | null;
	hobbies?: string;
	incomeCurrency?: string;
	timezone?: string;
	companyName?: string;
	orderBefore?: string;
	dateOfBirth?: string;
	age?: string;
	maritalStatus?: string;
};

export interface ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansMemberAttributeValues {
	storeEntityId?: string;
	memberAttributeValueId?: string;
	value?: string;
	memberAttribute?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansMemberAttributeValuesMemberAttribute;
}

export interface ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeansMemberAttributeValuesMemberAttribute {
	getName?: string;
	getDescription?: string;
	getMemberAttributeId?: string;
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity {
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The address identifier of the organization entity. */
	addressId: string;
	viewTaskName?: string;
}

/**
 * Request of OrgEntityAddCmd.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest {
	/** Type of address, valid values are configurable by using a properties file: S (shipto), B (billto), and SB (both shipto and billto). A single address may be of different types. If a properties file cannot be found, a default of SB is used. */
	addressType?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The name of the organization or organizational unit. Leading and trailing spaces is trimmed. When the system is configured with LDAP, the following characters are not allowed when the orgEntityName is used to construct the distinguished name: 1. The # character occurring at the beginning of orgEntityName. 2. Any of the following characters: = , + " \ < > ;. */
	orgEntityName: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this organization using the following syntax: &attributeName_storeId_action_number=value. */
	customMemberAttributes?: string[];
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** DN of the organization or organizational unit, for LDAP use. */
	distinguishedName: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The middle name of the administrator. */
	administratorMiddleName?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The last name of the administrator. */
	administratorLastName?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** Customizable field. */
	addressField1?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** Customizable field. */
	addressField3?: string;
	/** Customizable field. */
	addressField2?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** Customizable field. */
	orgEntityField1?: string;
	/** Customizable field. */
	orgEntityField2?: string;
	/** Customizable field. */
	orgEntityField3?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** A description of the registrant. */
	description?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** Describes the kind of business performed by an organization or organizational unit. */
	businessCategory?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** Required if orgEntityType equals 'OU': The member ID of the parent organizational entity where the new organizational entity is added. For an organization (orgEntityType=O), this parameter is not mandatory; it defaults to Root Organization. */
	parentMemberId: string;
	/** The first name of the administrator. */
	administratorFirstName?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** The type of the organizational entity being added. O - Organization; OU - Organizational Unit. */
	orgEntityType: string;
	/** Registered organization identifier; may be null for an organizational unit. */
	legalId?: string;
}

/**
 * Request of OrgEntityUpdateCmd.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest {
	/** Type of address, valid values are configurable by using a properties file: S (shipto), B (billto), and SB (both shipto and billto). A single address may be of different types. If a properties file cannot be found, a default of SB is used. */
	addressType?: string;
	/** The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.). */
	personTitle?: string;
	/** The name of the organization or organizational unit. */
	orgEntityName?: string;
	/** Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer. */
	billingCodeType?: string;
	/** The ID for this organization or organizational unit. */
	orgEntityId: string;
	/** You can manage custom member attributes (MBRATTRVAL table) for this organization using the following syntax: &attributeName_storeId_action_number=value. */
	customMemberAttributes?: string[];
	/** The registrant's secondary e-mail or Web address. */
	email2?: string;
	/** The registrant's primary e-mail or Web address. */
	email1?: string;
	/** The name of the city where the registrant resides. */
	city?: string;
	/** The middle name of the administrator. */
	administratorMiddleName?: string;
	/** The middle name of the registrant. */
	middleName?: string;
	/** The last name of the administrator. */
	administratorLastName?: string;
	/** Customizable field. */
	addressField3?: string;
	/** Customizable field. */
	addressField1?: string;
	/** The registrant's secondary phone number. */
	phone2?: string;
	/** The name of the state, province, or equivalent where the registrant resides. */
	state?: string;
	/** Customizable field. */
	addressField2?: string;
	/** The registrant's secondary facsimile number. */
	fax2?: string;
	/** The registrant's primary facsimile number. */
	fax1?: string;
	/** The type of phone used for the registrant's primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone1Type?: string;
	/** Customizable field. */
	orgEntityField1?: string;
	/** Customizable field. */
	orgEntityField2?: string;
	/** Customizable field. */
	orgEntityField3?: string;
	/** The type of phone used for the registrant's secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters. */
	phone2Type?: string;
	/** A description of the registrant. */
	description?: string;
	/** 1 - An indicator that the registrant's secondary phone number is listed; 0 - An indicator that the registrant's secondary phone number is unlisted. */
	publishPhone2?: string;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	/** The URL to call when the command completes successfully. */
	URL?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address1?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address2?: string;
	/** The registrant's street address, to a maximum of three lines of information. */
	address3?: string;
	/** The ZIP or postal code of the registrant's address. */
	zipCode?: string;
	/** 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database. */
	packageSuppression?: string;
	/** D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant. */
	bestCallingTime?: string;
	/** The registrant's primary phone number. */
	phone1?: string;
	/** A tax code based on geographical region, especially useful with tax software. */
	taxGeoCode?: string;
	/** 1 - An indicator that the registrant's primary phone number is listed; 0 - An indicator that the registrant's primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database. */
	publishPhone1?: string;
	/** The name of the unit within the organization that the registrant represents. */
	organizationUnitName?: string;
	/** The first name of the registrant. */
	firstName?: string;
	/** The name of the organization that the registrant represents. */
	organizationName?: string;
	/** Describes the kind of business performed by an organization or organizational unit. */
	businessCategory?: string;
	/** The registrant's preferred mode of delivery. */
	preferredDelivery?: string;
	/** A shipping code based on geographical region, especially useful with tax software. */
	shippingGeoCode?: string;
	/** The name of the country or region where the registrant resides. */
	country?: string;
	/** The first name of the administrator. */
	administratorFirstName?: string;
	/** The registrant's organization's code to identify the shipping or billing addresses and cost center. */
	billingCode?: string;
	/** Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory. */
	lastName?: string;
	/** Registered organization identifier; may be null for an organizational unit. */
	legalId?: string;
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups {
	/** The URL to call when the command completes successfully. */
	URL: string;
	/** The organization entity identifier. */
	orgEntityId: string;
	/** The ApprovalGroup identifier for a specific organization. */
	segmentId: string;
}

/**
 * Information about an organization entity identity.
 */
export interface ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroupsResponse {
	viewTaskName?: string;
}

export interface ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails {
	/** @format int32 */
	pageNumber?: number;
	/** @format int32 */
	pageSize?: number;
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	organizationHierarchy?: string[];
	recordSetCompleteIndicator?: boolean;
	organizationDataBeans?: ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans;
}

export interface ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans {
	administratorFirstName?: string;
	administratorLastName?: string;
	administratorMiddleName?: string;
	businessCategory?: string | null;
	description?: string | null;
	displayName?: string;
	distinguishedName?: string;
	legalId?: string | null;
	memberId?: string;
	orgEntityField1?: string;
	orgEntityField2?: string;
	orgEntityField3?: string;
	orgEntityType?: string;
	organizationId?: string;
	organizationName?: string;
	/** @format int64 */
	owner?: number;
	ownerMemberId?: string;
	parentMemberId?: string;
	preferredDelivery?: string;
	roles?: number[];
	state?: string;
	status?: string;
	/** A string used to identify the user for taxation purposes. */
	taxPayerId?: string;
	type?: string;
}

/**
 * Request body to activate the user account.
 */
export interface ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserRequestBody {
	/** The user's logon ID. */
	logonId: string;
	/** The account validation code. */
	validationCode: string;
}

/**
 * Response body to activate the user account.
 */
export interface ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserResponse {
	/** The redirect URL. */
	redirecturl: string;
	/** The user's logon ID. */
	logonId: string;
	/** The view task name. */
	viewTaskName: string;
	/** The store identifier. */
	storeId?: string;
	/** The language ID. */
	langId?: string;
}

/**
 * Request body for resend user account activation email.
 */
export interface ComIbmCommerceRestMemberHandlerUserActivateHandlerResendActiveUserRequestBody {
	/** An alternative email that the user account activation email can be sent to. */
	email1?: string;
	/** The user's logon ID. */
	logonId: string;
	/** The user's logon password. */
	logonPassword: string;
}

export interface ErrorMessageResponseContainer {
	errors?: ErrorMessageResponse[];
}

export interface ErrorMessageResponse {
	/** The error message key. */
	errorKey?: string;
	errorParameters?: string[];
	/** A descriptive error message. */
	errorMessage?: string;
	/** The error message code. */
	errorCode?: string;
}

export interface WorkspaceGetworkspaceById {
	recordSetCount: number;
	resourceId: string;
	resourceName: string;
	resultList: {
		workspaceDescription: string;
		workspaceExternalIdentifier: string;
		workspaceName: string;
		persistent: boolean;
		emergencyUse: boolean;
		status: string;
		workspaceID: string;
	}[];
	recordSetTotal: number;
	recordSetComplete: boolean;
}

export interface WorkspaceIBMAdminAllItem {
	status?: string;
	workspaceName?: string;
	persistent?: boolean;
	workspaceExternalIdentifier?: string;
	workspaceID?: string;
	emergencyUse?: boolean;
	userDataField?: WorkspaceIBMAdminAllItemUserDataField[];
	workspaceDescription?: string;
}

export interface WorkspaceIBMAdminAllItemUserDataField {
	value?: string;
	key?: string;
}

export interface TaskGetTaskByID {
	recordSetCount?: number;
	resourceId: string;
	resourceName: string;
	resultList?: TaskGetTaskDetails[];
	recordSetTotal?: number;
	recordSetComplete?: boolean;
}

export interface TaskGetTaskDetails {
	approvalDate?: string;
	usage?: string;
	taskDescription?: string;
	parentTaskGroupName?: string;
	parentTaskGroupID?: string;
	taskExternalIdentifier?: string;
	parentWorkspaceExternalIdentifier?: string;
	parentWorkspaceName?: string;
	parentWorkspaceID?: string;
	parentTaskGroupExternalIdentifier?: string;
	taskName: string;
	completionDate?: string;
	taskId: string;
	status: string;
}

export interface TaskUpdateStatusByActionType {
	actionType: string[];
	taskGroupId: string[];
	SubmitFinishMessage?: string;
	DM_PersistentCookieCreated?: object;
	viewTaskName?: string;
	taskId: number;
}

export interface TaskGroupCreateTaskGroupCommentUsingAllMandetoryParameter {
	SubmitFinishMessage?: string;
	EC_XMLObject?: {
		XML?: {
			taskgroupId?: string;
			comment?: string;
		};
	}[];
	taskgroupId: string[];
	taskgroupcommentid: number;
	DM_PersistentCookieCreated?: object;
	comment?: string[];
	viewTaskName?: string;
}

export interface TaskGroupUpdateStatusByActionType {
	SubmitFinishMessage?: string;
	taskgroupId: number;
	viewTaskName?: string;
}

export interface TaskGroupUpdateTaskGroupUsingNameAndID {
	SubmitFinishMessage?: string;
	taskgroupId: number;
	viewTaskName?: string;
}

export interface TaskGroupGetTaskGroupById {
	recordSetCount?: number;
	resourceId: string;
	recordSetStartNumber?: number;
	resourceName: string;
	resultList?: TaskGroupGetTaskDetails[];
	recordSetTotal?: number;
	recordSetComplete?: boolean;
}

export interface TaskCreateTask {
	SubmitFinishMessage?: string;
	viewTaskName?: string;
	taskIdentifier: string;
	taskId: number;
}

export interface TaskUpdateTaskByNameAndID {
	SubmitFinishMessage?: string;
	viewTaskName?: string;
	taskId?: number;
}

export interface TaskGroupCreateTaskGroupUsingAllMandetoryParameters {
	taskgroupIdentifier: string;
	SubmitFinishMessage?: string;
	taskgroupId: number;
	viewTaskName?: string;
}

export interface TaskGroupGetTaskDetails {
	taskGroupName: string;
	TaskGroupComments?: {
		posterLogonID?: string;
		postDate?: string;
		comment?: string;
	}[];
	approvalDate?: string;
	recurring?: boolean;
	taskGroupExternalIdentifier?: string;
	commitDate?: string;
	parentWorkspaceExternalIdentifier?: string;
	taskGroupID: string;
	parentWorkspaceManagerID?: string;
	parentWorkspaceName?: string;
	quickPublish?: boolean;
	parentWorkspaceID?: string;
	taskGroupDescription?: string;
	status: string;
}

export interface TaskGroupIBMAdminAll {
	recordSetCount?: number;
	recordSetComplete?: boolean;
	recordSetStartNumber?: number;
	resultList?: TaskGroupIBMAdminAllItem[];
	resourceId?: string;
	resourceName?: string;
	recordSetTotal?: number;
}

export interface TaskGroupIBMAdminAllItem {
	status?: string;
	approvalDate?: string;
	parentWorkspaceManagerID?: string;
	taskGroupID?: string;
	taskGroupName?: string;
	quickPublish?: boolean;
	parentWorkspaceID?: string;
	parentWorkspaceExternalIdentifier?: string;
	promotionDate?: boolean;
	commitDate?: string;
	taskGroupDescription?: string;
	recurring?: boolean;
	parentWorkspaceName?: string;
	userDataField?: TaskGroupIBMAdminAllItemUserDataField[];
	TaskGroupComments?: TaskGroupIBMAdminAllItemTaskGroupComments[];
	TaskGroupApprovers?: TaskGroupIBMAdminAllItemTaskGroupApprovers[];
	dueDate?: string;
	taskGroupExternalIdentifier?: string;
}

export interface TaskGroupIBMAdminAllItemUserDataField {
	value?: string;
	key?: string;
}

export interface TaskGroupIBMAdminAllItemTaskGroupComments {
	comment?: string;
	postDate?: string;
	userDataField?: TaskGroupIBMAdminAllItemTaskGroupCommentsUserDataField[];
	posterLogonID?: string;
}

export interface TaskGroupIBMAdminAllItemTaskGroupCommentsUserDataField {
	value?: string;
	key?: string;
}

export interface TaskGroupIBMAdminAllItemTaskGroupApprovers {
	approverLogonID?: string;
	userDataField?: TaskGroupIBMAdminAllItemTaskGroupApproversUserDataField[];
	approverID?: string;
}

export interface TaskGroupIBMAdminAllItemTaskGroupApproversUserDataField {
	value?: string;
	key?: string;
}

export interface TaskIBMAdminAll {
	recordSetCount?: number;
	recordSetComplete?: boolean;
	resultList?: TaskIBMAdminAllItem[];
	resourceId?: string;
	resourceName?: string;
	recordSetTotal?: number;
}

export interface TaskIBMAdminAllItem {
	completionDate?: string;
	approvalDate?: string;
	taskName?: string;
	parentTaskGroupExternalIdentifier?: string;
	parentWorkspaceID?: string;
	parentWorkspaceExternalIdentifier?: string;
	taskDescription?: string;
	promotionDate?: string;
	commitDate?: boolean;
	status?: string;
	taskExternalIdentifier?: string;
	taskId?: string;
	userDataField?: TaskIBMAdminAllItemUserDataField[];
	usage?: string;
	parentWorkspaceName?: string;
	parentTaskGroupID?: string;
	TaskMembers?: TaskIBMAdminAllItemTaskMembers[];
	dueDate?: string;
	parentTaskGroupName?: string;
}

export interface TaskIBMAdminAllItemUserDataField {
	value?: string;
	key?: string;
}

export interface TaskIBMAdminAllItemTaskMembers {
	memberName?: string;
	userDataField?: TaskIBMAdminAllItemTaskMembersUserDataField[];
	memberID?: string;
}

export interface TaskIBMAdminAllItemTaskMembersUserDataField {
	value?: string;
	key?: string;
}

export interface WorkspaceGetworkspace {
	recordSetCount: number;
	resourceId: string;
	resourceName: string;
	recordSetTotal: number;
	resultList?: {
		workspaceDescription: string;
		workspaceExternalIdentifier: string;
		workspaceName: string;
		persistent: boolean;
		emergencyUse: boolean;
		status: string;
		workspaceID: string;
	}[];
	recordSetComplete: boolean;
}

export interface WorkspaceCreateworkspace {
	SubmitFinishMessage: string;
	workspaceIdentifier: string;
	viewTaskName: string;
	emergencyUse: string;
	workspaceId: number;
}

export interface WorkspaceUpdateworkspace {
	SubmitFinishMessage: string;
	viewTaskName: string;
	workspaceId: number;
}

export interface WorkspaceChangeworkspacestatus {
	actionType: string[];
	SubmitFinishMessage: string;
	viewTaskName: string;
	DM_PersistentCookieCreated?: object;
	workspaceId: string[];
}
