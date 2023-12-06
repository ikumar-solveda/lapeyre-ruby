# Marketing Content Support

Marketing contents for Next.js store need to be written following some MUI component conventions. We have a [parser](presentation\utils\core\parseHTML.tsx) to parse MUI friendly content text into MUI components.

Below is an example that shows the syntax using for easy parsing into MUI component

```html
<div element="Paper" add="fitScreenWidth">
	<img
		src="/EmeraldSAS/images/hero/hero-home_1024w.jpg"
		alt="home hero"
		srcset="
			/EmeraldSAS/images/hero/hero-home_1024w.jpg 1024w,
			/EmeraldSAS/images/hero/hero-home_2000w.jpg 2000w
		"
	/>
	<div element="Container">
		<div element="Grid" container py="{'xs': 4, 'md': 8, 'lg': 16}">
			<div
				element="Grid"
				item
				sx="{'backgroundColor': 'rgba(255, 255, 255, 0.6)','border': 2,'borderColor': 'background.paper','borderRadius': 1,'backdropFilter': 'blur(3px)'}"
				xs="12"
				md="6"
				lg="5"
				p="4"
			>
				<h2 sx="{'color': 'common.black','fontWeight': 'fontWeightBold'}">
					Explore Dozens of New Arrivals
				</h2>
				<h5 component="h3" my="2">
					Freshen up your living space with all new furniture, lighting, and decor that fit any
					living room style.
				</h5>
				<a type="button" variant="contained" href="/living-room">Shop Living Room</a>
			</div>
		</div>
	</div>
</div>
```

### Component mapping and supported MUI components

In the example above, the `element` attribute specifying what MUI component will be composed and rendered in browser. For example `<div element="Grid" ... ` will be constructed into MUI `Grid` component. As the result, all `Grid` supported properties can be used, for example, `container`, `item`, `xs`, `md`, etc.

The current supported MUI components that can be specified with `element` attribute are `Box, Button, Container, Grid, Paper`.

There are some HTML tags handled in a specific way. Since directly using HTML is not recommended, for the tags without `element` attribute

1. `'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p:body1', 'strong', 'overline'` are parsed into MUI `Typography` component with corresponding `variant`.
2. `a` tag is parsed into OOTB `Linkable` component.
3. `button` is parsed into MUI `Button`.
4. `div` is parsed into MUI `Box`.
5. `img` is parsed into OOTB `Img` component.

### Styling handling with attribute `sx`

MUI 5 introduces `SXProps`, see https://mui.com/system/getting-started/the-sx-prop/ for more details regarding syntax and meaning of `SXProps`.

The parser is capable to read `SXPros` alike attribute and apply to the UI. In the example above, `sx="{'backgroundColor': 'rgba(255, 255, 255, 0.6)','border': 2,'borderColor': 'background.paper','borderRadius': 1,'backdropFilter': 'blur(3px)'}"`, the `sx` attribute using `SXProps` syntax contains styling properties for the component, this provides equivalent capability to inline styling.

### Styling with predefined `additive` for common used styling

We are using set of predefined `additive` to apply common used style to component. Some of the OOTB additives located in folder `presentation\styles\core\Default\additives`. Additive following same MUI `SXProp` syntax, and it is merged into `SXProps` after parsing. To use additive, add an `ad` attribute to tag. Example from above: `<div element="Paper" add="fitScreenWidth">`. `ad` serving similar functionality as global css class.

### MUI component supported styling related property

Some MUI components have attribute/property that related to styling. For example, `Box` support MUI system properties, you can use `<div element="Box" mt="2" ...` means a `Box` with margin-top equals 2 spacing.
