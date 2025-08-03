# CLQ – Plataforma Educativa Interactiva para PAES Matemática 1

CLQ es un proyecto de código abierto diseñado para ayudar a los estudiantes de enseñanza media en Chile a prepararse para la Prueba de Acceso a la Educación Superior (PAES) en su componente de Matemática 1. El objetivo es ofrecer un **aula portátil** en forma de sitio web que permita practicar, aprender y mejorar de manera autónoma, amigable y gratuita.

## Estructura del proyecto

```
CLQ/
├── index.html          # Página de inicio con descripción y navegación
├── simulador.html       # Simulador interactivo de ensayos PAES
├── tutor.html           # Chat tutor con respuestas programadas
├── instrucciones.html   # Guía de uso y consejos de estudio
├── simulador.css        # Hoja de estilos unificada para todo el sitio
├── simulador.js         # Lógica del simulador (preguntas, temporizador, resultados)
├── assets/
│   ├── media/
│   │   └── home-bg.png  # Imagen de cabecera para la portada
│   ├── icons/           # Espacio reservado para iconos adicionales
│   └── logos/           # Espacio reservado para logotipos
└── README.md            # Este documento
```

## Cómo ejecutar la plataforma

1. Descarga o clona el repositorio en tu equipo.
2. Abre el archivo `index.html` en cualquier navegador moderno (se recomienda utilizar Chrome o Firefox). No se requiere backend ni servidor especial, ya que todo funciona de manera estática.
3. Explora las distintas secciones:
   - **Simulador Interactivo**: puedes elegir entre el modo **ensayo** (20 preguntas con cronómetro de 40 minutos) o el modo **práctica** (sin límite de tiempo y con retroalimentación inmediata en cada pregunta). Al finalizar obtendrás un resumen de tus respuestas, un gráfico comparativo de aciertos y errores y el historial de tus intentos.
   - **Tutor Matemático**: plantea preguntas en lenguaje natural sobre álgebra, geometría, funciones o probabilidad para recibir explicaciones paso a paso y ejercicios de práctica.
   - **Instrucciones**: aprende a sacar el máximo provecho al simulador y obtén consejos de estudio para la PAES.

## Personalización y ampliación

El banco de preguntas se define en `simulador.js` dentro de la constante `QUESTIONS`. Cada entrada incluye el texto de la pregunta, sus opciones, el índice de la respuesta correcta, el tema asociado y una explicación. Para agregar más preguntas o modificar las existentes, basta con editar este arreglo respetando la estructura de los objetos.

Las respuestas del tutor están programadas en la sección de script de `tutor.html`. El tutor analiza palabras clave en la consulta del usuario y ofrece una respuesta predefinida junto con un ejercicio de práctica. Puedes ampliar el diccionario de temas agregando nuevas claves dentro del objeto `tutorTopics`.

El simulador incorpora además un selector de **tema** y un **historial** de resultados que se guarda en tu navegador (localStorage). Puedes filtrar las preguntas por álgebra, geometría, funciones, probabilidad, conjuntos, datos y más. Tu historial mostrará los últimos cinco intentos con su puntuación y modo correspondiente para que puedas evaluar tu progreso.

## Consideraciones

- Este proyecto ha sido pensado para ser escalable. En versiones futuras se podrían incorporar registros de usuarios, estadísticas de progreso, conexión con APIs de modelos de lenguaje (como GPT) o convertirlo en una aplicación móvil.
- El diseño es totalmente responsivo y accesible. Puedes navegar con el teclado y el contenido se adapta a pantallas de distintos tamaños.
- Todas las líneas de código y la interfaz fueron creadas con la convicción de acercar la educación de calidad a quienes más lo necesitan.

¡Disfruta usando CLQ y mucho éxito en tu preparación para la PAES Matemática 1!