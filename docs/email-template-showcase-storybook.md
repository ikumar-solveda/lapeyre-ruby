# Showcase of Email Templates Provided OOB

E-mail templates that have been provided out of the box can be rendered without having to generate actual notifications or an invocation that allows them to be sent, using Storybook and mock data.

Storybook usage is outlined in the root [README.md](../README.md).

## Starting Storybook

Storybook for this project is best viewed using provided mock data. Therefore, a mock server instance should be used when running storybook.

- Update the project's `.env` file, e.g., `.env.local` in the root of the project, by setting the `USE_MOCK` variable to `true`
- Open two terminals/shells:
  - In the first one, invoke `yarn mock`
  - In the second one, invoke `yarn storybook`
- Storybook will launch at [http://localhost:6006/](http://localhost:6006/) (see the output in the second terminal)
- See the "EMAIL TEMPLATES" section in the left-hand side navigation bar

## Mock Data

In general most e-mail templates rely on e-spots to render content, so when viewing them inside Storybook with mock data, the content being rendered will be from mock responses.

These can of course be adjusted to visualize different things, e.g., the header content for most e-mail templates is rendered using the `EmailBanner_Content` e-spot whose mock response is stored in: [integration/mocks/wcs/resources/store/\_\_/espot/data/EmailBanner_Content.mock.json](../integration/mocks/wcs/resources/store/__/espot/data/EmailBanner_Content.mock.json)
