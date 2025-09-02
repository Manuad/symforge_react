import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header & Navigation */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
              <div className="absolute inset-1 bg-background rounded transform rotate-45"></div>
            </div>
            <span className="text-2xl font-bold">Symforge</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Inicio
            </Link>
          </div>
          <Button asChild className="hidden md:block font-semibold">
            <Link href="/#contacto">Contactar</Link>
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Aviso de{' '}
            <span className="bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">
              Privacidad
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Tu privacidad es importante para nosotros. Conoce cómo protegemos y tratamos tus datos personales.
          </p>
        </div>

        {/* Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="space-y-8 p-8">
            {/* Sección 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Identidad y Domicilio del Responsable
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Symforge es el responsable del tratamiento de sus datos personales. 
                Nuestro domicilio es Lázaro Cardenas #8, colonia el Arenal 1ra sección, 
                delegación Venustiano Carranza. C.P. 15600, CDMX
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Información que Recopilamos
              </h2>
              <p className="text-muted-foreground mb-4">
                Recopilamos la siguiente información personal cuando usted nos contacta a través de nuestro sitio web:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Datos de identificación: Nombre completo / nombre de la empresa.</li>
                <li>Datos de contacto: Dirección de correo electrónico, número de teléfono.</li>
                <li>Datos de servicio: Información sobre el servicio de interés.</li>
              </ul>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Finalidades del Tratamiento
              </h2>
              <p className="text-muted-foreground mb-4">
                La información recopilada se utiliza para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Finalidad primaria:</strong> Contactarle en relación con los servicios solicitados para responder a sus consultas, enviar propuestas y cotizaciones.</li>
                <li><strong>Finalidad secundaria:</strong> Mejorar nuestros servicios y la experiencia del usuario, así como para fines estadísticos.</li>
              </ul>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Período de Retención
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Conservaremos su información personal durante un período de 12 meses después del último contacto. 
                Una vez finalizado este período, sus datos serán eliminados de forma segura.
              </p>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Protección de Datos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger sus datos personales 
                contra el acceso, uso o divulgación no autorizados.
              </p>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Derechos del Titular (Derechos ARCO)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y 
                las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección 
                de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); 
                que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo 
                utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Para ejercer cualquiera de estos derechos, por favor envíe su solicitud al correo electrónico:{' '}
                <a href="mailto:privacidad@symforgesolutions.com" className="text-primary hover:underline">
                  privacidad@symforgesolutions.com
                </a>
              </p>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Contacto
              </h2>
              <p className="text-muted-foreground mb-4">
                Si tiene preguntas sobre este aviso de privacidad o el tratamiento de sus datos, puede contactarnos en:
              </p>
              <div className="bg-secondary p-4 rounded-lg">
                <a 
                  href="mailto:contacto@symforgesolutions.com" 
                  className="text-primary hover:text-primary/90 flex items-center gap-2"
                >
                  <span className="sr-only">Email</span>
                  contacto@symforgesolutions.com
                </a>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
