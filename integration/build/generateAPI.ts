/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import path from 'path';
import { generateApiFromSpecs } from './generateApiFromSpecs';

const specsDirectory = path.resolve(__dirname, '../specs');
const generatedDirectory = path.resolve(__dirname, '../generated');

generateApiFromSpecs({ specsDirectory, generatedDirectory });
