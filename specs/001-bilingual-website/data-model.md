# Data model
Scene: id, locale, title, letter, image, alt, objects [{id, label, aliases[]}]. Each alias maps to one object and starts with the locale letter. Canonical normalization: trim, lower-case, Russian ё→е, NFC.
Round: status ready|running|finished, deadline milliseconds|null, accepted object IDs. start sets now+120000. submit first checks deadline; empty, wrong-letter, duplicate and unknown replies cannot change accepted IDs. finish is idempotent. Reset returns ready and clears accepted objects.
Page: locale ru|en, metadata, navigation, story, demo copy, use cases, contact. All dynamic text is inserted as text content.
