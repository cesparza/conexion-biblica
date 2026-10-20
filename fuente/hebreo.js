/* Palabras hebreas y arameas que nombra el material (Camilo, 20-oct: «pon la palabra
   original y su transliteración»). Una sola lista: el texto de estudio, las preguntas y
   las tarjetas escriben la palabra original tal como está aquí, y tests/test.js revisa
   que toda letra hebrea del material salga de esta lista.
   `he` es la forma del texto masorético con vocales y sin acentos (Miqra según la Masora,
   leído en Sefaria el 20-oct-2026); `en` dice dónde está esa forma. `tr` es la
   transliteración sencilla que usa la app. */
const HEBREO = {
  tamid:     { he: 'תָּמִיד',   tr: 'tamid',     en: 'Daniel 8:11 (הַתָּמִיד)' },
  hatamid:   { he: 'הַתָּמִיד', tr: 'hatamid',   en: 'Daniel 8:11; 11:31' },
  nitsdaq:   { he: 'נִצְדַּק',  tr: 'nitsdaq',   en: 'Daniel 8:14 (וְנִצְדַּק)' },
  mehem:     { he: 'מֵהֶם',     tr: 'mehem',     en: 'Daniel 8:9' },
  qeranot:   { he: 'קְרָנוֹת',  tr: 'qeranot',   en: 'Zacarías 1:18 (hebreo 2:1)' },
  kadosh:    { he: 'קָדוֹשׁ',   tr: 'kadosh',    en: 'Daniel 8:13' },
  miqdash:   { he: 'מִקְדָּשׁ', tr: 'miqdash',   en: 'Daniel 11:31 (הַמִּקְדָּשׁ)' },
  jazon:     { he: 'חָזוֹן',    tr: 'jazón',     en: 'Daniel 8:1' },
  mareh:     { he: 'מַרְאֶה',   tr: 'mareh',     en: 'Daniel 9:23 (בַּמַּרְאֶה)' },
  nejtak:    { he: 'נֶחְתַּךְ', tr: 'nejtak',    en: 'Daniel 9:24, del verbo jatak' },
  vehigbir:  { he: 'וְהִגְבִּיר', tr: 'vehigbir', en: 'Daniel 9:27, del verbo gabar' },
  erebBoqer: { he: 'עֶרֶב בֹּקֶר', tr: 'ereb boqer', en: 'Daniel 8:14' },
  mikael:    { he: 'מִיכָאֵל',  tr: 'Mikael',    en: 'Daniel 10:13; 12:1' },
  yimmaletu: { he: 'יִמָּלְטוּ', tr: 'yimmaletu', en: 'Daniel 11:41' },
  yimmalet:  { he: 'יִמָּלֵט',  tr: 'yimmalet',  en: 'Daniel 12:1' },
  tselem:    { he: 'צְלֵם',     tr: 'tselem',    en: 'Daniel 2:31; 3:1 (arameo)' },
  remiv:     { he: 'רְמִיו',    tr: 'remiv',     en: 'Daniel 7:9 (arameo)' },
};
module.exports = { HEBREO };
