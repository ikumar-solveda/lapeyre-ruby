/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { serwistOptions } from '@/data/serwist/serwistOptions';
import { Serwist } from 'serwist';

const serwist = new Serwist(serwistOptions);

serwist.addEventListeners();
