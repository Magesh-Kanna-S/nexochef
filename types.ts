
export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender?: string;
  dietaryPreference: string;
  initials: string;
  relationship?: string;
  medicalReports?: string[]; // URLs or filenames
  allergies?: string[];
  medicalConditions?: string[];
}

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  age: number;
  weight: number;
  dietaryPreference: string;
  allergies: string[];
  medicalConditions: string[];
  cookingLevel: 'Beginner' | 'Intermediate' | 'Pro';
  dailyCalories?: number;
  subscription: 'Free' | 'Premium' | 'HealthSync';
  familyMembers: FamilyMember[];
  isLoggedIn: boolean;
  authMethod?: 'Google' | 'Phone';
  currentCalories: number;
  currentWater: number;
  healthPartner?: string;
  theme?: 'light' | 'dark';
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string; // ISO string
  category: string;
  isCertified?: boolean; // FSSAI/Apollo Certification
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  calories: number;
  time: number;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  whySuggested: string;
  indianContext?: string;
  healthWarnings?: string[];
  isCertified: boolean;
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  WELCOME = 'WELCOME',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  MEAL_PLANNER = 'MEAL_PLANNER',
  INVENTORY = 'INVENTORY',
  COOKING_ASSISTANT = 'COOKING_ASSISTANT',
  HEALTH_REPORT = 'HEALTH_REPORT',
  APPLIANCES = 'APPLIANCES',
  MOTIVATION_CHAT = 'MOTIVATION_CHAT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FAMILY_MANAGEMENT = 'FAMILY_MANAGEMENT',
  PROFILE_EDIT = 'PROFILE_EDIT',
  HISTORY = 'HISTORY',
  PARTNER = 'PARTNER'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface DailyPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface ConsumptionLog {
  id: string;
  type: 'Water' | 'Calories';
  amount: number;
  timestamp: string;
}
