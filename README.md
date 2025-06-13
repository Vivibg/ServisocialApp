# ServisocialApp

Aplicación de servicios sociales construida con React Native (Expo) y Firebase.

## Requisitos
- Node.js >= 16
- npm >= 8
- Expo CLI (`npm install -g expo-cli`)
- Firebase CLI (`npm install -g firebase-tools`)

## Instalación
```bash
npm install
```

## Desarrollo (Web y Móvil)
### Web
```bash
npx expo start:web
```
Abre [http://localhost:19006](http://localhost:19006) en tu navegador.

### Móvil
```bash
npx expo start
```
Escanea el QR con la app Expo Go en tu teléfono.

## Variables y configuración
Copia `.env.example` a `.env` y completa las credenciales de Firebase.

## Deploy a Firebase Hosting
1. **Build web:**
   ```bash
   npx expo export:web
   ```
   Esto genera la carpeta `web-build`.
2. **Login en Firebase:**
   ```bash
   firebase login
   ```
3. **Inicializa el hosting (solo la primera vez):**
   ```bash
   firebase init hosting
   ```
   - Elige `web-build` como carpeta pública.
   - Configura como SPA (Single Page App): `y`.
4. **Publica:**
   ```bash
   firebase deploy
   ```

## Reglas recomendadas de Firestore (seguridad):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /servicios/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Contacto y soporte
- Autor: Tu nombre aquí
- Email: tu@email.com