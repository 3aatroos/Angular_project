import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {

  searchTerm: string = ''; // for search input

  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: '...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', likes: 0, favorite: false },
    { id: 2, title: 'Améliorer le système de réservation', description: '...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', likes: 0, favorite: false },
    { id: 3, title: 'Créer un système de récompenses', description: '...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', likes: 0, favorite: false },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: '...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', likes: 0, favorite: false },
    { id: 5, title: 'Formation à la sécurité informatique', description: '...', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', likes: 0, favorite: false }
  ];

  favorites: Suggestion[] = [];

  likeSuggestion(s: Suggestion) {
    s.likes = (s.likes || 0) + 1;
  }

  addToFavorites(s: Suggestion) {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
      s.favorite = true;
    }
  }

  // Filtered suggestions based on searchTerm
  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) return this.suggestions;

    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
  }

}
