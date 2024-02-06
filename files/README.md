# Käyttötapaus 1: Käyttäjä katselee äänestyksiä/gallupeja

## Käyttötapauksen nimi
Katselee äänestyksiä/gallupeja

## Käyttäjät
Tavallinen käyttäjä

## Laukaisija
Käyttäjä haluaa nähdä äänestyksiä/gallupeja

## Esiehto
Käyttäjä on avannut sivuston

## Jälkiehto
Käyttäjä näkee saatavilla olevat äänestykset/gallupit

## Käyttötapauksen kulku
1. Käyttäjä avaa etusivun
2. Käyttäjä katselee äänestyksiä/gallupit
3. Käyttäjä voi äänestää/vastata halutessaan

## Poikkeuksellinen toiminta
Sivusto ei ole käytössä


# Käyttötapaus 2: Katso äänestyksen tilanne

## Käyttötapauksen nimi
Katso äänestysten/gallupin tilanne

## Käyttäjät
Tavallinen käyttäjä

## Laukaisija
Käyttäjä haluaa nähdä tietyn äänestyksen/gallupin tilanteen

## Esiehto
Käyttäjä on tullut sivulle

## Jälkiehto
Käyttäjä näkee valitun äänestyksen/gallupin tilanteen

## Käyttötapauksen kulku
1. Käyttäjä tulee sivulle
2. Sovellus näyttää äänestyksen/gallupin tilanteen heti

## Poikkeuksellinen toiminta
- Äänestyksiä/gallupeja ei ole tarjolla

# Käyttötapaus 3: Äänestä äänestyksessä/gallupissa

## Käyttötapauksen nimi
Äänestä/vastaa äänestyksessä/gallupissa

## Käyttäjät
Tavallinen käyttäjä

## Laukaisija
Käyttäjä haluaa äänestää/vastata esitettyihin kysymyksiin

## Esiehto
Käyttäjä on tullut sivulle äänestämään/vastaamaan

## Jälkiehto
Käyttäjä näkee äänestyksen/gallupin tilanteen

## Käyttötapauksen kulku
1. Käyttäjä valitsee gallupin, johon haluaa vastata
2. Käyttäjä vastaa haluamaansa gallup-kysymykseen
3. Sovellus päivittää tilanteen

## Poikkeuksellinen toiminta
- Gallupeja ei ole tarjolla


# Käyttötapaus 4: Luo äänestys

## Käyttötapauksen nimi
Luo äänestys

## Käyttäjät
Ylläpitäjä

## Laukaisija
Ylläpitäjä haluaa luoda uuden äänestyksen

## Esiehto
Ylläpitäjä on kirjautunut sisään (kt:admin ss:admin)

## Jälkiehto
Uusi gallup/kysymys on luotu

## Käyttötapauksen kulku
1. Ylläpitäjä valitsee "Luo uusi" -vaihtoehdon
2. Sovellus avaa lomakkeen, jossa ylläpitäjä syöttää kysymyksen
3. Ylläpitäjä vahvistaa äänestyksen luomisen (Enter)
4. Sovellus tallentaa uuden äänestyksen

## Poikkeuksellinen toiminta
- Ylläpitäjä ei paina "Luo uusi" -nappia - gallupia ei luoda


# Käyttötapaus 5: Poista äänestys/gallup

## Käyttötapauksen nimi
Poista gallup

## Käyttäjät
Ylläpitäjä

## Laukaisija
Ylläpitäjä haluaa poistaa gallupin

## Esiehto
Ylläpitäjä on kirjautunut sisään ja on valinnut gallupin poistettavaksi

## Jälkiehto
Äänestys on poistettu

## Käyttötapauksen kulku
1. Ylläpitäjä poistaa gallupin (Tyhjennä tai sulje nappi)
2. Sovellus poistaa äänestyksen

## Poikkeuksellinen toiminta
- Äänestyksiä ei ole luotu, joten niitä ei voi poistaa


