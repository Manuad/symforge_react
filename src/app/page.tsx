'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, PhoneIcon, MailIcon, CheckCircleIcon, ClockIcon, UsersIcon, CloudIcon, ShieldIcon, LightbulbIcon, RocketIcon, MessageCircleIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [showCalendarSuccess, setShowCalendarSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    privacy: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'automatizaciones', 'nosotros', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, servicio: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacy: checked }));
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.empresa.trim()) {
      errors.empresa = 'La empresa es requerida';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (formData.telefono && !/^\+?[\d\s-]+$/.test(formData.telefono)) {
      errors.telefono = 'El teléfono no es válido';
    }
    
    if (!formData.privacy) {
      errors.privacy = 'Debes aceptar la política de privacidad';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormErrors({});
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
        privacy: false
      });
      setSubmitSuccess(false);
    }, 5000);
  };

  // Handle calendar booking
  const handleCalendarConfirm = () => {
    if (selectedDate) {
      setIsCalendarOpen(false);
      setShowCalendarSuccess(true);
      
      // Generate Google Calendar link
      const dateStr = format(selectedDate, 'yyyyMMdd');
      const startTime = selectedTime.replace(':', '');
      const endTime = `${parseInt(selectedTime.split(':')[0]) + 1}${selectedTime.split(':')[1]}`;
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consulta%20con%20Symforge&dates=${dateStr}T${startTime}00Z/${dateStr}T${endTime}00Z&details=Reuni%C3%B3n%20para%20discutir%20servicios%20de%20desarrollo%20de%20software.&location=Online`;
      
      // Open Google Calendar in new tab
      window.open(googleCalendarUrl, '_blank');
    }
  };

  // Time slots for calendar
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Services data
  const services = [
    {
      icon: <RocketIcon className="h-12 w-12 text-primary" />,
      title: "Más ventas en línea",
      description: "Desarrollamos aplicaciones sencillas y eficientes que conectan con tus clientes y te ayudan a vender más."
    },
    {
      icon: <PhoneIcon className="h-12 w-12 text-primary" />,
      title: "Controla tu negocio desde el celular",
      description: "Digitaliza tus procesos para poder trabajar desde cualquier lugar, optimizar costos y tener el control total."
    },
    {
      icon: <ShieldIcon className="h-12 w-12 text-primary" />,
      title: "Sistemas más rápidos y seguros",
      description: "Mejoramos tu tecnología para que no se caiga, funcione rápido y esté siempre disponible cuando lo necesites."
    },
    {
      icon: <UsersIcon className="h-12 w-12 text-primary" />,
      title: "Consultoría Estratégica",
      description: "Te damos consejos claros y sencillos para usar la tecnología a tu favor y tomar las mejores decisiones para tu negocio."
    }
  ];

  // Automation features
  const automationFeatures = [
    {
      title: "Automatización de Tareas",
      description: "Elimina el trabajo manual. Diseñamos soluciones que te ahorran tiempo y reducen errores, para que te enfoques en tu negocio."
    },
    {
      title: "Plataformas Robustas y Seguras",
      description: "Construimos tu plataforma con tecnología de vanguardia para garantizar que sea confiable, escalable y segura."
    },
    {
      title: "Soporte en la Nube",
      description: "Trabajamos con las plataformas líderes de la industria para que tu negocio esté siempre en línea y disponible, sin importar la hora o el lugar."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header & Navigation */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#inicio" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
              <div className="absolute inset-1 bg-background rounded transform rotate-45"></div>
            </div>
            <span className="text-2xl font-bold">Symforge</span>
          </a>
          <div className="hidden md:flex space-x-8">
            {['servicios', 'automatizaciones', 'nosotros', 'contacto'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`transition-colors duration-300 capitalize ${
                  activeSection === item ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <DialogTrigger asChild>
              <Button className="hidden md:block font-semibold">
                Empieza ahora
              </Button>
            </DialogTrigger>
          </Dialog>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center bg-gradient-to-br from-background to-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-primary rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-3 sm:inset-4 bg-primary rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-6 sm:inset-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                    <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
                    <div className="absolute inset-1 bg-background rounded transform rotate-45"></div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                <span className="block">Transformamos Ideas en</span>
                <span className="block text-primary mt-2">Soluciones Digitales</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed">
                Como <span className="font-semibold text-foreground">consultora de software especializada</span> en arquitecturas de microservicios y soluciones en la nube, 
                diseñamos plataformas <span className="font-semibold text-foreground">robustas que escalan</span> junto a tu negocio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto font-semibold">
                      <CalendarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Agenda tu consulta gratuita hoy
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md mx-4">
                    <DialogHeader>
                      <DialogTitle>Agendar Consulta Gratuita</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Selecciona una fecha</Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          locale={es}
                          className="rounded-md border mt-2"
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Selecciona una hora</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2" role="radiogroup" aria-label="Seleccionar hora">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="text-sm"
                              role="radio"
                              aria-checked={selectedTime === time}
                              aria-label={`Hora ${time}`}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button 
                        onClick={handleCalendarConfirm} 
                        className="w-full" 
                        disabled={!selectedDate}
                        aria-describedby={!selectedDate ? "date-error" : undefined}
                      >
                        Confirmar Agendamiento
                      </Button>
                      {!selectedDate && (
                        <p id="date-error" className="text-red-500 text-sm text-center">
                          Por favor selecciona una fecha
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto font-semibold">
                  <MessageCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Habla con un experto ahora
                </Button>
              </div>
              
              {showCalendarSuccess && (
                <div className="mt-6 sm:mt-8 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
                  <div className="flex items-center text-green-800">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">¡Fecha agendada con éxito!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Hemos abierto tu calendario para que guardes la cita.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
                Soluciones que te ayudan a <span className="text-primary">crecer</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-4 leading-relaxed">
                Ofrecemos <span className="font-semibold text-foreground">tecnología innovadora</span> que resuelve los problemas 
                <span className="font-semibold text-foreground"> reales de tu negocio</span>.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-center text-sm sm:text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10 sm:mt-12">
              <Button variant="link" className="text-primary font-semibold text-sm sm:text-base hover:underline">
                🚀 Descubre cómo hemos ayudado a otros negocios como el tuyo
              </Button>
            </div>
          </div>
        </section>

        {/* Automation Section */}
        <section id="automatizaciones" className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
                Tecnología que te ayuda a <span className="text-primary">crecer</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-4 leading-relaxed">
                La <span className="font-semibold text-foreground">eficiencia comienza con la automatización</span>. En Symforge implementamos
                <span className="font-semibold text-foreground"> flujos inteligentes</span>, conectando tus sistemas y procesos para que 
                trabajen de forma autónoma y sincronizada.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {automationFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <LightbulbIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="leading-tight">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10 sm:mt-12">
              <Button variant="link" className="text-primary font-semibold text-sm sm:text-base hover:underline">
                🔧 Solicita tu demostración personalizada y automatiza tu negocio
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  Somos tu <span className="text-primary">aliado tecnológico</span> para el crecimiento
                </h2>
                <p className="text-muted-foreground mb-4 text-base sm:text-lg leading-relaxed">
                  Somos un equipo de <span className="font-semibold text-foreground">expertos</span> que no solo desarrolla código; 
                  <span className="font-semibold text-foreground"> construimos relaciones</span>. Lo que nos diferencia es nuestra 
                  capacidad para escuchar tus necesidades y ofrecer soluciones que realmente resuelven problemas.
                </p>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Nuestra <span className="font-semibold text-foreground">experiencia en tecnología</span> nos permite crear sistemas robustos, 
                  pero nuestra <span className="font-semibold text-foreground">pasión es ayudar</span> a negocios como el tuyo a alcanzar 
                  su máximo potencial.
                </p>
              </div>
              
              <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl sm:text-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <LightbulbIcon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="leading-tight">Nuestra Misión</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                      Ayudarte a crecer. Simplificamos la tecnología para que tu negocio se vuelva 
                      más eficiente, rentable y conectado con tus clientes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
                  Inicia tu camino hacia la <span className="text-primary">digitalización</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-4 leading-relaxed">
                  Agenda una <span className="font-semibold text-foreground">llamada estratégica gratuita</span> y descubre cómo podemos 
                  <span className="font-semibold text-foreground"> impulsar el crecimiento</span> de tu negocio con tecnología.
                </p>
              </div>
              
              <Card className="shadow-lg border-0 mx-4 sm:mx-0">
                <CardContent className="p-6 sm:p-8">
                  {submitSuccess ? (
                    <div className="text-center py-8 sm:py-12">
                      <CheckCircleIcon className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">¡Mensaje enviado con éxito!</h3>
                      <p className="text-muted-foreground text-base sm:text-lg">
                        Nos pondremos en contacto contigo muy pronto para discutir tus necesidades.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nombre">Nombre</Label>
                          <Input
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 ${formErrors.nombre ? 'border-red-500 focus:border-red-500' : ''}`}
                            aria-invalid={!!formErrors.nombre}
                            aria-describedby={formErrors.nombre ? "nombre-error" : undefined}
                          />
                          {formErrors.nombre && (
                            <p id="nombre-error" className="text-red-500 text-sm mt-1">{formErrors.nombre}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="empresa">Empresa</Label>
                          <Input
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 ${formErrors.empresa ? 'border-red-500 focus:border-red-500' : ''}`}
                            aria-invalid={!!formErrors.empresa}
                            aria-describedby={formErrors.empresa ? "empresa-error" : undefined}
                          />
                          {formErrors.empresa && (
                            <p id="empresa-error" className="text-red-500 text-sm mt-1">{formErrors.empresa}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 ${formErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                            aria-invalid={!!formErrors.email}
                            aria-describedby={formErrors.email ? "email-error" : undefined}
                          />
                          {formErrors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className={`mt-1 ${formErrors.telefono ? 'border-red-500 focus:border-red-500' : ''}`}
                            aria-invalid={!!formErrors.telefono}
                            aria-describedby={formErrors.telefono ? "telefono-error" : undefined}
                          />
                          {formErrors.telefono && (
                            <p id="telefono-error" className="text-red-500 text-sm mt-1">{formErrors.telefono}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="servicio">Servicio de Interés</Label>
                        <Select value={formData.servicio} onValueChange={handleSelectChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apps">Apps Móviles y Web</SelectItem>
                            <SelectItem value="cloud">Migración a la Nube</SelectItem>
                            <SelectItem value="arquitectura">Optimización de Arquitectura</SelectItem>
                            <SelectItem value="consultoria">Consultoría Tecnológica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="mensaje">Mensaje</Label>
                        <Textarea
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacy}
                          onCheckedChange={handleCheckboxChange}
                          required
                          className={formErrors.privacy ? 'border-red-500 data-[state=checked]:bg-red-500' : ''}
                        />
                        <div className="flex-1">
                          <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                            Acepto la{' '}
                            <a href="/privacy" className="text-primary hover:underline">
                              política de privacidad
                            </a>{' '}
                            y el tratamiento de datos
                          </Label>
                          {formErrors.privacy && (
                            <p id="privacy-error" className="text-red-500 text-sm mt-1">{formErrors.privacy}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 w-full sm:w-auto font-semibold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <ClockIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <RocketIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                              Transforma mi negocio ahora
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                  
                  <div className="mt-8 pt-8 border-t">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">¿Prefieres contactarnos directamente?</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a href="mailto:contacto@symforgesolutions.com" className="text-primary hover:underline flex items-center">
                          <MailIcon className="h-4 w-4 mr-1" />
                          contacto@symforgesolutions.com
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a href="tel:+525583219800" className="text-primary hover:underline flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          +52 55 8321 9800
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted-foreground text-muted py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2025 Symforge. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/525583219800"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        title="Pregúntanos por WhatsApp"
        aria-label="Pregúntanos por WhatsApp"
      >
        <MessageCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-green-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Pregúntanos por WhatsApp
        </span>
      </a>
    </div>
  );
}