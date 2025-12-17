import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion!: Suggestion | undefined;

  // Your fake list – must be same as list component
  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: '...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', likes: 0, favorite: false },
    { id: 2, title: 'Améliorer le système de réservation', description: '...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', likes: 0, favorite: false },
    { id: 3, title: 'Créer un système de récompenses', description: '...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', likes: 0, favorite: false },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: '...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', likes: 0, favorite: false },
    { id: 5, title: 'Formation à la sécurité informatique', description: '...', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', likes: 0, favorite: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestion();
  }

  // Load suggestion based on route param
  loadSuggestion() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestion = this.suggestions.find(s => s.id === id);
  }

  // Go to next suggestion
  next() {
    if (!this.suggestion) return;
    const nextId = this.suggestion.id + 1;
    this.router.navigate(['/suggestions', nextId]).then(() => {
      this.loadSuggestion();
    });
  }

  // Go to previous suggestion
  previous() {
    if (!this.suggestion) return;
    const prevId = this.suggestion.id - 1;
    this.router.navigate(['/suggestions', prevId]).then(() => {
      this.loadSuggestion();
    });
  }

}
