# Changelog

## Release 2.11 (unreleased)
Brief summary:

### Breaking Changes

---

## Release 2.10 
Brief summary:

- Segmentation masks in participant info 

### Breaking Changes

---

## Release 2.9 (11/13/2025)
Brief summary of what's in this release:
- Update to Spatial Transcriptomics view config to view images without crashing

---

## Release 2.8 (6/30/2025)
Brief summary of what's in this release:
- update to common components to get new help menu options

### Breaking changes
- n/a

--- 

## Release 2.7 (04/28/2025)
Brief summary of what's in this release:
- Added MALDI files
- Upgraded libraries

### Breaking changes
- n/a

----

## Release 2.6 (12/19/2024)
Brief summary of what's in this release:
- combined the filter trees into one
- added clinical data filters
- reorganized the filters (put into filter categories)
- added primary adjudicated category to participant report
- added tooltips to the filter pills to help disambiguate new filters
- removed units from labels in participant report since values will now include the units
- updated endpoints

### Breaking changes
Breaking changes include any database updates needed, if we need to edit any files on system (like .env or certs, etc). Things that are outside of the code itself that need changed for the system to work.
- This will not work with previous versions of pegasus-data since the graphql endpoints have changed name and structure

----


## Release 2.5 (10/3/2024)
Brief summary of what's in this release:
- Segmentation data viewer
- Participant ID visibility fix
- "Recently released" is on both tabs

### Breaking changes
None

### Non-breaking changes
- fixed a bug where the participant filters wouldn't go back to their default state after clicking the Clear Filters button


----

## Release 2.4 (released 07/08/2024)
Brief summary of what's in this release:
- introduction of this changelog
- update the version in the package.json

### Breaking changes

Breaking changes include any database updates needed, if we need to edit any files on system (like .env or certs, etc). Things that are outside of the code itself that need changed for the system to work.


### Non-breaking changes

Just a place to keep track of things that have changed in the code that we may want to pay special attention to when smoke testing, etc.
