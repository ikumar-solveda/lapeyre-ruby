/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderItem } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';

export const mapToPartNumber = (entity: ProductType | OrderItem) => entity.partNumber;
