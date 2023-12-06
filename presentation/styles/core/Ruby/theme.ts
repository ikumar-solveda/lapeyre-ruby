/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Button } from '@/styles/Ruby/Button';
import { Checkbox } from '@/styles/Ruby/Checkbox';
import { Icon } from '@/styles/Ruby/Icon';
import { Link } from '@/styles/Ruby/Link';
import { Radio } from '@/styles/Ruby/Radio';
import { TextField } from '@/styles/Ruby/TextField';
import { palette } from '@/styles/Ruby/palette';
import { shape } from '@/styles/Ruby/shape';
import { typography } from '@/styles/Ruby/type';
import { ThemeManifestTheme } from '@/styles/manifest';

export const RubyTheme: ThemeManifestTheme = {
	inheritFrom: 'Default',
	components: [palette, typography, shape, TextField, Button, Checkbox, Icon, Radio, Link],
};
