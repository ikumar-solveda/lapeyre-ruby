### LocalizationWithComponent React function component

#### Usage

Use this component when there is html tag inside translation string.

1. regular html tags.

- example:

  translation string :

  ```json
  "OldPasswordReuse": "The password entered was previously used. <strong>Enter a new password.<strong>"
  ```

  ```jsx
  <LocalizationWithComponent text={OldPasswordReuse.t()} />
  ```

2. indexed tags to be replaced by `components` array according to index.

- example:

  translation string :

  ```json
  "TimeoutMsg": "Your session has timed out and you have been successfully logged off. <0>Sign in</0> again to access your store."
  ```

  ```jsx
  <LocalizationWithComponent
  	text={SessionNLS.TimeoutMsg.t()}
  	components={[<Linkable href={LoginRoute.route.t()} key={'login'} />]}
  />
  ```
