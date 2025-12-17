import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  form!: FormGroup;           // declare, initialize later
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  suggestions: Suggestion[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // load stored suggestions
    this.suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');

    // now that fb is injected, build the form
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    const newId = this.suggestions.length > 0
      ? this.suggestions[this.suggestions.length - 1].id + 1
      : 1;

    const newSuggestion: Suggestion = {
      id: newId,
      title: this.form.value.title!,
      description: this.form.value.description!,
      category: this.form.value.category!,
      date: new Date(),
      status: 'en attente',
      nbLikes: 1,
      favorite: false
    };

    this.suggestions.push(newSuggestion);
    localStorage.setItem('suggestions', JSON.stringify(this.suggestions));
    this.router.navigate(['/listSuggestion']);
  }
}