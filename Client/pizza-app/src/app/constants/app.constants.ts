import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const apiUrl = `http://localhost:5180/api`;

// We can freeze this object if we want to prevent extending properties and changing the existing object
// We can seal this object if we want to prevent addition and deletion of the existing properties but we want to enable modification of the values of the existing ones
export const snackBarConfig: MatSnackBarConfig = {
  verticalPosition: 'top', // Allowed values: 'top' or 'bottom'
  horizontalPosition: 'end', // Allowed values: 'start', 'center', 'end', 'left', or 'right'
  duration: 3000, // Duration in milliseconds
};
