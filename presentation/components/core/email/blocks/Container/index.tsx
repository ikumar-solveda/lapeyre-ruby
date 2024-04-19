/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

// keep this import default -- nextjs compiler can't handle named import for `Container` for some reason
import { templateContainerSX } from '@/components/email/blocks/Container/style';
import Container from '@mui/material/Container';

export const TemplateContainer = ({ children }: { children: React.ReactNode }) => (
	<Container sx={templateContainerSX}>{children}</Container>
);
