/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { palette } from '@/styles/Ruby/palette';
import { TextField } from '@/styles/Ruby/TextField';
import { typography } from '@/styles/Ruby/type';
import { shape } from '@/styles/Ruby/shape';
import { ThemeManifestTheme } from '@/styles/manifest';
import { Button } from '@/styles/Ruby/Button';
import { Checkbox } from '@/styles/Ruby/Checkbox';
import { Icon } from '@/styles/Ruby/Icon';
import { Radio } from '@/styles/Ruby/Radio';
import { Link } from '@/styles/Ruby/Link';

export const RubyTheme: ThemeManifestTheme = {
	inheritFrom: 'Default',
	components: [palette, typography, shape, TextField, Button, Checkbox, Icon, Radio, Link],
};
