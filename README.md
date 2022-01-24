# Ponball DB

### Scrapes IPDB for these values

```
  - ipdbId
  - title
  - type
  - manufacturer
  - manufactureDate
  - manufacturerTradeName
  - manufacturerFirstYear
  - manufacturerLastYear
  - production
  - mpu
  - theme
  - specialty
  - features
  - design
  - art
  - dotsAnimation
  - mechanics
  - sound
  - software
  - notes
  - ruleSheets
  - roms
  - docs
  - labels
```

### PostgreSQL tables

```
  - machine
  - label
  - manufacturer
  - mpu
  - contributor
  - contributor_machine
  - files
```

### Endpoints

```
  /api/vi/machines/

  Get all machines.
  - ipdb
  - title
  - date
  - manufacturer
```

```
  /api/vi/machines/:id

  Get machine by IPDB id.
  - id
  - ipdb
  - title
  - manufacturer
  - date
  - unitsProduced
  - mpu
  - design
  - art
  - dotsAnimation
  - mechanics
  - sound
  - software
  - ruleSheets
  - roms
  - docs
```
