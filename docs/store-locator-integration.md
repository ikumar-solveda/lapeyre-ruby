# Store Locator Integration

## API Key

If you want to enable Google Maps functionality in the store locator, you will require an API Key. Please create an API Key in Google Cloud Console https://developers.google.com/maps/documentation/javascript/get-api-key

Once you have an API Key, you can add it to the `.env.local` file. You may use the `.env.local.example` file as reference.

```
MAP_API_KEY=
```

## Hosts file configuration (Dev environment only)

In order to access Google Maps from the dev environment, you will need to map the localhost IP (127.0.0.1) to a domain name you set in the list of allowed referrers in Google Cloud Console. Otherwise Google Maps will block any requests, citing the `RefererNotAllowedMapError` https://developers.google.com/maps/documentation/javascript/error-messages

You can map the localhost IP in the Windows `etc/hosts` file, example below:

```
127.0.0.1 mydomain.com
```
