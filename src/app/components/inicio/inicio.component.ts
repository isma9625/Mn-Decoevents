import { Component, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { municipios } from '../../data/municipios';


@Component({
  selector: 'app-inicio',
  imports: [ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  encapsulation: ViewEncapsulation.None
})
export class InicioComponent {

    datosForm: string = '';
    eventosOptions: string[] = ['Boda', 'Compromiso', 'Cumpleaños', 'Henna'];
    municipios = municipios

    contactForm: FormGroup;

    calendarioAbierto = false;
    mostrarModalFecha = false;
    mostrarModalEnvio = false;
    mostrarMensajeExito = false;
    
    fechaSeleccionada = '';

    fechaSeleccionadaISO: string = '';     // la que tiene marcada ahora mismo
    fechaConfirmadaISO: string = '';       // la que ya aceptó

    fechaDisponible = false;

    fechasNoDisponibles: string[] = [
        '2026-10-14',
        '2026-10-15',
        '2026-10-25'
    ];


  // ============================================================
  // CALENDARIO
  // ============================================================

  monthElement!: HTMLElement;
  desplegableMes!: HTMLElement;
  opcionesMes!: HTMLElement;

  yearElement!: HTMLElement;
  desplegableYear!: HTMLElement;
  opcionesYear!: HTMLElement;

  daysElement!: HTMLElement;

  prevMonth!: HTMLElement;
  nextMonth!: HTMLElement;

  prevYear!: HTMLElement;
  nextYear!: HTMLElement;

  meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  fecha = new Date();

  mesActual = this.fecha.getMonth();
  añoActual = this.fecha.getFullYear();

    constructor(
        private fb: FormBuilder
    ){
    this.contactForm = this.fb.group({

    nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')
    ]],
    apellido: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')

    ]],
    email: ['', [
        Validators.required,
        Validators.email
    ]],
    telefono: ['', [
        Validators.required,
        Validators.pattern('^[6789]\\d{8}$')
    ]],
    eventos: ['', 
        Validators.required
    ],
    localidad: ['', 
        Validators.required
    ],
    mensaje: ['', 
        Validators.required
    ],
    fecha: ['', Validators.required]

});
}

    currentIndex = 0;

     // ============================================================
  // AFTER VIEW INIT
  // ============================================================

  ngAfterViewInit(): void {

    // ============================================================
    // ANIMACIONES
    // ============================================================

    const elements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('show');

          }

        });

      },
      {
        threshold: 0.2
      }
    );

    elements.forEach(el => observer.observe(el));


    // ============================================================
    // SLIDER DE RESEÑAS
    // ============================================================

    const btns =
      document.querySelectorAll('.indicator-btn');

    const slideRow =
      document.getElementById('slide-row');

    const slider =
      document.querySelector('.slider');

    if (slideRow && slider) {

      const updateSlide = (): void => {

        const sliderWidth =
          (slider as HTMLElement).offsetWidth;

        const translateValue =
          this.currentIndex * -sliderWidth;

        (slideRow as HTMLElement).style.transform =
          `translateX(${translateValue}px)`;

        btns.forEach((btn, index) => {

          btn.classList.toggle(
            'active',
            index === this.currentIndex
          );

        });

      };


      btns.forEach((btn, index) => {

        btn.addEventListener('click', () => {

          this.currentIndex = index;

          updateSlide();

        });

      });


      window.addEventListener('resize', () => {

        updateSlide();

      });


      updateSlide();

    }


    // ============================================================
    // CARRUSEL DE ARTÍCULOS
    // ============================================================

    const carouselElement =
      document.getElementById('carouselArticulos');

    const prevBtn =
      document.querySelector(
        '.flechaArticulosPrev'
      ) as HTMLElement;

    const nextBtn =
      document.querySelector(
        '.flechaArticulos'
      ) as HTMLElement;


    if (
      carouselElement &&
      prevBtn &&
      nextBtn
    ) {

      const carousel =
        carouselElement;


      function updateFlechas(): void {

        const items =
          carousel.querySelectorAll(
            '.carousel-item'
          );

        const activeItem =
          carousel.querySelector(
            '.carousel-item.active'
          ) as HTMLElement;


        const index =
          Array.from(items).indexOf(
            activeItem
          );


        if (index === 0) {

          prevBtn.style.visibility =
            'hidden';

        } else {

          prevBtn.style.visibility =
            'visible';

        }


        if (
          index === items.length - 1
        ) {

          nextBtn.style.visibility =
            'hidden';

        } else {

          nextBtn.style.visibility =
            'visible';

        }

      }


      updateFlechas();


      carousel.addEventListener(
        'slid.bs.carousel',
        updateFlechas
      );

    }

     // ============================================================
    // CARRUSEL DE COLLECTIONS
    // ============================================================
    const carouselElementCollections =
      document.getElementById('carouselCollections');

    const prevBtnCollections =
      document.querySelector(
        '.flechaCollectionsPrev'
      ) as HTMLElement;

    const nextBtnCollections =
      document.querySelector(
        '.flechaCollections'
      ) as HTMLElement;


    if (
      carouselElementCollections &&
      prevBtnCollections &&
      nextBtnCollections
    ) {

      const carousel =
        carouselElementCollections;


      function updateFlechas(): void {

        const items =
          carousel.querySelectorAll(
            '.carousel-item'
          );

        const activeItem =
          carousel.querySelector(
            '.carousel-item.active'
          ) as HTMLElement;


        const index =
          Array.from(items).indexOf(
            activeItem
          );


        if (index === 0) {

          prevBtnCollections.style.visibility =
            'hidden';

        } else {

          prevBtnCollections.style.visibility =
            'visible';

        }


        if (
          index === items.length - 1
        ) {

          nextBtnCollections.style.visibility =
            'hidden';

        } else {

          nextBtnCollections.style.visibility =
            'visible';

        }

      }


      updateFlechas();


      carousel.addEventListener(
        'slid.bs.carousel',
        updateFlechas
      );

    }

    // ============================================================
    // CALENDARIO
    // ============================================================

    this.monthElement =
      document.querySelector<HTMLElement>(
        '.month'
      )!;

    this.desplegableMes =
      document.querySelector<HTMLElement>(
        '.desplegableMes'
      )!;

    this.opcionesMes =
      document.querySelector<HTMLElement>(
        '.opcionesMes'
      )!;


    this.yearElement =
      document.querySelector<HTMLElement>(
        '.year'
      )!;

    this.desplegableYear =
      document.querySelector<HTMLElement>(
        '.desplegableYear'
      )!;

    this.opcionesYear =
      document.querySelector<HTMLElement>(
        '.opcionesYear'
      )!;


    this.daysElement =
      document.querySelector<HTMLElement>(
        '.days'
      )!;


    // ============================================================
    // FLECHAS DEL CALENDARIO
    // ============================================================

    this.prevMonth =
      document.querySelector(
        '.flechaIzquierdaMonth'
      ) as HTMLElement;

    this.nextMonth =
      document.querySelector(
        '.flechaDerechaMonth'
      ) as HTMLElement;

    this.prevYear =
      document.querySelector(
        '.flechaIzquierdaYear'
      ) as HTMLElement;

    this.nextYear =
      document.querySelector(
        '.flechaDerechaYear'
      ) as HTMLElement;


    // ============================================================
    // DESPLEGABLE DE MESES
    // ============================================================

    if (
      this.monthElement &&
      this.desplegableMes &&
      this.opcionesMes &&
      this.desplegableYear
    ) {

      this.meses.forEach(
        (mes, index) => {

          const opcion =
            document.createElement('div');

          opcion.textContent =
            mes;

          opcion.classList.add(
            'opcionMes'
          );


          opcion.addEventListener(
            'click',
            () => {

              this.mesActual =
                index;

              this.actualizarCalendario();

              this.desplegableMes.classList.remove(
                'mostrar'
              );

            }
          );


          this.opcionesMes.appendChild(
            opcion
          );

        }
      );


      this.monthElement.addEventListener(
        'click',
        (event: MouseEvent) => {

          event.stopPropagation();

          this.desplegableMes.classList.toggle(
            'mostrar'
          );

          this.desplegableYear.classList.remove(
            'mostrar'
          );

        }
      );

    }


    // ============================================================
    // DESPLEGABLE DE AÑOS
    // ============================================================

    if (
      this.yearElement &&
      this.desplegableYear &&
      this.opcionesYear &&
      this.desplegableMes
    ) {

      const añoInicial =
        this.añoActual - 10;

      const añoFinal =
        this.añoActual + 10;


      for (
        let año = añoInicial;
        año <= añoFinal;
        año++
      ) {

        const opcion =
          document.createElement('div');

        opcion.textContent =
          año.toString();

        opcion.classList.add(
          'opcionYear'
        );


        opcion.addEventListener(
          'click',
          () => {

            this.añoActual =
              año;

            this.actualizarCalendario();

            this.desplegableYear.classList.remove(
              'mostrar'
            );

          }
        );


        this.opcionesYear.appendChild(
          opcion
        );

      }


      this.yearElement.addEventListener(
        'click',
        (event: MouseEvent) => {

          event.stopPropagation();

          this.desplegableYear.classList.toggle(
            'mostrar'
          );

          this.desplegableMes.classList.remove(
            'mostrar'
          );

        }
      );

    }


    // ============================================================
    // CERRAR DESPLEGABLES AL HACER CLICK FUERA
    // ============================================================

    document.addEventListener(
      'click',
      () => {

        this.desplegableMes?.classList.remove(
          'mostrar'
        );

        this.desplegableYear?.classList.remove(
          'mostrar'
        );

      }
    );


    // ============================================================
    // EVENTOS DE LAS FLECHAS
    // ============================================================

    // MES ANTERIOR

    if (this.prevMonth) {

      this.prevMonth.addEventListener(
        'click',
        () => {

          this.mesActual--;

          if (this.mesActual < 0) {

            this.mesActual = 11;

            this.añoActual--;

          }

          this.actualizarCalendario();

        }
      );

    }


    // MES SIGUIENTE

    if (this.nextMonth) {

      this.nextMonth.addEventListener(
        'click',
        () => {

          this.mesActual++;

          if (this.mesActual > 11) {

            this.mesActual = 0;

            this.añoActual++;

          }

          this.actualizarCalendario();

        }
      );

    }


    // AÑO ANTERIOR

    if (this.prevYear) {

      this.prevYear.addEventListener(
        'click',
        () => {

          this.añoActual--;

          this.actualizarCalendario();

        }
      );

    }


    // AÑO SIGUIENTE

    if (this.nextYear) {

      this.nextYear.addEventListener(
        'click',
        () => {

          this.añoActual++;

          this.actualizarCalendario();

        }
      );

    }


    // ============================================================
    // CARGAR CALENDARIO
    // ============================================================

    this.actualizarCalendario();

  }


  // ============================================================
  // ACTUALIZAR CALENDARIO
  // ============================================================

  actualizarCalendario(): void {

    if (
      !this.monthElement ||
      !this.yearElement ||
      !this.daysElement
    ) {

      return;

    }


    // ============================================================
    // MOSTRAR MES Y AÑO
    // ============================================================

    this.monthElement.textContent =
      this.meses[this.mesActual];

    this.yearElement.textContent =
      this.añoActual.toString();


    // ============================================================
    // BORRAR DÍAS ANTERIORES
    // ============================================================

    this.daysElement.innerHTML = '';


    // ============================================================
    // CABECERAS
    // ============================================================

    const dayHeaders = [
      'Lun',
      'Mar',
      'Mié',
      'Jue',
      'Vie',
      'Sáb',
      'Dom'
    ];


    dayHeaders.forEach(
      header => {

        const span =
          document.createElement('span');

        span.textContent =
          header;

        span.className =
          'day-header';

        this.daysElement.appendChild(
          span
        );

      }
    );


    // ============================================================
    // PRIMER DÍA DEL MES
    // ============================================================

    const primerDia =
      new Date(
        this.añoActual,
        this.mesActual,
        1
      );


    // ============================================================
    // NÚMERO DE DÍAS DEL MES
    // ============================================================

    const diasDelMes =
      new Date(
        this.añoActual,
        this.mesActual + 1,
        0
      ).getDate();


    // ============================================================
    // DÍA DE LA SEMANA
    // ============================================================

    let diaSemana =
      primerDia.getDay();


    if (diaSemana === 0) {

      diaSemana = 6;

    } else {

      diaSemana =
        diaSemana - 1;

    }


    // ============================================================
    // ESPACIOS ANTES DEL DÍA 1
    // ============================================================

    for (
      let i = 0;
      i < diaSemana;
      i++
    ) {

      const espacio =
        document.createElement('div');

      espacio.classList.add(
        'disabled'
      );

      this.daysElement.appendChild(
        espacio
      );

    }


    // ============================================================
    // CREAR LOS DÍAS
    // ============================================================

    for (
      let dia = 1;
      dia <= diasDelMes;
      dia++
    ) {

      const dayElement = document.createElement('div');

      dayElement.textContent = dia.toString();

      this.marcarNoDisponibles(dayElement, dia);

      


      // ========================================================
      // COMPROBAR SI ES HOY
      // ========================================================

      if (
        dia === this.fecha.getDate() &&
        this.mesActual === this.fecha.getMonth() &&
        this.añoActual === this.fecha.getFullYear()
      ) {

        dayElement.classList.add(
          'today'
        );

        this.daysElement.appendChild(dayElement);
      }


      // ========================================================
      // CLICK EN UN DÍA
      // ========================================================


      // ========================================================
      // AÑADIR DÍA
      // ========================================================

      this.daysElement.appendChild(
        dayElement
      );

    }

  }


  // ============================================================
  // COMPROBAR FECHA
  // ============================================================

  comprobarFecha(dia: number, mes: number, año: number): void {

    const fecha = new Date(año, mes, dia);


    const fechaFormateada =
      `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;


    this.fechaSeleccionada = fecha.toLocaleDateString('es-ES');


    this.fechaDisponible = !this.fechasNoDisponibles.includes(fechaFormateada);


    this.mostrarModalFecha = true;


    if (this.fechaDisponible) { 

        // Si es una fecha distinta a la que tenía seleccionada, la actualizamos
    if (fechaFormateada !== this.fechaSeleccionadaISO) {
      this.fechaSeleccionadaISO = fechaFormateada;
      this.contactForm.patchValue({ fecha: fechaFormateada });
      this.actualizarCalendario();
    }

    } else {

      this.contactForm.patchValue({fecha: ''});

    }

      this.mostrarModalFecha = true;

  }


  fechaYaConfirmada(): boolean {
    return this.fechaSeleccionadaISO !== '' && this.fechaSeleccionadaISO === this.fechaConfirmadaISO;
  }


  // ============================================================
  // CERRAR MODAL
  // ============================================================

  cerrarModalFecha(): void {
    // Si aún no estaba confirmada, equivale a cancelar
    if (this.fechaSeleccionadaISO !== this.fechaConfirmadaISO) {
        this.fechaSeleccionadaISO = '';
        this.contactForm.patchValue({ fecha: '' });
        this.actualizarCalendario();
    }
    this.mostrarModalFecha = false;
  }

  aceptarFecha(): void {
    this.fechaConfirmadaISO = this.fechaSeleccionadaISO;
    this.mostrarModalFecha = false;
  }

  cancelarFecha(): void {
      this.mostrarModalFecha = false;
      this.fechaSeleccionadaISO = '';
      this.contactForm.patchValue({ fecha: '' });
      this.actualizarCalendario();
  }

  modificarFecha(): void {
      this.mostrarModalFecha = false;
      this.fechaConfirmadaISO = '';
      this.fechaSeleccionadaISO = '';
      this.contactForm.patchValue({ fecha: '' });
      this.actualizarCalendario();
  }

  marcarNoDisponibles(dayElement: HTMLElement, dia: number ): void {

    const fechaFormateada =
    `${this.añoActual}-${String(this.mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    if(this.fechasNoDisponibles.includes(fechaFormateada)){
      dayElement.classList.add('disabled');
    }
    else {

      if (fechaFormateada === this.fechaSeleccionadaISO) {
      dayElement.classList.add('selected');
    }

    dayElement.addEventListener('click', () => {
      this.comprobarFecha(dia, this.mesActual, this.añoActual);
    });
  }

}

  cerrarModalEnvio(): void {
  this.mostrarModalEnvio = false;
  }

  confirmarEnvio(): void {
    // Aquí harías el envío real (HTTP, email, etc.)
    console.log('Datos enviados:', this.datosForm);

    this.mostrarModalEnvio = false;

    this.mostrarMensajeExito = true;
  }

  cerrarMensajeExito(): void {
  this.mostrarMensajeExito = false;

  this.contactForm.reset();
  this.fechaSeleccionadaISO = '';
  this.fechaConfirmadaISO = '';
  this.actualizarCalendario();
}

  enviar():void{

  // Cierro el modal de datos
  this.mostrarModalEnvio = true;

 
  
    
  }

  

  // comprobarCorreo(email): void{

  //   email = ''

  //   if (email = this.correosConEvento) {

      
  //   }
  // }

}