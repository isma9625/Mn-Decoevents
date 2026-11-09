import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  

  constructor(private scroller: ViewportScroller) {}

  ngAfterViewInit() {
    // Creamos un observador para detectar el scroll
    const navbar = document.getElementById('navbar-principal');
    
    // Este elemento "invisible" está al principio de la página
    const trigger = document.createElement('div');
    trigger.style.position = 'absolute';
    trigger.style.top = '50px'; // Cuando bajes 50px, se activa
    trigger.style.height = '1px';
    trigger.style.width = '100%';
    document.body.prepend(trigger);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        
        if (!entry.isIntersecting) {
          navbar?.classList.add('navbar-scrolled');
        } else {
          navbar?.classList.remove('navbar-scrolled');
        }
      });
    });

    observer.observe(trigger);
  }


   // Método para hacer scroll a la sección desde el menu
  scrollTo(seccionId: string) {
    this.scroller.scrollToAnchor(seccionId);
  }
}