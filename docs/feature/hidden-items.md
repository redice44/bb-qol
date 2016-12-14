# Hidden Item Enhancement

> To improve the visual indication of hidden items.

## Specifications

**Definition:** A [Content Object](../core/content-obj.md) that has an Availability of "Item is not available." or "Item is no longer available". See [Developer Usage](#developer) for more details.

**Goal:** To provide a customizable indication for a hidden content object.

### Developer

**Curent Flags**

These are the current indications that a content object is hidden. Current build only checks for the Availability prefix.

- Availability: Item is not available.
- Availability: Item is no longer available. It was last available on DATE.
- Availability: Item is not available. It will be available after DATE.