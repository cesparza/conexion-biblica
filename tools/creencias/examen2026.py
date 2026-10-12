"""Preguntas que la app no hacía y el examen sí.

DE DONDE SALEN
1. EL EXAMEN REAL. «En esto creemos», campamento de Aventureros «Aventuras en
   Familia», Asomagdalena, 9 a 12 de octubre de 2026 (Cachipay). Camilo mandó
   las 26 preguntas en fotos el 12-oct: el club ganó, 25 de 26. Van con su
   redacción y sus opciones tal cual, y la respuesta es la que dio el jurado.
   Una cambia: la 23 traía una quinta opción, «Ninguna de las anteriores»; la
   app pregunta con cuatro, y se quita esa porque es la que no enseña nada.
2. LAS INTRODUCCIONES DE LAS SEIS DOCTRINAS. La que se falló (la 1, «teología
   propia») salía de la introducción de la doctrina de Dios, una hoja que la
   app no mostraba ni preguntaba. Regla de Camilo desde ese día: todo lo que
   se pide estudiar es susceptible de ser preguntado. Así que cada
   introducción se muestra (gen_creencias.py) y se pregunta (abajo).

EL RESPALDO de cada una (el último campo) es el trozo literal de cartilla.txt
que la contesta, y el generador exige que esté ahí. Dos excepciones, dichas:
  · 'DOCTRINAS': la 23 se contesta con el reparto de las seis doctrinas
    (creencias 19 a 23), que es dato de datos.DOCTRINAS.
  · 'LIBRO': dos que el examen preguntó con palabras que NO son las de la
    cartilla transcrita, sino las del libro de las 28 (declaración completa).
      - La 7 («ser mayordomo de la creación»): la cartilla dice «llamados a
        amar a Dios, al prójimo y a cuidar el entorno»; el libro, «creados
        para ser mayordomos del ambiente».
      - La 13 («renueva nuestras mentes, graba su ley en nuestros
        corazones»): el libro dice eso mismo; cartilla.txt dice «renueva
        nuestros corazones y nuestras mentes, graba su ley en nuestras
        mentes». O la cartilla impresa trae una errata, o la transcripción
        tiene un error. HAY QUE MIRARLO EN EL IMPRESO (12-oct, sin hacer).
    Entran igual, porque el examen las hizo. La respuesta va
primera (`a=0`); la app baraja al armar cada examen.
"""

# (creencia, nivel, pregunta, [correcta, otras...], respaldo literal en cartilla.txt)
EXAMEN_2026 = [
    (1, 1, 'Según la cartilla, la doctrina de Dios también es conocida como:',
     ['Teología propia.', 'Teología sistemática.', 'Teología bíblica.', 'Teología práctica.'],
     'es también conocida como teología propia'),
    (1, 2, '¿Por medio de quiénes fue transmitida por inspiración divina la Palabra de Dios escrita?',
     ['De santos hombres de Dios que hablaron y escribieron impulsados por el Espíritu Santo.',
      'De los profetas y apóstoles escogidos por Dios.',
      'De los patriarcas y profetas de Israel.',
      'De hombres escogidos para preservar las enseñanzas de Dios.'],
     'mediante santos hombres de Dios que hablaron y escribieron impulsados por el Espíritu Santo'),
    (2, 1, 'Según la cartilla, hay un solo Dios constituido por:',
     ['Padre, Hijo y Espíritu Santo.', 'Padre, Jesucristo y Espíritu de Dios.',
      'Padre, Hijo y los ángeles celestiales.', 'Padre y Hijo únicamente.'],
     'Hay un solo Dios: Padre, Hijo y Espíritu Santo'),
    (3, 2, 'Según el material, Dios, el Padre Eterno, es:',
     ['El Creador, Originador, Sustentador y Soberano de toda la creación.',
      'El Salvador y Redentor de toda la humanidad.',
      'El Gobernante, Juez y Salvador de toda la creación.',
      'El Creador y Sustentador únicamente de los seres humanos.'],
     'es el Creador, Originador, Sustentador y Soberano de toda la creación'),
    (4, 3, '¿Cuál de las siguientes afirmaciones reproduce correctamente lo enseñado acerca del Hijo Eterno?',
     ['Aunque era eternamente Dios, también se hizo verdaderamente hombre. Fue concebido por el Espíritu Santo, '
      'nació de María, vivió sin pecado y reveló el amor y la justicia divina.',
      'Aunque era verdaderamente Dios, se hizo completamente hombre. Fue concebido por el Espíritu Santo, '
      'nació de María, venció el pecado y manifestó el amor y la justicia divina.',
      'Aunque era eternamente Dios, también asumió naturaleza humana. Fue concebido por el Espíritu Santo, '
      'nació de la virgen María, vivió sin pecado y manifestó el carácter divino.',
      'Aunque era Dios desde la eternidad, se hizo verdaderamente hombre. Nació de María por obra del '
      'Espíritu Santo, vivió sin pecado y reveló la justicia y misericordia de Dios.'],
     'también se hizo verdaderamente hombre. Fue concebido por el Espíritu Santo, nació de María, vivió sin pecado'),
    (5, 2, 'Además de conceder dones espirituales a la iglesia, ¿para qué la capacita el Espíritu Santo?',
     ['Para dar testimonio en favor de Cristo.', 'Para interpretar independientemente las Escrituras.',
      'Para realizar milagros y señales.', 'Para gobernar sobre todas las naciones.'],
     'testimonio en favor de Cristo'),
    (7, 2, 'Según la cartilla, a pesar del pecado, ¿qué tarea sigue conservando el hombre en el mundo actual?',
     ['Ser mayordomo de la creación, orientando su responsabilidad hacia su amor a Dios y a sus semejantes.',
      'Reflejar perfectamente el carácter divino como imagen y semejanza de Dios.',
      'Recuperar mediante su obediencia la dignidad que perdió en el Jardín del Edén.',
      'Ejercer dominio sobre la creación para restaurar la condición original del mundo.'],
     'LIBRO'),
    (6, 2, '¿Cuál de los siguientes textos bíblicos NO es utilizado por el autor para fundamentar la creencia de la Creación?',
     ['Nehemías 9:6.', 'Génesis 1:1.', 'Éxodo 20:8-11.', 'Salmos 33:6, 9.'],
     'Génesis 1; 2; Éxodo 20:8-11; Salmos 19:1-6; 33:6, 9; 104; Hebreos 11:3'),
    (7, 1, 'Según la cartilla Esto Creemos, ¿para qué fuimos creados?',
     ['Para su gloria.', 'Para hacer buenas obras.', 'Para honrar a Dios.', 'Para obedecer su Palabra.'],
     'Fuimos creados para su gloria'),
    (10, 1, 'Según la cartilla, ¿cuál es el orden de las etapas que implica la salvación?',
     ['Justificación, santificación y glorificación.', 'Santificación, justificación y glorificación.',
      'Justificación, glorificación y santificación.', 'Glorificación, santificación y justificación.'],
     'comenzando con la justificación, continuando con la santificación y culminando con la glorificación'),
    (8, 2, '¿Sobre qué aspectos se desarrolla el conflicto entre Cristo y Satanás?',
     ['El carácter de Dios, su ley y su soberanía.', 'El carácter de Dios, su Palabra y sus estatutos.',
      'El carácter de Dios, sus preceptos y su soberanía.', 'El carácter de Dios, su autoridad y su poder.'],
     'sobre el carácter de Dios, su ley y su soberanía'),
    (9, 2, '¿Cómo se caracteriza el sacrificio de Cristo?',
     ['Vicario, expiatorio, reconciliador y transformador.', 'Redentor, expiatorio, santificador y transformador.',
      'Vicario, reconciliador, justificador y restaurador.', 'Sustitutivo, redentor, reconciliador y santificador.'],
     'su sacrificio es vicario, expiatorio, reconciliador y transformador'),
    (10, 3, '¿Qué obra realiza el Espíritu en la experiencia de la salvación?',
     ['Nos hace nacer de nuevo, renueva nuestras mentes, graba su ley en nuestros corazones y nos capacita para una vida santa.',
      'Nos hace nacer de nuevo, transforma nuestras mentes, escribe su Palabra en nuestros corazones y nos capacita para una vida santa.',
      'Nos hace nacer de nuevo, renueva nuestros corazones, graba su ley en nuestras mentes y nos capacita para una vida de obediencia.',
      'Nos hace nacer de nuevo, renueva nuestras mentes, coloca su voluntad en nuestros corazones y nos capacita para vencer el pecado.'],
     'LIBRO'),
    (15, 1, '¿Cómo se incorporan los creyentes a la familia de la iglesia?',
     ['Por el bautismo.', 'Por la fe.', 'Por el servicio.', 'Por la Cena del Señor.'],
     'A través del bautismo, los creyentes se incorporan a esta familia'),
    (11, 2, '¿Cuál de los siguientes textos bíblicos es citado en la creencia crecer en Cristo?',
     ['Efesios 6:12-18.', 'Génesis 1:1.', 'Apocalipsis 14:6.', 'Daniel 8:14.'],
     'Efesios 5:19,20; 6:12-18'),
    (12, 1, '¿Quién es la cabeza de la iglesia?',
     ['Cristo.', 'El Espíritu Santo.', 'Los apóstoles.', 'Las Escrituras.'],
     'Cristo es la cabeza de esta comunidad espiritual'),
    (13, 1, '¿Por cuántos ángeles de Apocalipsis 14 está simbolizada la proclamación del remanente?',
     ['Tres ángeles.', 'Dos ángeles.', 'Cuatro ángeles.', 'Siete ángeles.'],
     'está simbolizada por los tres ángeles de Apocalipsis 14'),
    (13, 2, 'Según la cartilla, ¿qué tres cosas anuncia, proclama y pregona el remanente?',
     ['La hora del juicio, la salvación por medio de Cristo y la proximidad de su segunda venida.',
      'El juicio final, la justificación por la fe y el regreso de Cristo.',
      'La hora del juicio, el arrepentimiento y la reforma en la Tierra.',
      'La salvación por medio de Cristo, los mandamientos de Dios y la fe de Jesús.'],
     'anuncia la llegada de la hora del juicio, proclama la salvación por medio de Cristo y pregona la proximidad de su segunda venida'),
    (15, 2, 'Según la creencia del bautismo, ¿de qué tres cosas es símbolo el bautismo?',
     ['De nuestra unión con Cristo, del perdón de nuestros pecados y de nuestro recibimiento del Espíritu Santo.',
      'De nuestra fe en Cristo, del arrepentimiento y de nuestra entrada a la iglesia.',
      'De la muerte al pecado, de la obediencia y de una nueva vida.',
      'De nuestra unión con Cristo, de la salvación y de la aceptación de las Escrituras.'],
     'es un símbolo de nuestra unión con Cristo, del perdón de nuestros pecados y de nuestro recibimiento del Espíritu Santo'),
    (16, 2, 'Según la cartilla, ¿qué incluye la preparación para la Cena del Señor?',
     ['Examen de conciencia, arrepentimiento y confesión.', 'Oración, ayuno y confesión.',
      'Arrepentimiento, bautismo y lavamiento de los pies.', 'Examen de conciencia, oración y servicio.'],
     'la preparación para la Cena incluye un examen de conciencia, el arrepentimiento y la confesión'),
    (17, 1, 'Según la cartilla, ¿quién distribuye los dones espirituales según su voluntad?',
     ['El Espíritu Santo.', 'La iglesia.', 'Jesucristo.', 'Los dirigentes de la iglesia.'],
     'distribuidos por el Espíritu Santo según su voluntad'),
    (18, 2, '¿Cuál de los siguientes textos bíblicos sirve para explicar la creencia del don de profecía?',
     ['Apocalipsis 19:10.', 'Génesis 2:1-3.', 'Mateo 28:19, 20.', 'Romanos 6:1-6.'],
     'Apocalipsis 12:17; 19:10'),
    (19, 2, '¿Cuáles creencias componen la doctrina de la vida cristiana?',
     ['La ley, el sábado, la mayordomía, conducta cristiana, matrimonio y familia.',
      'El Sábado, el Santuario, la ley de Dios, la mayordomía.',
      'Matrimonio y la familia, La conducta Cristiana, La vestimenta.',
      'La ley, régimen pro-salud, el sábado, la mayordomía, conducta Cristiana.'],
     'DOCTRINAS'),
    (24, 2, 'Según la cartilla, ¿qué comenzó en 1844?',
     ['La fase final de su ministerio: el juicio investigador.', 'El ministerio de Cristo como Sumo Sacerdote.',
      'El tiempo de prueba antes de su regreso.', 'El Día de la Expiación en la Tierra.'],
     'en 1844 comenzó la fase final de su ministerio: el juicio investigador'),
    (26, 1, '¿Qué es la muerte hasta que Dios dé vida eterna a los redimidos?',
     ['Un estado de inconsciencia.', 'Un estado de descanso.', 'Una separación temporal.', 'Un estado de espera.'],
     'la muerte es un estado de inconsciencia'),
    (27, 2, '¿Qué ocurrirá al final del milenio, según la cartilla?',
     ['Cristo, los redimidos y la Santa Ciudad descenderán del cielo.',
      'Cristo y los santos permanecerán en el cielo.',
      'Los justos resucitarán y serán llevados al cielo.',
      'La Tierra quedará desolada, habitada solo por Satanás y sus ángeles.'],
     'Al final del milenio, Cristo, los redimidos y la Santa Ciudad descenderán del cielo'),
]

# Lo que la introducción de cada doctrina enseña y el examen no alcanzó a
# preguntar. Mismo formato; la creencia es la primera de la doctrina, que es
# donde la app muestra la introducción.
INTRODUCCIONES = [
    (1, 2, 'Según la cartilla, ¿qué estudia la doctrina de Dios?',
     ['La naturaleza, atributos y obras de Dios.', 'La historia del pueblo de Dios.',
      'Los mandamientos y principios de vida de Dios.', 'El plan de Dios para rescatar a la humanidad.'],
     'estudia la naturaleza, atributos y obras de Dios'),
    (6, 1, 'Según la cartilla, ¿en qué se centra la doctrina del hombre?',
     ['En la creación del ser humano a imagen y semejanza de Dios.',
      'En el pecado cometido por Adán y Eva en el Jardín del Edén.',
      'En la responsabilidad de cuidar el mundo que Dios creó.',
      'En la muerte y la resurrección de todos los seres humanos.'],
     'se centra en la creación del ser humano a imagen y semejanza de Dios'),
    (6, 2, 'Según la introducción de la doctrina del hombre, ¿qué le confiere al ser humano haber sido creado a imagen de Dios?',
     ['Un valor intrínseco y una dignidad inigualable.', 'El dominio sobre toda la tierra y sus criaturas.',
      'La inmortalidad del alma desde su nacimiento.', 'Una naturaleza libre de pecado para siempre.'],
     'confiere a cada individuo un valor intrínseco y una dignidad inigualable'),
    (8, 1, 'Según la cartilla, la salvación es un regalo inmerecido que se recibe por medio de:',
     ['La fe.', 'Las buenas obras.', 'La obediencia a la ley.', 'El bautismo.'],
     'es un regalo inmerecido que se recibe por medio de la fe'),
    (8, 2, 'Según la cartilla, ¿en qué se centra la doctrina de la salvación?',
     ['En el plan divino para rescatar a la humanidad del pecado y sus consecuencias.',
      'En los eventos que precederán el regreso de Cristo.',
      'En la creación del ser humano a imagen y semejanza de Dios.',
      'En la obediencia a los diez mandamientos.'],
     'se centra en el plan divino para rescatar a la humanidad del pecado y sus consecuencias'),
    (11, 2, 'Según la introducción de la doctrina de la iglesia, ¿qué celebra la Cena del Señor?',
     ['Su gracia y unidad.', 'Su muerte y resurrección.', 'Su segunda venida.', 'El perdón de los pecados.'],
     'la Cena del Señor celebra su gracia y unidad'),
    (11, 1, 'Según la cartilla, la iglesia es:',
     ['El cuerpo de Cristo, compuesto por todos los creyentes llamados por el Espíritu Santo.',
      'La comunidad de los que guardan el sábado y esperan la segunda venida de Cristo.',
      'El remanente de los últimos días, que anuncia la hora del juicio a todo el mundo.',
      'La familia de los bautizados que se reúnen cada semana en una misma congregación.'],
     'es el cuerpo de Cristo, compuesto por todos los creyentes llamados por el Espíritu Santo'),
    (19, 2, 'Según la introducción de la doctrina de la vida cristiana, ¿dónde están establecidos los mandamientos y principios de vida?',
     ['En los diez mandamientos.', 'En el Sermón del Monte.', 'En el libro de Proverbios.', 'En las epístolas de Pablo.'],
     'establecidos en los diez mandamientos'),
    (19, 2, 'Según la cartilla, ¿cómo reconocemos el matrimonio?',
     ['Como una institución sagrada establecida por Dios entre un hombre y una mujer.',
      'Como un pacto civil entre dos personas que deciden formar una familia.',
      'Como una tradición de la iglesia que se celebra ante la congregación.',
      'Como una institución establecida por Dios después de la caída del hombre.'],
     'reconociendo el matrimonio como una institución sagrada establecida por Dios entre un hombre y una mujer'),
    (24, 1, 'Según la cartilla, ¿en qué libros se basa principalmente la doctrina de los acontecimientos finales?',
     ['Daniel y Apocalipsis.', 'Isaías y Ezequiel.', 'Mateo y Lucas.', 'Génesis y Éxodo.'],
     'principalmente los libros de Daniel y Apocalipsis'),
    (24, 2, 'Según la cartilla, ¿en qué se centra la doctrina de los acontecimientos finales?',
     ['En los eventos que precederán el regreso de Cristo y la conclusión de la historia humana en esta tierra.',
      'En el plan divino para rescatar a la humanidad del pecado y sus consecuencias.',
      'En la obra de Cristo en el santuario terrenal y en el día de la expiación.',
      'En la vida de los redimidos en el cielo durante los mil años del milenio.'],
     'se centra en los eventos que precederán el regreso de Cristo y la conclusión de la historia humana en esta tierra'),
]
