# Qadeer Coffee Co Ads Launch Checklist

Use this before running Google Ads, Meta Ads, or boosted Instagram traffic.

## 1. Fix DNS and HTTPS

DNS is managed in Squarespace.

In Squarespace, go to:

`Settings` -> `Domains` -> `qadeercoffee.co` -> `DNS Settings`

For the root/apex domain, host/name `@`, keep only these GitHub Pages `A` records:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Delete this `A` record if it is still present:

```txt
23.227.38.69
```

For `www`, use a `CNAME` pointing to the GitHub Pages hostname shown in the repository's GitHub Pages settings, likely:

```txt
qadeercoffeeco.github.io
```

Then go to the GitHub repo:

`Settings` -> `Pages`

Confirm the custom domain is:

```txt
qadeercoffee.co
```

If HTTPS does not renew after DNS propagation, remove the custom domain, save, add it again, then enable `Enforce HTTPS` once GitHub issues the certificate.

## 2. Publish the landing pages

This repo now includes these intent-specific landing pages:

- `coffee-catering-services.html`
- `wedding-coffee-catering-nj-nyc-pa.html`
- `corporate-coffee-catering-nyc-nj-pa.html`
- `conference-coffee-catering-trade-shows.html`

Use these as final URLs for ads instead of sending all traffic to the homepage.

## 3. Configure Tally redirect

In Tally, set the Qadeer Coffee Co booking form's post-submit redirect to:

```txt
https://qadeercoffee.co/thank-you.html
```

That gives Google Ads and Meta Ads a clean conversion URL for lead submissions.

## 4. Starting package guidance

Use this pricing language on ads and landing pages:

- Espresso Bar starts at `$900`
- Matcha Bar starts at `$900`
- Full Service starts at `$1,000`
- Travel fees may apply outside Princeton, NJ

For conferences, trade shows, custom mocktail service, and larger activations, use `custom quote based on guest count, service window, location, and branding needs`.

## 5. Tracking IDs needed

Add tracking only after these values are available:

- Google Analytics 4 measurement ID, example `G-XXXXXXXXXX`
- Google Ads conversion ID, example `AW-123456789`
- Google Ads lead conversion label
- Meta Pixel ID

Once those are provided, add:

- base Google tag on every page
- Google Ads lead conversion event on `thank-you.html`
- Meta Pixel base code on every page
- Meta `Lead` event on `thank-you.html`
- UTMs on every ad

## 6. Recommended ad URLs

Google Search ads:

- Wedding coffee catering: `https://qadeercoffee.co/wedding-coffee-catering-nj-nyc-pa.html`
- Corporate coffee catering: `https://qadeercoffee.co/corporate-coffee-catering-nyc-nj-pa.html`
- Conference coffee catering: `https://qadeercoffee.co/conference-coffee-catering-trade-shows.html`
- General mobile coffee cart: `https://qadeercoffee.co/coffee-catering-services.html`

Meta and Instagram ads:

- Wedding visuals: `https://qadeercoffee.co/wedding-coffee-catering-nj-nyc-pa.html`
- Corporate/event visuals: `https://qadeercoffee.co/corporate-coffee-catering-nyc-nj-pa.html`
- Trade show/conference visuals: `https://qadeercoffee.co/conference-coffee-catering-trade-shows.html`

## 7. Assets still worth adding

For stronger conversion rates, add:

- 3-5 wedding setup photos
- 3-5 corporate or brand activation photos
- conference/high-volume setup photos
- permission-approved client logos
- short testimonials by event type
- starting package ranges, if comfortable
