# Angular Guide

This document provides a comprehensive overview of Angular concepts, Angular CLI commands, and best practices with examples.  
Updated to use **modern Angular features**: Signals and the new `@if` / `@for` block syntax (introduced in Angular 16+).

---

# 1. FirstApp Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

---

## Development Server

Run the following command for a dev server:

```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/).  
The application will automatically reload if you change any source files.

---

## Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

You can also generate other Angular building blocks:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

## Build

```bash
ng build
```

The build artifacts are stored in the `dist/` directory.

---

## Running Tests

### Unit Tests

```bash
ng test
```

Executes tests via [Karma](https://karma-runner.github.io).

### End-to-End (E2E) Tests

```bash
ng e2e
```

Executes E2E tests via a supported platform (e.g., Cypress, Protractor). You must install a package that provides E2E testing.

---

# 2. Angular Components

Components are the **building blocks** of an Angular application's UI.  
They encapsulate **logic, structure, and presentation** of parts of the interface.

### Example: `AppComponent`

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "My Angular App";
}
```

- `selector`: name of the custom HTML tag.
- `templateUrl`: path to HTML template.
- `styleUrls`: list of CSS files for styles.

---

# 3. Import and Export

Use **import/export** to manage dependencies.

Example: create `Product` class in `product.model.ts`:

```typescript
export class Product {
  constructor(public id: number, public name: string, public price: number) {}
}
```

Use it in another file:

```typescript
import { Product } from "./product.model";

const product = new Product(1, "Widget", 10.99);
console.log(product.name);
```

---

# 4. Data Binding

Angular supports multiple forms of binding between templates and component code.

## String Interpolation

```typescript
@Component({
  selector: "app-example",
  template: "<p>{{ message }}</p>",
})
export class ExampleComponent {
  message = "Hello, Angular!";
}
```

Displays: **Hello, Angular!**

---

## Property Binding

```html
<input [value]="message" />
```

The `value` property of `<input>` is bound to the `message` property in the component.

---

## Event Binding

```html
<button (click)="sayHello()">Click me</button>
```

Executes the `sayHello()` method in the component when clicked.

---

## Two-Way Binding

```html
<input [(ngModel)]="username" />
```

- Updates component property when the input changes.
- Updates the input when the property changes.
- Requires `FormsModule`.

---

# 5. Directives

Angular provides **block syntax** for structural directives instead of `*ngIf` and `*ngFor`.

## Conditional Rendering (`@if`)

```html
@if (isLoggedIn) {
<p>Welcome back!</p>
} @else {
<p>Please log in.</p>
}
```

---

## Looping (`@for`)

```html
@for (product of products; track product.id) {
<li>{{ product.name }} - {{ product.price | currency }}</li>
}
```

- `track` improves performance by telling Angular how to identify items.

---

# 6. Angular Signals

Signals are Angular’s **reactive primitive for state management** (introduced in Angular 16).  
They make it easy to create reactive variables that update the UI automatically.

## Defining a Signal

```typescript
import { Component, signal, computed } from "@angular/core";

@Component({
  selector: "app-counter",
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="increment()">Increment</button>
    <p>Double: {{ doubleCount() }}</p>
  `,
})
export class CounterComponent {
  count = signal(0);

  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

- `signal(initialValue)` → creates a reactive variable.
- `count()` → read signal value.
- `.set(newValue)` → set new value.
- `.update(fn)` → update based on current value.
- `computed` → derive values based on other signals.

💡 Signals replace the need for `@Input()`/`@Output()` in many scenarios, providing **simpler reactivity**.

---

# 7. Lifecycle Hooks

A component goes through a **lifecycle** managed by Angular.  
Hooks let you run code at specific times.

### Common Hooks

- `ngOnChanges()` → responds to input property changes.
- `ngOnInit()` → runs once after initialization.
- `ngDoCheck()` → custom change detection.
- `ngAfterContentInit()` → after projecting content.
- `ngAfterContentChecked()` → after content is checked.
- `ngAfterViewInit()` → after component’s view initializes.
- `ngAfterViewChecked()` → after view is checked.
- `ngOnDestroy()` → cleanup before destroying the component.

![Lifecycle Hooks](https://dotnettrickscloud.blob.core.windows.net/img/angular/angular-lifecycle-hooks.png "Lifecycle Hooks")

---

# 8. Pipes

Pipes transform data for display in templates.

## Built-in Pipes

- `DatePipe`: formats dates.
- `UpperCasePipe`: converts to uppercase.
- `LowerCasePipe`: converts to lowercase.
- `CurrencyPipe`: formats as currency.
- `DecimalPipe`: formats decimal numbers.
- `PercentPipe`: formats as percentage.

Example:

```html
<p>{{ today | date:"longDate" }}</p>
<p>{{ price | currency:"EUR" }}</p>
```

---

## Custom Pipes

Create custom pipes for unique transformations.

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "exclaim" })
export class ExclaimPipe implements PipeTransform {
  transform(value: string): string {
    return value + "!";
  }
}
```

Usage in template:

```html
<p>{{ "Hello" | exclaim }}</p>
```

---

## Parameters and Chaining Pipes

```html
<p>{{ amount | currency:'EUR' }}</p>
<p>{{ amount | currency:'EUR':'Euros ' }}</p>
<p>{{ [1,2,3,4,5] | slice:1:3 }}</p>
```

- Multiple pipes can be chained:

```html
<p>{{ name | lowercase | titlecase }}</p>
```

---

# Summary

- Use **Angular CLI** to create, serve, build, and test apps.
- **Components** encapsulate UI logic and presentation.
- Use **binding** (interpolation, property, event, two-way) to connect data and UI.
- **Directives** now use modern `@if` / `@for` syntax.
- **Signals** provide a powerful new way to manage reactive state.
- **Lifecycle hooks** let you react at different component stages.
- **Pipes** provide built-in and custom data transformations.

For further study, see the [Angular Documentation](https://angular.io/docs).
