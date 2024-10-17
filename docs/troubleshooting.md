# Troubleshooting

## Type error during Next.js build when working with custom files

See [Customization](./customization.md) for context.

Regardless of partial or full override, the custom component/function needs to be compatible with the original one especially for function signature or component properties. The Next.JS build process will do a type check against all files in the project even if the component/function was not referenced by any component. Having an overridden component/function with incompatible signature/properties will fail the type check.

## hash.json errors in git hub build

- If there is an error in github when building the branch/PR, and the issue is involving `specs/hash.json` or `locales/hash.json` or both, the files may have incorrect or outdated hashing. Delete the folders under `integration/generated` and then run `yarn integrate` again to generate a new `hash.json` and push to the branch/PR to resolve build issues.
- In some instances, e.g., during conflict resolution with diff/patch, line-endings may get mixed inside a merged file (usually this will only happen with `translation.json` files). In such instances, the generated values inside `hash.json` may be different on a local build vs the one being built in the Jenkins pipeline. To resolve such issues, perform an explicit line-ending conversion on any files on which conflict resolution was done (ensuring that the LF and not CR-LF line-endings are used).
