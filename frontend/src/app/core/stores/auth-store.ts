import { Injectable, signal, computed } from '@angular/core';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _user = signal<FirebaseUser | null>(null);
  private readonly _loading = signal<boolean>(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly uid = computed(() => this._user()?.uid ?? null);
  readonly email = computed(() => this._user()?.email ?? null);

  constructor() {
    onAuthStateChanged(firebaseAuth, (user) => {
      this._user.set(user);
      this._loading.set(false);
    });
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  async registerWithEmail(email: string, password: string): Promise<FirebaseUser> {
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return credential.user;
  }

  async loginWithGoogle(): Promise<FirebaseUser> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(firebaseAuth, provider);
    return credential.user;
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  }
}