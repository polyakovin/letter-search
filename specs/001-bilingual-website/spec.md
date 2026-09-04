# Feature Specification: Bilingual Letter Search website

**Created**: 2026-09-04 · **Status**: Ready for implementation
**Input**: Public Russian/English project website, two playable picture demos, group-play ideas, custom-picture enquiry and the specified Gugark example. Publish to polyakovin/letter-search on GitHub Pages.

## User Scenarios & Testing

### US1 — Understand and try the game (P1)
A visitor learns to name visible nouns beginning with one letter in two minutes, then plays two free Russian sample scenes.
**Why**: Trying a round is the main way to understand the service.
**Independent test**: Start a round, submit nouns, finish and review the result without Telegram or registration.
**Acceptance**:
1. Ready scene stays untimed until Start; running scene stops accepting answers at 120 seconds, including after switching browser tabs.
2. Input accepts comma/space/newline separated words; case, duplicate words and aliases for the same object cannot increase the score.
3. Wrong-letter and unknown words receive distinct feedback. Results disclose the curated, non-exhaustive answer list and allow replay or the second scene.
4. Images can be enlarged using a keyboard-accessible control.

### US2 — Play in English (P1)
English visitors get localized navigation, explanations, cases, feedback and two English-adapted illustrations with meaningful English target letters.
**Independent test**: Open the English URL directly, play both scenes, switch language and reload.
**Acceptance**: Russian defaults at the root; English has its own linkable page. Language switches reset an active demo with notice. Each scene uses its locale-specific picture, letter and reviewed answer list.

### US3 — Bring the game to a group or order custom art (P2)
Visitors see examples for weddings, birthdays, friends, family and teams, plus a custom illustration offer.
**Independent test**: Read use cases, inspect the exact Gugark picture and follow the enquiry link.
**Acceptance**: Explain how to play together using a screen or printout, paper and timer. Clearly identify suggested formats. The custom section includes the supplied image 6b06919d-8891-45b4-80e6-f37995adb02c, briefing suggestions, and a real contact.

## Requirements
- **FR-001**: Explain the service, the two-minute noun/letter rule and Telegram entry point.
- **FR-002**: Provide two Russian ready-image demos with start, finish, replay, scene selection and visible countdown.
- **FR-003**: Normalize and deduplicate answers by depicted object, distinguish invalid and unlisted responses, show accepted nouns and illustrative answers after completion.
- **FR-004**: Provide full Russian and English content, direct locale URLs, adapted English images and English word sets.
- **FR-005**: Provide at least four concrete social use cases and simple group-play instructions.
- **FR-006**: Show the exact requested personalized example, describe customization and provide a working enquiry route.
- **FR-007**: Publish the complete site at the user-requested public GitHub repository and verify the deployed pages.
- **FR-008**: Support phone/desktop, keyboard operation, readable focus states and enlarged images; preserve core explanatory content without JavaScript.
- **FR-009**: Store no submitted answers remotely, require no account and publish only selected public site assets.

### Edge cases
Empty/punctuation input, wrong alphabet, repeats/aliases, unknown valid nouns, submit at deadline, background tab expiry, replay after completion, scene changes mid-round, language changes mid-round, image load failure, no JavaScript, narrow phones. Scene changes intentionally reset the round and announce that fact. Unknown nouns do not imply an incorrect observation.

### Key entities
Scene (locale, image, letter, named objects/aliases); round (ready/running/finished, deadline, accepted objects); locale page (copy and links).

## Success Criteria
- **SC-001**: Both scenes can be started and completed in each language without registration.
- **SC-002**: A round stops at two minutes even after a background-tab delay; no late answer scores.
- **SC-003**: All primary flows work at 375px and 1440px viewport widths without horizontal page overflow.
- **SC-004**: Both public locale URLs load their images and playable demo after deployment.
- **SC-005**: Each language includes at least four use cases and the requested personalized example.

## Assumptions and compatibility
This is an independent public website in the empty `polyakovin/letter-search` repository. The private bot repository, runtime rules and runtime state remain untouched. Website demo uses fixed letters and a curated list; this deliberately differs from the Telegram game which selects a letter from answers. It is explicitly described as a demo. No pricing, customer testimonials, legal claims, payment, form backend or English Telegram service is promised. Contact is to be supplied; verified public project Telegram is a fallback. Images reused with the owner's explicit instruction. Publishing the site is authorized by the user.
