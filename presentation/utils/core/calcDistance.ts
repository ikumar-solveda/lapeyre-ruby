/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LatLng } from '@/data/types/Store';
import { dDiv } from '@/utils/floatingPoint';
import { getDistance } from 'geolib';

export const calcDistance = (from: LatLng, to: LatLng) => dDiv(getDistance(from, to, 100), 1000);
