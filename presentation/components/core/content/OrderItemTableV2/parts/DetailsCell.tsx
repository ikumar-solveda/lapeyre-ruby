/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { B2B } from '@/components/blocks/B2B';
import { IfTrue } from '@/components/blocks/IfTrue';
import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { UnitPriceDisplay } from '@/components/blocks/UnitPriceDisplay';
import { OrderItemTableV2Actions } from '@/components/content/OrderItemTableV2/parts/Actions';
import { OrderItemTableV2AttributeDrawer } from '@/components/content/OrderItemTableV2/parts/AttributeDrawer';
import { OrderItemTableV2ContractName } from '@/components/content/OrderItemTableV2/parts/ContractName';
import { OrderItemTableV2EditExpectedDate } from '@/components/content/OrderItemTableV2/parts/EditExpectedDate';
import { OrderItemTableV2RequestedDate } from '@/components/content/OrderItemTableV2/parts/RequestedDate';
import { OrderItemTableV2SaveForLater } from '@/components/content/OrderItemTableV2/parts/SaveForLater';
import { orderItemTableV2ActionButtonSX } from '@/components/content/OrderItemTableV2/styles/actionButton';
import { orderItemTableV2DetailsCellSX } from '@/components/content/OrderItemTableV2/styles/detailsCell';
import { orderItemTableV2DetailsImageSX } from '@/components/content/OrderItemTableV2/styles/detailsImage';
import { orderItemTableV2DetailsLinkableSX } from '@/components/content/OrderItemTableV2/styles/detailsLinkable';
import { orderItemTableV2DividerProps } from '@/components/content/OrderItemTableV2/styles/dividerProps';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { DELIVERY } from '@/data/constants/checkout';
import { ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { useContract } from '@/data/Content/Contract';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderTableData, OrderTableMeta } from '@/data/types/OrderItemTableV2';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { useUser } from '@/data/User';
import { combineSX } from '@/utils/combineSX';
import { Box, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

const EMPTY_CONTRACTS: Record<string, string> = {};
const EMPTY_STORE_AVAILABILITY = {} as ProductAvailabilityData;
const EMPTY_META = {} as OrderTableMeta;
export const OrderItemTableV2DetailsCell: FC<
	CellContext<OrderTableData, OrderTableData['itemDetails']>
> = ({ row, table }) => {
	const freeGift = row.original.freeGift;
	const {
		unitPrice,
		currency: unitPriceCurrency,
		requestedShipDate,
		onExpectedDateChange,
	} = row.original.itemDetails;
	const { type } = row.original.fulfillment;
	const { details } = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const {
		partNumber,
		name,
		color,
		thumbnail,
		href,
		prices,
		attributes,
		loading,
		contractId,
		isValidating,
	} = details;
	const { quantity, onChange: updateCart } = row.original.quantity;
	const localization = useLocalization('OrderItemTable');
	const freeGiftDescription = useLocalization('FreeGift').Label.t();
	const { user } = useUser();
	const { meta = EMPTY_META } = table.options;
	const { readonly = false, isShippingGroup = false } = meta as OrderTableMeta;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { contracts = EMPTY_CONTRACTS } = useContract();
	const {
		dimensions: { contentSpacing },
	} = theme;
	const showAction = useMemo(
		() => isMobile && !isShippingGroup && !readonly,
		[isMobile, isShippingGroup, readonly]
	);
	const isDelivery = type === DELIVERY;
	const { availability } = row.original.availability;
	const storeAvailability = useMemo(() => {
		const foundAvailability = isDelivery
			? availability?.find((a) => a.storeName === ONLINE_STORE_KEY) ?? EMPTY_STORE_AVAILABILITY
			: availability?.find((a) => a.physicalStoreId);
		return foundAvailability ? { ...foundAvailability, partNumber } : EMPTY_STORE_AVAILABILITY;
	}, [availability, isDelivery, partNumber]);
	const canSaveForLater = useMemo(
		() => !!(!readonly && !freeGift && user?.isLoggedIn),
		[readonly, freeGift, user]
	);
	const futureOrderable = useMemo(
		() => !!storeAvailability?.pbcData?.fulfillmentCenter.availableToPromiseDateTime && !readonly,
		[storeAvailability, readonly]
	);

	return (
		<TableCellResponsiveContent
			label={localization.Labels.ItemDetails.t()}
			sx={combineSX([orderItemTableV2TableCellResponsiveContentSX, orderItemTableV2DetailsCellSX])}
		>
			{!isValidating && loading ? (
				<ProgressIndicator />
			) : (
				<Stack direction="row" alignItems="flex-start" spacing={contentSpacing}>
					{thumbnail ? (
						<Linkable
							href={href}
							id={href}
							data-testid={href}
							sx={orderItemTableV2DetailsLinkableSX}
						>
							<TableCellProductImage
								{...{
									src: thumbnail,
									alt: localization.Labels.ProductThumbnail.t(),
									isThumbnail: true,
									sx: orderItemTableV2DetailsImageSX,
								}}
							/>
						</Linkable>
					) : null}
					<Stack direction="column" alignItems="flex-start">
						<Typography variant="body2" data-testid="orderItem-name" id="orderItem-name">
							<Linkable href={href} id={href} data-testid={href}>
								{color ? `${name}, ${color}` : name}
							</Linkable>
						</Typography>
						<Typography id="orderItem-partNumber" data-testid="orderItem-partNumber">
							{partNumber}
						</Typography>
						{prices ? (
							<UnitPriceDisplay
								unitPrice={unitPrice}
								unitPriceCurrency={unitPriceCurrency}
								prices={prices}
							/>
						) : null}
						<B2B>
							<OrderItemTableV2ContractName contractId={contractId} contracts={contracts} />
						</B2B>
						<IfTrue condition={!!requestedShipDate}>
							<OrderItemTableV2RequestedDate date={requestedShipDate} isDelivery={isDelivery} />
						</IfTrue>
						<Stack direction="row">
							<IfTrue condition={canSaveForLater}>
								<OrderItemTableV2SaveForLater
									details={details}
									quantity={quantity}
									updateCart={updateCart}
								/>
							</IfTrue>
							{canSaveForLater && futureOrderable ? (
								<Divider {...orderItemTableV2DividerProps} />
							) : null}
							<IfTrue condition={futureOrderable}>
								<OrderItemTableV2EditExpectedDate
									onExpectedDateChange={onExpectedDateChange}
									date={requestedShipDate}
									isDelivery={isDelivery}
									availability={storeAvailability}
									quantity={quantity}
								/>
							</IfTrue>
						</Stack>
						{attributes?.length ? (
							<OrderItemTableV2AttributeDrawer attributes={attributes} />
						) : null}
						<IfTrue condition={freeGift}>
							<Typography>{freeGiftDescription}</Typography>
						</IfTrue>
					</Stack>
					<IfTrue condition={showAction}>
						<Box sx={orderItemTableV2ActionButtonSX}>
							<OrderItemTableV2Actions row={row.original} />
						</Box>
					</IfTrue>
				</Stack>
			)}
		</TableCellResponsiveContent>
	);
};
