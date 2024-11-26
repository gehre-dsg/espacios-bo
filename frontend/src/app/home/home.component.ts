import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  highlights = [
    {
      title: 'Reserva Espacios',
      description: 'Gestiona y reserva espacios públicos con facilidad.',
      icon: 'https://cdn-icons-png.flaticon.com/512/3094/3094838.png',
    },
    {
      title: 'Innovación Digital',
      description: 'Tecnología de punta para simplificar procesos.',
      icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    },
    {
      title: 'Acceso Inclusivo',
      description: 'Diseñado para fomentar la participación de toda la comunidad.',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
  ];

  galleryImages = [
    'https://abi.bo/images/Noticias/Economia/sep-22/DINOSAURIOS.jpg',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5kaj4Kxc3gLaRPFsivHGPsZLa2GjoQeWMtPzff0JzMC7Ix7hOcDsmLC58mU6EwHr0s8_-QkSqRfGi99b_Y5BYf82YSBaUMTrOkuMafxRLP4VrnoAWtXbq0J_eVS-aoCaz93TTNsujmc1G/s1600/x3icld.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/55/c1/8b/laguna-macho-en-la-base.jpg?w=1200&h=700&s=1',
  ];

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
