/**
 * Entry requirements, named once and referenced everywhere.
 *
 * The brochure repeats the same handful of phrases across 130 table rows, with inconsistent
 * capitalisation and spacing ("KCSE Mean Grade c &above", "KCSE Mean grade D& above"). Naming
 * them here means a wording change happens in one place, and a typo cannot reach half the
 * catalogue.
 *
 * Each has two forms. `full` is the sentence a course page shows. `short` is for the
 * catalogue table, where a column of "KCSE mean grade C and above" would push the fees off
 * the screen — the column header supplies the context the words drop.
 *
 * See docs/BROCHURE-TRANSCRIPTION.md for which courses carry which requirement.
 */
const requirement = (full, short) => ({ full, short })

export const entry = {
  OPEN: requirement('Open to all', 'Open'),
  KCPE: requirement('KCPE and above', 'KCPE'),
  KCSE: requirement('KCSE', 'KCSE'),
  KCSE_BELOW_D: requirement('KCSE grade below D', 'KCSE < D'),
  KCSE_D: requirement('KCSE mean grade D and above', 'KCSE ≥ D'),
  KCSE_C_MINUS: requirement('KCSE mean grade C- and above', 'KCSE ≥ C−'),
  KCSE_C: requirement('KCSE mean grade C and above', 'KCSE ≥ C'),
  KCSE_C_PLUS: requirement('KCSE mean grade C+', 'KCSE C+'),
  CERTIFICATE: requirement('Certificate level', 'Certificate'),
  DIPLOMA: requirement('Diploma level', 'Diploma'),
  FOUNDATION: requirement('Foundation level', 'Foundation'),
  INTERMEDIATE: requirement('Intermediate level', 'Intermediate'),
}
