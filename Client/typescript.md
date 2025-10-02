# TypeScript Components and Concepts

These TypeScript components and concepts enhance JavaScript by adding static typing and advanced type features. They make TypeScript a powerful tool for building scalable and maintainable applications. Use them wisely to write clean and error-free code.

---

## INITIALIZE TYPESCRIPT PROJECT

```bash
tsc --init
```

- Creates a `tsconfig.json` file, where compiler settings live.
- Common tweaks:
  - `"strict": true` → enables strict type checking.
  - `"outDir": "./dist"` → compiled JS goes to `dist`.
  - `"rootDir": "./src"` → source files inside `src`.

Project setup:

```bash
mkdir src
touch src/index.ts
tsc   # compiles .ts files to .js
```

### Running the project

- Run compiled JS with Node:

  ```bash
  node dist/index.js
  ```

- Run TS directly:
  ```bash
  npm install ts-node
  ts-node src/index.ts
  ```

💡 **Tip**: Combine with nodemon for auto-reload:

```bash
npx nodemon --exec ts-node src/index.ts
```

---

## 1. Variable Declarations

```typescript
const firstName: string = "John";
const age: number = 25;
let isStudent: boolean = true;
```

- `const` → values that don’t change.
- `let` → values that can be reassigned.

Type inference works too:

```typescript
let city = "Berlin"; // inferred as string
// city = 42; Error
```

---

## 2. Union Types

```typescript
let value: string | number = 1;
value = "Hello";
```

Practical example:

```typescript
function printId(id: number | string) {
  console.log("ID:", id);
}
printId(123);
printId("abc-123");
```

---

## 3. Type Alias

```typescript
type MyFavoriteNumber = number;
type User = { id: number; name: string; email: string };
```

```typescript
const user: User = { id: 1, name: "Jane", email: "jane@email.com" };
```

Readable unions:

```typescript
type Status = "pending" | "approved" | "rejected";
```

---

## 4. Interfaces

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number; // optional property
}
```

```typescript
const p: Person = { firstName: "Tom", lastName: "Jones" };
```

Interfaces can extend:

```typescript
interface Employee extends Person {
  employeeId: number;
}
```

---

## 5. Type Assertions

```typescript
const input = document.getElementById("name") as HTMLInputElement;
console.log(input.value);
```

Use when TypeScript can’t infer a type but you know it.

---

## 6. Type Guards

```typescript
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}
```

---

## 7. Enums

```typescript
enum PaymentMethod {
  CASH = "cash",
  CARD = "credit card",
  CHECK = "payment check",
}
```

```typescript
const method: PaymentMethod = PaymentMethod.CARD;
```

---

## 8. Functions

```typescript
function greet(who: string): void {
  console.log(`Hello ${who}!`);
}

function add(a: number, b: number): number {
  return a + b;
}
```

Optional & default params:

```typescript
function log(message: string, userId?: string) {
  console.log(userId ? `[${userId}] ${message}` : message);
}

function greetWithDefault(name: string = "Guest") {
  console.log(`Welcome, ${name}`);
}
```

---

## 9. Generics

```typescript
function echo<T>(arg: T): T {
  return arg;
}

echo(42); // number
echo("hello"); // string
```

With constraints:

```typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("Hello"); // 5
getLength([1, 2, 3]); // 3
```

---

# Angular CLI (Command Line Interface)

The Angular CLI provides commands for scaffolding, running, testing, and building Angular apps.

---

## Development server

```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/).  
The app reloads automatically when you change files.

---

## Code scaffolding

```bash
ng generate component component-name
ng generate service my-service
```

Also works for: `directive | pipe | class | guard | interface | enum | module`.

---

## Build

```bash
ng build
```

Build artifacts are stored in the `dist/` folder.

---

## Running unit tests

```bash
ng test
```

Runs tests via [Karma](https://karma-runner.github.io).

---

## Running end-to-end tests

```bash
ng e2e
```

Executes e2e tests.  
You may need to install a package that provides e2e testing.

---

## Further help

- `ng help` → shows all commands
- [Angular CLI Reference](https://angular.io/cli)

---

# Wrap-up Notes

- Use **Type Aliases** for unions and readability.
- Use **Interfaces** for object contracts.
- Prefer **Generics** for reusable, type-safe functions.
- Turn on **strict mode** in `tsconfig.json`.
- Rely on **type inference** unless explicit typing adds clarity.
